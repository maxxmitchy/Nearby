import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
    name: "auth",
    initialState: { isVerified: "", token: null },
    reducers: {
        authStart(state) {
            return { ...state, loading: true };
        },
        authSuccess(state, action) {
            return {
                ...state,
                loading: false,
                token: action.payload,
                user: ""
            };
        },
        authFail(state, action) {
            return { ...state, loading: false, errors: action.payload };
        },
        logout(state) {
            return {
                ...state,
                token: null,
                error: null,
                loading: false,
                isVerified: null
            };
        },
        registerSuccess(state) {
            return { ...state, loading: false };
        },
        registerFail(state, action) {
            return { ...state, loading: false, errors: action.payload };
        },
        verify(state, action) {
            const { verified, user, role } = action.payload;
            return {
                ...state,
                loading: false,
                isVerified: verified,
                user: user,
                role
            };
        },
        updatePassword(state, action) {
            return { ...state, loading: false, update: action.payload };
        },
        updateUserDetails(state, action) {
            return { ...state, loading: false, update: action.payload };
        }
    }
});

export const userLogin = login => {
    return dispatch => {
        dispatch(authStart());
        axios.get("/sanctum/csrf-cookie").then(response => {
            axios
                .post("/api/login", { ...login })
                .then(res => {
                    localStorage.setItem(
                        "token",
                        res.config.headers["X-XSRF-TOKEN"]
                    );
                    dispatch(authSuccess(res.config.headers["X-XSRF-TOKEN"]));
                })
                .catch(errors => {
                    dispatch(authFail(errors.response.data));
                });
        });
    };
};

export const userRegister = data => {
    return dispatch => {
        dispatch(authStart());
        axios.get("/sanctum/csrf-cookie").then(response => {
            axios
                .post("/api/register", data, {
                    headers: {
                        "content-type": "multipart/form-data"
                    }
                })
                .then(res => {
                    dispatch(registerSuccess());
                    location.href = "/verifyEmail";
                })
                .catch(errors => {
                    dispatch(registerFail(errors.response.data.errors));
                });
        });
    };
};

export const userLogout = () => {
    return dispatch => {
        dispatch(authStart());
        axios.get("/sanctum/csrf-cookie").then(response => {
            axios
                .post("/api/logout")
                .then(res => {
                    localStorage.removeItem("token");
                    dispatch(logout(res.data));
                    location.href = "/login";
                })
                .catch(errors => {
                    dispatch(authFail(errors.response));
                });
        });
    };
};

export const verified = () => {
    return dispatch => {
        axios.get("/api/email/verify").then(res => {
            dispatch(verify(res.data));
        });
    };
};

export const passwordUpdate = (password, userId) => {
    return dispatch => {
        dispatch(authStart());
        axios
            .post("/api/password/" + userId, { ...password, _method: "patch" })
            .then(res => {
                dispatch(updatePassword(res.data.update));
            });
    };
};

export const userDetailsUpdate = (details, userId) => {
    return dispatch => {
        dispatch(authStart());
        axios
            .post("/api/user/" + userId, { ...details, _method: "patch" })
            .then(res => {
                dispatch(updateUserDetails(res.data.update));
            });
    };
};

export const {
    authStart,
    authSuccess,
    authFail,
    logout,
    registerSuccess,
    registerFail,
    verify,
    updatePassword,
    updateUserDetails
} = authSlice.actions;

export default authSlice.reducer;
