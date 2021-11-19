import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { GetUserInfo } from '../common/restApi';

function CustomerDetails({ index, customerID }) {
    const closeButtonStyle = { fontSize: '2rem', marginRight: '1rem' };
    const [customerInfo, setCustomerInfo] = useState();

    useEffect(() => {
        GetUserInfo(customerID, (err, result) => {
            if (err) {
                return err;
            }
            setCustomerInfo(result[0]);
            console.log(result[0]);
        });
    }, [customerID]);

    return (
        <div>
            <div>
                <span
                    style={{
                        fontSize: '12px',
                        cursor: 'pointer',
                        color: '#000Aff',
                        marginLeft: 3,
                    }}
                    data-toggle="modal"
                    data-target={`#customerDetails${index}`}
                >
                    <FontAwesomeIcon icon={faEye} style={{ marginRight: 2 }} />
                    View Details
                </span>
            </div>
            <div
                className="modal fade"
                id={`customerDetails${index}`}
                tabindex="-1"
                role="dialog"
                aria-labelledby="showViewModal"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header m-0 p-0">
                            <h5
                                className="modal-title"
                                id="showViewModalLabel"
                                style={{
                                    fontWeight: 'bold',
                                    marginLeft: '1rem',
                                    padding: 0,
                                    alignSelf: 'center',
                                }}
                            >
                                Customer Details
                            </h5>
                            <span
                                type="button"
                                data-dismiss="modal"
                                aria-label="Close"
                                aria-hidden="true"
                                style={closeButtonStyle}
                            >
                                &times;
                            </span>
                        </div>
                        {customerInfo && (
                            <div
                                className="modal-body"
                                style={{ fontSize: '15px' }}
                            >
                                <DetailsView
                                    label="Customer ID :"
                                    details={customerInfo.Customer_ID}
                                />
                                <DetailsView
                                    label="Name :"
                                    details={
                                        customerInfo.First_Name +
                                        ' ' +
                                        customerInfo.Last_Name
                                    }
                                />
                                <DetailsView
                                    label="Address :"
                                    details={customerInfo.Address}
                                />
                                <DetailsView
                                    label="Email :"
                                    details={customerInfo.Email}
                                />
                                <DetailsView
                                    label="Phone no :"
                                    details={customerInfo.Phone_Number}
                                />
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CustomerDetails;

export function DetailsView({ label, details }) {
    return (
        <div className="row m-3">
            <div className="col-md-4 font-weight-bold">{label}</div>
            <div className="col-md">{details}</div>
        </div>
    );
}
