import React, { useState } from "react";
import "../pages.css";
import { TiTimes } from "react-icons/ti";
import AddToCartModal from "./AddToCartModal";
import { formatter } from "../../Common/Constants";

const RestaurantItem = ({ dishes }) => {

    const [modal, setModal] = useState(false);

    const [dish, setDish] = useState("");

    const handleClick = id => {
        setDish(dishes.find(dish => dish.id === id));
        setModal(!modal);
    };

    return (
        <React.Fragment>
            {modal ? (
                <div className="backdrop">
                    <TiTimes
                        className="close"
                        onClick={() => setModal(!modal)}
                    />
                    <AddToCartModal dish={dish} />
                </div>
            ) : (
                ""
            )}

            <div className="img-scroll">
                {dishes?.map(dish => {
                    let { id, image, name, price } = dish;
                    return (
                        <div
                            className="res-item"
                            key={id}
                            onClick={() => handleClick(id)}
                        >
                            <img
                                className="img-fluid rounded"
                                src={"/storage/" + image}
                                alt=""
                            />
                            <p className="mb-0">{name.length > 13 ?  name.substring(0,13)+"..." : name}</p>
                            <div className="mt-0 d-flex justify-content-between">
                                <b className="mt-0 text-secondary small_font">
                                    {formatter.format(price)}
                                </b>
                            </div>
                        </div>
                    );
                })}
            </div>
            <hr />
        </React.Fragment>
    );
};

export default React.memo(RestaurantItem);
