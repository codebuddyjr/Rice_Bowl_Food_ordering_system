import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  const { userDetails } = useUser(); 

  const calculateTotals = useCallback((items) => {
    const subtotalAmount = items.reduce((acc, item) => acc + item.totalPrice, 0);
    const taxAmount = +(subtotalAmount * 0.1).toFixed(2); 
    const totalAmount = +(subtotalAmount + taxAmount).toFixed(2);

    setSubtotal(subtotalAmount);
    setTax(taxAmount);
    setTotal(totalAmount);
  }, []);

  const fetchCartItems = useCallback(async () => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    const cartArray = [];

    for (const title in savedCartItems) {
      if (savedCartItems[title] > 0) {
        try {
          const response = await axios.get(`http://localhost:5000/menu`);
          const item = response.data.find((menuItem) => menuItem.title === title);
          const quantity = savedCartItems[title];

          if (item) {
            cartArray.push({
              ...item,
              quantity,
              totalPrice: +(item.price * quantity).toFixed(2), 
            });
          }
        } catch (error) {
          console.error("Error fetching menu item:", error);
        }
      }
    }

    setCartItems(cartArray);
    calculateTotals(cartArray);
  }, [calculateTotals]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const removeItemFromCart = (title) => {
    const updatedCartItems = cartItems.filter((item) => item.title !== title);
    setCartItems(updatedCartItems);

    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    delete savedCartItems[title];
    localStorage.setItem("cartItems", JSON.stringify(savedCartItems));

    calculateTotals(updatedCartItems);

    axios
      .delete("http://localhost:5000/cart", { data: { title } })
      .catch((error) => console.error("Error removing item from cart:", error));
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!userDetails) {
      alert("You need to sign in before placing an order.");
      navigate("/signin");
      return;
    }

    const orderData = {
      customerName: userDetails.name,
      customerEmail: userDetails.email,
      items: cartItems.map((item) => ({
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      })),
      subtotal,
      tax,
      total,
    };

    try {
      const response = await axios.post("http://localhost:5000/checkout", orderData);
      alert("Order placed successfully!");
      console.log("Response:", response.data);

      localStorage.removeItem("cartItems");
      setCartItems([]);
      setSubtotal(0);
      setTax(0);
      setTotal(0);
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Failed to place the order.");
    }
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <table className="cart__table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>₹{item.price}</td>
              <td>{item.quantity}</td>
              <td>₹{item.totalPrice.toFixed(2)}</td>
              <td>
                <button
                  className="remove__btn"
                  onClick={() => removeItemFromCart(item.title)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart__totals">
        <h2>Cart Totals</h2>
        <div className="totals__row">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="totals__row">
          <span>Tax (10%)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="totals__row totals__row--total">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <button className="checkout__btn" onClick={handleCheckout}>
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
