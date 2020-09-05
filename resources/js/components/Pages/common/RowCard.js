import React from "react";
import { BsDot, BsStarFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const RowCard = () => {
    return (
        <div className="row">
            <div className="col-md-6">
                <div className="d-flex justify-content-between">
                    <img
                        src="Img/Nearby1.jpg"
                        alt=""
                        className="rounded img-fluid mr-2"
                        style={{
                            maxWidth: "70px",
                            maxHeight: "70px"
                        }}
                    />
                    <div className="">
                        <h6 className="font-weight-bolder mb-0">
                            Good Day Cafe
                        </h6>
                        <div className="d-flex">
                            <p className="mb-0">Cafe</p>
                            <BsDot className="text-secondary h4 mb-0" /> Western
                            Food
                        </div>
                        <div className="d-flex">
                            <small>
                                <BsStarFill className="text-danger mr-2" />
                            </small>
                            <b className="mr-2">4.9</b>
                            <b className="text-secondary">(210)</b>
                        </div>
                    </div>
                    <div className="d-flex flex-column justify-content-between">
                        <b>$23</b>
                        <AiOutlineHeart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RowCard;
