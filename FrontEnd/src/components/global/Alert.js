import react, { useState, useEffect, useRef } from 'react';

export default function Alert({
    setShowAlert,
    alertType,
    alertMessage,
    onClick,
}) {
    return (
        <div className="col-md m-auto">
            <div
                className={`alert ${alertType} alert-dismissible fade show`}
                role="alert"
            >
                {alertMessage}
                <button
                    type="button"
                    style={{
                        alignSelf: 'center',
                    }}
                    className="close"
                    onClick={
                        !onClick
                            ? () => {
                                  console.log(':alrt');
                                  setShowAlert(false);
                              }
                            : onClick
                    }
                >
                    <span area-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    );
}
