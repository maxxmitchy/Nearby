import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const dishSlice = createSlice({
    name: "dish",
    initialState: {},
    reducers: {
        FetchStart(state) {
            return { ...state, loading: true };
        },
        FetchSuccess(state, action) {
            return {
                ...state,
                loading: false,
                ownerDishes: action.payload
            };
        },
        FetchFail(state, action) {
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        },
        uploadSuccess(state, action) {
            return {
                ...state,
                loading: false,
                upload: action.payload
            };
        },
        uploadFail(state, action) {
            return {
                ...state,
                loading: false,
                uploadError: action.payload
            };
        },
        FetchTargetSuccess(state, action) {
            return {
                ...state,
                loading: false,
                targetDish: action.payload
            };
        }
    }
});

export const uploadDishes = dish => {
    return dispatch => {
        dispatch(FetchStart());
        axios
            .post("/api/dish", dish, {
                headers: {
                    "content-type": "multipart/form-data"
                }
            })
            .then(res => {
                dispatch(uploadSuccess(res.data));
            })
            .catch(error => {
                dispatch(uploadFail(error.response.data.errors));
            });
    };
};

export const getDishes = () => {
    return dispatch => {
        dispatch(FetchStart());
        axios
            .get("/api/dish")
            .then(res => {
                dispatch(FetchSuccess(res.data));
            })
            .catch(err => console.log(err));
    };
};

export const getTargetDish = id => {
    return dispatch => {
        dispatch(FetchStart());
        axios
            .get("/api/dish/" + id)
            .then(res => {
                dispatch(FetchTargetSuccess(res.data));
            })
            .catch(err => dispatch(FetchFail(err.data)));
    };
};

export const deleteTargetDish = id => {
    return dispatch => {
        dispatch(FetchStart());
        axios
            .delete("api/dish/" + id)
            .then(res => {
                location.href = "/profile";
            })
            .catch(error => console.log(error));
    };
};
export const {
    FetchStart,
    FetchSuccess,
    FetchFail,
    uploadSuccess,
    uploadFail,
    FetchTargetSuccess
} = dishSlice.actions;

export default dishSlice.reducer;
