import React, { useState } from "react";
import SearchField from "./common/SearchField";
import "./pages.css";
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SearchResult from "./SearchResult";

const Search = () => {
    const amenities = [
        { id: 1, name: "Asian", image: "/Img/nearby1.jpg" },
    ];

    let component = (
        <React.Fragment>
            <h6 className="font-weight-bolder">Top Categories</h6>
            <div className="amenities_section">
                {amenities.map(amenity => {
                    const { id, name, image } = amenity;
                    return (
                        <NavLink to="" key={id}>
                            <div className="position-relative">
                                <img
                                    src={image}
                                    className="img-fluid"
                                    style={{
                                        borderRadius: "5px",
                                        height: "100px",
                                        width: "140px"
                                    }}
                                    alt=""
                                />
                                <div className="amenity_details px-3 text-white">
                                    <b style={{ fontSize: ".8rem" }}>{name}</b>
                                </div>
                            </div>
                        </NavLink>
                    );
                })}
            </div>
        </React.Fragment>
    );

    switch (location.pathname) {
        case "/searchresults":
            component = <SearchResult />;
            break;
        default:
            break;
    }

    return (
        <div className="container pt-3">
            <Navbar />
            <SearchField />
            {component}
        </div>
    );
};

export default Search;
