const http = require('http');
const url = require('url');

const PORT = 3000;

// ข้อมูลนักศึกษา
const students = [
    { id: 1, name: 'Woravit', major: 'Computer Science', year: 3 },
    { id: 2, name: 'Siri', major: 'Engineering', year: 2 },
    { id: 3, name: 'Nat', major: 'Business', year: 4 }
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // GET /
    if (method === 'GET' && pathname === '/') {
        res.end(JSON.stringify({
            message: '🌐 Welcome to HTTP Student Server!',
            endpoints: [
                'GET /students',
                'GET /students/:id',
                'GET /students/major/:major'
            ]
        }));
        return;
    }

    // GET /students
    if (method === 'GET' && pathname === '/students') {
        res.end(JSON.stringify(students));
        return;
    }

    // GET /students/:id
    if (method === 'GET' && /^\/students\/\d+$/.test(pathname)) {
        const id = Number(pathname.split('/')[2]);
        const student = students.find(s => s.id === id);
        if (!student) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Student not found' }));
            return;
        }
        res.end(JSON.stringify(student));
        return;
    }

    // GET /students/major/:major
    if (method === 'GET' && /^\/students\/major\/[^\/]+$/.test(pathname)) {
        const major = decodeURIComponent(pathname.split('/')[3]);
        const filtered = students.filter(s => s.major === major);
        res.end(JSON.stringify(filtered));
        return;
    }

    // 404 Not Found
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

server.listen(PORT, () => {
    console.log(`🌐 HTTP Server running on http://localhost:${PORT}`);
});
