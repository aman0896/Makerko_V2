import { useFormikContext } from "formik";
import React from "react";
import BrowseFileComponentNew from "../browseFile/BrowseFileComponentNew";

function FormikControllerNew(props) {
  const { control, ...rest } = props;
  const formik = useFormikContext();
  console.log("Use Formik Context",formik)
  switch (control) {
    case "file":
      return <BrowseFileComponentNew {...rest} />;
    default:
      return null;
  }
}

export default FormikControllerNew;
