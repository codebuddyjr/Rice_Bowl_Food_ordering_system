import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext"; 
import "./SignIn.css";

const SignIn = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [info, setInfo] = useState("");
    const navigate = useNavigate();

    const { setUserDetails } = useUser();

    const checkUserData = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/Signup?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
                {
                    method: "GET",
                }
            );

            const result = await response.json();

            if (response.status === 404) {
                setInfo("Username or password is incorrect");
            } else if (response.status === 200) {
                props.setIsAuthenticated(true);
                
                setUserDetails({
                    name: result.user.name,
                    email: result.user.email,
                });

                navigate("/home");
            } else {
                setInfo(result.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setInfo("An error occurred while checking user data");
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setInfo(""); 
        checkUserData(); 
    };

    const handleSignUpRedirect = () => {
        navigate("/signup"); 
    };

    return (
        <div className="signin-container">
            <div className="signin-modal">
                <form onSubmit={handleLogin} className="signin-form">
                    <h2>LOGIN</h2>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="password-field">
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {info && <p className="error-message">{info}</p>}
                    <button type="submit" className="signin-button">
                        LOGIN
                    </button>
                    <p className="signup-text">
                        Don’t have an account?{" "}
                        <a href="/signup" onClick={handleSignUpRedirect}>
                            Sign up
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
