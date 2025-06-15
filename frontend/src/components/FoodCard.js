import React, { useState, useEffect } from "react";
import "./FoodCard.css";

const FoodCard = ({ image, title, description, price, rating, quantity, onQuantityChange }) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  useEffect(() => {
    setCurrentQuantity(quantity);
  }, [quantity]);

  const incrementQuantity = () => {
    const newQuantity = currentQuantity + 1;
    setCurrentQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const decrementQuantity = () => {
    if (currentQuantity > 0) {
      const newQuantity = currentQuantity - 1;
      setCurrentQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="food-card">
      <img src={image} alt={title} className="food-card__image" />
      <div className="food-card__content">
        <h3 className="food-card__title">{title}</h3>
        <div className="food-card__rating">
          {"⭐".repeat(rating)}{" "}
          <span className="food-card__rating-number">({rating})</span>
        </div>
        <p className="food-card__description">{description}</p>
        <div className="food-card__footer">
          <span className="food-card__price">₹{price}</span>
          <div className="food-card__quantity">
        <button className="quantity__btn" onClick={decrementQuantity}>
          -
        </button>
        <span className="quantity__number">{currentQuantity}</span>
        <button className="quantity__btn" onClick={incrementQuantity}>
          +
        </button>
      </div>
        </div>
      </div>
    </div>
  );
};
export default FoodCard;
