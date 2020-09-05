import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { verified, userLogout } from "../../Redux/features/auth/authSlice";

const ProtectedRoutes = ({ component: Component, agent, ...rest }) => {
    let { isVerified, role, user } = useSelector(({ auth }) => auth);

    let dispatch = useDispatch();

    useEffect(() => {
        if (isVerified === "") {
            dispatch(verified());
        }
    }, []);

    if (user === null && localStorage.getItem("token")) {
        localStorage.removeItem("token");
        dispatch(userLogout());
    }

    if (agent !== undefined) {
        if (role !== undefined && role !== "Owner") {
            return <Redirect to="/agentRegisterPage" />;
        }
    }

    return (
        <Route
            {...rest}
            render={props => {
                if (
                    !isVerified &&
                    (!localStorage.getItem("token") ||
                        !localStorage.getItem("token").length === 244)
                ) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }

                if (isVerified !== "") {
                    switch (isVerified) {
                        case true:
                            return <Component {...props} />;
                        case false:
                            return <Redirect to="/verifyEmail" />;
                        default:
                            dispatch(userLogout());
                            break;
                    }
                }
            }}
        />
    );
};

export default ProtectedRoutes;
