import { GET_DATA } from "../utils/actionTypes";

import * as api from "../utils/api.js";

export const appActions = {
  getData: (callBack, displayErrorMessage) => async (dispatch) => {
    try {
      const { data } = await api.getData();
      if (data.code === 200) {
        const footballMatches = data.data["4265"].data;
        const futurefootballMatches = footballMatches.filter(
          (footballMatche) => {
            return footballMatche.status !== "Match Finished";
          }
        );
        callBack(futurefootballMatches);
      } else console.log("Get Data Failed");
    } catch (error) {
      console.log(error);
      if (displayErrorMessage) displayErrorMessage(error.message);
    }
  },
  getBetData: (callBack, displayErrorMessage) => async (dispatch) => {
    try {
      const { data } = await api.getBetData();
      if (data.d) {
        callBack(data.d.pg);
      } else console.log("Get BET Data Failed");
    } catch (error) {
      console.log(error);
      if (displayErrorMessage) displayErrorMessage(error.message);
    }
  },
};
