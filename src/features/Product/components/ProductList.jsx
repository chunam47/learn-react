import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@mui/material";
import Product from "./Product";

ProductList.propTypes = {
  data: PropTypes.object,
};

ProductList.defaultProps = {
  data: [],
};
function ProductList({ data }) {
  const dataProduct = data.data;

  return (
    <Box>
      <Grid container>
        {dataProduct.map((product) => (
          <Grid item key={product.id} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;
