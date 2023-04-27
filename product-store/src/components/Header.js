import React from "react";
import { useState } from "react";
import { AppBar, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [value, setValue] = useState();
  return (
    <div>
      <AppBar position="sticky" sx={{ bgcolor: "#2E3B55" }}>
        <Toolbar>
          <Typography>
            <ProductionQuantityLimitsIcon />{" "}
          </Typography>
          <Tabs
            sx={{ ml: "auto" }}
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={NavLink} to="/" label="Home" id="home-Page" />
            <Tab
              LinkComponent={NavLink}
              to="/products"
              label="View Products"
              id="view-Product-Page"
            />
            <Tab LinkComponent={NavLink} to="/add" label="Add Product" />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
