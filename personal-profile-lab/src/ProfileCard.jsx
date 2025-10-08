import React, { useState } from 'react';
import './ProfileCard.css';

function ProfileCard({ profile }) {
    // ฟังก์ชันสร้างอักษรย่อจากชื่อ
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();
    };

    // 🎯 Challenge 2 + 3 States
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [viewCount, setViewCount] = useState(0);
    const [favoriteHobbies, setFavoriteHobbies] = useState([]);
    const [showContactForm, setShowContactForm] = useState(false);

    // ✅ Toggle Theme
    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    // ✅ Click Card → เพิ่ม View
    const handleCardClick = () => setViewCount(prev => prev + 1);

    // ✅ Toggle Favorite Hobby
    const toggleFavoriteHobby = (hobby) => {
        setFavoriteHobbies(prev =>
            prev.includes(hobby)
                ? prev.filter(h => h !== hobby)
                : [...prev, hobby]
        );
    };

    // ✅ แสดงฟอร์มติดต่อ
    const handleContactClick = () => setShowContactForm(true);

    return (
        <div
            className={`profile-card ${isDarkMode ? 'dark' : ''}`}
            onClick={handleCardClick}
        >
            {/* ปุ่มสลับโหมด */}
            <button
                className="theme-toggle"
                onClick={(e) => {
                    e.stopPropagation();
                    toggleTheme();
                }}
            >
                {isDarkMode ? '☀️' : '🌙'}
            </button>

            {/* View Counter */}
            <div className="view-counter">👁️ Views: {viewCount}</div>

            {/* Header */}
            <div className="profile-header">
                <div className="profile-avatar">{getInitials(profile.name)}</div>
                <h1 className="profile-name">{profile.name}</h1>
                <div className="student-id">{profile.studentId}</div>
            </div>

            {/* ข้อมูลพื้นฐาน */}
            <div className="profile-info">
                <div className="info-item">
                    <div className="info-label">สาขา</div>
                    <div className="info-value">{profile.major}</div>
                </div>
                <div className="info-item">
                    <div className="info-label">ชั้นปี</div>
                    <div className="info-value">{profile.year}</div>
                </div>
                <div className="info-item">
                    <div className="info-label">อายุ</div>
                    <div className="info-value">{profile.age} ปี</div>
                </div>
                <div className="info-item">
                    <div className="info-label">เกรดเฉลี่ย</div>
                    <div className="info-value">
                        {profile.gpa.toFixed(2)}
                        {profile.gpa >= 3.5 && ' 🌟'}
                    </div>
                </div>
            </div>

            {/* Badges */}
            <div className="profile-section">
                <h3>🏆 Achievements</h3>
                <div className="achievements">
                    {profile.gpa >= 3.5 && (
                        <span className="achievement-badge">🌟 เกียรตินิยม</span>
                    )}
                    {profile.skills.length >= 5 && (
                        <span className="achievement-badge">💪 Multi-skilled</span>
                    )}
                    {favoriteHobbies.length >= 3 && (
                        <span className="achievement-badge">❤️ Passionate Learner</span>
                    )}
                </div>
            </div>

            {/* งานอดิเรก */}
            <div className="profile-section">
                <h3>🎯 งานอดิเรก</h3>
                <ul className="hobbies-list">
                    {profile.hobbies.map((hobby, index) => (
                        <li
                            key={index}
                            className={`hobby-item ${favoriteHobbies.includes(hobby) ? 'favorite' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleFavoriteHobby(hobby);
                            }}
                        >
                            {hobby} {favoriteHobbies.includes(hobby) && '💖'}
                        </li>
                    ))}
                </ul>
            </div>

            {/* ทักษะ */}
            <div className="profile-section">
                <h3>💻 ทักษะ</h3>
                <div className="skills">
                    {profile.skills.map((skill, index) => (
                        <div key={index} className="skill-tag">
                            {skill}
                        </div>
                    ))}
                </div>
            </div>

            {/* ลิงก์โซเชียล */}
            {profile.social && (
                <div className="profile-section">
                    <h3>🌐 Social Media</h3>
                    <div className="social-links">
                        {Object.entries(profile.social).map(([key, url], index) => (
                            <a
                                key={index}
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                className="social-link"
                            >
                                {key === 'facebook' && '📘'}
                                {key === 'github' && '🐙'}
                                {key === 'instagram' && '📸'}
                                {key === 'linkedin' && '💼'}
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* Contact Section */}
            {showContactForm ? (
                <div className="contact-form">
                    <h3>📩 ติดต่อ {profile.name}</h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            alert('ส่งข้อความเรียบร้อย!');
                        }}
                    >
                        <input type="text" placeholder="ชื่อของคุณ" required />
                        <input type="email" placeholder="อีเมลของคุณ" required />
                        <textarea placeholder="พิมพ์ข้อความ..." required />
                        <button type="submit">ส่งข้อความ</button>
                    </form>
                </div>
            ) : (
                <button
                    className="contact-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleContactClick();
                    }}
                >
                    📧 ติดต่อ {profile.name}
                </button>
            )}
        </div>
    );
}

export default ProfileCard;
