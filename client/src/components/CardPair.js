import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";
import InstallMetamaskDialog from "./InstallMetamaskDialog";
import { ethers } from "ethers";
import BetDialog from "./BetDialog";

export default function CardPair({ data, betData }) {
  const homeTeam = data.home_team;
  const awayTeam = data.away_team;
  let homeWinRatio, awayWinRatio, drawRatio;
  let currentResult, currentTime;
  let option;
  if (betData) {
    if (betData.ml) {
      betData.ml.map((betOption) => {
        if (betOption.t === "FT_1X2" && betOption.o && betOption.o.length) {
          betOption.o.map((option) => {
            if (option.sx === "Home") homeWinRatio = option.v;
            if (option.sx === "Away") awayWinRatio = option.v;
            if (option.sx === "Draw") drawRatio = option.v;
          });
        }
      });
    }

    currentResult = betData.i
      ? `${betData.i.h} - ${betData.i.a}`
      : `Chưa bắt đầu`;
    currentTime = betData.i ? betData.i.ct : ``;
  }

  const [isOpenInstallMetamaskDialog, setIsOpenInstallMetamaskDialog] =
    React.useState(false);
  const [isOpenBetDialog, setIsOpenBetDialog] = React.useState(false);

  const handleCloseMetamaskDialog = () => {
    setIsOpenInstallMetamaskDialog(false);
  };

  const { ethereum } = window;

  const onClickBetOptionHandler = async () => {
    if (typeof ethereum === "undefined") setIsOpenInstallMetamaskDialog(true);
    else {
      try {
        localStorage.setItem("connected", true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        setIsOpenBetDialog(() => true);
      } catch (e) {
        localStorage.setItem("connected", false);
        console.log(e);
      }
    }
  };

  const handleCloseBetDialog = () => {
    setIsOpenBetDialog(() => false);
  };

  return (
    <React.Fragment>
      <Grid item md={3}>
        <Card sx={{ maxWidth: 345 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: (theme) => theme.spacing(2),
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                alt={homeTeam.team_name}
                src={homeTeam.logo}
                sx={{
                  width: 56,
                  height: 56,
                  padding: (theme) => theme.spacing(1),
                }}
              />
              <Typography variant="body1">{homeTeam.team_name}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>{currentResult}</Typography>
              <Typography>{currentTime}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                alt={awayTeam.team_name}
                src={awayTeam.logo}
                sx={{
                  width: 56,
                  height: 56,
                  padding: (theme) => theme.spacing(1),
                }}
              />
              <Typography variant="body1">{awayTeam.team_name}</Typography>
            </Box>
          </Box>
          {/* <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent> */}
          <CardActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography type="body1">{homeWinRatio}</Typography>
              <Tooltip
                title={`Cược 1 nhận về ${homeWinRatio} nếu bạn cược đúng`}
              >
                <Button onClick={onClickBetOptionHandler} size="small">
                  {homeTeam.team_name} Thắng
                </Button>
              </Tooltip>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography type="body1">{drawRatio}</Typography>
              <Tooltip title={`Cược 1 nhận về ${drawRatio} nếu bạn cược đúng`}>
                <Button onClick={onClickBetOptionHandler} size="small">
                  Hòa
                </Button>
              </Tooltip>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography type="body1">{awayWinRatio}</Typography>
              <Tooltip
                title={`Cược 1 nhận về ${awayWinRatio} nếu bạn cược đúng`}
              >
                <Button onClick={onClickBetOptionHandler} size="small">
                  {awayTeam.team_name} Thắng
                </Button>
              </Tooltip>
            </Box>
          </CardActions>
        </Card>
      </Grid>
      <InstallMetamaskDialog
        open={isOpenInstallMetamaskDialog}
        handleClose={handleCloseMetamaskDialog}
      />
      <BetDialog
        homeWinRatio={homeWinRatio}
        awayWinRatio={awayWinRatio}
        drawRatio={drawRatio}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        open={isOpenBetDialog}
        handleClose={handleCloseBetDialog}
        pairName={betData.fn.trim()}
      />
    </React.Fragment>
  );
}
