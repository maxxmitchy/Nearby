import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "../pages.css";
import AddToCartModal from "./AddToCartModal";

const MainRecommended = () => {
    const [modal, setModal] = useState(false);

    return (
        <React.Fragment>
            {modal ? (
                <div className="backdrop">
                    <FaTimes
                        className="close"
                        onClick={() => setModal(!modal)}
                    />
                    <AddToCartModal />
                </div>
            ) : (
                ""
            )}
            <div className="row">
                <div className="col-md-3 mb-3" onClick={() => setModal(!modal)}>
                    <div className="d-flex justify-content-between">
                        <div className="">
                            <div className="d-flex justify-content-between">
                                <p className="mb-0">Pizza Bread</p>
                                <b className="mb-0">$33</b>
                            </div>
                            <p
                                className="text-secondary my-0"
                                style={{ fontSize: ".8rem" }}
                            >
                                San Marzano cheese, tomatoe, fresh basil and
                                olive oil for the fresh.
                            </p>
                        </div>
                        <img
                            src="/Img/nearby1.jpg"
                            className="img-fluid rounded ml-2"
                            style={{ width: "80px", height: "80px" }}
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default MainRecommended;
