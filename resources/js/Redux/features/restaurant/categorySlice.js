import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const categorySlice = createSlice({
    name: "category",
    initialState: {},
    reducers: {
        FetchStart(state) {
            return { ...state, loading: true };
        },
        FetchSuccess(state, action) {
            return {
                ...state,
                loading: false,
                categories: action.payload
            };
        },
        FetchFail(state, action) {
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        }
    }
});

export const getCategories = () => {
    return dispatch => {
        dispatch(FetchStart());
        axios
            .get("/api/category")
            .then(res => {
                dispatch(FetchSuccess(res.data));
            })
            .catch(err => console.log(err));
    };
};


export const {
    FetchStart,
    FetchSuccess,
    FetchFail
} = categorySlice.actions;

export default categorySlice.reducer;


