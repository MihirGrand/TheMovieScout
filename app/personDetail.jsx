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
  ImageBackground,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import icons from "../constants/icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const PersonDetail = () => {
  const { deets, creds } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const details = JSON.parse(deets);
  const parse = JSON.parse(creds).cast;
  const credits = parse.sort((a, b) => b.popularity - a.popularity);

  const birthday = new Date(details.birthday);
  const deathday = new Date(details.deathday);

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
      width: "35%",
    },
    contentContainer: {
      flexGrow: 1,
      paddingBottom: 20,
    },
  });

  const biography = details.biography.split("\n")[0];

  const handleMoviePress = async (item) => {
    setLoading(true);
    try {
      const detailsUrl = `https://api.themoviedb.org/3/movie/${item.id}?language=en-US`;
      const creditsUrl = `https://api.themoviedb.org/3/movie/${item.id}/credits?language=en-US`;
      const recsUrl = `https://api.themoviedb.org/3/movie/${item.id}/recommendations?language=en-US`;
      const responses = await Promise.all([
        fetch(detailsUrl, options),
        fetch(creditsUrl, options),
        fetch(recsUrl, options),
      ]);
      const [detailsResponse, creditsResponse, recsResponse] = responses;
      const detailsJson = await detailsResponse.json();
      const credJson = await creditsResponse.json();
      const recsJson = await recsResponse.json();
      const creditsJson = credJson.cast.sort((a, b) => b.rank - a.rank).slice(0, 10);
      setLoading(false);
      router.push({
        pathname: "movieDetail",
        params: {
          deets: JSON.stringify(detailsJson),
          creds: JSON.stringify(creditsJson),
          recs: JSON.stringify(recsJson),
        },
      });
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setLoading(false);
    }
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_SECRET}`,
    },
  };

  const renderCred = ({ item }) => (
    <TouchableHighlight underlayColor={"transparent"} onPress={() => handleMoviePress(item)}>
      <View key={item.id} className="w-28 p-2">
        <Image
          className="h-40 rounded-md"
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          resizeMode="cover"
        />
        <Text
          className="text-lightText font-qregular text-md text-wrap text-center pt-1"
          numberOfLines={2}
        >
          {item.title}
        </Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View className="flex-1 bg-bgdark-100">
      {/*<Modal visible={loading} transparent={true} animationType="fade">
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
      </Modal>*/}
      {details ? (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View className="flex-1 h-3/5 rounded-bl-xl rounded-br-xl">
            <ImageBackground
              imageStyle={{ borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}
              source={{ uri: `https://image.tmdb.org/t/p/w780${details.profile_path}` }}
            >
              <View className=" bg-black/80 rounded-bl-xl rounded-br-xl pt-10 justify-stretch">
                <View className="flex-1 items-center space-y-4 pt-10">
                  <View className="flex-row justify-between w-full px-5 space-x-5">
                    <Image
                      style={styles.shadow}
                      className="rounded-md"
                      resizeMode="stretch"
                      source={{ uri: `https://image.tmdb.org/t/p/w500${details.profile_path}` }}
                    />
                    <View className="w-2/3 h-48 justify-start space-y-5">
                      <Text className="text-white font-qsemibold text-xl">{details.name}</Text>
                      <View className="flex-row items-center space-x-2 pr-10">
                        <icons.Marker_F height={20} width={20} stroke="#ffffff" />
                        <Text className="text-white">
                          Born at
                          {` ${details.place_of_birth}`}
                        </Text>
                      </View>
                      <View className="flex-row items-center space-x-2 pr-10">
                        <icons.Marker_F height={20} width={20} stroke="#ffffff" />
                        <Text className="text-white">
                          Born at
                          {` ${details.place_of_birth}`}
                        </Text>
                      </View>
                      <View className="flex-row items-center space-x-2">
                        <icons.Calendar_O height={20} width={20} stroke="#ffffff" />
                        <Text className="text-white">
                          Born on
                          {` ${birthday.getDate()}/${
                            birthday.getMonth() + 1
                          }/${birthday.getFullYear()}`}
                        </Text>
                      </View>
                      {details.deathday != null && (
                        <View className="flex-row items-center space-x-2">
                          <icons.Calendar_O height={20} width={20} stroke="#ffffff" />
                          <Text className="text-white">
                            Born on
                            {` ${birthday.getDate()}/${
                              birthday.getMonth() + 1
                            }/${birthday.getFullYear()}`}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <Text className="text-white text-justify px-5 pb-5">{biography}</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View className="">
            <View className="flex-row items-center py-2 px-4">
              <icons.VideoCamera_F height={20} width={20} fill="#f5cb5c" />
              <Text className="text-primary font-qmedium text-lg pl-2 pb-1">Appeared in</Text>
            </View>
            <FlatList
              class="px-5"
              contentContainerStyle={{ paddingRight: 10, paddingLeft: 10 }}
              data={credits}
              renderItem={renderCred}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={true}
              fadingEdgeLength={100}
            />
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
