import React from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { FilterBySeviceWrapper } from "./styles";

FilterBySevice.propTypes = {
  filter: PropTypes.object,
  onChange: PropTypes.func,
};

function FilterBySevice({ filter = {}, onChange }) {
  const handleChange = (e) => {
    if (!onChange) return;

    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  const checkList = [
    { value: "isPromotion", label: "Có khuyến mãi" },
    { value: "isFreeShip", label: "Miễn phí vận chuyển" },
  ];
  return (
    <FilterBySeviceWrapper>
      <Typography>DỊCH VỤ</Typography>
      <List>
        {checkList.map((service) => (
          <ListItem className="list-item" key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filter[service.value])}
                  onChange={handleChange}
                  name={service.value}
                  color="primary"
                />
              }
              label={service.label}
            />
          </ListItem>
        ))}
      </List>
    </FilterBySeviceWrapper>
  );
}

export default FilterBySevice;
