import React from "react";
import { userLogout } from "../../../Redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

const Settings = () => {
    let dispatch = useDispatch();
    return (
        <div className="">
            <div className="">Seetings</div>
            <a onClick={() => dispatch(userLogout())} className="">
                logout
            </a>
        </div>
    );
};

export default Settings;
