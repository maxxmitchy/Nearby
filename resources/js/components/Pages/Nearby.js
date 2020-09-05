import React, { useState, useEffect } from "react";
import Card from "./common/Card";
import { IoIosArrowDown } from "react-icons/io";
import SearchField from "./common/SearchField";
import "./pages.css";
import Navbar from "../Navbar/Navbar";
import { getRestaurants } from "../../Redux/features/marker/markerSlice";
import { useSelector, useDispatch } from "react-redux";

const Nearby = () => {

    let { loading, restaurants } = useSelector(({ nearby }) => nearby);

    const dispatch = useDispatch();
    const foodtypes = [
        { name: "Burger", image: "/Img/FoodTypes/burger.png" },
        { name: "Pizza", image: "/Img/FoodTypes/pizza.jpg" },
        { name: "Chips", image: "/Img/FoodTypes/chips.jpg" },
        { name: "Sushi", image: "/Img/FoodTypes/sushi.png" }
    ];

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                if (!restaurants) {
                    dispatch(
                        getRestaurants(
                            position.coords.latitude,
                            position.coords.longitude
                        )
                    );
                }
                console.log(
                    position.coords.latitude,
                    position.coords.longitude
                );
            });
        }
        console.log("log");
    }, []);

    return (
        <div className="container mb-5">
            <Navbar />
            <h6 className="text-center mt-3">
                Unit 10,2F,123 York Street
                <IoIosArrowDown className="ml-2 text-danger" />
            </h6>
            <SearchField />
            <div className="row">
                <div className="col-md-6 img-scroll">
                    {foodtypes.map(type => {
                        return (
                            <div
                                key={type.name}
                                className="col-2 col-md-4 img-item mr-5"
                                style={{
                                    marginBottom: "-3.5rem",
                                    marginLeft: "-1rem"
                                }}
                            >
                                <img
                                    src={type.image}
                                    alt=""
                                    className="rounded-circle img-fluid"
                                    style={{
                                        maxWidth: "50px",
                                        maxHeight: "50px"
                                    }}
                                />
                                <br />
                                <h6 className="font-weight-bolder text-secondary ml-1 mt-2">
                                    {type.name}
                                </h6>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="row">
                <div className="col-md-3 mb-3">
                    {loading ? (
                        "loading..."
                    ) : !restaurants ? (
                        "No restaurants"
                    ) : (
                        <Card
                            restaurants={restaurants?.markers}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Nearby;
