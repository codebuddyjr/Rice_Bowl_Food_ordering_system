import React from "react";
import { Link } from 'react-router-dom';
import "./Footer.css";


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__section">
                    <h2 className="footer__title">RICE BOWL</h2>
                    <ul className="footer__links">
                        <Link to="/home"><li>HOME</li></Link>
                        <Link to="/menu"><li>MENU</li></Link>
                        <Link to="/cart"><li>CART</li></Link>
                        <Link to="/contact"><li>CONTACT US</li></Link>
                    </ul>
                </div>


                <div className="footer__section footer__details">
                    <p>Electronic City, Bangalore - 560100</p>
                    <p>ricebowl@info.com</p>
                    <p>+91 9123456789</p>
                </div>
            </div>

            <div className="footer__bottom">
                <p>Copyright © 2024 RICE BOWL. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
