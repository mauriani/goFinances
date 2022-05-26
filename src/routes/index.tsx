import React, { Fragment } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "../hooks/auth";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const { user } = useAuth();

  return (
    <Fragment>
      <NavigationContainer>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Fragment>
  );
}
