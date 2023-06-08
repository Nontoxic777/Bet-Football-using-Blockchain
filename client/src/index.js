import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { MoralisProvider } from "react-moralis";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { PersistGate } from "redux-persist/lib/integration/react";

import { reducers } from "./reducers";

import i18next from "i18next";
import Cookies from "js-cookie";

i18next.init({
  lng: Cookies.get("lang") || "vi", // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {
    en: {
      translation: {},
    },
    vi: {
      translation: {},
    },
  },
});

const persistConfig = {
  key: "root",
  storage: storage,
};

const pReducer = persistReducer(persistConfig, reducers);

const store = createStore(pReducer, compose(applyMiddleware(thunk)));
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={"Loading..."} persistor={persistor}>
        <MoralisProvider initializeOnMount={false}>
          <App />
        </MoralisProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
