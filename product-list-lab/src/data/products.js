// src/data/products.js
export const categories = [
    { id: 'all', name: 'ทั้งหมด' },
    { id: 'electronics', name: 'อิเล็กทรอนิกส์' },
    { id: 'clothing', name: 'เสื้อผ้า' },
    { id: 'books', name: 'หนังสือ' }
];

export const products = [
    {
        id: 1,
        name: 'iPhone 15 Pro',
        category: 'electronics',
        price: 45900,
        originalPrice: 49900,
        discount: 8, // %
        image: 'https://placehold.co/300x300/007bff/ffffff?text=iPhone+15',
        description: 'สมาร์ทโฟนล่าสุดจาก Apple',
        inStock: true,
        rating: 4.8
    },
    {
        id: 2,
        name: 'เสื้อยืดผ้าฝ้าย',
        category: 'clothing',
        price: 299,
        originalPrice: 399,
        discount: 25,
        image: 'https://placehold.co/300x300/ffc107/000000?text=T-Shirt',
        description: 'เสื้อยืดผ้าฝ้าย 100% นุ่มสบาย',
        inStock: true,
        rating: 4.2
    },
    {
        id: 3,
        name: 'หนังสือ React.js Guide',
        category: 'books',
        price: 650,
        originalPrice: 650,
        discount: 0,
        image: 'https://placehold.co/300x300/17a2b8/ffffff?text=React+Book',
        description: 'คู่มือเรียนรู้ React.js ฉบับสมบูรณ์',
        inStock: false,
        rating: 4.7
    },
    // สินค้าใหม่
    {
        id: 4,
        name: 'MacBook Air M2',
        category: 'electronics',
        price: 41900,
        originalPrice: 45900,
        discount: 9,
        image: 'https://placehold.co/300x300/6f42c1/ffffff?text=MacBook+Air',
        description: 'โน้ตบุ๊คบางเบา, ประสิทธิภาพสูง',
        inStock: true,
        rating: 4.9
    },
    {
        id: 5,
        name: 'กางเกงยีนส์',
        category: 'clothing',
        price: 1200,
        originalPrice: 1500,
        discount: 20,
        image: 'https://placehold.co/300x300/343a40/ffffff?text=Jeans',
        description: 'กางเกงยีนส์สไตล์คลาสสิค',
        inStock: true,
        rating: 4.5
    },
    {
        id: 6,
        name: 'หนังสือ JavaScript Mastery',
        category: 'books',
        price: 800,
        originalPrice: 1000,
        discount: 20,
        image: 'https://placehold.co/300x300/28a745/ffffff?text=JS+Book',
        description: 'เรียนรู้ JavaScript ขั้นเทพ',
        inStock: true,
        rating: 4.6
    }
];
