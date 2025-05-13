// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store/store";
import { BrowserRouter } from "react-router-dom";
import "./assets/styles/index.css";
import "@ant-design/v5-patch-for-react-19";
import "antd/dist/reset.css";
import { StrictMode } from "react";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
