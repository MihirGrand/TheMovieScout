import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import icons from "../../constants/icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const PersonDetail = () => {
  const { deets, creds } = useLocalSearchParams();
  return (
    <View>
      <Text>PersonDetail</Text>
    </View>
  );
};

export default PersonDetail;
