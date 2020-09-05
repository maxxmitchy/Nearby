import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getRestaurants } from "../marker/markerSlice";

const restaurantSlice = createSlice({
    name: "restaurant",
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
        FetchRestaurantSuccess(state, action) {
            const { hasRestaurant, userRestaurant } = action.payload;

            return {
                ...state,
                loading: false,
                hasRestaurant,
                userRestaurant
            };
        },
        GetRestaurantSuccess(state, action) {
            return {
                ...state,
                loading: false,
                targetRestaurant: action.payload
            };
        },
        FetchFail(state, action) {
            return { ...state, loading: false, errors: action.payload };
        }
    }
});

export const uploadRestaurants = restaurant => {
    return dispatch => {
        dispatch(FetchStart());
        axios
            .post("/api/restaurant", { ...restaurant })
            .then(res => {
                dispatch(FetchSuccess(res.data));
            })
            .catch(err => console.log(err));
    };
};

export const updateRestaurants = (id, restaurant) => {
    return dispatch => {
        dispatch(FetchStart());
        axios
            .post("/api/userrestaurant/" + id, restaurant, {
                _method: "patch",
                headers: {
                    "content-type": "multipart/form-data"
                }
            })
            .then(res => {
                dispatch(UpdateSuccess(res.data));
            })
            .catch(err => console.log(err));
    };
};

export const getRestaurant = id => {
    return dispatch => {
        dispatch(FetchStart());
        axios
            .get("/api/restaurant/" + id)
            .then(res => {
                dispatch(GetRestaurantSuccess(res.data));
            })
            .catch(err => console.log(err));
    };
};

export const getUserRestaurant = restaurant => {
    return dispatch => {
        dispatch(FetchStart());
        axios
            .get("/api/userrestaurant")
            .then(res => {
                dispatch(FetchRestaurantSuccess(res.data));
            })
            .catch(err => console.log(err));
    };
};

export const {
    FetchStart,
    FetchRestaurantSuccess,
    GetRestaurantSuccess,
    FetchSuccess,
    FetchFail
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
