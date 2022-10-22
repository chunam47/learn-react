import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, TextField, Typography } from "@mui/material";
import { FilterByPriceWrapper, InputWrapper } from "./styles";

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

function FilterByPrice({ onChange }) {
  const [values, setValues] = useState({
    salePrice_gte: "",
    salePrice_lte: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    if (onChange) onChange(values);

    setValues({
      salePrice_gte: "",
      salePrice_lte: "",
    });
  };
  return (
    <FilterByPriceWrapper>
      <Typography>TÌM KIẾM THEO GIÁ</Typography>

      <InputWrapper>
        <TextField
          label="Giá từ"
          size="small"
          name="salePrice_gte"
          value={values.salePrice_gte}
          onChange={handleChange}
        />
        <span>-</span>
        <TextField
          label="Tới"
          size="small"
          name="salePrice_lte"
          value={values.salePrice_lte}
          onChange={handleChange}
        />
      </InputWrapper>

      <Button
        variant="outlined"
        size="small"
        fullWidth
        onClick={handleSubmit}
        className="submit"
      >
        Áp dụng
      </Button>
    </FilterByPriceWrapper>
  );
}

export default FilterByPrice;
