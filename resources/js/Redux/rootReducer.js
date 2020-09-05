import { combineReducers } from "redux";
import authReducer from "./features/auth/authSlice";
import resReducer from "./features/marker/markerSlice";
import uploadRestaurantsReducer from "./features/restaurant/restaurantSlice";
import categoriesReducer from "./features/restaurant/categorySlice";
import dishsReducer from "./features/restaurant/dishSlice";
import ingredientsReducer from "./features/restaurant/ingredientsSlice";
import addOnReducer from "./features/restaurant/addOnSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    nearby: resReducer,
    restaurant: uploadRestaurantsReducer,
    categories: categoriesReducer,
    dish: dishsReducer,
    ingredients : ingredientsReducer,
    addOn : addOnReducer,
});

export default rootReducer;
