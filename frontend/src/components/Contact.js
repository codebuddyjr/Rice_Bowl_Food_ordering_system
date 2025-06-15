import React from 'react';
import './Contact.css';
import restaurant from "./images/restaurant.jpg";

const Contact = () => {
    return (
        <div className="contact-us-container">
            <header className="contact-us-header">
                <h1>Contact Us</h1>
            </header>
            <section className="contact-us-content">
                <div className="contact-us-image">
                    <img src={restaurant} alt="About Us" />
                </div>
                <div className="contact-us-text">
                    <h2>Who We Are</h2>
                    <p>
                        At <strong>Rice Bowl</strong>, we are passionate about providing delicious, fresh, and healthy meals to food lovers everywhere. 
                        Our goal is to create memorable dining experiences by serving the highest quality dishes made with love and care.
                    </p>
                    <h2>Our Mission</h2>
                    <p>
                        We strive to bring communities together through food, offering a wide variety of dishes that cater to diverse tastes and preferences.
                        Whether you're looking for comfort food or trying something new, we have something for everyone.
                    </p>
                    <h2>Contact Information</h2>
                    <p><strong>Email:</strong> support@ricebowl.com</p>
                    <p><strong>Phone:</strong> +91 9123456789</p>
                    <p><strong>Address:</strong> Electronic City, Bengaluru - 560100</p>
                </div>
            </section>
        </div>
    );
};

export default Contact;
