import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { FaAngleRight } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import Profile from "./Profile";
import "./user.css";
import Settings from "./partials/Settings";
import Payments from "./partials/Payments";
import OrderHistory from "./partials/OrderHistory";
import DeliveryAddress from "./partials/DeliveryAddress";
import Support from "./partials/Support";
import AboutUs from "./partials/AboutUs";
import { useSelector } from "react-redux";

const Dashboard = () => {
    let { user } = useSelector(({ auth }) => auth);

    const [modal, setModal] = useState(false);
    const links = [
        { id: 1, name: "Profile", link: "/profile" },
        { id: 2, name: "Payments", link: "/payments" },
        { id: 3, name: "Order History", link: "/order-history" },
        { id: 4, name: "Delivery Address", link: "/deliveryaddress" },
        { id: 5, name: "Settings", link: "/settings" },
        { id: 6, name: "About Us", link: "/aboutus" },
        { id: 7, name: "Support Center", link: "/supportcenter" }
    ];

    let component, component_title;

    switch (location.pathname) {
        case "/dashboard":
            modal ? setModal(false) : "";
            break;
        case "/profile":
            modal ? "" : setModal(true);
            component = <Profile />;
            component_title = "Profile Details";
            break;
        case "/payments":
            modal ? "" : setModal(true);
            component = <Payments />;
            component_title = "Payments Details";
            break;
        case "/order-history":
            modal ? "" : setModal(true);
            component = <OrderHistory />;
            component_title = "Order History";
            break;
        case "/deliveryaddress":
            modal ? "" : setModal(true);
            component = <DeliveryAddress />;
            component_title = "Delivery Address";
            break;
        case "/settings":
            modal ? "" : setModal(true);
            component = <Settings />;
            component_title = "Settings";
            break;
        case "/aboutus":
            modal ? "" : setModal(true);
            component = <AboutUs />;
            component_title = "About Us";
            break;
        case "/supportcenter":
            modal ? "" : setModal(true);
            component = <Support />;
            component_title = "Support Center";
            break;
    }
    return (
        <React.Fragment>
            {modal ? (
                <div className="dash_modal">
                    <div className="container mt-3">
                        <div className="d-flex">
                            <NavLink
                                to="/dashboard"
                                className=" h5 text-dark font-weight-bolder"
                            >
                                <BsArrowLeft onClick={() => setModal(!modal)} />
                            </NavLink>
                            <div className="w-100 mt-1">
                                <h6 className="text-center font-weight-bold">
                                    {component_title}
                                </h6>
                            </div>
                        </div>
                        {component}
                    </div>
                </div>
            ) : (
                ""
            )}
            <div className="container-fluid" style={{ height: "100vh" }}>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="d-flex py-4">
                            <img
                                src="/Img/nearby1.jpg"
                                className="img-fluid"
                                alt=""
                                style={{
                                    width: "70px",
                                    height: "70px",
                                    borderRadius: "50%"
                                }}
                            />
                            <div
                                className="ml-2 d-flex flex-column"
                                style={{ marginTop: ".73rem" }}
                            >
                                <h5 className="mb-0">{user.first_name} {user.last_name}</h5>
                                <p className="mt-0 text-secondary">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                        <hr />
                        <div className="mt-3">
                            {links.map(specific => {
                                return (
                                    <React.Fragment key={specific.id}>
                                        <NavLink
                                            onClick={() => setModal(!modal)}
                                            className="text-dark d-flex justify-content-between"
                                            to={specific.link}
                                        >
                                            <h6 className="font-weight-bold">
                                                {specific.name}
                                            </h6>
                                            <FaAngleRight />
                                        </NavLink>
                                        <hr className="mt-2" />
                                    </React.Fragment>
                                );
                            })}
                        </div>
                        <br />
                    </div>
                </div>
            </div>
            <Navbar />
        </React.Fragment>
    );
};

export default Dashboard;
