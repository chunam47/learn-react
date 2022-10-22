import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../userSlice";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import LoginForm from "../LoginForm";

Login.propTypes = {
  closeDialog: PropTypes.func,
};

function Login(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handelSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
    } catch (error) {
      console.log("failed login", error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <div>
      <LoginForm onSubmit={handelSubmit} />
    </div>
  );
}

export default Login;
