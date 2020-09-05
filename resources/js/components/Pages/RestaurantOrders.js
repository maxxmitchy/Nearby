import React, { useState } from "react";
import "./pages.css";
import RestaurantItem from "./common/RestaurantItem";
import { FaTimes } from "react-icons/fa";
import Order from "../User/Order";

const RestaurantOrder = () => {
    const [orders, setOrders] = useState({ open: false });
    return (
        <React.Fragment>
            {orders.open ? (
                <div className="place_orders">
                    <div className="container mt-3">
                        <div className="d-flex mb-3">
                            <FaTimes
                                onClick={() =>
                                    setOrders({ ...orders, open: !orders.open })
                                }
                            />
                            <div className="w-100">
                                <h6 className="text-center">My Orders</h6>
                            </div>
                        </div>
                        <Order />
                    </div>
                </div>
            ) : (
                ""
            )}
            <div
                className="container"
                style={{ overflowY: "scroll", height: "50vh" }}
            >
                <br />
                <div className="">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex justify-content-start">
                            <p
                                style={{ height: "40px", width: "40px" }}
                                className="pt-2 text-center small_font mt-3 border rounded-circle p-1 mr-2"
                            >
                                1
                            </p>
                            <div className="">
                                <b className="mb-0">BBQ chicken</b>
                                <p className="mb-0 text-secondary small_font">
                                    No cheese
                                </p>
                                <p className="mt-0 text-secondary small_font">
                                    Potato fries($3.90)
                                </p>
                            </div>
                        </div>
                        <b>$29</b>
                    </div>
                    <hr className="mt-0" />
                    <div className="d-flex justify-content-center">
                        <a
                            onClick={() =>
                                setOrders({ ...orders, open: !orders.open })
                            }
                            className="text-white button_primary btn-block"
                        >
                            Place order
                        </a>
                    </div>
                </div>
                <p className="small_font text-secondary mt-2">
                    People who ordered the above items also order
                </p>
                <RestaurantItem />
            </div>
        </React.Fragment>
    );
};

export default RestaurantOrder;
