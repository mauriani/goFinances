import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import React from "react";
import { StatusBar } from "react-native";
import AppLoading from "expo-app-loading";
import { ThemeProvider } from "styled-components";

import { NavigationContainer } from "@react-navigation/native";

import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";
// import { AppRoutes } from "./src/routes/app.routes";

import { SignIn } from "./src/screens/SignIn";

export default function App() {
  // vamos usar isso para saber se as fonts foram ou nao carregadas
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#5636d3" />
        <SignIn />
      </NavigationContainer>
    </ThemeProvider>
  );
}
