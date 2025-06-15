import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import FoodList from './components/FoodList';
import Cart from './components/Cart';
import Contact from './components/Contact';
import SignUp from "./components/SignUp";
import SignIn from './components/SignIn';
import { UserProvider } from "./components/UserContext";
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/Signup" element={<SignUp />} />
                    <Route
                        path="/home"
                        element={isAuthenticated ? (
                            <>
                                <Header />
                                <Home />
                                <Footer />
                            </>
                        ) : (
                            <Navigate to="/" replace />
                        )}
                    />
                    <Route
                        path="/menu"
                        element={isAuthenticated ? (
                            <>
                                <Header />
                                <FoodList />
                                <Footer />
                            </>
                        ) : (
                            <Navigate to="/" replace />
                        )}
                    />
                    <Route
                        path="/cart"
                        element={isAuthenticated ? (
                            <>
                                <Header />
                                <Cart />
                                <Footer />
                            </>
                        ) : (
                            <Navigate to="/" replace />
                        )}
                    />
                    <Route
                        path="/contact"
                        element={isAuthenticated ? (
                            <>
                                <Header />
                                <Contact />
                                <Footer />
                            </>
                        ) : (
                            <Navigate to="/" replace />
                        )}
                    />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
