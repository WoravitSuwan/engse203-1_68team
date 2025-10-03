const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs').promises;

let mainWindow;

function createWindow() {
  console.log('🖥️ [MAIN] กำลังสร้าง window...');
  
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools();
  console.log('✅ [MAIN] สร้าง window สำเร็จ');
}

app.whenReady().then(() => {
  console.log('⚡ [MAIN] Electron พร้อมทำงาน');
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// ===== IPC HANDLERS =====

// ส่งข้อความพื้นฐาน
ipcMain.handle('send-message', (event, message) => {
  console.log('📨 [MAIN] ได้รับข้อความ:', message);
  return {
    original: message,
    reply: `Server ได้รับ: "${message}"`,
    timestamp: new Date().toISOString(),
    status: 'success'
  };
});

// คำทักทาย
ipcMain.handle('say-hello', (event, name) => {
  console.log('👋 [MAIN] ทักทายกับ:', name);
  const greetings = [
    `สวัสดี ${name}! ยินดีต้อนรับสู่ Agent Wallboard`,
    `หวัดดี ${name}! วันนี้พร้อมทำงานแล้วหรือยัง?`,
    `Hello ${name}! มีความสุขในการทำงานนะ`,
  ];
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  return {
    greeting: randomGreeting,
    name: name,
    time: new Date().toLocaleString('th-TH'),
    agentCount: 3
  };
});

// โหลดข้อมูล agents
ipcMain.handle('get-agents', async () => {
  console.log('📊 [MAIN] กำลังโหลดข้อมูล agents...');
  try {
    const data = await fs.readFile('agent-data.json', 'utf8');
    return { success: true, data: JSON.parse(data), timestamp: new Date().toISOString() };
  } catch (error) {
    console.error('❌ [MAIN] Error โหลดข้อมูล:', error);
    return { success: false, error: error.message };
  }
});

// เปลี่ยนสถานะ agent
ipcMain.handle('change-agent-status', async (event, { agentId, newStatus }) => {
  console.log(`🔄 [MAIN] เปลี่ยนสถานะ agent ${agentId} เป็น ${newStatus}`);
  try {
    const data = await fs.readFile('agent-data.json', 'utf8');
    const agentData = JSON.parse(data);
    const agent = agentData.agents.find(a => a.id === agentId);
    if (!agent) throw new Error(`ไม่พบ agent ID: ${agentId}`);
    agent.status = newStatus;
    agent.lastStatusChange = new Date().toISOString();
    await fs.writeFile('agent-data.json', JSON.stringify(agentData, null, 2));
    return { success: true, agent, message: `เปลี่ยนสถานะเป็น ${newStatus} แล้ว` };
  } catch (error) {
    console.error('❌ [MAIN] Error เปลี่ยนสถานะ:', error);
    return { success: false, error: error.message };
  }
});
