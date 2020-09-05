import React from "react";
import Card from "../Pages/common/Card";
import "../Pages/pages.css";
import RowCard from "./common/RowCard";

const SearchResult = () => {
    return (
        <React.Fragment>
            <div className="d-flex justify-content-between mb-1">
                <h6 className="text-danger font-weight-bolder">Restaurants nearby</h6>
                <small className="text-secondary font-weight-bolder">Show all</small>
            </div>
            <div className="img-scroll">
                <Card scroll={"img-item mr-4"} />
                <Card scroll={"img-item mr-4"} />
            </div>
            <hr/>
            <div className="d-flex justify-content-between mb-1">
                <h6 className="text-danger font-weight-bolder">Popular Restaurants</h6>
                <small className="text-secondary font-weight-bolder">Show all</small>
            </div>
            <RowCard/>
        </React.Fragment>
    );
};

export default SearchResult;
