const express = require('express');
const app = express();
const PORT = 3001;

// ข้อมูลนักศึกษา
const students = [
    { id: 1, name: 'Woravit', major: 'Computer Science', year: 3 },
    { id: 2, name: 'Siri', major: 'Engineering', year: 2 },
    { id: 3, name: 'Nat', major: 'Business', year: 4 }
];

// Middleware
app.use(express.json());

// GET /
app.get('/', (req, res) => {
    res.json({
        message: '🌐 Welcome to Express Student Server!',
        endpoints: [
            'GET /students',
            'GET /students/:id',
            'GET /students/major/:major',
            'GET /stats'
        ]
    });
});

// GET /students
app.get('/students', (req, res) => {
    res.json(students);
});

// GET /students/:id
app.get('/students/:id', (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
});

// GET /students/major/:major
app.get('/students/major/:major', (req, res) => {
    const major = req.params.major;
    const filtered = students.filter(s => s.major === major);
    res.json(filtered);
});

// GET /stats
app.get('/stats', (req, res) => {
    const total = students.length;
    const majors = students.reduce((acc, s) => {
        acc[s.major] = (acc[s.major] || 0) + 1;
        return acc;
    }, {});
    res.json({ total, majors });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
    console.log(`🚀 Express Server running on http://localhost:${PORT}`);
});
