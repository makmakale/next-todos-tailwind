import {Field} from "formik";
import InputField from "@/components/Formik/InputField";

const FormField = ({...props}) => {
  return (
    <Field {...props} component={InputField}/>
  );
};

export default FormField;