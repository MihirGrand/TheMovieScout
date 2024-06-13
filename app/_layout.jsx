import { StyleSheet, Text, View } from "react-native";
import { Slot, Stack } from "expo-router";
import { useFonts } from "expo-font";
import GlobalProvider from "../context/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const _layout = () => {
  const [fontsLoaded, error] = useFonts({
    "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
    "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "QuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
  });

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
          name="personDetail"
          options={{
            headerShown: true,
            headerTransparent: true,
            title: "Artist Details",
            headerTitleStyle: { fontFamily: "QuickSand-SemiBold" },
            headerTintColor: "#fff",
          }}
        />
      </Stack>
    </GlobalProvider>
  );
};

export default _layout;
