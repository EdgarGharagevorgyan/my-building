// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store/store";
import { BrowserRouter } from "react-router-dom";
import "./assets/styles/index.css";
import "@ant-design/v5-patch-for-react-19";
import "antd/dist/reset.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
