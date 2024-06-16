import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Button,
  TouchableHighlight,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Link, router, Redirect } from "expo-router";
import { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

import images from "../constants/images";
import { useGlobalContext } from "../context/GlobalProvider";

const duration = 1500;

export default function App() {
  const sv = useSharedValue(0);

  const { onBoarded } = useGlobalContext();

  if (onBoarded) return <Redirect href="/home" />;

  useEffect(() => {
    const setOnBoarded = async () => {
      try {
        await AsyncStorage.setItem("onBoarded", "false");
      } catch (err) {
        console.error(err);
      }
    };

    setOnBoarded();

    sv.value = withRepeat(
      withTiming(1, { duration, easing: Easing.inOut(Easing.cubic) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sv.value * 10 - 5 }],
  }));

  const styles = StyleSheet.create({
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6,
    },
  });

  return (
    <View className="flex-1 justify-center gap-5 bg-bgdark h-full pt-10 items-center">
      <images.Logo
        height={700}
        width={700}
        fill="#f5cb5c0d"
        stroke="#f5cb5c0d"
        className="absolute top-0 right-0 translate-x-80 -translate-y-12"
      />
      <images.Detective height={100} width={100} fill="#f5cb5c" stroke="#f5cb5c" />
      <Text className="text-primary font-qbold text-3xl drop-shadow-lg pt-5">The Movie Scout</Text>
      {/*<Animated.View style={animatedStyle}>
        <images.Video_Streaming height={250} className="drop-shadow-lg" />
      </Animated.View>*/}
      <Text className="text-primary font-qsemibold text-lg drop-shadow-lg px-10 text-center">
        Trying to find a movie, but can't find "the one"?
      </Text>
      <Text className="text-primary font-qsemibold text-lg drop-shadow-lg px-10">
        Look no further!
      </Text>
      <LinearGradient
        className="rounded-lg  w-4/6"
        colors={["#f5cb5c", "#D9A003"]}
        style={styles.shadow}
      >
        <TouchableHighlight
          className="rounded-lg w-full items-center py-3"
          underlayColor="#F3DFA9"
          onPress={() => router.replace("home") /*router.push("/movieDeet")*/}
        >
          <Text className="text-bgdark-100 font-qbold text-lg drop-shadow-lg">Dive in</Text>
        </TouchableHighlight>
      </LinearGradient>
      <StatusBar style="light" />
    </View>
  );
}
