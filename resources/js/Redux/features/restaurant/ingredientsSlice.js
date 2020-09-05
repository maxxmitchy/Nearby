import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState: {},
    reducers: {
        FetchStart(state) {
            return {
                ...state,
                loading: true
            };
        },
        FetchSuccess(state, action) {
            return {
                ...state,
                loading: false,
                upload: action.payload
            };
        },
        FetchFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        },
        UploadSuccess(state, action) {
            return {
                ...state,
                loading: false,
                uploadSuccess: action.payload
            };
        },
        deleteSuccess(state, action) {
            return {
                ...state,
                loading: false,
                deleteSuccess: action.payload
            };
        },
        updateSuccess(state,action){
            return {
                ...state,
                loading:false,
                updateSuccess : action.payload
            }
        }
    }
});

export const uploadIngredients = ingredients => {
    return dispatch => {
        dispatch(FetchStart());
        axios
            .post("api/ingredient", ingredients)
            .then(res => {
                dispatch(UploadSuccess(res.data));
            })
            .catch(error => console.log(error));
    };
};

export const updateIngredient = ingredient => {
    return dispatch => {
        dispatch(FetchStart());
        axios
            .patch("api/ingredient/" + ingredient.ingre_id, { ingredient })
            .then(res => {
                dispatch(deleteSuccess(res.data));
            })
            .catch(error => console.log(error));
    };
};

export const deleteIngredient = ingredient => {
    return dispatch => {
        dispatch(FetchStart());
        axios
            .delete("api/ingredient/" + ingredient)
            .then(res => {
                dispatch(updateSuccess(res.data));
            })
            .catch(error => console.log(error));
    };
};

export const {
    FetchStart,
    FetchSuccess,
    FetchFail,
    UploadSuccess,
    deleteSuccess,
    updateSuccess,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
