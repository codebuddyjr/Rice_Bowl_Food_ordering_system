import React from "react";
import { Link } from 'react-router-dom';
import "./Home.css";
import category1 from './images/category1.jpg';
import category2 from './images/category2.jpg';
import category3 from './images/category3.jpg';


const Home = () => {
    return (
        <div className="home">
            <section class="inro_container">
                <div class="section__container intro__container" id="home">
                    <div class="intro__content" >
                        <h2>FOOD IS GOD <br></br> DON'T WASTE FOOD </h2>
                        <h1>RICE BOWL</h1>
                    </div>
                </div>
            </section>

            <section class="category__container" id="menu">
                <h2 class="section__header">CHOOSE & ENJOY</h2>
                <div class="category__grid">
                    <div class="category__card">
                        <img src={category1} alt="category" />
                        <h4>South Indian</h4>
                        <Link to="/menu"><button class="btn">ORDER NOW</button></Link>
                    </div>
                    <div class="category__card">
                        <img src={category2} alt="category" />
                        <h4>North Indian</h4>
                        <Link to="/menu"><button class="btn">ORDER NOW</button></Link>
                    </div>
                    <div class="category__card">
                        <img src={category3} alt="category" />
                        <h4>Italian</h4>
                        <Link to="/menu"><button class="btn">ORDER NOW</button></Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
