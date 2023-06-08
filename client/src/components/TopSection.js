import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { Button, Tooltip, Typography } from "@mui/material";
import { useApiContract, useMoralis } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { ethers } from "ethers";
import GuildeDialog from "./GuildeDialog";

function TopSection() {
  const [balanceOfContract, setBalanceOfContract] = useState("0");
  let provider, chainId, betFootballAddress;

  const [isDisplayGuildeDialog, setisDisplayGuildeDialog] = useState(false);

  const initalAPI = async () => {
    if (typeof window.ethereum !== "undefined") {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      chainId = (await provider.getNetwork()).chainId;
      betFootballAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null;
      let balance = await provider.getBalance(betFootballAddress);
      setBalanceOfContract(() => balance);
    }
  };

  useEffect(() => {
    initalAPI();
    return () => {};
  }, []);

  const handleCloseGuildeDialog = () => {
    setisDisplayGuildeDialog(() => false);
  };

  const openGuildeDialog = () => {
    setisDisplayGuildeDialog(() => true);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          margin: "auto",
          width: { lg: "600px" },
          marginTop: (theme) => theme.spacing(2),
        }}
      >
        <Alert severity="warning">
          Toàn bộ tài sản trên trang web này đều không có giá trị sử dụng.{" "}
          <br />
          Mọi hành động cá cược trên trang web này đều là giả lập. <br />
          Do đó, tiền hay tài sản trên trang web này cũng là giả lập - không thể
          nạp hay rút những tài sản này.
          <br />
          <br />
          Bất cứ ai nhân danh chúng tôi yêu cầu bạn nạp tiền, thì đó chắc chắn
          là lừa đảo. Xin lưu ý, bất cứ hành động nào liên quan tới tiền của các
          bạn. Chúng tôi sẽ không chịu trách nhiệm. Hãy cẩn thận và có trách
          nhiệm với những đồng tiền của mình.
        </Alert>
        <Box
          sx={{
            marginTop: (theme) => theme.spacing(2),
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={openGuildeDialog} variant="contained">
            Hướng dẫn sử dụng
          </Button>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Tooltip title="Tiền giả lập">
              <Button
                onClick={() => {
                  window.open("https://goerlifaucet.com/", "_blank").focus();
                }}
                variant="contained"
              >
                Nhận Goerli ETH (FREE)
              </Button>
            </Tooltip>
          </Box>
        </Box>
        <Box sx={{ marginTop: (theme) => theme.spacing(2) }}>
          <Alert severity="info">
            Tài sản hiện tại của nhà cái:{" "}
            {ethers.utils.formatEther(balanceOfContract)} ETH (Nhà cái giả lập)
          </Alert>
        </Box>
      </Box>
      <GuildeDialog
        handleClose={handleCloseGuildeDialog}
        open={isDisplayGuildeDialog}
      />
    </React.Fragment>
  );
}

export default TopSection;
