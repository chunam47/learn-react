import React from "react";
import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage";
import { ProductFeatureWrapper } from "./styles";
import DetailPage from "./pages/DetailPage";

ProductFeature.propTypes = {};

function ProductFeature(props) {
  return (
    <ProductFeatureWrapper>
      <Routes>
        <Route path="products" element={<ListPage />}>
          <Route path="product/:productId" element={<DetailPage />} />
        </Route>
      </Routes>
    </ProductFeatureWrapper>
  );
}

export default ProductFeature;
