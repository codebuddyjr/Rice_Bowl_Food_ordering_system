import React, { useState, useEffect } from "react";
import axios from "axios";
import FoodCard from "./FoodCard";
import "./FoodList.css";

const FoodList = () => {
  const [menuItems, setMenuItems] = useState([]);

  const fetchMenu = async () => {
    const response = await axios.get("http://localhost:5000/menu");
    const savedQuantities = JSON.parse(localStorage.getItem("cartItems")) || {};
    const updatedMenu = response.data.map(item => ({
      title: item.title,
      image: item.image,
      description: item.description,
      price: item.price,
      rating: item.rating,
      quantity: savedQuantities[item.title] || 0,
    }));
    setMenuItems(updatedMenu);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleQuantityChange = async (title, newQuantity) => {
    if (newQuantity < 0) return;
  
    const updatedItems = menuItems.map((item) =>
      item.title === title ? { ...item, quantity: newQuantity } : item
    );
    setMenuItems(updatedItems);
  
    const savedQuantities = JSON.parse(localStorage.getItem("cartItems")) || {};
    if (newQuantity === 0) {
      delete savedQuantities[title]; 
    } else {
      savedQuantities[title] = newQuantity; 
    }
    localStorage.setItem("cartItems", JSON.stringify(savedQuantities));
  
    await axios.post("http://localhost:5000/cart", {
      title,
      price: menuItems.find((item) => item.title === title).price,
      quantity: newQuantity,
    });
  };
  
// FoodList component

return (
  <div className="food-list">
    <h2 className="food-list__header">Menu</h2>
    <div className="food-list__grid">
      {menuItems.map(item => (
        <FoodCard
          key={item.title}
          title={item.title}
          image={item.image}
          description={item.description}
          price={item.price}
          rating={item.rating}
          quantity={item.quantity}
          onQuantityChange={newQuantity => handleQuantityChange(item.title, newQuantity)}
        />
      ))}
    </div>
  </div>
);

};

export default FoodList;
