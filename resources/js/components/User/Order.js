import React from "react";
import { FaTimes, FaPlus } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import "../Pages/pages.css";

const Order = () => {
    const handleChange = () => {
        //
    };
    return (
        <form>
            <div className="">
                <div className="d-flex justify-content-between mb-2">
                    <h6 className="small_font">Delivery Address</h6>
                    <NavLink className="small_font text-danger" to="">
                        Change
                    </NavLink>
                </div>
                <h6 className="small_font mb-1 ">
                    Unit 10, 2F, 123 York Street
                </h6>
                <p className="small_font text-secondary mt-0 mb-1">
                    Sydney NSW 2000
                </p>
                <h6 className="small_font">
                    <FiClock className="text-danger" />{" "}
                    <b className="text-secondary ml-2">ASAP</b>
                </h6>
            </div>
            <hr />
            <div className="">
                <div className="d-flex justify-content-between mb-2">
                    <h6 className="small_font">Payment Method</h6>
                    <NavLink className="small_font text-danger" to="">
                        <FaPlus /> Add
                    </NavLink>
                </div>
                <div className="form-group h6">
                    <div className="field">
                        <input
                            required
                            type="text"
                            id=""
                            onChange={handleChange}
                            name=""
                            className="form-control bg-light border-0 "
                            value=""
                            autoComplete=""
                        />
                    </div>
                </div>
                <div className="form-group h6">
                    <div className="field">
                        <input
                            required
                            type="text"
                            id=""
                            onChange={handleChange}
                            name=""
                            className="form-control bg-light border-0 "
                            value=""
                            autoComplete=""
                        />
                    </div>
                </div>
            </div>
            <hr />
            <div className="">
                <div className="d-flex justify-content-between mb-2">
                    <h6 className="small_font">Promo Code</h6>
                    <NavLink className="small_font text-danger" to="">
                        FRIDAY30
                    </NavLink>
                </div>
            </div>
            <hr />
            <div className="">
                <div className="d-flex justify-content-between mb-2">
                    <h6 className="small_font">Subtotal</h6>
                    <b>$50.00</b>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <h6 className="small_font">Delivery Cost</h6>
                    <b>Free</b>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <h6 className="small_font">Discount</h6>
                    <b>-$5.00</b>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-2">
                    <h6 className="small_font">Total</h6>
                    <b className="text-danger">$45.00</b>
                </div>
            </div>
            <div className="w-100">
                <button className="button_primary btn-block">
                    Place Order
                </button>
            </div>
            <br />
        </form>
    );
};

export default Order;
