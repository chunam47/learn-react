import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import FilterByCategory from "./Filter/FilterByCategory/FilterByCategory";
import FilterByPrice from "./Filter/FilterByPrice/FilterByPrice";
import FilterBySevice from "./Filter/FilterBySevice";

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilters({ filters, onChange }) {
  const handleCategoryChange = (newCategoryId) => {
    if (onChange) {
      const newFilters = {
        ...filters,
        category: newCategoryId,
      };
      onChange(newFilters);
    }
    return;
  };
  const handleChange = (values) => {
    if (onChange) {
      onChange(values);
    }
  };
  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange} />
      <FilterByPrice onChange={handleChange} />
      <FilterBySevice filter={filters} onChange={handleChange} />
    </Box>
  );
}

export default ProductFilters;
