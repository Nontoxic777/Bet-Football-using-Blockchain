import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "@mui/material/Link";
import InstallMetamaskDialog from "./InstallMetamaskDialog";
import { ethers } from "ethers";

const pages = [];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [isOpenInstallMetamaskDialog, setIsOpenInstallMetamaskDialog] =
    useState(false);

  const { ethereum } = window;

  const [currenAccount, setCurrenAccount] = useState(null);

  const connectWalletHandler = async () => {
    try {
      localStorage.setItem("connected", true);
      if (!ethereum) setIsOpenInstallMetamaskDialog(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts.length) setCurrenAccount(() => accounts[0]);
    } catch (e) {
      console.log(e);
      localStorage.setItem("connected", false);
    }
  };

  useEffect(() => {
    if (typeof ethereum !== "undefined") {
      if (localStorage.getItem("connected") === "true") connectWalletHandler();

      ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length) setCurrenAccount(() => accounts[0]);
      });

      ethereum.on("disconnect", () => {
        console.log("Disconnected");
      });
    }

    return () => {};
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseMetamaskDialog = () => {
    setIsOpenInstallMetamaskDialog(false);
  };

  return (
    <React.Fragment>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Nhà Cái 88
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Button onClick={connectWalletHandler} variant="outline">
                {currenAccount
                  ? `${currenAccount.substr(0, 6)}...${currenAccount.substr(
                      currenAccount.length - 4,
                      currenAccount.length
                    )}`
                  : "Kết nối với Ví"}
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <InstallMetamaskDialog
        open={isOpenInstallMetamaskDialog}
        handleClose={handleCloseMetamaskDialog}
      />
    </React.Fragment>
  );
}
export default Header;
