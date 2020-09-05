import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { FaPlus, FaTimes } from "react-icons/fa";
import OwnerReg from "./OwnerReg";
import { getUserRestaurant } from "../../../Redux/features/restaurant/restaurantSlice";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = ({ user, userRestaurant }) => {

    const { hasRestaurant } = useSelector(({ restaurant }) => restaurant);

    const dispatch = useDispatch();

    let { first_name, last_name, phone, address, email } = user;

    const [modal, setModal] = useState(false);

    const [location, setLocation] = useState("");

    useEffect(() => {
        if ("geolocation" in navigator) {
            if (navigator.geolocation && modal) {
                navigator.geolocation.watchPosition(function(position) {
                    setLocation({
                        lat: position.coords.latitude,
                        log: position.coords.longitude
                    });
                });
            }
        } else {
            console.log("Not Available");
        }
        // dispatch(getUserRestaurant());
    }, [modal]);

    return (
        <React.Fragment>
            {modal ? (
                <div
                    className="position-absolute container pt-3"
                    style={{
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "#f8f9fa",
                        overflowY: "scroll"
                    }}
                >
                    <div className="d-flex">
                        <FaTimes
                            className="mt-1"
                            onClick={() => setModal(!modal)}
                        />
                        <div className="w-100">
                            <h5 className="text-center">
                                Set Up Your Restaurant
                            </h5>
                        </div>
                    </div>
                    <br />
                    <OwnerReg userRestaurant={userRestaurant} location={location} />
                </div>
            ) : (
                ""
            )}
            <h6 className="text-secondary mt-2">current balance</h6>
            <b className="h4">N120.56</b>
            <hr />
            <div className="d-flex justify-content-between">
                <h6 className="text-secondary">Name</h6>
                <h6 className="">
                    {first_name} {last_name}
                </h6>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
                <h6 className="text-secondary">Email</h6>
                <h6 className="">{email}</h6>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
                <h6 className="text-secondary">Phone</h6>
                <h6 className="">{phone}</h6>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
                <h6 className="text-secondary mr-3">Address</h6>
                <h6 className="">{address}</h6>
            </div>
            <hr />
        {hasRestaurant ? (
                <h6 className="text-center">
                    your restaurant is under review. You will receive a email
                    soon
                </h6>
            ) : (
                <div className="d-flex flex-column">
                    <div className="d-flex justify-content-center">
                        <a onClick={() => setModal(!modal)}>
                            <FiShoppingCart className="h1 text-danger" />{" "}
                            <FaPlus className="text-danger" />
                        </a>
                    </div>
                    <small className="text-center">
                        Click the icon above to register as an owner
                    </small>
                </div>
            )}
        </React.Fragment>
    );
};

export default UserProfile;
