import React, { useEffect, useState } from "react";
import Routing from "./Routing/Routing";
import "./App.css";
import { getDataWithNoParams } from "./commonApi/CommonApi";
import { isLoggedIn } from "./commonApi/Link";
import FooterContainer from "./Components/Footer/FooterContainer";
import { useDispatch, useSelector } from "react-redux";
import IsAuth from "./Components/Redux/Reducers/IsAuth";
import { IS_AUTH } from "./Components/Redux/Actions/Types";
import { FabricationMethod } from "./Components/Redux/Actions/FabricationMethod";
import { Material } from "./Components/Redux/Actions/Material";

function App() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        function IsLoggedIn() {
            getDataWithNoParams(
                isLoggedIn,
                (onSuccess) => {
                    if (onSuccess.data) {
                        const { uid, loggedIn, userType } = onSuccess.data;
                        if (loggedIn === true) {
                            dispatch({
                                type: IS_AUTH,
                                isAuth: loggedIn,
                                userType: userType,
                                currentUser: uid,
                            });
                        }
                        setIsLoading(false);
                    }
                },
                (onFail) => {
                    setErrorMessage("Server Not Found!!!");
                }
            );
        }
        IsLoggedIn();
    }, []);

    useEffect(() => {
        //get fabrication
        FabricationMethod(dispatch);

        //gett material
        Material(dispatch);
    }, []);

    return (
        <div>
            {isLoading ? (
                <div>
                    <h1>{errorMessage}</h1>
                </div>
            ) : (
                <>
                    <Routing />
                </>
            )}
        </div>
    );
}

export default App;
