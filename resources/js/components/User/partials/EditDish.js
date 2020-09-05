import React, { useState } from "react";
import { BsDot } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import "../user.css";
import { FaTimes, FaRegTrashAlt, FaPlus } from "react-icons/fa";
import { BsPencil, BsEyeSlash, BsEye } from "react-icons/bs";
import {
    deleteIngredient,
    uploadIngredients,
    updateIngredient
} from "../../../Redux/features/restaurant/ingredientsSlice";
import { useDispatch } from "react-redux";
import { formatter } from "../../Common/Constants";
import { v4 as uuidv4 } from "uuid";
import { deleteTargetDish } from "../../../Redux/features/restaurant/dishSlice";
import IngredientField from "../common/IngredientField";

const EditDish = ({ dish }) => {
    let dispatch = useDispatch();

    const [modal, setModal] = useState({ addOn: false, addIngre: false });

    const [targetDish, settargetDish] = useState(dish);

    let { id, name, price, image, quantity, ingredients, addons } = targetDish;

    const [ingredientUpdate, setIngredientUpdate] = useState({
        id,
        name: "",
        quantity: ""
    });

    const [inputList, setInputList] = useState([{ id, name: "", price: "" }]);

    const handleIngredient = e => {
        let action = e.target.id.split(" ");
        if (
            action[0] === "delete" &&
            confirm("Do you want to delete this ingredient?")
        ) {
            dispatch(deleteIngredient(action[1]));
            const ingredientsLeft = targetDish.ingredients.filter(
                item => item.id !== +action[1]
            );
            settargetDish({ ...targetDish, ingredients: ingredientsLeft });
        } else if (action[0] === "edit") {
            const ingredientToUpdate = targetDish.ingredients.find(
                item => item.id === +action[1]
            );
            const { id, name, quantity } = ingredientToUpdate;
            setIngredientUpdate({
                ...ingredientUpdate,
                ingre_id: id,
                name,
                quantity
            });
        }
    };

    const handleUpdateIngredient = e => {
        let value = e.target.value;
        setIngredientUpdate({
            ...ingredientUpdate,
            [e.target.name]: value
        });
    };

    const handleAddIngredientSubmit = e => {
        e.preventDefault();
        dispatch(uploadIngredients(ingredientUpdate));
        const newIngredient = [
            ...targetDish.ingredients,
            { ...ingredientUpdate, id: uuidv4() }
        ];
        settargetDish({ ...targetDish, ingredients: newIngredient });
        setIngredientUpdate({ id, ingre_id: "", name: "", quantity: "" });
    };

    const handleEditIngredientSubmit = e => {
        e.preventDefault();
        let value = e.target.value;
        setIngredientUpdate({
            ...ingredientUpdate,
            [e.target.name]: value
        });
        dispatch(updateIngredient(ingredientUpdate));
    };

    const handleDishActions = e => {
        if (e.target.id === "delete" && confirm("Do you want to delete?")) {
            dispatch(deleteTargetDish(id));
        } else if (e.target.id === "edit") {
            console.log("edit");
        }
    };

    return (
        <div className="mt-3">
            {modal.addOn && (
                <React.Fragment>
                    <FaTimes
                        style={{
                            zIndex: "99999",
                            position: "fixed",
                            top: "32px",
                            right: "2rem",
                            background: "#fff",
                            borderRadius: "50%",
                            padding: ".3rem",
                            fontSize: "1.4rem"
                        }}
                        onClick={() =>
                            setModal({ ...modal, addOn: !modal.addOn })
                        }
                    />
                    <IngredientField
                        fields={{ id, name: "", price: "" }}
                        header="Enter AddOn for Dish"
                        placeholder={{
                            name: "Enter name",
                            price: "Enter price"
                        }}
                        action="addOn"
                    />
                </React.Fragment>
            )}
            <div className="d-flex justify-content-between p-2">
                <div className="">
                    <FaRegTrashAlt
                        id="delete"
                        onClick={handleDishActions}
                        className="text-danger dish_actions"
                        style={{ fontWeight: "900" }}
                    />
                    {/*<p className="text-secondary small-font mb-0 pb-0">
                        delete
                    </p>*/}
                </div>
                <div className="">
                    <BsPencil
                        id="edit"
                        onClick={handleDishActions}
                        className="text-primary dish_actions"
                        style={{ fontWeight: "900" }}
                    />
                    {/*<p className="text-secondary small-font mb-0 pb-0">edit</p>*/}
                </div>
                <div className="">
                    <BsEyeSlash
                        id="status"
                        onClick={handleDishActions}
                        className="dish_actions"
                        style={{ fontWeight: "900" }}
                    />
                    {/*<p<p className="text-secondary small-font mb-0 pb-0">
                        status
                    </p>*/}
                </div>
            </div>
            <hr />
            <h5 className="font-weight-bold" style={{ color:"#df5050"}}>{name}</h5>
            <br />
            <div className="d-flex justify-content-between mb-3">
                <h6 className="">Price</h6>
                <h6 className="font-weight-bolder text-secondary">{formatter.format(price)}</h6>
            </div>
            <div className="d-flex justify-content-between mb-3">
                <h6 className="">Quantity Remaining</h6>
                <h6 className="font-weight-bolder text-secondary">{quantity}</h6>
            </div>
            <div className="d-flex justify-content-between mt-2">
                <h6 className="mr-3">Image</h6>
                <img
                    src={"/storage/" + image}
                    style={{ height: "100px", width: "100px" }}
                    className="img-fluid"
                    alt=""
                />
            </div>
            <hr />
            <div className="d-flex">
                <h6 className="font-weight-bolder mr-4 mt-1">
                    All Ingredients
                    {!modal.addIngre ? (
                        <button
                            onClick={() =>
                                setModal({
                                    ...modal,
                                    addIngre: !modal.addIngre
                                })
                            }
                            className="ml-4 btn btn-outline-primary py-0"
                        >
                            Add More
                        </button>
                    ) : (
                        <FaTimes
                            onClick={() =>
                                setModal({
                                    ...modal,
                                    addIngre: !modal.addIngre
                                })
                            }
                            className="text-danger ml-5 pl-3 h3"
                            style={{marginTop:".3rem"}}
                        />
                    )}
                </h6>
            </div>
            {modal.addIngre && (
                <form onSubmit={handleAddIngredientSubmit}>
                    <input
                        required
                        type="text"
                        name="name"
                        onChange={handleUpdateIngredient}
                        className="mb-1 border-0 mb-2 rounded"
                        value={ingredientUpdate.name}
                    />
                    <input
                        required
                        type="number"
                        name="quantity"
                        onChange={handleUpdateIngredient}
                        className="mb-1 border-0 mb-2 rounded"
                        value={ingredientUpdate.quantity}
                    />
                    <br />
                    <button
                        className="btn btn-success rounded py-0"
                        style={{ borderRadius: "4px" }}
                    >
                        Add Ingr.
                    </button>
                    <hr />
                </form>
            )}
            {ingredients.length > 0 ? (
                ingredients.map(ingredient => {
                    let { id, name, quantity } = ingredient;
                    return (
                        <div
                            className="d-flex justify-content-between"
                            key={id}
                        >
                            <div className="">
                                <p>
                                    <BsDot /> {name}
                                    <b className="font-weight-bolder text-secondary ml-2">
                                        {quantity}g
                                    </b>
                                </p>
                                {ingredientUpdate.ingre_id === id && (
                                    <form onSubmit={handleEditIngredientSubmit}>
                                        <input
                                            type="hidden"
                                            name="ingre_id"
                                            value={id}
                                        />
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            onChange={handleUpdateIngredient}
                                            className="border-secondary pl-2 mb-1 border-0 mb-2 rounded"
                                            value={ingredientUpdate.name}
                                        />
                                        <input
                                            required
                                            type="number"
                                            name="quantity"
                                            onChange={handleUpdateIngredient}
                                            className="pl-2 mb-1 border-0 mb-2 rounded"
                                            value={ingredientUpdate.quantity}
                                        />
                                        <br />
                                        <button
                                            className="btn btn-success rounded py-0"
                                            style={{ borderRadius: "4px" }}
                                        >
                                            Save
                                        </button>

                                        <hr />
                                    </form>
                                )}
                            </div>
                            {!("" + id).match(
                                /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
                            ) && (
                                <div className="d-flex justify-content-between">
                                    <FaRegTrashAlt
                                        id={"delete " + id}
                                        onClick={handleIngredient}
                                        className="mr-2 text-danger"
                                    />
                                    {ingredientUpdate.ingre_id === id ? <FaTimes
                                        className="text-danger ml-3"
                                        onClick={() =>
                                            setIngredientUpdate({
                                                id: "",
                                                name: "",
                                                quantity: ""
                                            })
                                        }
                                    /> : <BsPencil
                                            id={"edit " + id}
                                            onClick={handleIngredient}
                                            className="ml-2 text-primary"
                                        />}

                                </div>
                            )}
                        </div>
                    );
                })
            ) : (
                <div className="">
                    <p>No ingredients found ... </p>
                    <p>
                        Add Ingredients to show your customers how beautiful
                        your combinations can be.
                    </p>
                </div>
            )}

            <hr />
            <h6 className="font-weight-bolder">
                Add on (Extra items for this dish)
            </h6>
            {addons.length > 0
                ? addons.map(addon => {
                      const { id, name, price } = addon;
                      return (
                          <div className="text-uppercase" key={id}>
                              <BsDot /> {name} &nbsp;&nbsp;&nbsp;{" "}
                              <b className="small_font">
                                  {formatter.format(price)}
                              </b>
                          </div>
                      );
                  })
                : "nothing ..."}
            <br />
            <button
                onClick={() => setModal({ ...modal, addOn: !modal.addOn })}
                className="btn btn-outline-primary py-0"
            >
                Add More
            </button>
            <hr />
            <br />
        </div>
    );
};
export default EditDish;
