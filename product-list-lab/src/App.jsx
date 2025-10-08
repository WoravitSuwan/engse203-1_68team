import React, { useState } from "react";
import ProductList from "./components/ProductList";
import { products, categories } from "./data/products";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`เพิ่ม ${product.name} ในตะกร้าแล้ว!`);
  };

  const handleViewDetails = (product) => {
    alert(`ดูรายละเอียด: ${product.name}\nราคา: ฿${product.price.toLocaleString()}\nคำอธิบาย: ${product.description}`);
  };

  return (
    <div className="app">
      <div className="cart-counter">
        🛒 ตะกร้า: {cart.length} ชิ้น
      </div>

      <ProductList 
        products={products}
        categories={categories}
        onAddToCart={handleAddToCart}
        onViewDetails={handleViewDetails}
      />
    </div>
  );
}

export default App;
