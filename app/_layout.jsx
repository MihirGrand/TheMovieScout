import { StyleSheet, Text, View } from "react-native";
import { Slot, Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import GlobalProvider from "../context/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useCallback } from "react";
import LoadingIndicator from "./components/loading";

SplashScreen.preventAutoHideAsync();

const _layout = () => {
  const [fontsLoaded, fontError] = useFonts({
    "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
    "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "QuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
  });

  useEffect(() => {
    if (fontError) throw fontError;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  /*useEffect(() => {
    const setOnBoarded = async () => {
      try {
        await AsyncStorage.setItem("onBoarded", "false");
      } catch (err) {
        console.error(err);
      }
    };

    setOnBoarded();
  }, []);*/

  return (
    <GlobalProvider>
      <View className="flex-1">
        <LoadingIndicator />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="movieDetail"
            options={{
              headerShown: true,
              headerTransparent: true,
              title: "Movie Details",
              headerTitleStyle: { fontFamily: "QuickSand-SemiBold" },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="seriesDetail"
            options={{
              headerShown: true,
              headerTransparent: true,
              title: "Series Details",
              headerTitleStyle: { fontFamily: "QuickSand-SemiBold" },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="personDetail"
            options={{
              headerShown: true,
              headerTransparent: true,
              title: "Artist Details",
              headerTitleStyle: { fontFamily: "QuickSand-SemiBold" },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="search/[query]"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </View>
    </GlobalProvider>
  );
};

export default _layout;
