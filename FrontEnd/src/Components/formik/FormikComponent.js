import React from "react";
import { Formik } from "formik";

export default function FormikComponent(props) {
    return (
        <Formik
            initialValues={props.initialValues}
            validationSchema={props.validationSchema}
            onSubmit={props.onSubmit}
            innerRef={props.formRef}
            enableReinitialize={props.enableReinitialize}
        >
            {() => <>{props.children}</>}
        </Formik>
    );
}
