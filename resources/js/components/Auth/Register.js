import React, { useState, useEffect } from "react";
import TextInput from "../Common/Forms/TextInput";
import { useSelector, useDispatch } from "react-redux";
import { BsArrowLeft } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { userRegister } from "../../Redux/features/auth/authSlice";

const Register = () => {
    const [register, setRegister] = useState({
        first_name: "",
        last_name: "",
        address: "",
        location: "",
        image: "",
        email: "",
        password: "",
        phone: "",
        password_confirmation: ""
    });

    const [photo, setPhoto] = useState(false);

    const errors = useSelector(({ auth }) => auth.errors);

    const [started, setStarted] = useState(false);

    let dispatch = useDispatch();

    useEffect(() => {
        if (errors) {
            setStarted(!started);
        }
    }, [errors]);

    const handleChange = e => {
        const value = e.target.value;
        e.target.type === "file"
            ? setRegister({
                  ...register,
                  [e.target.name]: e.target.files[0]
              })
            : setRegister({
                  ...register,
                  [e.target.name]: value
              });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const data = new FormData();
        data.append("image", register.image);
        data.append("first_name", register.first_name);
        data.append("last_name", register.last_name);
        data.append("phone", register.phone);
        data.append("address", register.address);
        data.append("location", register.location);
        data.append("email", register.email);
        data.append("password", register.password);
        data.append("password_confirmation", register.password_confirmation);
        setStarted(!started);
        dispatch(userRegister(data));
    };

    return (
        <div className="container bg_milky mt-0">
            <div className="row pt-3 px-2">
                <div className="col-md-6 offset-md-3">
                    <NavLink to="/authstart">
                        <BsArrowLeft className="text-dark mb-3 h4" />
                    </NavLink>
                    <h5 className="font-weight-bolder text-center mb-3">
                        Create your account
                    </h5>
                    <form encType="multipart/form-data" onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-center">
                            <div
                                style={{ padding: "2.2rem" }}
                                className="rounded-circle bg-white mb-3 position-relative"
                            >
                                <div
                                    className="position-absolute px-1 bg-danger text-white"
                                    style={{
                                        bottom: "5px",
                                        right: "-.2rem",
                                        borderRadius: "50%"
                                    }}
                                >
                                    <FaPlus onClick={() => setPhoto(!photo)} />
                                </div>
                            </div>
                        </div>
                        {photo ? (
                            <div className="form-group h6">
                                <div className="field">
                                    <input
                                        type="file"
                                        id=""
                                        onChange={handleChange}
                                        name="image"
                                        className="text-secondary"
                                        style={{
                                            display: "block",
                                            width: "100%",
                                            height:
                                                "calc(1.6em + 0.75rem + 2px)",
                                            fontSize: "0.9rem"
                                        }}
                                    />
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        <TextInput
                            type="text"
                            id="first_name"
                            label="First Name"
                            name="first_name"
                            onChange={handleChange}
                            value={register.first_name}
                        />
                        <TextInput
                            type="text"
                            id="last_name"
                            label="Last Name"
                            name="last_name"
                            onChange={handleChange}
                            value={register.last_name}
                        />
                        <TextInput
                            type="email"
                            id="email"
                            label="Email Address"
                            name="email"
                            onChange={handleChange}
                            value={register.email}
                            autoComplete="email"
                        />
                        <p className="text-danger errorCss">
                            {errors && errors.email}
                        </p>
                        <TextInput
                            type="text"
                            id="address"
                            label="Address"
                            name="address"
                            onChange={handleChange}
                            value={register.address}
                        />
                        <TextInput
                            type="number"
                            id="phone"
                            label="phone"
                            name="phone"
                            onChange={handleChange}
                            value={register.phone}
                        />
                        <p className="text-danger errorCss">
                            {errors && errors.phone}
                        </p>

                        <TextInput
                            type="password"
                            id="password"
                            label="Password"
                            name="password"
                            onChange={handleChange}
                            value={register.password}
                            autoComplete="new-password"
                        />
                        <TextInput
                            type="password"
                            id="password_confirm"
                            label="Confirm Password"
                            name="password_confirmation"
                            onChange={handleChange}
                            value={register.password_confirmation}
                            autoComplete="new-password"
                        />
                        <button
                            type="submit"
                            disabled={started}
                            className="btn btn-block button_primary mb-3 mr-3 px-4"
                        >
                            Next
                        </button>
                    </form>
                    <p className="text-center">
                        By signing up you agree to our Terms of Use and Privacy
                        Policy
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
