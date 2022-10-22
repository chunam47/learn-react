import React from "react";
import PropTypes from "prop-types";
import { Box, Container } from "@mui/system";
import { Grid, Paper } from "@mui/material";

DetailPage.propTypes = {};

function DetailPage(props) {
  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className="left">
            <Paper>IMG</Paper>
          </Grid>
          <Grid item className="right" padding={1}>
            <Paper padding={2}>Info</Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default DetailPage;
