import React from "react";
import "../pages.css";

const RandReviews = () => {
    const links = [
        { name: "All", active: true },
        { name: "Positive", active: false },
        { name: "Critical", active: false },
        { name: "5 stars", active: false },
        { name: "4 stars", active: false }
    ];
    return (
        <div className="">
            <div className="img-scroll mt-2">
                {links.map(link => {
                    return (
                        <div
                            key={link.name}
                            className="review-item mr-2"
                            style={{
                                padding: ".1rem .7rem",
                                background: link.active
                                    ? "#ddd"
                                    : "",
                                border: "1px solid #ddd",
                                borderRadius: "20px"
                            }}
                        >
                            {link.name}
                        </div>
                    );
                })}
            </div>
            <hr />
            <div className="">Rtings and reviews</div>
        </div>
    );
};

export default RandReviews;
