import react, { useState, useEffect, useRef } from "react";

export default function Alert({ alertType, alertMessage }) {
    const [showAlert, setShowAlert] = useState(true);

    if (alertMessage === null || alertMessage === undefined) {
        return null;
    }

    return (
        <div>
            {showAlert && (
                <div className="col-md m-auto">
                    <div
                        className={`alert ${alertType} alert-dismissible fade show`}
                        role="alert"
                    >
                        {alertMessage}
                        <button
                            type="button"
                            style={{
                                alignSelf: "center",
                            }}
                            className="close"
                            onClick={() => setShowAlert(false)}
                        >
                            <span area-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
