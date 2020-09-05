import React, { useState, useEffect } from "react";
import TextInput from "../../Common/Forms/TextInput";
import { useSelector, useDispatch } from "react-redux";
import { uploadDishes } from "../../../Redux/features/restaurant/dishSlice";
import "../user.css";
import { uploadIngredients } from "../../../Redux/features/restaurant/ingredientsSlice";

const UploadDish = ({ userRestaurant }) => {
    const dispatch = useDispatch();

    let { upload, uploadError } = useSelector(({ dish }) => dish);

    let { uploadSuccess } = useSelector(({ ingredients }) => ingredients);

    const [inputList, setInputList] = useState([{ name: "", quantity: "" }]);

    const [ingredients, setIngredients] = useState({
        open: false
    });

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const handleAddClick = () => {
        setInputList([...inputList, { name: "", quantity: "" }]);
    };

    useEffect(() => {
        if (upload === "success") {
            setIngredients({ open: !ingredients.open });
        }
        if (uploadSuccess === "success") {
            location.href = "/profile";
        }
    }, [upload, uploadSuccess]);

    const [dish, setDish] = useState({
        id: userRestaurant && userRestaurant[0].id,
        name: "",
        image: "",
        quantity: "",
        price: "",
        description: ""
    });

    const handleChange = e => {
        let value = e.target.value;
        e.target.type === "file"
            ? setDish({
                  ...dish,
                  [e.target.name]: e.target.files[0]
              })
            : setDish({
                  ...dish,
                  [e.target.name]: value
              });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const data = new FormData();
        data.append("id", dish.id);
        data.append("image", dish.image);
        data.append("name", dish.name);
        data.append("price", dish.price);
        data.append("quantity", dish.quantity);
        data.append("description", dish.description);
        dispatch(uploadDishes(data));
    };

    const handleIngredientSubmit = e => {
        e.preventDefault();
        dispatch(uploadIngredients(inputList));
    };

    return (
        <React.Fragment>
            {ingredients.open ? (
                <div
                    className="ingredients_modal"
                    // onClick={() => setIngredients(!ingredients)}
                >
                    <div className="container ingredients_container">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleIngredientSubmit}>
                                    <h5 className="mb-4">
                                        Add all Ingredients you used
                                    </h5>
                                    {inputList.map((x, i) => {
                                        return (
                                            <div className="" key={i}>
                                                <div className="form-group h6">
                                                    <div className="field">
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="name"
                                                            required
                                                            placeholder="Enter Ingredient Name"
                                                            value={x.name}
                                                            onChange={e =>
                                                                handleInputChange(
                                                                    e,
                                                                    i
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group h6">
                                                    <div className="field">
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            required
                                                            name="quantity"
                                                            placeholder="Enter Quantity"
                                                            value={x.quantity}
                                                            onChange={e =>
                                                                handleInputChange(
                                                                    e,
                                                                    i
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="btn-box">
                                                    {inputList.length !== 1 && (
                                                        <p
                                                            className="text-danger"
                                                            onClick={() =>
                                                                handleRemoveClick(
                                                                    i
                                                                )
                                                            }
                                                        >
                                                            Remove
                                                        </p>
                                                    )}
                                                    {inputList.length - 1 ===
                                                        i && (
                                                        <p
                                                            className="text-success"
                                                            onClick={
                                                                handleAddClick
                                                            }
                                                        >
                                                            Add More Ingredient
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <button className="btn-block button_primary">
                                        Continue
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
            <div className="container pt-3">
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                    <br />
                    <div className="form-group h6">
                        <div className="field">
                            <input
                                type="file"
                                onChange={handleChange}
                                name="image"
                                className="text-secondary mb-0"
                                style={{
                                    display: "block",
                                    width: "100%",
                                    height: "calc(1.6em + 0.75rem + 2px)",
                                    fontSize: "0.9rem"
                                }}
                            />
                        </div>
                    </div>
                    <p className="text-danger mt-0">
                        {uploadError &&
                            uploadError.image &&
                            uploadError.image[0]}
                    </p>
                    <TextInput
                        type="text"
                        id="name"
                        label="Name"
                        name="name"
                        onChange={handleChange}
                        value={dish.name}
                        placeholder="e.g. Egusi and Semovita"
                    />
                    <TextInput
                        type="number"
                        id="price"
                        label="Price"
                        name="price"
                        onChange={handleChange}
                        value={dish.price}
                    />
                    <TextInput
                        type="number"
                        id="quantity"
                        label="Quantity Available"
                        name="quantity"
                        onChange={handleChange}
                        value={dish.quantity}
                        placeholder="e.g. 3"
                    />
                    <div className="form-group h6  text-secondary">
                        <div className="field">
                            <textarea
                                style={{ resize: "none" }}
                                name="description"
                                wrap="hard"
                                id="description"
                                spellCheck="true"
                                rows="4"
                                maxLength="300"
                                className="form-control border-0"
                                onChange={handleChange}
                                value={dish.description}
                                placeholder="Enter a description for your dish"
                            ></textarea>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-block button_primary mb-5 mr-3 px-4"
                    >
                        Continue
                    </button>
                </form>
            </div>
        </React.Fragment>
    );
};

export default UploadDish;
