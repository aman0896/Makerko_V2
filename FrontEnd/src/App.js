// import React, { useEffect, useState } from "react";
import React from 'react';
import SideBar from './Components/SideNavBar/SideBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ForgetPasword from './Components/Foormik/ForgetPassword';
import Routing from './Routing/Routing';
import ResetPassword from './Components/Foormik/ResetPassword';
// import Routing from "./Routing/Routing";
// import "./App.css";
// import { getDataWithNoParams } from "./commonApi/CommonApi";
// import { isLoggedIn } from "./commonApi/Link";
// import FooterContainer from "./Components/Footer/FooterContainer";
// import { useDispatch, useSelector } from "react-redux";
// import IsAuth from "./Components/Redux/Reducers/IsAuth";
// import { IS_AUTH } from "./Components/Redux/Actions/Types";
// import { FabricationMethod } from "./Components/Redux/Actions/FabricationMethod";
// import { Material } from "./Components/Redux/Actions/Material";
// import { CurrentUserdata } from "./Components/Redux/Actions/CurrentUserdata";
// import { MakersList } from "./Components/Redux/Actions/MakersList";
// import { MakersServices } from "./Components/Redux/Actions/MakersServices";

function App() {
	// const dispatch = useDispatch();
	// const [isLoading, setIsLoading] = useState(true);
	// const [errorMessage, setErrorMessage] = useState();
	// const [auth, setAuth] = useState({
	//   isAuth: "",
	//   userType: "",
	//   currentUser: "",
	// });

	// useEffect(() => {
	//   function IsLoggedIn() {
	//     getDataWithNoParams(
	//       isLoggedIn,
	//       (onSuccess) => {
	//         if (onSuccess.data) {
	//           const { uid, loggedIn, userType } = onSuccess.data;
	//           if (loggedIn === true) {
	//             dispatch({
	//               type: IS_AUTH,
	//               isAuth: loggedIn,
	//               userType: userType,
	//               currentUser: uid,
	//             });
	//             setAuth({
	//               ...auth,
	//               isAuth: loggedIn,
	//               userType: userType,
	//               currentUser: uid,
	//             });
	//           }
	//           setIsLoading(false);
	//         }
	//       },
	//       (onFail) => {
	//         setErrorMessage("Server Not Found!!!");
	//       }
	//     );
	//   }
	//   IsLoggedIn();
	// }, []);

	// useEffect(() => {
	//   if (auth.isAuth) {
	//     CurrentUserdata(dispatch, auth.currentUser);
	//   }
	// }, [auth]);

	// useEffect(() => {
	//   //get fabrication
	//   FabricationMethod(dispatch);

	//   //gett material
	//   Material(dispatch);

	//   // get all makers list
	//   MakersList(dispatch);

	//   //get all makers services
	//   MakersServices(dispatch);
	// }, [dispatch]);

	return (
		// <div>
		//   {isLoading ? (
		//     <div>
		//       <h1>{errorMessage}</h1>
		//     </div>
		//   ) : (
		//     <>
		//       <Routing />
		//     </>
		//   )}
		// </div>
		// <Router>
		<ResetPassword />
		// 	<SideBar />
		// </Router>
		//<Routing/>

		// <ForgetPasword/>
	);
}

export default App;
