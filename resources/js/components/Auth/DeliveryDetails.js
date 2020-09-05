import React, { useState, useEffect } from "react";
import TextInput from "../Common/Forms/TextInput";
import { useDispatch } from "react-redux";
import { BsArrowLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { FiClock } from "react-icons/fi";
import { TiLocationArrowOutline } from "react-icons/ti";
import "./Auth.css";

const DeliveryDetails = () => {
    const [delivery, setDelivery] = useState({
        delivery: ""
    });

    const [started, setStarted] = useState(false);

    const [search, setSearch] = useState(false);

    let dispatch = useDispatch();

    useEffect(() => {
        // if (errors) {
        //     setStarted(!started);
        // }
    }, []);

    const handleChange = e => {
        const value = e.target.value;
        setDelivery({
            ...delivery,
            [e.target.name]: value
        });
    };

    const handleSubmit = () => {
        //
    };
    return (
        <div className="container bg_milky mt-0">
            <div className="row pt-3 px-2">
                <div className="col-md-6 offset-md-3">
                    <NavLink to="/createprofile">
                        <BsArrowLeft className="text-dark mb-3 h4" />
                    </NavLink>
                    <h5 className="font-weight-bolder text-center mb-3">
                        Delivery Details
                    </h5>
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            type="text"
                            id="delivery"
                            name="delivery"
                            placeholder="Enter an address"
                            onChange={handleChange}
                            value={delivery.address}
                        />
                        <div className="d-flex justify-content-center pb-0">
                            <TiLocationArrowOutline className="text-danger h2 mr-1" />
                            <p
                                onClick={() => setSearch(!search)}
                                className="mt-1"
                            >
                                Use current location
                            </p>
                        </div>
                        {search ? (
                            <div className="d-flex justify-content-between rounded bg-white px-3 pt-3 pb-0">
                                <FiClock className="mt-2 text-danger" />
                                <div className="">
                                    <h6 className="mb-0 font-weight-bold">
                                        Unit 10,2F,123 York Street
                                    </h6>
                                    <p className="text-secondary">
                                        Sydney NSW 2000
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    name="mark"
                                    className="mark mt-2"
                                    defaultChecked
                                />
                            </div>
                        ) : (
                            ""
                        )}
                    </form>
                    <button
                        type="submit"
                        disabled={started}
                        className="btn btn-block button_primary mt-3 mr-3 px-4"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeliveryDetails;
