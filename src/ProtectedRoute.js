import React from "react";
import { Route, Redirect } from "react-router-dom";
import _ from "lodash";

function requireAuth(emailKey) {
  return JSON.parse(localStorage.getItem(emailKey)).isUserLoggedIn;
}

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          _.get(props.location, "state.email") &&
          requireAuth(props.location.state.email)
        ) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          );
        }
      }}
    />
  );
};
