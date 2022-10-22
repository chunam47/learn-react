import React, { useState } from "react";
import { Container, Grid, Pagination, Paper } from "@mui/material";
import { BoxListPageWrapper, BoxProductWrapper } from "./styles";
import { useEffect } from "react";
import productApi from "../../../api/productApi";
import ProductSkeletonList from "../components/ProductSkeletonList";
import ProductList from "../components/ProductList";
import ProductSort from "../components/ProductSort";
import ProductFilters from "../components/ProductFilters";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

ListPage.propTypes = {};

function ListPage(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const [pagination, setPagination] = useState({
    limit: 12,
    total: 10,
    page: 1,
  });
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    ...queryParams,
    _page: Number.parseInt(queryParams._page) || 1,
    _limit: Number.parseInt(queryParams._limit) || 12,
    _sort: queryParams._sort || "salePrice:ASC",
  });

  useEffect(() => {
    navigate({
      search: queryString.stringify(filters),
    });
  }, [navigate, filters]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filters);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Fail product", error);
      }

      setLoading(false);
    })();
  }, [filters]);

  const handelPagiChagne = (e, page) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _page: page,
    }));
  };

  const handelSortChagne = (newSortValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _sort: newSortValue,
    }));
  };

  const handelFiltersChagne = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return (
    <BoxListPageWrapper>
      <Container>
        <Grid container spacing={1}>
          <Grid item className="left">
            <Paper>
              <ProductFilters
                filters={filters}
                onChange={handelFiltersChagne}
              />
            </Paper>
          </Grid>
          <Grid item className="right" padding={1}>
            <Paper padding={2}>
              <BoxProductWrapper>
                <ProductSort
                  currentSort={filters._sort}
                  onChange={handelSortChagne}
                />
                {loading ? (
                  <ProductSkeletonList length={12} />
                ) : (
                  <ProductList data={productList} />
                )}
                <Pagination
                  padding={1}
                  color="primary"
                  count={Math.ceil(pagination.total.data / pagination.limit)}
                  page={pagination.page}
                  onChange={handelPagiChagne}
                ></Pagination>
              </BoxProductWrapper>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </BoxListPageWrapper>
  );
}

export default ListPage;
