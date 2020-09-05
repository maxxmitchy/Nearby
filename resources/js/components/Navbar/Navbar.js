import React from "react";
import { FiUser, FiShoppingCart, FiUserPlus } from "react-icons/fi";
import {IoIosLogIn} from 'react-icons/io'
import { AiOutlineTag, AiOutlineSearch, AiOutlineHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";

const Navbar = () => {
    const activeStyle = {
        color: "#d9534f"
    };

    const isAuth = useSelector(({ auth }) => auth.isVerified);

    const token =
        localStorage.getItem("token") &&
        localStorage.getItem("token").length === 244;

    return (
        <nav className="mobile-bottom-nav shadow">
            <div className="mobile-bottom-nav__item">
                <NavLink
                    exact
                    to="/nearby-restaurants"
                    activeStyle={activeStyle}
                    className="nav_color"
                >
                    <div className="mobile-bottom-nav__item-content">
                        <AiOutlineHome className="h4 mb-0" />
                    </div>
                </NavLink>
            </div>
            <div className="mobile-bottom-nav__item">
                <NavLink
                    to="/search-restaurants"
                    activeStyle={activeStyle}
                    className="nav_color"
                >
                    <div className="mobile-bottom-nav__item-content">
                        <AiOutlineSearch className="h4 mb-0" />
                    </div>
                </NavLink>
            </div>
            <div className="mobile-bottom-nav__item mobile-bottom-nav__item--active">
                <NavLink
                    to="/recommended"
                    activeStyle={activeStyle}
                    className="nav_color"
                >
                    <div className="mobile-bottom-nav__item-content">
                        <AiOutlineTag className="h4 mb-0" />
                    </div>
                </NavLink>
            </div>

            {isAuth || token ? (
                <React.Fragment>
                    <div className="mobile-bottom-nav__item">
                        <NavLink
                            to="/cart"
                            activeStyle={activeStyle}
                            className="nav_color"
                        >
                            <div className="mobile-bottom-nav__item-content">
                                <FiShoppingCart className="h4 mb-0" />
                            </div>
                        </NavLink>
                    </div>
                    <div className="mobile-bottom-nav__item">
                        <NavLink
                            to="/dashboard"
                            activeStyle={activeStyle}
                            className="nav_color"
                        >
                            <div className="mobile-bottom-nav__item-content">
                                <FiUser className="h4 mb-0" />
                            </div>
                        </NavLink>
                    </div>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div className="mobile-bottom-nav__item">
                        <NavLink
                            to="/login"
                            activeStyle={activeStyle}
                            className="nav_color"
                        >
                            <div className="mobile-bottom-nav__item-content">
                                <IoIosLogIn className="h4 mb-0" />
                            </div>
                        </NavLink>
                    </div>
                    <div className="mobile-bottom-nav__item">
                        <NavLink
                            to="/register"
                            activeStyle={activeStyle}
                            className="nav_color"
                        >
                            <div className="mobile-bottom-nav__item-content">
                                    <FiUserPlus className="h4 mb-0" />
                            </div>
                        </NavLink>
                    </div>
                </React.Fragment>
            )}
        </nav>
    );
};

export default Navbar;
