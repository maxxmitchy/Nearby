import React, { useState, useEffect } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import "../user.css";
import { AiOutlineCamera } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import EditDetails from "./EditDetails";
import EditDish from "./EditDish";
import UploadDish from "./UploadDish";
import { useDispatch, useSelector } from "react-redux";
import { getDishes } from "../../../Redux/features/restaurant/dishSlice";

const OwnerProfile = ({ userRestaurant }) => {
    const [modal, setModal] = useState({ UploadAndEdit: false, update: false });

    const [component, setComponent] = useState({ name: "", component: "" });

    let dispatch = useDispatch();

    let { ownerDishes } = useSelector(({ dish }) => dish);

    useEffect(() => {
        if (!ownerDishes) {
            dispatch(getDishes());
        }
    }, []);

    return (
        <React.Fragment>
            {modal.UploadAndEdit ? (
                <div className="bg-light uploadandedit">
                    <div className="container mt-3 bg-light">
                        <div className="d-flex">
                            <FaTimes
                                className="h6"
                                onClick={() =>
                                    setModal({
                                        ...modal,
                                        UploadAndEdit: !modal.UploadAndEdit
                                    })
                                }
                            />
                            <h6 className="ml-4 font-weight-bold">
                                {component.name}
                            </h6>
                        </div>
                        {component.component}
                    </div>
                </div>
            ) : (
                ""
            )}
            <hr />
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="d-flex mt-3 justify-content-between">
                        <img
                            src="Img/nearby2.jpg"
                            className="img-fluid mr-2 flex-1"
                            style={{ width: "70px", height: "70px" }}
                            alt=""
                        />
                        <div className="d-flex mt-2">
                            <div className="pr-3">
                                <strong>{ownerDishes?.length}</strong>
                                <h6 className="mt-0">Uploads</h6>
                            </div>
                            <div className="pr-3">
                                <strong>0</strong>
                                <h6 className="mt-0">Reports</h6>
                            </div>
                            <div className="pr-3">
                                <strong>34</strong>
                                <h6 className="mt-0"> pending orders</h6>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex position-relative">
                        <div className="w-100 mr-2">
                            <a
                                onClick={() => {
                                    setModal({
                                        ...modal,
                                        UploadAndEdit: !modal.UploadAndEdit
                                    });
                                    setComponent({
                                        name: "Edit Profile",
                                        component: (
                                            <EditDetails
                                                userRestaurant={userRestaurant}
                                            />
                                        )
                                    });
                                }}
                                className="btn btn-block mt-2 btn-light py-0"
                            >
                                Edit Profile
                            </a>
                            <small
                                className="position-absolute"
                                style={{ right: ".1rem", top: "-.2rem" }}
                            >
                                2
                            </small>
                        </div>
                        <AiOutlineBell className="mt-2 h4 text-danger" />
                    </div>
                    <br />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="res_items_container">
                        <a
                            onClick={() => {
                                setModal({
                                    ...modal,
                                    UploadAndEdit: !modal.UploadAndEdit
                                });
                                setComponent({
                                    name:
                                        "Upload Item (Drinks, Whole Food e.t.c)",
                                    component: (
                                        <UploadDish
                                            userRestaurant={userRestaurant}
                                        />
                                    )
                                });
                            }}
                            className="res_item position-relative"
                        >
                            <div className="position-absolute add_item">
                                <AiOutlineCamera className="h1 text-white" />
                            </div>
                        </a>
                        {ownerDishes?.map(dish => {
                            let { id, name, image } = dish;
                            return (
                                <div
                                    onClick={() => {
                                        setModal({
                                            ...modal,
                                            UploadAndEdit: !modal.UploadAndEdit
                                        });
                                        setComponent({
                                            name: "Dish info.",
                                            component: <EditDish dish={dish} />
                                        });
                                    }}
                                    className="res_item mb-4"
                                    key={id}
                                >
                                    <img
                                        src={"/storage/" + image}
                                        className="img-fluid"
                                        alt=""
                                    />

                                    <div className="d-flex justify-content-between">
                                        <h6 className="font-weight-bolder mt-1 text-secondary">
                                            {name.length > 10
                                                ? name.substring(0, 8) + "..."
                                                : name}
                                        </h6>
                                    </div>
                                    <br />
                                    <br />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default OwnerProfile;
