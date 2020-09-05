import React, { useState, useEffect } from "react";
import TextInput from "../Common/Forms/TextInput";
import { useSelector, useDispatch } from "react-redux";
import { BsArrowLeft } from "react-icons/bs";
import { NavLink, Redirect } from "react-router-dom";
import { userLogin } from "../../Redux/features/auth/authSlice";
import "./Auth.css";

const Login = () => {
    let dispatch = useDispatch();

    const [login, setLogin] = useState({ email: "", password: "" });

    const [started, setStarted] = useState(false);

    const { errors, loading, isVerified } = useSelector(({ auth }) => auth);

    let redirectTo = location.state && location.state.from.pathname;

    useEffect(() => {
        if (errors) {
            setStarted(!started);
        }
    }, [errors]);

    const handleChange = e => {
        const value = e.target.value;
        setLogin({
            ...login,
            [e.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(userLogin(login));
        setStarted(!started);
    };

    if (
        isVerified ||
        (localStorage.getItem("token") &&
            localStorage.getItem("token").length === 244)
    ) {
        console.log("yes");

        return (
            <Redirect
                to={redirectTo !== undefined ? redirectTo : "/dashboard"}
            />
        );
    }

    return (
        <div className="container bg_milky_login mt-0">
            <div
                className="position-absolute"
                style={{ bottom: "12px", left: "0", right: "0" }}
            >
                <p className=" font-weight-bolder text-center mb-0">
                    <NavLink to="forgotpassword" className="text-danger">
                        forgot Password?
                    </NavLink>
                </p>
                <div className="center_item">
                    <p className="text-center mr-2">Don't have an account?</p>
                    <NavLink
                        className="text-dark font-weight-bolder"
                        to="/register"
                    >
                        Sign Up
                    </NavLink>
                </div>
            </div>
            <div className="row pt-3 px-2">
                <div className="col-md-6 offset-md-3">
                    <NavLink to="/authstart">
                        <BsArrowLeft className="text-dark mb-3 h4" />
                    </NavLink>
                    <h5 className="font-weight-bolder text-center mb-3">
                        Log in
                    </h5>
                    <p className="text-danger errorCss">
                        {errors && (errors?.errors?.email || errors.message)}
                    </p>
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            type="email"
                            id="email"
                            label="Email Address"
                            name="email"
                            onChange={handleChange}
                            value={login.email}
                            autoComplete="email"
                        />
                        <TextInput
                            type="password"
                            id="pass"
                            label="Password"
                            name="password"
                            onChange={handleChange}
                            value={login.password}
                            autoComplete="current-password"
                        />
                        <button
                            type="submit"
                            disabled={started}
                            className="btn btn-block button_primary mb-3 mr-3 px-4"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
