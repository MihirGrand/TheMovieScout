import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  Button,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import icons from "../../constants/icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const PersonDetail = () => {
  const { deets } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const details = JSON.parse(deets);
  console.log(details);

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
    contentContainer: {
      paddingBottom: 20,
    },
  });

  return (
    <View className="flex-1">
      <Modal visible={loading} transparent={true} animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={{ color: "#ffffff", marginTop: 10 }}>Loading...</Text>
        </View>
      </Modal>
      {details ? (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View className="max-h-[480]">
            <Image
              className="h-full"
              source={{ uri: `https://image.tmdb.org/t/p/w780${details.profile_path}` }}
            />
            <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 rounded-bl-lg rounded-br-lg pt-10 justify-stretch">
              <View className="flex-row pl-3 items-center space-x-2">
                <TouchableHighlight
                  className="rounded-2xl w-10 h-10 items-center justify-center"
                  underlayColor="#ffffff1a"
                  onPress={() => router.replace("home")}
                >
                  <icons.Left_O height={25} width={25} stroke="#ffffff" />
                </TouchableHighlight>
                <Text className="text-white font-qmedium text-xl pb-1">Movie Details</Text>
              </View>
              <View className="flex-1 items-center space-y-4 pt-3">
                <View className="flex-row px-3 gap-3">
                  <Image
                    style={styles.shadow}
                    className="h-40 w-20 rounded-md"
                    source={{ uri: `https://image.tmdb.org/t/p/w500${details.profile_path}` }}
                  />
                  <View className="w-2/3 h-40 justify-between">
                    <Text className="text-white font-qsemibold text-xl">{details.name}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <Text>Loading...</Text>
      )}
      <StatusBar style="light" />
    </View>
  );
};

export default PersonDetail;
