import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CodeIcon from "@mui/icons-material/Code";
import { Link, NavLink } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import Register from "../../features/Auth/components/Register/Register";
import CloseIcon from "@mui/icons-material/Close";
import { DialogWrapper } from "./styles";
import Login from "../../features/Auth/components/Login";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Menu, MenuItem } from "@mui/material";
import { logout } from "../../features/Auth/userSlice";

const MODE = {
  LOGIN: "login",
  REGISTER: "register",
};
function Header() {
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickUser = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <CodeIcon />
          </IconButton>
          <Typography
            color="inherit"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <Link to="/">Geum Lee</Link>
          </Typography>

          <NavLink to="/1">1</NavLink>
          <NavLink to="/2">2</NavLink>
          {!isLoggedIn && (
            <Button color="inherit" onClick={handleClickOpen}>
              LOGIN
            </Button>
          )}

          {isLoggedIn && (
            <IconButton>
              <AccountCircleIcon onClick={handleClickUser} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
      <Dialog disableEscapeKeyDown open={open}>
        <DialogWrapper>
          <CloseIcon className="icon-close" onClick={handleClose} />
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />
              <Box>
                <Button
                  color="primary"
                  className="mode"
                  onClick={() => setMode(MODE.LOGIN)}
                >
                  Already have an account. Login hear
                </Button>
              </Box>
            </>
          )}
          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />
              <Box>
                <Button
                  color="primary"
                  className="mode"
                  onClick={() => setMode(MODE.REGISTER)}
                >
                  Don't have an account. Register hear
                </Button>
              </Box>
            </>
          )}
        </DialogWrapper>
      </Dialog>
    </Box>
  );
}

export default Header;
