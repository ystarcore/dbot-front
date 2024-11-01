import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { ConfigProvider } from "antd";

import { store } from "./app.store";

import Layout from "../pages/layout";
import Login from "../pages/login";
import Home from "../pages/home";
import Dash from "../pages/dash";

import "antd/dist/reset.css";

const PrivateRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.app.isAuth);
  return isAuth ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Provider store={store}>
      <ConfigProvider>
        <Router>
          <Layout />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/dash"
              element={
                <PrivateRoute>
                  <Dash />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </Router>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
