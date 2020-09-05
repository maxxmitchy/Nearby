import React, { useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import "../pages.css";
import { formatter } from "../../Common/Constants";
import { useDispatch, useSelector } from "react-redux";
import { getTargetAddOn } from "../../../Redux/features/restaurant/addOnSlice";

const AddToCartModal = ({ dish }) => {
    let { id, name, image, price, description } = dish;

    let dispatch = useDispatch();

    let { dishAddOn, loading } = useSelector(({ addOn }) => addOn);

    console.log(dishAddOn);

    useEffect(() => {
        dispatch(getTargetAddOn(id));
    }, [dish]);

    return (
        <div className="shadow modal_info bg-white" key={id}>
            <img
                src={"/storage/" + image}
                className="img-fluid top-img"
                alt=""
            />
            <div className="container mt-2">
                <div className="d-flex justify-content-between">
                    <h5 className="text-danger">{name}</h5>
                    <h6 className="mt-1">{formatter.format(price)}</h6>
                </div>
                <p className="text-secondary small_font">{description}</p>
                <h6 className="font-weight-bold">Add on</h6>
                <div className="cuisines mb-3">
                    {!loading
                        ? dishAddOn?.map(addOn => {
                              let { id, name, price } = addOn;
                              return (
                                  <a key={id} className="text-center cuisine_item p-1 small_font">
                                      {name}
                                  </a>
                              );
                          })
                        : "loading...."}
                </div>
                <h6 className="font-weight-bold">Special Instructions</h6>
                <input
                    type="text"
                    placeholder="Add a note (extra sauce, no onion)"
                    className="special_instruction"
                />
                <div className="d-flex justify-content-center mt-3">
                    <FaMinus className="bg-light p-1 h5 rounded-circle" />
                    <div className="h5 w-25 text-center">4</div>
                    <FaPlus className="bg-secondary text-white p-1 h5 rounded-circle" />
                </div>
                <div className="button_primary  mb-3">
                    Add to cart {formatter.format(price)}
                </div>
            </div>
        </div>
    );
};

export default AddToCartModal;
