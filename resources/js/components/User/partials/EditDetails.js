import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { AiOutlineReload } from "react-icons/ai";
import TextInput from "../../Common/Forms/TextInput";
import SelectInput from "../../Common/Forms/SelectInput";
import { useSelector, useDispatch } from "react-redux";
import RestaurantForm from "./RestaurantForm";

const EditDetails = ({ userRestaurant }) => {
    const [started, setStarted] = useState(false);

    return (
        <div className="container">
            <RestaurantForm userRestaurant={userRestaurant} />
        </div>
    );
};

export default EditDetails;
