import axios from "axios";

export const getData = () =>
  axios.get("https://gw.vnexpress.net/football/fixture?league_id=4265");

export const getBetData = () => {
  const BET_DATA_URL =
    "https://landing-sports-api.188sbk.com/api/v1/vi-vn/Vietnam/sport/1/programme/202/highlight/premium";
  return axios.get(BET_DATA_URL, {
    headers: {
      Authorization:
        "Bearer eyJpc3MiOiJBRUVBQUgiLCJqdGkiOjAsImlhdCI6MTY3MDE2NDAyMiwiZXhwIjoxNjcwMTY1ODIyLCJiYyI6IjE4ODAyXzE4OEJFVCIsImlwIjoiMTE2LjEwNy4xODAuMTcxIiwicmVnIjoiUk9BIiwiYnIiOiJWaWV0bmFtIiwidHoiOi0yNDAsImN0eiI6LTI0MCwic3YiOjAuMCwiaXN3IjpmYWxzZSwicGlkIjoiMTg4MDIiLCJjc3QiOmZhbHNlLCJjdHkiOiJWTiIsIml0YSI6ZmFsc2UsImN0YSI6dHJ1ZSwib3AiOm51bGwsInRobSI6bnVsbCwidnRpIjoiMTg4MDJfMTg4QkVUXzExNi4xMDcuMTgwLjE3MV8xNjcwMTY0MDIyX1g0VlRMNCIsImZiYSI6ZmFsc2UsImlzbWMiOmZhbHNlLCJjbXJjIjowLCJyZGlyIjp7InNpZCI6MSwicGlkIjoyMDJ9fQ.DYr4_9S_Tz4M1vFeaO3RH9VJyjUItzlKSxa0QZCwX5M",
    },
  });
};
