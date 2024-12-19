import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "material-icons/iconfont/material-icons.css";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </StrictMode>
);
