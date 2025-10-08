import React from 'react';
import ProfileCard from './ProfileCard';
import './ProfileCard.css';

function App() {
    const profile = {
        name: "Woravit Suwan",
        studentId: "67543210064-1",
        major: "วิศวกรรมซอฟต์แวร์",
        year: 2,
        age: 21,
        gpa: 3.5,
        email: "woravit.suwan@student.university.ac.th",
        hobbies: ["เขียนโค้ด", "ดูหนัง", "เล่นเกม", "ฟังเพลง", "อ่านหนังสือ"],
        skills: ["JavaScript", "React.js", "HTML", "CSS", "Node.js", "Python"],
        social: {
            github: "https://github.com/WoravitSuwan",
            linkedin: "https://linkedin.com/in/woravit",
        },
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(45deg, #f0f2f5 0%, #e8eaf6 100%)',
            padding: '20px'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1>🎓 React Profile Card</h1>
                <p>Challenge 2 & 3 - Theme Toggle + Badges + Interactive Features</p>
            </div>
            <ProfileCard profile={profile} />
        </div>
    );
}

export default App;
