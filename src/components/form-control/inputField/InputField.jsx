import PropTypes from "prop-types";
import React from "react";

import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { InputFieldWrapper } from "./styles";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled } = props;
  const {
    formState: { errors },
  } = form;

  const hasError = errors[name];
  return (
    <InputFieldWrapper>
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <>
            <TextField
              name={name}
              {...field}
              label={label}
              margin="normal"
              fullWidth
              error={!!hasError}
              helperText={errors[name]?.message}
            />
          </>
        )}
        variant="outlined"
        disabled={disabled}
      />
    </InputFieldWrapper>
  );
}

export default InputField;
