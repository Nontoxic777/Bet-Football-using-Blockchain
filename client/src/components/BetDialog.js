import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ethers } from "ethers";
import { abi, contractAddresses } from "../constants";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Alert, Link, Typography, useStepperContext } from "@mui/material";
import { listenForTransactionMine } from "../utils/method";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function BetDialog({
  homeWinRatio,
  awayWinRatio,
  drawRatio,
  homeTeam,
  awayTeam,
  open,
  handleClose,
  pairName,
}) {
  const [provider, setProvider] = React.useState(null);
  const [chainId, setChainId] = React.useState(null);
  const [betFootballAddress, setBetFootballAddress] = React.useState(null);
  const [currentAccount, setCurrentAccount] = React.useState(null);
  const [betFootballContract, setBetFootballContract] = React.useState(null);
  const [maxBetAmount, setMaxBetAmount] = React.useState("0");
  const [minBetAmount, setMinBetAmount] = React.useState("0");
  const [currentAccountAsset, setCurrentAccountAsset] = React.useState(null);
  const [isInputError, setIsInputError] = React.useState(false);
  const [betAmount, setBetAmount] = React.useState(0);
  const [pairId, setPairId] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpenSuccess, setIsOpenSuccess] = React.useState(false);
  const [tx, setTx] = React.useState("");

  const initalAPI = async () => {
    try {
      let newProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(() => newProvider);
      let newChainId = (await newProvider.getNetwork()).chainId;
      setChainId(() => newChainId);
      let newBetFootballAddress =
        newChainId in contractAddresses
          ? contractAddresses[newChainId][0]
          : null;
      setBetFootballAddress(() => newBetFootballAddress);

      const signer = await newProvider.getSigner();

      let newBetFootballContract = new ethers.Contract(
        newBetFootballAddress,
        abi,
        signer
      );

      setBetFootballContract(() => newBetFootballContract);

      let newMaxBetAmount = await newBetFootballContract.getBetMaxAmount();
      let newMinBetAmount = await newBetFootballContract.getBetMinAmount();
      let newPairId = await newBetFootballContract.getPairId(pairName);
      setPairId(() => newPairId);

      setMaxBetAmount(() => newMaxBetAmount);
      setMinBetAmount(() => newMinBetAmount);
    } catch (e) {
      console.log(e);
      //   alert("Bạn cần kết nối với ví");
    }
  };

  React.useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      initalAPI();
    }
  }, []);

  const getAccountInfo = async () => {
    if (provider) {
      let newCurrentAccount = (
        await provider.send("eth_requestAccounts", [])
      )[0];
      setCurrentAccount(() => newCurrentAccount);
      let newCurrentAccountBalance = await provider.getBalance(
        newCurrentAccount
      );
      setCurrentAccountAsset(() => newCurrentAccountBalance);
    }
  };

  React.useEffect(() => {
    if (open) {
      getAccountInfo();
    }
  }, [open]);

  const [alignment, setAlignment] = React.useState(null);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleOnChangeInput = (e) => {
    let value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      if (
        value > parseFloat(ethers.utils.formatEther(maxBetAmount)) ||
        value < parseFloat(ethers.utils.formatEther(minBetAmount))
      ) {
        setIsInputError(() => true);
      } else {
        setIsInputError(() => false);
        setBetAmount(ethers.utils.parseEther(value.toFixed(2)));
      }
    }
  };

  const onClickBetHandler = async () => {
    let isHomeWin = alignment === homeWinRatio;
    let isDraw = alignment === drawRatio;
    let isAwayWin = alignment === awayWinRatio;

    const betOption = isHomeWin ? "0" : isDraw ? "1" : "2";

    if (betFootballContract && provider) {
      setIsLoading(() => true);
      try {
        const tx = await betFootballContract.betToAPair(
          pairId.toString(),
          ethers.utils.parseEther(alignment).toString(),
          betOption,
          {
            value: betAmount,
          }
        );

        setTx(() => tx.hash);
        await listenForTransactionMine(tx, provider);
        console.log("Done!!!");
        setIsLoading(() => false);
        setIsOpenSuccess(() => true);
        handleClose();
      } catch (e) {
        setIsLoading(() => false);
        alert(
          "Kèo này đang có vấn đề, nên chưa thể đặt được. Xin thông cảm, vui lòng đặt kèo khác"
        );
      }
    }
  };

  const handleCloseSuccessBox = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsOpenSuccess(false);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        {isLoading ? (
          <>
            <Typography>Đang thực hiện</Typography>
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </>
        ) : (
          <>
            <DialogTitle>
              Đặt cược trận đấu {homeTeam.team_name} - {awayTeam.team_name}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Vui lòng chọn kết quả dự đoán và số tiền giả lập bạn muốn đặt{" "}
                <br />
                (Bạn chỉ được phép đặt tối đa{" "}
                <b>
                  {maxBetAmount && ethers.utils.formatEther(maxBetAmount)} tiền
                  giả lập
                </b>{" "}
                và tối thiểu{" "}
                <b>
                  {minBetAmount && ethers.utils.formatEther(minBetAmount)} tiền
                  giả lập
                </b>{" "}
                cho 1 lần đặt)
              </DialogContentText>
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                sx={{
                  padding: (theme) => theme.spacing(2),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <ToggleButton
                  value={homeWinRatio}
                  sx={{
                    borderRadius: "0.25rem !important",
                    border: "1px solid grey !important",
                  }}
                >
                  {homeTeam.team_name} thắng
                </ToggleButton>
                <ToggleButton
                  value={drawRatio}
                  sx={{
                    borderRadius: "0.25rem !important",
                    border: "1px solid grey !important",
                  }}
                >
                  Hòa
                </ToggleButton>
                <ToggleButton
                  value={awayWinRatio}
                  sx={{
                    borderRadius: "0.25rem !important",
                    border: "1px solid grey !important",
                  }}
                >
                  {awayTeam.team_name} thắng
                </ToggleButton>
              </ToggleButtonGroup>

              <Alert severity="info">
                Đặt 1 bạn sẽ nhận được <b>{alignment}</b> nếu kết quả dự đoán
                của bạn chính xác
              </Alert>

              <TextField
                error={isInputError}
                autoFocus
                margin="dense"
                id="name"
                label="Nhập số tiền giả lập bạn muốn đặt"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleOnChangeInput}
                helperText={
                  isInputError ? "Vui lòng nhập đúng số tiền giả lập" : ""
                }
              />

              <Typography variant="body2">
                Tài khoản bạn hiện đang có{" "}
                <b>
                  {currentAccountAsset &&
                    ethers.utils.formatEther(currentAccountAsset)}{" "}
                  tiền giả lập
                </b>
              </Typography>
            </DialogContent>
            <DialogActions
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button variant="contained" onClick={handleClose}>
                Thoát
              </Button>
              <Button variant="contained" onClick={onClickBetHandler}>
                Đặt Cược
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      <Snackbar
        open={isOpenSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSuccessBox}
          severity="success"
          sx={{ width: "100%" }}
        >
          Bạn đã thực hiện đặt cược, xem thông tin{" "}
          <Link href={`https://goerli.etherscan.io/tx/${tx}`}>ở đây</Link>
        </Alert>
      </Snackbar>
    </div>
  );
}
