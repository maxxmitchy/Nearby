import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const addOnSlice = createSlice({
    name: "addOn",
    initialState: {},
    reducers: {
        FetchStart(state) {
            return { ...state, loading: true };
        },
        FetchSuccess(state, action) {
            return {
                ...state,
                loading: false,
                addon: action.payload
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
                dishAddOn: action.payload
            };
        }
    }
});

export const uploadAddOn = addOn => {
    return dispatch => {
        dispatch(FetchStart());
        axios
            .post("/api/addon", addOn)
            .then(res => {
                dispatch(uploadSuccess(res.data));
            })
            .catch(error => {
                dispatch(uploadFail(error.response.data.errors));
            });
    };
};

export const getAddOn = () => {
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

export const getTargetAddOn = id => {
    return dispatch => {
        dispatch(FetchStart());
        axios
            .get("/api/addon/" + id)
            .then(res => {
                dispatch(FetchTargetSuccess(res.data));
            })
            .catch(err => dispatch(FetchFail(err.data)));
    };
};

export const {
    FetchStart,
    FetchSuccess,
    FetchFail,
    uploadSuccess,
    uploadFail,
    FetchTargetSuccess
} = addOnSlice.actions;

export default addOnSlice.reducer;
