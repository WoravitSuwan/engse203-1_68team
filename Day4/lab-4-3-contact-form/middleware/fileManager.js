const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

const ensureDataDir = async () => {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
};

const readJsonFile = async (filename) => {
    try {
        await ensureDataDir();
        const filePath = path.join(DATA_DIR, filename);
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch {
        return [];
    }
};

const writeJsonFile = async (filename, data) => {
    try {
        await ensureDataDir();
        const filePath = path.join(DATA_DIR, filename);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const appendToJsonFile = async (filename, newData) => {
    try {
        const existingData = await readJsonFile(filename);
        const dataWithId = {
            id: Date.now(),
            ...newData,
            createdAt: new Date().toISOString()
        };
        existingData.push(dataWithId);
        await writeJsonFile(filename, existingData);
        return dataWithId;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getFileStats = async () => {
    const files = ['contacts.json', 'feedback.json'];
    const stats = {};
    for (let file of files) {
        const data = await readJsonFile(file);
        stats[file.replace('.json', '')] = data.length;
    }
    return stats;
};

module.exports = { readJsonFile, writeJsonFile, appendToJsonFile, getFileStats };
