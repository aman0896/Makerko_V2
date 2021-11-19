import React, { Fragment } from "react";
import NavBar from "../components/main/navBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ModalChoice from "../components/global/ModalChoice";
import HomePage from "../Pages/LandingPage/Homepage";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../Pages/Form/Login";
import ForgotPassword from "../Pages/Form/ForgotPassword";
import ResetPassword from "../Pages/Form/ResetPassword";
import OTPVerification from "../Pages/Form/OTPVerification";
import Register from "../Pages/Form/Register";
import ManufacturerSignup from "../Pages/Form/ManufacturerSignup";

function Routing({ isAuth, currentUser, userType }) {
    return (
        <div>
            <ModalChoice
                title="Get a quote"
                option1="Have A Design"
                option2="Need A Design"
                id="placeOrderModal"
                link2="/request-quote"
                link1="/new-quote"
                placeOrder={true}
            />
            <ModalChoice
                title="Sign Up as:"
                option1="Client"
                option2="Maker"
                id="signup"
                link1="/register"
                link2="/manufacturer-signup"
            />
            <Router>
                <div className="p-4">
                    <NavBar
                        isAuth={isAuth}
                        currentUser={currentUser}
                        userType={userType}
                    />
                </div>

                <div>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <ProtectedRoute
                            path="/login"
                            exact
                            component={Login}
                            isAuth={!isAuth}
                            redirectionPage="/"
                        />
                        <Route
                            path="/login/:path"
                            exact
                            component={ForgotPassword}
                        />
                        <Route
                            path="/reset-password"
                            exact
                            component={ResetPassword}
                        />
                        <Route path="/verify" component={OTPVerification} />
                        <ProtectedRoute
                            path="/register"
                            component={Register}
                            isAuth={!isAuth}
                            redirectionPage="/"
                        />
                        <Route
                            path="/manufacturer-signup"
                            exact
                            component={ManufacturerSignup}
                            isAuth={!isAuth}
                            redirectionPage="/"
                        />
                        {/* <ProtectedRoute
                            path="/new-quote"
                            component={NewQuote}
                            isAuth={isAuth}
                            redirectionPage="/login"
                        />
                        
                        <ProtectedRoute
                            path="/request-quote"
                            component={RequestDesign}
                            isAuth={isAuth}
                            redirectionPage="/login"
                        />
                        
                        

                        <Route
                            path="/feature-project"
                            exact
                            component={featureProject}
                        />
                        <Route
                            path="/validation-page"
                            exact
                            component={validation}
                        />
                        <ProtectedRoute
                            exact
                            path="/feature"
                            component={Feature}
                            isAuth={isAuth}
                            redirectionPage="/login"
                        />
                        <Route
                            path="/feature-project/:id/:title"
                            exact
                            component={DetailFeature}
                        />

                        <Route path="/how-to-get-a-quote" component={demo} />

                        <Route path="/feature" component={Feature} />
                        <Route
                            path="/detail-feature"
                            exact
                            component={DetailFeature}
                        />
                        <Route
                            path="/manufacturer-list"
                            exact
                            component={ManufacturingHubsView}
                        />
                        <Route
                            path="/manufacturer-list/:id/:companyname"
                            exact
                            component={ManufacturerViewProfile}
                        />
                        <ProtectedRoute
                            path="/edit-projectlist"
                            exact
                            component={EditFeatureProjectList}
                            isAuth={isAuth}
                            redirectionPage="/login"
                        />
                        <Route
                            path="/knowledgebank"
                            exact
                            component={Knowledgebank}
                        />

                        <Route
                            path="/edit-projectlist/:id/:title"
                            exact
                            component={DetailFeature}
                        />
                        <ProtectedRoute
                            path="/edit-projectlist"
                            exact
                            component={EditFeatureProjectList}
                            isAuth={isAuth}
                            redirectionPage="/login"
                        />
                        <ProtectedRoute
                            path="/:id/edit-project"
                            exact
                            isAuth={isAuth}
                            component={Editfeature}
                        />
                        <Route path="/blog" component={blog} />
                        <Route path="/sidetab" component={sidetab} />
                        <Route path="/cropper" component={ImageCropper} />
                        {userType === "customer" && (
                            <Fragment>
                                <Switch>
                                    <ProtectedRoute
                                        path="/:id/customer-profile/"
                                        isAuth={isAuth}
                                        exact
                                        component={UserProfileEdit}
                                        redirectionPage="/login"
                                    />
                                    <ProtectedRoute
                                        path="/client/:id/order-status"
                                        exact
                                        component={TabBar}
                                        isAuth={isAuth}
                                        userType={userType}
                                        redirectionPage="/login"
                                    />
                                    <Route exact component={NotFoundErr} />
                                </Switch>
                            </Fragment>
                        )}
                        {userType === "maker" && (
                            <Fragment>
                                <Switch>
                                    <ProtectedRoute
                                        path="/:id/manufacturer-profile/"
                                        exact
                                        isAuth={isAuth}
                                        component={EditManufacturerProfile}
                                        redirectionPage="/login"
                                    />
                                    <ProtectedRoute
                                        path="/my-hub"
                                        exact
                                        component={AdditionalDetailsFillUp}
                                        isAuth={isAuth}
                                        redirectionPage="/login"
                                    />
                                    <ProtectedRoute
                                        path="/maker/:id/order-status"
                                        exact
                                        component={ManufacturerOrderStatus}
                                        isAuth={isAuth}
                                        userType={userType}
                                        redirectionPage="/login"
                                    />
                                    <Route component={NotFoundErr} />
                                </Switch>
                            </Fragment>
                        )}
                        <Route exact component={NotFoundErr} /> */}
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default Routing;
