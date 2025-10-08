import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import "./ProductList.css";

function ProductList({ products, categories, onAddToCart, onViewDetails }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  const filteredProducts = useMemo(() => {
    let result = products;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    if (sortBy === "name") result = [...result].sort((a,b) => a.name.localeCompare(b.name));
    else if (sortBy === "priceAsc") result = [...result].sort((a,b) => a.price - b.price);
    else if (sortBy === "priceDesc") result = [...result].sort((a,b) => b.price - a.price);
    else if (sortBy === "rating") result = [...result].sort((a,b) => b.rating - a.rating);

    return result;
  }, [products, searchQuery, sortBy]);

  return (
    <div className="product-list-container">
      <h1 className="header">สินค้าทั้งหมด</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="🔍 ค้นหาสินค้า..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">เรียงลำดับ</option>
          <option value="name">ชื่อ (A-Z)</option>
          <option value="priceAsc">ราคาต่ำ → สูง</option>
          <option value="priceDesc">ราคาสูง → ต่ำ</option>
          <option value="rating">คะแนนสูง → ต่ำ</option>
        </select>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired
};

export default ProductList;
