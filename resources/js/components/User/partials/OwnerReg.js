import React, { useState, useEffect } from "react";
import "../user.css";
import { uploadMarker } from "../../../Redux/features/marker/markerSlice";
import RestaurantForm from "./RestaurantForm";
import { useDispatch } from "react-redux";
import { getCategories } from "../../../Redux/features/restaurant/categorySlice";

const OwnerReg = ({ location, userRestaurant }) => {
    const dispatch = useDispatch();

    const [popUp, setpopUp] = useState({
        open: false,
        message:
            "We would like to use your current position as the location of your property. This will enable us recommend your property to customers nearby",
        action: "see More",
        accepted: false
    });

    useEffect(() => {
        location && !popUp.accepted ? setpopUp({ ...popUp, open: true }) : "";
        if (popUp.accepted) {
            dispatch(uploadMarker(location));
            setpopUp({
                ...popUp,
                accepted: false
            });
        }
    }, [location, popUp.accepted]);

    useEffect(()=>{
        dispatch(getCategories());
    },[])

    return (
        <React.Fragment>
            {popUp.open ? (
                <div
                    className="show_location_info"
                    onClick={() =>
                        setpopUp({
                            ...popUp,
                            open: false
                        })
                    }
                >
                    <div className="center_content">
                        <div className="location p-2">
                            <b className="small_font">{popUp.message}</b>
                            <br />
                            <div className="d-flex mt-2">
                                <button className="btn btn-danger py-0 mr-2 w-100">
                                    {popUp.action}
                                </button>
                                <button
                                    onClick={() => {
                                        setRestaurant({
                                            ...restaurant,
                                            location
                                        });
                                        setpopUp({
                                            ...popUp,
                                            accepted: true,
                                            open: false
                                        });
                                    }}
                                    className="btn btn-primary py-0 w-100"
                                >
                                    Yeah, Ok.
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
            <div className="container">
                <RestaurantForm userRestaurant={userRestaurant} />
            </div>
        </React.Fragment>
    );
};

export default OwnerReg;
