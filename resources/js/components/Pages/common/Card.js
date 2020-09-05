import React from "react";
import { BsDot, BsStarFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import "../pages.css";
import { NavLink } from "react-router-dom";

const Card = ({ restaurants, scroll }) => {
    return (
        <div className={"card border-0 mt-2 " + scroll ? scroll : ""}>
            {restaurants?.map((restaurant, i) => {
                let { id, image, name, categories, min, max } = restaurant[i];
                return (
                    <React.Fragment key={id}>
                        <div>
                            <NavLink to={"/restaurant/" + id}>
                                <img
                                    id=""
                                    src={"/storage/" + image}
                                    alt="image"
                                    className="card-img-top"
                                />
                            </NavLink>
                        </div>
                        <div className="py-2">
                            <div className="d-flex justify-content-between">
                                <h6 className="font-weight-bolder mb-0">
                                    {name}
                                </h6>
                                <h6 className="font-weight-bolder mb-0">
                                    ${min} - ${max}
                                </h6>
                            </div>
                            <div className="d-flex">
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
                            </div>
                            <div className="d-flex justify-content-between py-0">
                                <div className="d-flex">
                                    <small>
                                        <BsStarFill className="text-danger mr-2" />
                                    </small>
                                    <b className="mr-2">4.9</b>
                                    <b className="text-secondary">(210)</b>
                                </div>
                                <AiOutlineHeart />
                            </div>
                        </div>
                        <br />
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Card;
