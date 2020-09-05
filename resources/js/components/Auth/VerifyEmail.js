import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const VerifyEmail = () => {
    return (
        <div className="container bg_milk mt-0 h-100">
            <div className="row pt-3 px-2">
                <div className="col-md-6 offset-md-3">
                    <NavLink to="/register">
                        <BsArrowLeft className="text-dark mb-3 h4" />
                    </NavLink>
                    <h5 className="font-weight-bolder text-center mb-3">
                        Verify your Email
                    </h5>
                    <p className="text-center">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Fugiat, libero. Explicabo ut corporis quo!
                        Excepturi ipsum ab alias tenetur sit accusantium nostrum
                        ullam aperiam.
                    </p>
                    <button
                        type="submit"
                        className="btn btn-block button_primary mb-3 mr-3 px-4"
                    >
                        Next
                    </button>
                </div>
            </div>
            <Navbar/>
        </div>
    );
};

export default VerifyEmail;
