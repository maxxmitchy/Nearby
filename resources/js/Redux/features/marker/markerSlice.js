import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const markerSlice = createSlice({
    name: "marker",
    initialState: {},
    reducers: {
        FetchStart(state) {
            return { ...state, loading: true };
        },
        FetchSuccess(state, action) {
            return {
                ...state,
                loading: false,
                restaurants: action.payload
            };
        },
        uploadSuccess(state, action) {
            return {
                ...state,
                upload: action.payload,
            };
        },
        FetchFail(state, action) {
            return { ...state, loading: false, errors: action.payload };
        }
    }
});

export const getRestaurants = (lat, log) => {
    return dispatch => {
        dispatch(FetchStart());
        axios
            .post("/api/marker", { lat, log })
            .then(res => {
                dispatch(FetchSuccess(res.data));
            })
            .catch(err => console.log(err));
    };
};

export const uploadMarker = location => {
    return dispatch => {
        dispatch(FetchStart());
        axios
            .post("/api/markerUpload", { ...location })
            .then(res => {
                dispatch(UploadSuccess(res.data));
            })
            .catch(err => console.log(err));
    };
};

export const {
    FetchStart,
    FetchSuccess,
    uploadSuccess,
    FetchFail
} = markerSlice.actions;

export default markerSlice.reducer;
