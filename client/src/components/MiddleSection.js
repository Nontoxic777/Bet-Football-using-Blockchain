import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { useDispatch, useSelector } from "react-redux";

import { appActions } from "../actions/appActions";
import CardPair from "./CardPair";

function MiddleSection() {
  const dispatch = useDispatch();
  const [pairs, setPairs] = useState(null);
  const [betData, setBetData] = useState(null);

  const callBack = (data) => {
    setPairs(() => data);
    console.log(data);
  };

  const getCallBackData = (data) => {
    let matches = [];
    if (data && data.length) {
      for (let i = 0; i < data.length; i++) {
        data[i].e.map((match) => {
          matches.push(match);
        });
      }
    }
    setBetData(() => matches);
  };

  useEffect(() => {
    dispatch(appActions.getData(callBack));
    setInterval(() => {
      dispatch(appActions.getBetData(getCallBackData));
    }, 2000);
    return () => {};
  }, [dispatch]);

  return (
    <React.Fragment>
      <Box sx={{ margin: (theme) => theme.spacing(5) }}>
        <Box
          sx={{
            margin: "auto",
          }}
        >
          <Grid container spacing={4}>
            {pairs &&
              betData &&
              pairs.map((pair, index) => {
                return (
                  <CardPair
                    key={index}
                    data={pair}
                    betData={betData.find((bet) => {
                      return (
                        bet.fn.includes(pair.home_team.team_name_full) ||
                        bet.fn.includes(pair.away_team.team_name_full)
                      );
                    })}
                  />
                );
              })}
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default MiddleSection;
