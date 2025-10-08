import React from "react";
import PropTypes from "prop-types";
import "./ProductList.css";

function ProductCard({ product, onAddToCart, onViewDetails }) {
  const { name, description, price, originalPrice, discount, image, inStock, rating } = product;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "☆"}
        {"☆".repeat(emptyStars)} ({rating.toFixed(1)})
      </>
    );
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={name} onError={(e) => e.target.src='https://placehold.co/300x300/cccccc/666666?text=No+Image'} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        <p className="product-rating">{renderStars(rating)}</p>

        <div className="product-price">
          {discount > 0 && <span className="original-price">฿{originalPrice.toLocaleString()}</span>}
          <span className="price">฿{price.toLocaleString()}</span>
          {discount > 0 && <span className="discount"> ลด {discount}%</span>}
        </div>

        <div className="product-actions">
          <button className="btn btn-secondary" onClick={() => onViewDetails(product)}>ดูรายละเอียด</button>
          <button className="btn btn-primary" onClick={() => onAddToCart(product)} disabled={!inStock}>
            {inStock ? "ใส่ตะกร้า" : "หมดสินค้า"}
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    discount: PropTypes.number,
    image: PropTypes.string.isRequired,
    inStock: PropTypes.bool.isRequired,
    rating: PropTypes.number
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired
};

export default ProductCard;
