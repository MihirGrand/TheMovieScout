import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  FlatList,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useNavigation, router } from "expo-router";
import icons from "../constants/icons";
import images from "../constants/images";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const MovieDetail = () => {
  const { deets, creds, recs } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [tomatometer, setTomatometer] = useState("");
  const [imdb, setImdb] = useState("");
  const navigation = useNavigation();
  const details = JSON.parse(deets);
  const credits = JSON.parse(creds);
  const recoms = JSON.parse(recs).results;
  let desc = details.overview.split(".");
  let overview = desc.slice(0, 2).join(". ").trim();
  if (overview.length < 300 && details.overview.length > 300) {
    overview = desc.slice(0, 3).join(". ");
  }

  if (!overview.endsWith("?") && !overview.endsWith(".")) {
    overview += ".";
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch(`${process.env.EXPO_PUBLIC_API_URL}/tm?name=${details.title}`, {
            method: "POST",
          }),
          fetch(`${process.env.EXPO_PUBLIC_API_URL}/im?id=${details.imdb_id}`, {
            method: "POST",
          }),
        ]);
        const [rottenResponse, imResponse] = responses;
        const rotten = (await rottenResponse.json()).score;
        const imdb = (await imResponse.json()).rating;
        setTomatometer(rotten);
        setImdb(imdb);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [deets]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_SECRET}`,
    },
  };

  let release = new Date(details.release_date);

  const handlePersonPress = async (item) => {
    setLoading(true);
    try {
      const personUrl = `https://api.themoviedb.org/3/person/${item.id}?language=en-US`;
      const response = await fetch(personUrl, options);
      const Json = await response.json();
      setLoading(false);
      router.push({
        pathname: "personDetail",
        params: { deets: JSON.stringify(Json) },
      });
    } catch (error) {
      console.error("Error fetching person details:", error);
      setLoading(false);
    }
  };

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

  const renderRec = ({ item }) => (
    <TouchableHighlight underlayColor={"transparent"} onPress={() => handleMoviePress(item)}>
      <View key={item.id} className="w-24 p-2">
        <Image
          className="h-40 rounded-md"
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          resizeMode="cover"
        />
        <Text className="font-qbold text-wrap text-center">{item.title}</Text>
      </View>
    </TouchableHighlight>
  );

  const renderItem = ({ item }) => (
    <TouchableHighlight underlayColor={"transparent"} onPress={() => handlePersonPress(item)}>
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
      width: "32%",
    },
    contentContainer: {
      flexGrow: 1,
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
          <View className="flex-1 h-3/5 rounded-bl-lg rounded-br-lg">
            <ImageBackground
              style={{ borderBottomLeftRadius: 20 }}
              source={{ uri: `https://image.tmdb.org/t/p/w780${details.backdrop_path}` }}
            >
              <View className=" bg-black/70 rounded-bl-lg rounded-br-lg pt-10 justify-stretch">
                {/*<View className="flex-row pl-3 items-center space-x-2">
                  <TouchableHighlight
                    className="rounded-2xl w-10 h-10 items-center justify-center"
                    underlayColor="#ffffff1a"
                    onPress={() => router.replace("home")}
                  >
                    <icons.Left_O height={25} width={25} stroke="#ffffff" />
                  </TouchableHighlight>
                  <Text className="text-white font-qmedium text-xl pb-1">Movie Details</Text>
                </View>*/}
                <View className="flex-1 items-center space-y-4 pt-10">
                  <View className="flex-row justify-between w-full px-5 space-x-5">
                    <Image
                      style={styles.shadow}
                      className="rounded-md"
                      resizeMode="stretch"
                      source={{ uri: `https://image.tmdb.org/t/p/w500${details.poster_path}` }}
                    />
                    <View className="w-2/3 h-48 justify-between">
                      <Text className="text-white font-qsemibold text-xl">{details.title}</Text>
                      <View className="flex-row items-center space-x-2">
                        <icons.Star_O height={20} width={20} stroke={"#ffffff"} />
                        <Text className="text-white">{details.vote_average.toPrecision(2)}</Text>
                      </View>
                      <View className="flex-row items-center space-x-2">
                        {images.Imdb(12, 20, "#FFEA00")}
                        <Text className="text-white">{`${imdb}/10`}</Text>
                      </View>
                      <View className="flex-row items-center space-x-[12] pl-[1]">
                        {images.Tomato(16, 16, "#FFC300")}
                        <Text className="text-white">{tomatometer}</Text>
                      </View>
                      <Text className="text-white rounded-md pl-0.5">
                        {details.adult ? "🔞  A" : "⚠️  U/A"}
                      </Text>
                      <View className="flex-row items-center space-x-2">
                        <icons.Calendar_O height={20} width={20} stroke="#ffffff" />
                        <Text className="text-white">
                          {details.status} on{" "}
                          {`${release.getDate()}/${
                            release.getMonth() + 1
                          }/${release.getFullYear()}`}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View className="flex-row space-x-2 items-center px-5 w-full">
                    {details.genres.map((x) => (
                      <Text
                        key={x.id}
                        className="border border-primaryHover bg-primary/20 rounded-lg p-2 text-white"
                      >
                        {x.name}
                      </Text>
                    ))}
                  </View>
                  <Text className="text-white text-justify px-5">{overview}</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View className="flex mt-4">
            <Text>Cast</Text>
            <FlatList
              data={credits}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={true}
            />
            <View style={styles.gradientOverlay}>
              <LinearGradient
                colors={["#FFFFFF00", "#FFFFFF"]}
                start={[0.9, 0]}
                end={[1, 0]}
                className="flex-1"
              />
            </View>
          </View>
          <View className="flex-1 mt-4">
            <Text>Recommendations</Text>
            <FlatList
              data={recoms}
              renderItem={renderRec}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={true}
            />
            <View style={styles.gradientOverlay}>
              <LinearGradient
                colors={["#FFFFFF00", "#FFFFFF"]}
                start={[0.9, 0]}
                end={[1, 0]}
                className="flex-1"
              />
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

export default MovieDetail;
