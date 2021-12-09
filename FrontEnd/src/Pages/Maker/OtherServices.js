import * as Yup from "yup";
import FormikComponent from "../../Components/formik/FormikComponent";
import FormikController from "../../Components/formik/FormikController";
import { useWindowDimensions } from "../../Functions";
import { colors } from "../../Values/colors";

export const MakersValidationSchema = Yup.object().shape({
  fabricationService: Yup.object().required(
    "Fabrication Service Status is required."
  ),
  material: Yup.object().required("Material is required."),
});

function OtherServices() {
  const InitialValues = {
    fabricationService: "",
    material: "",
  };

  const handleSubmit = (values) => {
    console.log(values, "values");
  };

  const { width } = useWindowDimensions();

  return (
    <>
      <div
        className="heading title"
        style={{ fontSize: 36, color: colors.primary }}
      >
        Other Services:
      </div>
      <FormikComponent
        initialValues={InitialValues}
        onSubmit={handleSubmit}
        validationSchema={MakersValidationSchema}
      >
        <div className="d-flex justify-content-end mt-2">
          <FormikController title="Add New" type="submit" control="submit" />
        </div>
        <div className="row mt-3">
          <div className="col-lg-3">
            <FormikController
              name="fabricationService"
              control="input"
              label="Fabrication Service"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-lg-3">
            <FormikController
              name="material"
              control="input"
              label="Materials"
            />
          </div>
        </div>
      </FormikComponent>
    </>
  );
}

export default OtherServices;
