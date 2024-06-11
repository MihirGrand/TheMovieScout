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

const MovieDetail = () => {
  const { deets, creds } = useLocalSearchParams();
  const navigation = useNavigation();
  const details = JSON.parse(deets);
  const credits = JSON.parse(creds);
  console.log(details);
  let desc = details.overview.split(".");
  let overview = desc.slice(0, 2).join(". ").trim();
  if (overview.length < 300 && details.overview.length > 300) {
    overview = desc.slice(0, 3).join(". ");
  }

  if (!overview.endsWith("?") && !overview.endsWith(".")) {
    overview += ".";
  }

  let release = new Date(details.release_date);

  const renderItem = ({ item }) => (
    <TouchableHighlight underlayColor={"transparent"} onPress={() => handlePress(item)}>
      <View key={item.id} className="w-24 p-2">
        <Image
          className="h-40 rounded-md"
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.profile_path}` }}
          resizeMode="cover"
        />
        <Text className="font-qbold text-wrap text-center">{item.name}</Text>
        <Text className="font-qmedium text-wrap text-center">as {item.character}</Text>
      </View>
    </TouchableHighlight>
  );

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
    <View className="flex-1 align-center">
      {details ? (
        <>
          <Image
            className="w-full h-1/2 top-0 absolute"
            resizeMode="cover"
            source={{ uri: `https://image.tmdb.org/t/p/w780${details.backdrop_path}` }}
          />
          <View className="top-0 h-1/2 w-full absolute bg-black/70">
            {/*<LinearGradient className="h-full" colors={["transparent", "#000000"]} />*/}
          </View>
          <View className="top-0 h-full absolute pt-10 ">
            <View className="flex-1 items-center h-1/2 space-y-4">
              <View className="flex-row px-3 gap-3">
                <Image
                  style={styles.shadow}
                  className="h-40 w-20 rounded-md"
                  source={{ uri: `https://image.tmdb.org/t/p/w500${details.poster_path}` }}
                />
                <View className="w-2/3 h-40 justify-between">
                  <Text className="text-white font-qsemibold text-xl">{details.title}</Text>
                  <View className="flex-row items-center space-x-2">
                    <icons.Star_O height={20} width={20} stroke={"#ffffff" /*"#f1c40f"*/} />
                    <Text className="text-white">{details.vote_average.toPrecision(2)}</Text>
                  </View>
                  <Text className="text-white rounded-md">
                    {details.adult ? "🔞  A" : "⚠️  U/A"}
                  </Text>
                  <View className="flex-row items-center space-x-2">
                    <icons.Calendar_O height={20} width={20} stroke="#ffffff" />
                    <Text className="text-white">
                      {details.status} on{" "}
                      {`${release.getDate()}/${release.getMonth()}/${release.getFullYear()}`}
                    </Text>
                  </View>
                </View>
              </View>
              <View className="flex-row space-x-2 items-center px-5 w-full">
                {details.genres.map((x) => (
                  <View className="">
                    <Text
                      key={x.id}
                      className="border border-primaryHover bg-primary/20 rounded-lg p-2 text-white"
                    >
                      {x.name}
                    </Text>
                  </View>
                ))}
              </View>
              <Text className="text-white text-justify px-5">{overview}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <FlatList
                data={credits}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <Button title="Back" onPress={() => navigation.goBack()} />
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
      <StatusBar style="light" />
    </View>
  );
};

export default MovieDetail;
