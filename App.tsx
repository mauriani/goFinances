import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "styled-components";
import * as Font from "expo-font";
import { Routes } from "./src/routes";

import {
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { AuthProvider, useAuth } from "./src/hooks/auth";

import theme from "./src/global/styles/theme";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { userStorageLoading } = useAuth();

  const useFonts = async () => {
    await Font.loadAsync({
      medium: Poppins_500Medium,
      regular: Poppins_400Regular,
      bold: Poppins_700Bold,
    });
  };

  async function load() {
    if (!fontsLoaded || userStorageLoading) {
      await SplashScreen.preventAutoHideAsync();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setFontsLoaded(true);
    } else {
      await SplashScreen.hideAsync();
    }
  }

  const LoadFonts = async () => {
    await useFonts(); // Here we will have to await the call
  };

  useEffect(() => {
    load();
    LoadFonts();
  }, [fontsLoaded, userStorageLoading]);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
