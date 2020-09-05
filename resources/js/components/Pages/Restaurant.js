import React, { useState, useEffect } from "react";
import { BsDot, BsStarFill } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { FaTimes } from "react-icons/fa";
import SearchField from "./common/SearchField";
import RestaurantItem from "./common/RestaurantItem";
import MainRecommended from "./common/MainRecommended";
import { NavLink, useParams } from "react-router-dom";
import RestaurantOrders from "./RestaurantOrders";
import "./pages.css";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurant } from "../../Redux/features/restaurant/restaurantSlice";
import Navbar from "../Navbar/Navbar";
import RandReviews from "./partials/RandReviews";

const Restaurant = () => {
    let dispatch = useDispatch();

    let params = useParams();

    let { targetRestaurant } = useSelector(({ restaurant }) => restaurant);

    useEffect(() => {
        if (typeof targetRestaurant === "undefined") {
            dispatch(getRestaurant(params.slug));
        }
    }, [params]);

    let dishes;
    targetRestaurant?.map(restaurant => {
        dishes = restaurant.dishes;
    });

    const [modal, setModal] = useState({
        open: false,
        component: "",
        componentName: ""
    });

    let component = (
        <React.Fragment>
            <div className="container">
                <br />
                <div className="img-scroll">
                    <div className="text-item font-weight-bolder">
                        <b>Menu Items</b>
                    </div>
                    <div
                        onClick={() =>
                            setModal({
                                ...modal,
                                open: true,
                                component: <RandReviews />,
                                componentName: "Ratings and Reviews"
                            })
                        }
                        className="text-item font-weight-bolder text-secondary"
                    >
                        <b>Ratings and Reviews</b>
                    </div>
                    <div className="text-item font-weight-bolder text-secondary">
                        <b>Information</b>
                    </div>
                    <div className="text-item font-weight-bolder text-secondary">
                        <b>Report</b>
                    </div>
                </div>
                <br />
                <SearchField />
                <h6 className="font-weight-bolder">Trending</h6>
                <RestaurantItem dishes={dishes} />
                <h6 className="font-weight-bolder">Main</h6>
                <MainRecommended />
            </div>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            {modal.open ? (
                <div className="modal_cover bg-white container pt-3">
                    <div className="d-flex">
                        <FaTimes
                            className="h6 mt-1"
                            onClick={() =>
                                setModal({
                                    ...modal,
                                    open: false
                                })
                            }
                        />
                        <h5 className="ml-4 font-weight-bolder">
                            {modal.componentName}
                        </h5>
                    </div>
                    {modal.component}
                </div>
            ) : (
                ""
            )}
            <Navbar />
            {targetRestaurant?.map(restaurant => {
                let {
                    id,
                    name,
                    image,
                    address,
                    dishes,
                    categories
                } = restaurant;
                return (
                    <div className="position-relative" key={id}>
                        <img
                            src={"/storage/" + image}
                            className="img-fluid w-100"
                            style={{ height: "40vh" }}
                        />
                        <div className="d-flex justify-content-center w-100">
                            <div
                                className="card shadow border-0 position-absolute"
                                style={{ bottom: "-25%", width: "90vw" }}
                            >
                                <div className="card-body">
                                    <h5 className="text-danger card-title text-center mb-1">
                                        {name}
                                    </h5>
                                    <div className="small_font d-flex justify-content-center">
                                        {categories.map((category, i) => {
                                            return (
                                                <p
                                                    className="mb-0 mr-2"
                                                    key={category.id}
                                                >
                                                    {i !== 0 ? (
                                                        <BsDot className="text-secondary h4 category_list" />
                                                    ) : (
                                                        ""
                                                    )}
                                                    {category.name}
                                                </p>
                                            );
                                        })}
                                        <div className="d-flex">
                                            <small>
                                                <BsStarFill className="text-danger mr-2" />
                                            </small>
                                            <b className="mr-2">4.9</b>
                                            <b className="text-secondary">
                                                (210)
                                            </b>
                                        </div>
                                    </div>
                                    <div className="small_font d-flex justify-content-center">
                                        <GoLocation className="text-danger mr-2 h6 mt-1 mb-0" />
                                        {address}
                                    </div>
                                    <div className="d-flex justify-content-center mt-2">
                                        <button
                                            onClick={() =>
                                                setModal({
                                                    ...modal,
                                                    open: true,
                                                    component: (
                                                        <RestaurantOrders />
                                                    ),
                                                    componentName: "My Orders"
                                                })
                                            }
                                            className="btn_primary py-0"
                                        >
                                            My Orders
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
            <br />
            <br />
            {component}
            <br />
            <br />
            <br />
        </React.Fragment>
    );
};

export default Restaurant;
