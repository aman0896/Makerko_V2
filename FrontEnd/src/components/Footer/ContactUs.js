import axios from 'axios';
import { Formik } from 'formik';
import FormTextBox from '../global/TextBox';

const localIpUrl = require('local-ip-url');
const ipAddress = localIpUrl('public');
function ContactUs() {
    const closeButtonStyle = { fontSize: '2rem', marginRight: '1rem' };

    return (
        <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            role="dialog"
        >
            <div className="modal-dialog">
                <div
                    className="modal-content p-0 m-0"
                    style={{ width: '100%' }}
                >
                    <div className="modal-header">
                        {/* <h5 className="modal-title" id="exampleModalLabel">
                            Contact Us
                        </h5> */}
                        <h5
                            className="modal-title"
                            id="exampleModalLabel"
                            style={{
                                fontWeight: 'bold',
                                marginLeft: '1rem',
                                padding: 0,
                                alignSelf: 'center',
                            }}
                        >
                            Contact Us
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
                    <div className="modal-body mt-0 pt-0">
                        <Formik
                            initialValues={{
                                email: '',
                                phoneNumber: '',
                                address: '',
                                fullname: '',
                                message: '',
                            }}
                            validate={(values) => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = 'Required';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                        values.email
                                    )
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                if (!values.fullname) {
                                    errors.fullname = 'Required';
                                }
                                if (!values.message) {
                                    errors.message = 'Required';
                                }
                                if (!values.address) {
                                    errors.address = 'Required';
                                }
                                if (!values.phoneNumber) {
                                    errors.phoneNumber = 'Required';
                                }

                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    //this.setState({ loading: false });
                                    axios
                                        .post(
                                            `http://${window.host}:3001/contact-us`,
                                            {
                                                email: values.email,
                                                phoneNumber: values.phoneNumber,
                                                address: values.address,
                                                message: values.message,
                                            }
                                        )
                                        .then((response) => {});

                                    window.location.href = '/';
                                    setSubmitting(false);
                                }, 100);
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleSubmit,
                                isSubmitting,
                                /* and other goodies */
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-2">
                                        <label
                                            for="message-text"
                                            className="col-form-label font-weight-bold"
                                        >
                                            Email:
                                        </label>
                                        <FormTextBox
                                            placeholder="Email"
                                            name="fullname"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label
                                            for="message-text"
                                            className="col-form-label font-weight-bold"
                                        >
                                            Phone Number:
                                        </label>
                                        <FormTextBox
                                            placeholder="Phone Number"
                                            name="phoneNumber"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label
                                            for="message-text"
                                            className="col-form-label font-weight-bold"
                                        >
                                            Address:
                                        </label>
                                        <FormTextBox
                                            placeholder="Address"
                                            name="address"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label
                                            for="message-text"
                                            className="col-form-label font-weight-bold"
                                        >
                                            Message:
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="message-text"
                                            style={{ height: '100px' }}
                                        ></textarea>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            data-bs-dismiss="modal"
                                            disabled={isSubmitting}
                                        >
                                            Send
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ContactUs;
