import React from "react";
import { NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";
import "./HomePage.css";

const AuthStart = () => {
    return (
        <div className="position-relative">
            <div
                className="position-absolute"
                style={{
                    top: "0",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    background: "rgba(0,0,0,.3)"
                }}
            ></div>
            <NavLink
                className="position-absolute px-2 font-weight-bolder text-white rounded"
                style={{
                    top: "1rem",
                    right: "1rem"
                }}
                to="/login"
            >
                Log In
            </NavLink>
            <div
                style={{
                    position: "absolute",
                    top: "10%",
                    right: "0",
                    bottom: "12%",
                    left: "0"
                }}
            >
                <div className="d-flex flex-column justify-content-between h-100">
                    <div className="icon_text">
                        <FiShoppingCart className="font-s20 mb-3 p-2 text-dark bg-white rounded" />
                        <p className="text-center text-white font-weight-bolder">
                            Discover the best foods from over 2,000 restaurants
                        </p>
                    </div>
                    <div className="">
                        <div className="d-flex justify-content-center mb-2">
                            <a
                                href="/AuthStart"
                                className="button_white py-1 w-75"
                            >
                                <FaFacebookF /> Continue with Facebook
                            </a>
                        </div>
                        <div className="d-flex justify-content-center">
                            <NavLink
                                to="/register"
                                className="button_outline_white py-1 w-75"
                            >
                                Sign up with email
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <img
                src="/Img/nearby2.jpg"
                alt=""
                style={{ height: "100vh" }}
                className="img-fluid"
            />
        </div>
    );
};

export default AuthStart;
