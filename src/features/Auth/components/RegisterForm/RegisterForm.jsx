import React from "react";

import PropTypes from "prop-types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Button, LinearProgress, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import InputField from "../../../../components/form-control/inputField/InputField";
import PasswordField from "../../../../components/form-control/PasswordField";
import { RegisterFormWrapper } from "./styles";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};
function RegisterForm(props) {
  const userSchema = yup
    .object({
      fullName: yup
        .string()
        .required("Please enter your full name")
        .test(
          "should has at least 4 words",
          "Please enter at least 4 words",
          (value) => {
            return value.split("").length >= 4;
          }
        ),
      email: yup
        .string()
        .required("Please enter your Email")
        .email("Please enter a valid email address"),
      password: yup.string().required("Please enter your password."),
      retypePassword: yup
        .string()
        .required("Please retype your password.")
        .oneOf([yup.ref("password")], "Password is not match"),
    })
    .required();
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(userSchema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;
  return (
    <RegisterFormWrapper>
      {isSubmitting && <LinearProgress className="progress" />}
      <Avatar className="avatar"></Avatar>
      <Typography component="h3" variant="h5" className="title">
        Register
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="Full Name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField
          name="retypePassword"
          label="Retype Password"
          form={form}
        />

        <Button
          type="submit"
          className="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isSubmitting}
        >
          Register an account
        </Button>
      </form>
    </RegisterFormWrapper>
  );
}

export default RegisterForm;
