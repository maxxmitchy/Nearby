import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
    const [fullPage, setfullPage] = useState([
        {
            id: 1,
            active: false,
            image: "/img/nearby1.jpg",
            header: "Track order real time",
            text: "Real time tracking of your items on the app after order.",
            body: "detail",
            button: "button"
        },
        {
            id: 2,
            active: false,
            image: "/img/nearby2.jpg",
            header: "Fast delivery to your place",
            text: "Fast delivery to your home, office, and wherever you are.",
            body: "detail1",
            button: "button1"
        },
        {
            id: 3,
            active: false,
            image: "/img/nearby3.jpg",
            header: "Search for your favourites",
            text: "Discover the best foods from over 2000 restaurants",
            body: "detail2",
            button: "button"
        }
    ]);

    const [current, setCurrent] = useState(1);

    let page = fullPage.find(item => item.id === current);

    useEffect(() => {
        let timer = setTimeout(() => {
            if (current < fullPage.length) {
                setCurrent(current + 1);
            } else if (current === fullPage.length) {
                setCurrent(1);
            }
        }, 4000);
        let newPage = fullPage.map(thePage =>
            thePage === page
                ? { ...thePage, active: true }
                : { ...thePage, active: false }
        );
        setfullPage(newPage);
        return () => {
            clearTimeout(timer);
        };
    }, [current]);

    return (
        <React.Fragment>
            <div key={page.id} className="position-relative full_height">
                <NavLink
                    className="position-absolute px-2 font-weight-bolder text-white rounded"
                    style={{
                        top: "1rem",
                        right: "1rem",
                        background: "rgba(0,0,0,0.4)"
                    }}
                    to="/login"
                >
                    Log In
                </NavLink>
                <img
                    src={page.image}
                    className="img-fluid w-100"
                    style={{ height: "50vh" }}
                />
                <div
                    className={"position-absolute pt-5 px-3 w-100 " + page.body}
                >
                    <h5 className="text-white text-center font-weight-bolder">
                        {page.header}
                    </h5>
                    <p className="mx-4 text-center text-white">{page.text}</p>
                    <div className="d-flex justify-content-center">
                        <NavLink
                            to="/AuthStart"
                            className={"py-1 w-75 " + page.button}
                        >
                            Get Started
                        </NavLink>
                    </div>
                    <div className="d-flex justify-content-center mt-5">
                        {fullPage.map(dot => {
                            return (
                                <div
                                    key={dot.id}
                                    className={
                                        "dots " + (dot.active ? "bg-white" : "")
                                    }
                                ></div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default HomePage;
