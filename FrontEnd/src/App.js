import React, { Component } from "react";
import { GetCookiesInfo } from "./components/global/GlobalFunction";
import "./App.css";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import Routing from "./Routing/Routing";

// window.host = "https://api.makerko.com"; //API HOST URL
// window.hostAddress = "https://makerko.com"; //WEB HOST URL

window.host = "http://192.168.88.182:3001";
window.hostAddress = "http://192.168.88.182:3000";

// window.host = "http://192.168.1.103:3001";
// window.hostAddress = "http://192.168.1.103:5000";

class App extends Component {
    state = {
        isAuth: false,
        isLoading: true,
        currentUser: "",
        userType: "",
        error: "",
    };
    async componentDidMount() {
        const data = await GetCookiesInfo().then((response) => {
            console.log(response);
            if (response.data) {
                return response;
            } else {
                this.setState({ error: response.ServerMsg });
                return response;
            }
        });
        if (data.data != null) {
            const { uid, loggedIn, userStatus } = data.data;
            if (uid && loggedIn && userStatus) {
                this.setState({
                    isAuth: loggedIn,
                    currentUser: uid,
                    userType: userStatus,
                });
            }
        }
        if (!data.ServerMsg) {
            this.setState({ isLoading: false });
        }
    }
    render() {
        const { isLoading } = this.state;
        return (
            <div className="App">
                {isLoading ? (
                    <div>
                        <h1>{this.state.error}</h1>
                    </div>
                ) : (
                    <Routing
                        isAuth={this.state.isAuth}
                        currentUser={this.state.currentUser}
                        userType={this.state.userType}
                    />
                )}
            </div>
        );
    }
}

export default App;
