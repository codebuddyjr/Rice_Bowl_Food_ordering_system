import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "./UserContext";
import "./SignUp.css";

const Signup = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState(""); 

    const { setEmail: setUserEmail, setAddress: setUserAddress } = useUser(); 

    const handle = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/Signup', {
                name,
                phone,
                email,
                password,
                address,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            // Check for success status and proceed
            if (response.status === 409) {
                alert(response.data.message);  // Now using the message from response
            } else if (response.status === 201) {
                props.setIsAuthenticated(true);
                setUserEmail(email);
                setUserAddress(address);
                navigate("/home");
                resetForm();
            }
        } catch (error) {
            console.error("Error:", error);
            
            if (error.response) {
                console.error("Error details:", error.response.data); // Log the error message from the server
                if (error.response.status === 500) {
                    alert("Server error, please try again later.");
                } else {
                    alert(error.response.data.message || "An error occurred during signup.");  // Show the server message
                }
            } else {
                alert("User Added Successfully. Login to start");
            }
            resetForm();
        }
    };
    
    const resetForm = () => {
        setName("");
        setPhone("");
        setEmail("");
        setPassword("");
        setAddress("");
    };

    return (
        <div className="signup-container">
            <div className="signup-modal">
                <div id="create-part">
                    <h1>Create Account</h1>
                    <div id="take">
                        <form onSubmit={handle} className="signup-form">
                            <input 
                                type="text" 
                                placeholder="Name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required
                            />
                            <input 
                                type="tel" 
                                placeholder="Phone" 
                                value={phone} 
                                required
                                onChange={(e) => setPhone(e.target.value)} 
                            />
                            <input 
                                type="email" 
                                placeholder="Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required
                            />
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={password} 
                                required
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                            <input 
                                type="text"
                                placeholder="Address" 
                                value={address} 
                                required 
                                onChange={(e) => setAddress(e.target.value)} 
                            />
                            <button id="btn-create" type="submit">SIGN UP</button>
                        </form>
                    </div>
                    <p className="signup-text">
                        Already have an account? 
                        <a href="/">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
