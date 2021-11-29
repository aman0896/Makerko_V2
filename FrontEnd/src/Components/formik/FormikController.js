// import React from "react";
// import InputComponent from "../input/InputComponent";
// import BrowseFileComponent from "../browseFile/BrowseFileComponent";
// import SelectOptionComponent from "../selectOption/SelectOptionComponent";
// import NumberComponent from "../number/NumberComponent";
// import { useFormikContext } from "formik";
// import ButtonComponent from "../button/ButtonComponent";
// import LoadingButtonComponent from "../button/LoadingButtonComponent";
// import TimePickerComponent from "../picker/TimePickerComponent";
// import SelectMutliOptionComponent from "../selectOption/SelectMutliOptionComponent";
// import DatePickerComponent from "../picker/DatePickerComponent";
// import BrowseFile from "../BrowseFile";

// function FormikController(props) {
//   const { control, ...rest } = props;
//   const { setFieldValue, handleSubmit, setFieldTouched, errors, touched } =
//     useFormikContext();

//   switch (control) {
//     case "input":
//       return (
//         <InputComponent
//           setFieldValue={setFieldValue}
//           errors={errors}
//           touched={touched}
//           handleBlur={setFieldTouched}
//           {...rest}
//         />
//       );

//     case "selectOption":
//       return (
//         <SelectOptionComponent
//           setFieldValue={setFieldValue}
//           errors={errors}
//           touched={touched}
//           handleBlur={setFieldTouched}
//           {...rest}
//         />
//       );

//     case "selectMultiOption":
//       return (
//         <SelectMutliOptionComponent
//           setFieldValue={setFieldValue}
//           errors={errors}
//           touched={touched}
//           handleBlur={setFieldTouched}
//           {...rest}
//         />
//       );

//     case "number":
//       return (
//         <NumberComponent
//           setFieldValue={setFieldValue}
//           errors={errors}
//           touched={touched}
//           handleBlur={setFieldTouched}
//           {...rest}
//         />
//       );

//     case "time":
//       return (
//         <TimePickerComponent
//           setFieldValue={setFieldValue}
//           errors={errors}
//           touched={touched}
//           handleBlur={setFieldTouched}
//           {...rest}
//         />
//       );

//     case "image":
//       return (
//         <BrowseFileComponent
//           setFieldValue={setFieldValue}
//           errors={errors}
//           touched={touched}
//           handleBlur={setFieldTouched}
//           {...rest}
//         />
//       );
//     case "file":
//       return (
//         <BrowseFile
//           setFieldValue={setFieldValue}
//           errors={errors}
//           touched={touched}
//           handleBlur={setFieldTouched}
//           {...rest}
//         />
//       );

//     case "submit":
//       return <ButtonComponent handleSubmit={handleSubmit} {...rest} />;

//     case "loadingSubmit":
//       return <LoadingButtonComponent handleSubmit={handleSubmit} {...rest} />;

//     case "date":
//       return (
//         <DatePickerComponent
//           setFieldValue={setFieldValue}
//           errors={errors}
//           touched={touched}
//           handleBlur={setFieldTouched}
//           {...rest}
//         />
//       );

//     default:
//       return null;
//   }
// }

// export default FormikController;

import { useFormikContext } from 'formik';
import React from 'react';
import InputComponent from '../input/InputComponent';
import ButtonComponent from '../button/ButtonComponent';
import CheckboxComponent from '../input/CheckboxComponent';

function FormikController(props) {
    const { control, ...rest } = props;
    const { setFieldValue, handleSubmit, setFieldTouched, errors, touched } =
        useFormikContext();

    switch (control) {
        case 'input':
            return (
                <InputComponent
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                    handleBlur={setFieldTouched}
                    {...rest}
                />
            );
        case 'checkbox':
            return (
                <CheckboxComponent
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                    handleBlur={setFieldTouched}
                    {...rest}
                />
            );

        case 'submit':
            return <ButtonComponent handleSubmit={handleSubmit} {...rest} />;

        default:
            return null;
    }
}

export default FormikController;
