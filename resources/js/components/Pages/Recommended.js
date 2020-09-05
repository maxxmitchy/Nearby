import React from "react";
import SearchField from "./common/SearchField";
import MainRecommended from "./common/MainRecommended";
import Navbar from "../Navbar/Navbar";

const Recommended = () => {
    return (
        <React.Fragment>
            <div className="container mt-3">
                <SearchField />
                <MainRecommended />
            </div>
            <Navbar/>
        </React.Fragment>
    );
};

export default Recommended;
