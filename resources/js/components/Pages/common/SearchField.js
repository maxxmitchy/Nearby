import React, { useState, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import { AiOutlineClockCircle, AiOutlineSearch } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { TiTimes } from "react-icons/ti";
import "../pages.css";

const SearchField = () => {
    const [search, setSearch] = useState({ search: "" });

    const [filter, setFilter] = useState({ filter: false });

    const handleChange = e => {
        const value = e.target.value;
        setSearch({
            [e.target.name]: value
        });
    };

    useEffect(() => {
        if (!search.search) {
            document.body.style.overflowY = "scroll";
        } else {
            document.body.style.overflowY = "hidden";
        }
    }, [search.search]);

    let filterTab = (
        <div className="">
            <h6 className="font-weight-bolder" style={{ fontSize: ".9rem" }}>
                Price Range
            </h6>
            <div className="img-scroll">
                <div className="small_font item mr-2 py-1 px-2 text-secondary">
                    N100 - N300
                </div>
                <div className="small_font item mr-2 py-1 px-2 text-secondary">
                    N2000 - N3000
                </div>
            </div>
            <br />
            <h6 className="font-weight-bolder" style={{ fontSize: ".9rem" }}>
                Dietary
            </h6>
            <div className="">
                <div className="d-flex justify-content-between">
                    <h6 className="text-secondary">Vegetarian</h6>
                    <input
                        type="checkbox"
                        name="name"
                        className="guests_have mt-1"
                        // onChange={handleCheckbox}
                        // checked={checkbox.entire}
                    />
                </div>
                <hr className="mt-0" />
                <h6
                    className="font-weight-bolder"
                    style={{ fontSize: ".9rem" }}
                >
                    Cuisines
                </h6>
                <div className="cuisines">
                    <a className="small_font text-center cuisine_item">All</a>
                    <a className="small_font text-center cuisine_item">
                        American
                    </a>
                    <a className="small_font text-center cuisine_item">Asian</a>
                    <a className="small_font text-center cuisine_item">Pizza</a>
                </div>
                <br />
                <button className="button_primary btn-block mb-3">Done</button>
            </div>
        </div>
    );

    return (
        <React.Fragment>
            <div className="d-flex justify-content-between">
                <form>
                    <div className="form-group h6" style={{ width: "80vw" }}>
                        <div className="field input-group">
                            <input
                                type="text"
                                onChange={handleChange}
                                name="search"
                                className="form-control bg-light border-0"
                                value={search.search}
                                placeholder="search"
                                style={{
                                    padding: "-.5rem 0",
                                    height: "1.8rem",
                                    outlineColor: "#fff !important"
                                }}
                            />
                            {search.search ? (
                                <div
                                    className="input-group-append"
                                    style={{
                                        height: "1.8rem"
                                    }}
                                >
                                    <span
                                        className="input-group-text bg-light border-0 rounded"
                                        id="basic-addon2"
                                    >
                                        <TiTimes
                                            onClick={() =>
                                                setSearch({ search: "" })
                                            }
                                            className="text-danger"
                                        />
                                    </span>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </form>
                <FiFilter
                    onClick={() => setFilter({ filter: true })}
                    className="text-danger h6 mt-2"
                />
            </div>
            {search.search ? (
                <div className="bg-white mt-0" style={{ height: "90vh" }}>
                    <div className="">
                        <h6 className="text-secondary">Recent Searches</h6>
                        <AiOutlineClockCircle className="text-secondary" />{" "}
                        <b>Japanese</b>
                        <br />
                        <br />
                        <h6 className="text-secondary">Top Categories</h6>
                        <AiOutlineSearch className="text-secondary" />{" "}
                        <b>Nigerian</b>
                    </div>
                </div>
            ) : (
                ""
            )}
            {filter.filter ? (
                <div className="filter">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <div className="d-flex justify-content-between">
                                    <BsArrowLeft
                                        onClick={() =>
                                            setFilter({
                                                filter: !filter.filter
                                            })
                                        }
                                        className="text-dark h6"
                                    />
                                    <h6 className="font-weight-bolder">
                                        Reset
                                    </h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <a className="filter_tabs border_b">
                                        Filters
                                    </a>
                                    <a className="filter_tabs">Sort</a>
                                </div>
                                <br />
                                {filterTab}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </React.Fragment>
    );
};

export default SearchField;
