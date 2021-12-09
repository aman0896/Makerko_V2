import { useFormikContext } from "formik";
import React from "react";
import InputComponent from "../input/InputComponent";
import Button from "../Button";
import CheckboxComponent from "../input/CheckboxComponent";
import DropDown from "../input/DropDown";
import CkEditorComponent from "../ckeditor/CkEditorComponent";
import BrowseFileComponent from "../browseFile/BrowseFileComponent";
import BrowseMultipleFileComponent from "../browseFile/BrowseMultipleFileComponent";
import DropZone from "../input/DropZone";
import TeaxtAreaComponent from "../input/TextAreaComponent";

function FormikController(props) {
  const { control, ...rest } = props;
  const { setFieldValue, handleSubmit, setFieldTouched, errors, touched } =
    useFormikContext();
  switch (control) {
    case "input":
      return (
        <InputComponent
          setFieldValue={setFieldValue}
          errors={errors}
          touched={touched}
          handleBlur={setFieldTouched}
          {...rest}
        />
      );
    case "textarea":
      return (
        <TeaxtAreaComponent
          setFieldValue={setFieldValue}
          errors={errors}
          touched={touched}
          handleBlur={setFieldTouched}
          {...rest}
        />
      );
    case "checkbox":
      return (
        <CheckboxComponent
          setFieldValue={setFieldValue}
          errors={errors}
          touched={touched}
          handleBlur={setFieldTouched}
          {...rest}
        />
      );
    case "select":
      return (
        <DropDown
          setFieldValue={setFieldValue}
          errors={errors}
          touched={touched}
          handleBlur={setFieldTouched}
          {...rest}
        />
      );

    case "ckEditor":
      return (
        <CkEditorComponent
          setFieldValue={setFieldValue}
          errors={errors}
          touched={touched}
          handleBlur={setFieldTouched}
          {...rest}
        />
      );

    case "file":
      return (
        <BrowseFileComponent
          setFieldValue={setFieldValue}
          errors={errors}
          touched={touched}
          handleBlur={setFieldTouched}
          {...rest}
        />
      );
    case "multipleFile":
      return (
        <BrowseMultipleFileComponent
          setFieldValue={setFieldValue}
          errors={errors}
          touched={touched}
          handleBlur={setFieldTouched}
          {...rest}
        />
      );

    case "dropzone":
      return (
        <DropZone
          setFieldValue={setFieldValue}
          errors={errors}
          touched={touched}
          handleBlur={setFieldTouched}
          {...rest}
        />
      );

    case "submit":
      return (
        <Button
          onClick={handleSubmit}
          buttonStyle="button--primary--solid"
          buttonSize="button--small"
          {...rest}
        >
          {props.title}
        </Button>
      );

    default:
      return null;
  }
}

export default FormikController;
