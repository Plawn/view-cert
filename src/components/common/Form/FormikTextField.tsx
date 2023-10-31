import React, { memo } from "react";
import { FieldProps } from "formik";
import TextField from "./TextField";

const FormikTextField: React.FC<FieldProps> = memo(props => <TextField {...props.field} {...props} />);

export default FormikTextField;
