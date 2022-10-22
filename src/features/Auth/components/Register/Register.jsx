import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { register } from "../../userSlice";
import RegisterForm from "../RegisterForm";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";

Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handelSubmit = async (values) => {
    try {
      values.username = values.email;

      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);

      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
      console.log("user", user);
      enqueueSnackbar("Register successfully!!!", { variant: "success" });
    } catch (error) {
      console.log("failed", error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={handelSubmit} />
    </div>
  );
}

export default Register;
