import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "styled-components";
import { Routes } from "./src/routes";

import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { AuthProvider, useAuth } from "./src/hooks/auth";

import theme from "./src/global/styles/theme";

export default function App() {
  // vamos usar isso para saber se as fonts foram ou nao carregadas
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const { userStorageLoading } = useAuth();

  async function load() {
    if (!fontsLoaded || userStorageLoading) {
      await SplashScreen.preventAutoHideAsync();
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } else {
      await SplashScreen.hideAsync();
    }
  }

  useEffect(() => {
    load();
  }, [fontsLoaded, userStorageLoading]);

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
