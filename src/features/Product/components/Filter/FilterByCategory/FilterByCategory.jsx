import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import categoryApi from "../../../../../api/categoryApi";
import { List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { FilterByCategoryWrapper, ListItemWrapper } from "./styles";

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

function FilterByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        const listData = list.data;
        setCategoryList(
          listData.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log("Failed category list", error);
      }
    })();
  }, []);

  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange(category.id);
    }
  };

  return (
    <FilterByCategoryWrapper>
      <Typography>DANH MỤC SẢN PHẨM</Typography>

      <List>
        {categoryList.map((category) => (
          <ListItemWrapper
            key={category.id}
            onClick={() => handleCategoryClick(category)}
          >
            <ListItemButton className="list__item">
              <ListItemText primary={category.name} />
            </ListItemButton>
          </ListItemWrapper>
        ))}
      </List>
    </FilterByCategoryWrapper>
  );
}

export default FilterByCategory;
