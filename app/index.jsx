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
    <SafeAreaView className="flex-1 justify-center gap-5 bg-bglight h-full pt-10 items-center">
      <Text className="text-primary font-semibold text-3xl drop-shadow-lg">The Movie Scout</Text>
      <Animated.View style={animatedStyle}>
        <images.Video_Streaming height={250} className="drop-shadow-lg" />
      </Animated.View>
      <Text className="text-primary font-medium text-lg drop-shadow-lg">
        Trying to find a movie but can't find 'the one'? Look no further!
      </Text>
      <TouchableHighlight
        className="bg-primary rounded-lg w-4/6 py-3 items-center"
        style={styles.shadow}
        underlayColor="#f24f63"
        onPress={() => router.replace("home")}
      >
        <Text className="text-white font-semibold text-lg drop-shadow-lg">Dive in</Text>
      </TouchableHighlight>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
