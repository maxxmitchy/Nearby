import React, { useState, useEffect } from "react";
import {
    uploadRestaurants,
    updateRestaurants
} from "../../../Redux/features/restaurant/restaurantSlice";
import { useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";

const RestaurantForm = ({ userRestaurant }) => {
    let initialState = {
        name: "",
        address: "",
        bank: "",
        account_number: "",
        account_name: "",
        description: "",
        min: "",
        max: ""
    };

    const [restaurant, setRestaurant] = useState(
        userRestaurant ? userRestaurant[0] : initialState
    );

    const [photo, setPhoto] = useState(false);

    const dispatch = useDispatch();

    const handleChange = e => {
        let value = e.target.value;
        e.target.type === "file"
            ? setRestaurant({
                  ...restaurant,
                  [e.target.name]: e.target.files[0]
              })
            : setRestaurant({
                  ...restaurant,
                  [e.target.name]: value
              });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const data = new FormData();
        data.append("image", restaurant.image);
        data.append("name", restaurant.name);
        data.append("address", restaurant.address);
        data.append("bank", restaurant.bank);
        data.append("account_number", restaurant.account_number);
        data.append("account_name", restaurant.account_name);
        data.append("description", restaurant.description);
        data.append("min", restaurant.min);
        data.append("max", restaurant.max);
        userRestaurant
            ? dispatch(updateRestaurants(restaurant.id, data))
            : dispatch(uploadRestaurants(restaurant));
    };

    return (
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center">
                <div
                    style={{ padding: "2.2rem" }}
                    className="rounded-circle bg-white mb-3 position-relative"
                >
                    <div
                        className="position-absolute px-1 bg-danger text-white"
                        style={{
                            bottom: "5px",
                            right: "-.2rem",
                            borderRadius: "50%"
                        }}
                    >
                        <FaPlus onClick={() => setPhoto(!photo)} />
                    </div>
                </div>
            </div>
            {photo && (
                <div className="form-group h6">
                    <div className="field">
                        <input
                            type="file"
                            id=""
                            onChange={handleChange}
                            name="image"
                            className="text-secondary"
                            style={{
                                display: "block",
                                width: "100%",
                                height: "calc(1.6em + 0.75rem + 2px)",
                                fontSize: "0.9rem"
                            }}
                        />
                    </div>
                </div>
            )}
            <div className="form-group h6">
                <div className="field">
                    <label>Name</label>
                    <input
                        required
                        type="text"
                        id="name"
                        onChange={handleChange}
                        name="name"
                        className="form-control border-0"
                        value={restaurant.name}
                    />
                </div>
            </div>
            <div className="form-group h6">
                <div className="field">
                    <label>Address</label>
                    <input
                        required
                        type="text"
                        id="address"
                        onChange={handleChange}
                        name="address"
                        className="form-control border-0"
                        value={restaurant.address}
                    />
                </div>
            </div>

            <div className="form-group h6">
                <div className="field">
                    <label>Bank</label>
                    <select
                        name="bank"
                        className="form-control bg-white border-0"
                        onChange={handleChange}
                        value={restaurant.bank}
                    >
                        <option>Select a bank</option>
                        <option value="1">GTB</option>
                    </select>
                </div>
            </div>
            <div className="form-group h6">
                <div className="field">
                    <label>Account Number</label>
                    <input
                        required
                        type="number"
                        id="account_number"
                        onChange={handleChange}
                        name="account_number"
                        className="form-control border-0"
                        value={restaurant.account_number}
                    />
                </div>
            </div>
            <div className="form-group h6">
                <div className="field">
                    <label>Account Name</label>
                    <input
                        required
                        type="text"
                        id="account_name"
                        onChange={handleChange}
                        name="account_name"
                        className="form-control border-0"
                        value={restaurant.account_name}
                    />
                </div>
                <br />
                <div className="d-flex justify-content-between">
                    <div className="form-group h6 mr-1">
                        <div className="field">
                            <label>Min</label>
                            <input
                                required
                                type="number"
                                id="min"
                                onChange={handleChange}
                                name="min"
                                className="form-control border-0"
                                value={restaurant.min}
                            />
                        </div>
                    </div>
                    <div className="form-group h6">
                        <div className="field">
                            <label>Max</label>
                            <input
                                required
                                type="number"
                                id="max"
                                onChange={handleChange}
                                name="max"
                                className="form-control border-0"
                                value={restaurant.max}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group h6  text-secondary">
                    <div className="field">
                        <label>Description</label>
                        <textarea
                            style={{ resize: "none" }}
                            name="description"
                            wrap="hard"
                            id="description"
                            spellCheck="true"
                            rows="4"
                            maxLength="300"
                            className="form-control border-0"
                            onChange={handleChange}
                            value={restaurant.description}
                        ></textarea>
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-block button_primary mb-3 mr-3 px-4"
                >
                    Continue
                </button>
            </div>
            <br />
            <br />
        </form>
    );
};

export default RestaurantForm;
