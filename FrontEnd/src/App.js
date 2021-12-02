import React, { useEffect, useState } from "react";
import Routing from "./Routing/Routing";
import "./App.css";
import { getDataWithNoParams } from "./commonApi/CommonApi";
import { isLoggedIn } from "./commonApi/Link";

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState({
        isAuth: false,
        userType: "",
        currentUser: "",
    });
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        function IsLoggedIn() {
            getDataWithNoParams(
                isLoggedIn,
                (onSuccess) => {
                    if (onSuccess.data) {
                        const { uid, loggedIn, userType } = onSuccess.data;
                        if (loggedIn === true) {
                            setUserData({
                                ...userData,
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

    return (
        <div>
            {isLoading ? (
                <div>
                    <h1>{errorMessage}</h1>
                </div>
            ) : (
                <Routing
                    isAuth={userData.isAuth}
                    currentUser={userData.currentUser}
                    userType={userData.userType}
                />
            )}
        </div>
    );
}

export default App;
