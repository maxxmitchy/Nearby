import React, { useState } from "react";
import "../user.css";
import { useDispatch } from "react-redux";
import { uploadAddOn } from "../../../Redux/features/restaurant/addOnSlice";

const IngredientField = ({ fields, placeholder, header, action }) => {
    const dispatch = useDispatch();

    const [inputList, setInputList] = useState([fields]);

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
        setInputList([...inputList, fields]);
    };

    const handleSubmit = e => {
        e.preventDefault();
        switch (action) {
            case "addOn":
                dispatch(uploadAddOn(inputList));
                break;
            case "ingredient":
                break;
            default:
                break;
        }
    };

    return (
        <div className="ingredients_modal">
            <div className="container mt-3">
                <div className="card px-2 py-3">
                    <form onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-between">
                            <h6>{header}</h6>
                        </div>
                        <br />
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
                                                placeholder={placeholder.name}
                                                value={x.name}
                                                onChange={e =>
                                                    handleInputChange(e, i)
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
                                                name="price"
                                                placeholder={placeholder.price}
                                                value={x.price}
                                                onChange={e =>
                                                    handleInputChange(e, i)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="btn-box">
                                        {inputList.length !== 1 && (
                                            <p
                                                className="text-danger"
                                                onClick={() =>
                                                    handleRemoveClick(i)
                                                }
                                            >
                                                Remove
                                            </p>
                                        )}
                                        {inputList.length - 1 === i && (
                                            <p
                                                className="text-success"
                                                onClick={handleAddClick}
                                            >
                                                Add More Items
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                        <button className="btn-block button_primary mb-2">
                            Continue
                        </button>
                    </form>
                </div>
                <br />
            </div>
        </div>
    );
};

export default IngredientField;
