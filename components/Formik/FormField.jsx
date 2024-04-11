import {Field} from 'formik';
import InputField from '@/components/Formik/InputField';

const FormField = ({...props}) => {
  return (
    <Field component={InputField} {...props} />
  );
};

export default FormField;