/* import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput, SafeAreaView, Button } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Link, router } from "expo-router";
import { useEffect } from "react";

import images from "../constants/images";

const duration = 2000;

export default function App() {
  const sv = useSharedValue(0);

  useEffect(() => {
    sv.value = withRepeat(withTiming(1, { duration, }), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value * 360}deg` }],
  }));

  return (
    <SafeAreaView className="flex-1 gap-2 bg-bglight h-full pt-10 items-center">
      <Animated.View style={animatedStyle}>
        <images.Video_Streaming height={300} className="drop-shadow-lg" />
      </Animated.View>
      <Button title="Home" onPress={() => router.push("home")}>
        Home
      </Button>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
 */

import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput, SafeAreaView, Button } from "react-native";
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

import images from "../constants/images";
import { useGlobalContext } from "../context/GlobalProvider";

const duration = 2000;

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
    transform: [{ translateY: sv.value * 20 - 10 }],
  }));

  return (
    <SafeAreaView className="flex-1 gap-2 bg-bglight h-full pt-10 items-center">
      <Animated.View style={animatedStyle}>
        <images.Video_Streaming height={250} className="drop-shadow-lg" />
      </Animated.View>
      <Button
        title="Home"
        onPress={async () => {
          router.push("home");
          try {
            await AsyncStorage.setItem("onBoarded", "true");
          } catch (err) {
            console.error(err);
          }
        }}
      >
        Home
      </Button>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
