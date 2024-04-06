import {Formik, Form as FormikForm} from "formik";

const Form = ({
  initialValues,
  validationSchema,
  onSubmit,
  children
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <FormikForm>
          {children}
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;