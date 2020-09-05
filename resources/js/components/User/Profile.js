import React, { useEffect } from "react";
import OwnerProfile from "./partials/OwnerProfile";
import { useSelector, useDispatch } from "react-redux";
import UserProfile from "./partials/UserProfile";
import { getUserRestaurant } from "../../Redux/features/restaurant/restaurantSlice";

const Profile = () => {
    const { userRestaurant } = useSelector(({ restaurant }) => restaurant);

    const dispatch = useDispatch();


    console.log(userRestaurant);


    useEffect(() => {
        if (userRestaurant === undefined) {
            dispatch(getUserRestaurant());
        }
    }, []);

    let { user, role } = useSelector(({ auth }) => auth);
    return (
        <React.Fragment>
            {role === "Owner" ? (
                <OwnerProfile userRestaurant={userRestaurant} user={user} />
            ) : role === "Normal User" ? (
                <UserProfile userRestaurant={userRestaurant} user={user} />
            ) : (
                <div className="p-5 w-25 h-25 border bg-success"></div>
            )}
        </React.Fragment>
    );
};

export default Profile;
