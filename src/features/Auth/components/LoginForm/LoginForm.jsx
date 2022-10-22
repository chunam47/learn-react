import React from "react";

import PropTypes from "prop-types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Button, LinearProgress, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import InputField from "../../../../components/form-control/inputField/InputField";
import PasswordField from "../../../../components/form-control/PasswordField";
import { LoginFormWrapper } from "./styles";

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};
function LoginForm(props) {
  const userSchema = yup
    .object({
      identifier: yup
        .string()
        .required("Please enter your Email")
        .email("Please enter a valid email address"),
      password: yup.string().required("Please enter your password."),
    })
    .required();
  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: yupResolver(userSchema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
    console.log(values);
  };

  const { isSubmitting } = form.formState;
  return (
    <LoginFormWrapper>
      {isSubmitting && <LinearProgress className="progress" />}
      <Avatar className="avatar"></Avatar>
      <Typography component="h3" variant="h5" className="title">
        Login
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="identifier" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <Button
          type="submit"
          className="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isSubmitting}
        >
          Login
        </Button>
      </form>
    </LoginFormWrapper>
  );
}

export default LoginForm;
