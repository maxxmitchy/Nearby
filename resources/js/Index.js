import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import { Provider as ReduxProvider } from "react-redux";
import ConfigStore from "./Redux/ConfigStore";
import HomePage from "./components/HomePage/HomePage";
import AuthStart from "./components/HomePage/AuthStart";
import Login from "./components/Auth/Login";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Register from "./components/Auth/Register";
import DeliveryDetails from "./components/Auth/DeliveryDetails";
import Nearby from "./components/Pages/Nearby";
import Search from "./components/Pages/Search";
import Restaurant from "./components/Pages/Restaurant";
import Recommended from "./components/Pages/Recommended";
import VerifyEmail from "./components/Auth/VerifyEmail";
import Dashboard from "./components/User/Dashboard";
import ProtectedRoutes from "./components/Auth/protectedRoutes";

function Index() {
    return (
        <React.Fragment>
            <HomePage />
        </React.Fragment>
    );
}
export default Index;

const store = ConfigStore();

if (document.getElementById("index")) {
    ReactDOM.render(
        <ReduxProvider store={store}>
            <Router>
                <Switch>
                    <Route path="/" exact component={Index}></Route>
                    <Route
                        path="/authStart"
                        exact
                        component={AuthStart}
                    ></Route>
                    <Route path="/login" exact component={Login}></Route>
                    <Route path="/register" exact component={Register}></Route>
                    <Route
                        path="/forgotpassword"
                        exact
                        component={ForgotPassword}
                    ></Route>
                    <Route
                        path="/verifyEmail"
                        exact
                        component={VerifyEmail}
                    ></Route>
                    <ProtectedRoutes
                        path="/deliverydetails"
                        exact
                        component={DeliveryDetails}
                    ></ProtectedRoutes>
                    <Route
                        path="/nearby-restaurants"
                        exact
                        component={Nearby}
                    ></Route>
                    <Route
                        path={["/restaurant/:slug", "/restaurant-orders"]}
                        exact
                        component={Restaurant}
                    ></Route>
                    <ProtectedRoutes
                        path="/recommended"
                        exact
                        component={Recommended}
                    ></ProtectedRoutes>
                    <Route
                        path={["/searchresults", "/search-restaurants"]}
                        exact
                        component={Search}
                    ></Route>
                    <ProtectedRoutes
                        path={[
                            "/dashboard",
                            "/profile",
                            "/payments",
                            "/order-history",
                            "/deliveryaddress",
                            "/settings",
                            "/aboutus",
                            "/supportcenter"
                        ]}
                        exact
                        component={Dashboard}
                    />
                </Switch>
            </Router>
        </ReduxProvider>,
        document.getElementById("index")
    );
}
