import React, { useState, useEffect } from "react";
import TextInput from "../Common/Forms/TextInput";
import { useDispatch } from "react-redux";
import { BsArrowLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const ForgotPassword = () => {
    const [forgot, setForgot] = useState({ email: "" });

    const [started, setStarted] = useState(false);

    let dispatch = useDispatch();

    useEffect(() => {
        // if (errors) {
        //     setStarted(!started);
        // }
    }, []);

    const handleChange = e => {
        const value = e.target.value;
        setForgot({
            ...forgot,
            [e.target.name]: value
        });
    };
    return (
        <div className="container bg_milky mt-0">
            <div className="row pt-3 px-2">
                <div className="col-md-6 offset-md-3">
                    <NavLink to="/login">
                        <BsArrowLeft className="text-dark mb-3 h4" />
                    </NavLink>
                    <h5 className="font-weight-bolder text-center mb-3">
                        Forgot Password?
                    </h5>
                    <p className="text-center text-secondary">
                        Please enter your email to receive the instructions to
                        reset your password
                    </p>
                    <TextInput
                        type="email"
                        id="email"
                        label="Email Address"
                        name="email"
                        onChange={handleChange}
                        value={forgot.email}
                        autoComplete="email"
                    />
                    <button
                        type="submit"
                        disabled={started}
                        className="btn btn-block button_primary mb-3 mr-3 px-4"
                    >
                        Send now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
