import FormTextBox from './global/TextBox';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Button from './global/Button';
import './invalidAction.css';

const InvalidSchema = Yup.object().shape({
    orderID: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    result: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    review: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    action: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

function invalidAction() {
    return (
        <div
            className="modal fade"
            id="invalidmodal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            role="dialog"
        >
            <div
                className="modal-dialog modal-dialog-centered"
                style={{ maxWidth: '800px' }}
            >
                <div className="modal-content pb-3">
                    <div
                        style={{
                            color: 'white',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            backgroundColor: '#FF0000',
                            height: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: '20px',
                        }}
                    >
                        Invalid Action
                    </div>
                    <span
                        type="button"
                        data-dismiss="modal"
                        aria-label="Close"
                        aria-hidden="true"
                        style={{
                            position: 'absolute',
                            fontSize: '2rem',
                            right: '2%',
                        }}
                    >
                        &times;
                    </span>
                    <div
                        style={{
                            //  width: '80%',
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '30px',
                        }}
                    >
                        <Formik
                            initialValues={{
                                orderID: '',
                                result: '',
                                review: '',
                                email: '',
                                action: '',
                            }}
                            validationSchema={InvalidSchema}
                            onSubmit={(values) => {
                                // same shape as initial values
                                console.log(values);
                            }}
                        >
                            {({ errors, touched, handleSubmit }) => (
                                <form
                                    onSubmit={handleSubmit}
                                    className="action"
                                >
                                    <InputField
                                        label="Order ID:"
                                        name="orderID"
                                    />
                                    <InputField
                                        label="Validation Result:"
                                        name="result"
                                    />
                                    <div
                                        className="row m-3 d-flex align-items-center"
                                        style={{
                                            letterSpacing: '0.2px',
                                            fontWeight: 'bold',
                                            fontSize: '18px',
                                        }}
                                    >
                                        <div className="col-md">
                                            <span className="font-weight-bold small">
                                                Suggested Action:
                                            </span>
                                        </div>

                                        <div className="col-md">
                                            <textarea
                                                name="action"
                                                className="form-control"
                                                style={{
                                                    height: '200px',
                                                    width: '320px',
                                                }}
                                            />
                                            <div
                                                className="text-danger"
                                                style={{
                                                    fontSize: '10pt',
                                                }}
                                            >
                                                {errors.action &&
                                                    touched.action &&
                                                    errors.action}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="row m-3 d-flex align-items-center"
                                        style={{
                                            letterSpacing: '0.2px',
                                            fontWeight: 'bold',
                                            fontSize: '18px',
                                        }}
                                    >
                                        <div className="col-md">
                                            <span className="font-weight-bold small">
                                                Reference/Instruction :
                                            </span>
                                        </div>
                                        <div className="col-md">
                                            <div
                                                className="row m-0"
                                                style={{
                                                    borderRadius: '5px',
                                                    border: '1px solid #C4C4C4',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    width: '320px',
                                                }}
                                            >
                                                <div
                                                    className="col-md-7 d-flex align-items-center"
                                                    style={{
                                                        color: 'gray',
                                                        fontSize: '14px',
                                                        fontWeight: 'normal',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    Upload files :pdf, jpeg, dwg
                                                </div>
                                                <div className="col-md mt-2">
                                                    <input
                                                        type="file"
                                                        id="actual-btn"
                                                        className="form-control"
                                                        placeholder="Upload Photos of Project"
                                                        style={{
                                                            textAlign: 'center',
                                                        }}
                                                        placeholder=""
                                                        name="file"
                                                        accept=".jpeg, .png, .jpg"
                                                        hidden
                                                    />

                                                    <label
                                                        for="actual-btn"
                                                        id="lable"
                                                        style={{
                                                            fontWeight: '14px',
                                                            fontWeight:
                                                                'normal',
                                                        }}
                                                    >
                                                        Upload
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <InputField
                                        label="Reviewed By:"
                                        name="review"
                                    />
                                    <InputField
                                        label="Email:"
                                        name="email"
                                        type="email"
                                    />
                                    <div
                                        className="d-flex justify-content-end labeltext"
                                        style={{
                                            marginTop: '30px',
                                            marginRight: '30px',
                                        }}
                                    >
                                        {' '}
                                        <button
                                            type="button"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                            aria-hidden="true"
                                            className="btn"
                                            style={{
                                                backgroundColor: 'white',
                                                color: '#5044FD',
                                                border: 'none',
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <Button
                                            type="submit"
                                            styleClass="btn ml-5"
                                            btnName="Submit"
                                        />
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
export default invalidAction;

export function InputField({ label, placeholder, type, name, style }) {
    return (
        <div
            className="row m-3 d-flex align-items-center justify-content-start"
            style={{
                letterSpacing: '0.2px',
                fontWeight: 'bold',
                fontSize: '18px',
            }}
        >
            <div className="col-md">
                <span className="font-weight-bold small">{label}</span>
            </div>

            <div className="col-md ml-5">
                <FormTextBox
                    placeholder={placeholder}
                    type={type}
                    name={name}
                    style={style}
                />
            </div>
        </div>
    );
}
