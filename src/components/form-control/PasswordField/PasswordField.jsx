import PropTypes from "prop-types";
import React, { useState } from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Controller } from "react-hook-form";
import { PasswordFielddWrapper } from "./styles";
import { FormHelperText } from "@mui/material";

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
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };

  return (
    <PasswordFielddWrapper>
      <FormControl error={!!hasError} variant="outlined" margin="normal">
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Controller
          name={name}
          control={form.control}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              id={name}
              type={showPassword ? "text" : "password"}
              label={label}
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              disabled={disabled}
            />
          )}
        />
        <FormHelperText>{errors[name]?.message}</FormHelperText>
      </FormControl>
    </PasswordFielddWrapper>
  );
}

export default InputField;
