import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useFormikContext } from "formik";
import "./CkEditor.css";
import ErrorMessage from "../formik/ErrorMessage";
import axios from "axios";

export default function CkEditorComponent(props) {
  const { setFieldValue, errors, touched } = useFormikContext();
  const [data, setData] = useState();

  useEffect(() => {
    if (props.setInitial) {
      setData(props.setInitial);
      props.setFieldValue(props.name, props.setInitial);
    }
  }, []);

  const handleChange = (value) => {
    if (value === "" || value === undefined || value === null) {
      console.log("inside empty desc");
      setFieldValue(props.name, value);
    }
    setData(value);
    props.setFieldValue(props.name, value);
    // setData(event.target.value);
    // props.setFieldValue(props.name, event.target.value);
  };

  ClassicEditor.defaultConfig = {
    toolbar: {
      items: [
        "bold",
        "italic",
        "|",
        "bulletedList",
        "numberedList",
        "link",
        "undo",
        "redo",
        "imageUpload",
      ],
    },
  };
  const API_URL = "http://localhost:3001";
  const UPLOAD_ENDPOINT = "upload_files";

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("files", file);
            // let headers = new Headers();
            // headers.append("Origin", "http://localhost:3000");
            axios
              .post(`${API_URL}/${UPLOAD_ENDPOINT}`, body, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res) => res.json());
            // .then((res) => {
            //   resolve({
            //     default: `${API_URL}/${res.filename}`,
            //   });
            // })
            // .catch((err) => {
            //   reject(err);
            // });
          });
        });
      },
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      const data = uploadAdapter(loader);
      console.log(data, "data");
      return uploadAdapter(loader);
    };
  }

  return (
    <div className="mb-2">
      {props.label && (
        <label className="mb-1 font-weight-bold" style={{ fontSize: 14 }}>
          {props.label}
        </label>
      )}
      <div
        className={
          "w-100" +
          (errors[props.name] && touched[props.name]
            ? " border border-danger rounded"
            : "")
        }
      >
        <CKEditor
          editor={ClassicEditor}
          config={{
            placeholder: props.placeholder,
            extraPlugins: [uploadPlugin],
            image: {
              // Configure the available styles.
              styles: ["alignLeft", "alignCenter", "alignRight", "resizeImage"],

              // Configure the available image resize options.
              resizeOptions: [
                {
                  name: "resizeImage:original",
                  label: "Original",
                  value: null,
                },
                {
                  name: "resizeImage:25",
                  value: "25",
                  icon: "small",
                },
                {
                  name: "resizeImage:50",
                  label: "50%",
                  value: "50",
                },
                {
                  name: "resizeImage:75",
                  label: "75%",
                  value: "75",
                },
              ],

              // You need to configure the image toolbar, too, so it shows the new style
              // buttons as well as the resize buttons.
              toolbar: [
                "resizeImage:25",
                "resizeImage:50",
                "resizeImage:75",
                "resizeImage:original",
                "imageStyle:alignLeft",
                "imageStyle:alignCenter",
                "imageStyle:alignRight",
                "|",
                "resizeImage",
                "|",
                "imageTextAlternative",
              ],
            },
          }}
          onChange={(event, editor) => {
            props.setFieldValue
              ? handleChange(editor.getData())
              : props.onChangeText(editor.getData());
          }}
          data={props.value ? props.value : data}
          onBlur={() => {
            if (props.handleBlur) {
              props.handleBlur(props.name);
            }
          }}
        />
      </div>
      <ErrorMessage
        error={props.errors[props.name]}
        visible={props.touched[props.name]}
      />
    </div>
  );
}
