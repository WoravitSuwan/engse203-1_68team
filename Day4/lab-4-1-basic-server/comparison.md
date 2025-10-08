# HTTP Server vs Express Server

## 1. การสร้าง Server
- HTTP: ใช้ `http.createServer()` ต้องจัดการ route และ headers ด้วยตัวเอง
- Express: ใช้ `express()` มี routing และ middleware พร้อมใช้งานง่าย

## 2. การจัดการ Routes
- HTTP: ต้องเช็ค `req.url` และ `req.method` ด้วย regex/logic ของเรา
- Express: ใช้ `app.get('/path', callback)` ทำให้โค้ดอ่านง่ายกว่า

## 3. Middleware
- HTTP: ไม่มี concept ของ middleware ต้องเขียนเอง
- Express: รองรับ middleware เช่น `app.use(express.json())`, logger, CORS

## 4. Response
- HTTP: ต้อง set header และ write/end ด้วยตัวเอง
- Express: มี `res.json()` และ `res.status()` สะดวกกว่า

## 5. ข้อดี/ข้อเสีย
| Feature | HTTP | Express |
|---------|------|---------|
| เรียบง่าย | ✅ | ✅ |
| Routing | ❌ ต้องเขียนเอง | ✅ ง่ายและชัดเจน |
| Middleware | ❌ | ✅ รองรับ |
| การจัดการ errors | ❌ ต้องเขียนเอง | ✅ มี built-in |
| การ maintain | ❌ ซับซ้อน | ✅ ง่ายต่อการขยาย |

## 6. สรุป
Express เหมาะสำหรับโปรเจคจริงและใหญ่ เพราะมี middleware, routing, error handling ครบ  
HTTP module เหมาะสำหรับโปรเจคเล็กหรือศึกษาแนวคิด server เบื้องต้น
