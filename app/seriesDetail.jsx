import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalProvider";
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

const SeriesDetail = () => {
  const { deets } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [tomatometer, setTomatometer] = useState("");
  const [imdb, setImdb] = useState("");
  const [providers, setProviders] = useState([]);
  const navigation = useNavigation();
  const details = JSON.parse(deets);
  const credits = details.credits.cast.sort((a, b) => b.rank - a.rank).slice(0, 10);
  const recoms = details.recommendations.results;
  const recommendations = recoms.sort((a, b) => b.popularity - a.popularity);
  let desc = details.overview.split(".");
  let overview = desc.slice(0, 2).join(". ").trim();
  if (overview.length < 300 && details.overview.length > 300) {
    overview = desc.slice(0, 3).join(". ");
  }

  console.log(details);

  if (!overview.endsWith("?") && !overview.endsWith(".")) {
    overview += ".";
  }

  const { region } = useGlobalContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch(`${process.env.EXPO_PUBLIC_API_URL}/tm?name=${details.name}`, {
            method: "POST",
          }),
          fetch(`${process.env.EXPO_PUBLIC_API_URL}/im?id=${details.external_ids.imdb_id}`, {
            method: "POST",
          }),
          fetch(`https://api.themoviedb.org/3/tv/${details.id}/watch/providers`, options),
        ]);
        const [rottenResponse, imResponse, watchResponse] = responses;
        const watch = await watchResponse.json();
        if (watch.results.IN) {
          setProviders(watch.results.IN.flatrate);
        }
        const rotten = rottenResponse.status != 500 ? (await rottenResponse.json()).score : null;
        const imdb = imResponse.status != 500 ? (await imResponse.json()).rating : null;
        setTomatometer(rotten);
        setImdb(imdb);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching series data:", error);
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
      const creditsUrl = `https://api.themoviedb.org/3/person/${item.id}/movie_credits?language=en-US`;
      const responses = await Promise.all([fetch(personUrl, options), fetch(creditsUrl, options)]);
      const [detailsResponse, creditsResponse] = responses;
      const detailsJson = await detailsResponse.json();
      const credJson = await creditsResponse.json();
      setLoading(false);
      router.push({
        pathname: "personDetail",
        params: {
          deets: JSON.stringify(detailsJson),
          creds: JSON.stringify(credJson),
        },
      });
    } catch (error) {
      console.error("Error fetching person details:", error);
      setLoading(false);
    }
  };

  const handleMoviePress = async (item) => {
    setLoading(true);
    try {
      const detailsUrl = `https://api.themoviedb.org/3/tv/${item.id}?language=en-US`;
      const creditsUrl = `https://api.themoviedb.org/3/tv/${item.id}/credits?language=en-US`;
      const recsUrl = `https://api.themoviedb.org/3/tv/${item.id}/recommendations?language=en-US`;
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
        pathname: "seriesDetail",
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
          {item.name}
        </Text>
      </View>
    </TouchableHighlight>
  );

  const renderItem = ({ item }) => (
    <TouchableHighlight underlayColor={"transparent"} onPress={() => handlePersonPress(item)}>
      <View key={item.id} className=" w-28 p-2">
        <Image
          className="h-40 rounded-md"
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.profile_path}` }}
          resizeMode="cover"
        />
        <Text
          className="text-lightText font-qsemibold text-md text-wrap text-center pt-1"
          numberOfLines={2}
        >
          {item.name}
        </Text>
        <Text className="text-lightText font-qregular text-md text-wrap text-center">
          as {item.character}
        </Text>
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
      width: "35%",
    },
    contentContainer: {
      flexGrow: 1,
      paddingBottom: 20,
    },
  });

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
          <View className="flex-1 h-3/5 rounded-bl-xl rounded-br-xl overflow-hidden">
            <ImageBackground
              imageStyle={{ borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}
              source={{ uri: `https://image.tmdb.org/t/p/w780${details.backdrop_path}` }}
            >
              <View className=" bg-black/80 rounded-bl-xl rounded-br-xl pt-10 justify-stretch">
                <View className="flex-1 items-center space-y-4 pt-10">
                  <View className="flex-row justify-between w-full px-5 space-x-5">
                    <Image
                      style={styles.shadow}
                      className="rounded-md"
                      resizeMode="stretch"
                      source={{ uri: `https://image.tmdb.org/t/p/w500${details.poster_path}` }}
                    />
                    <View className="w-2/3 h-48 justify-between">
                      <Text className="text-white font-qsemibold text-xl">{details.name}</Text>
                      <View className="flex-row items-center flex-wrap">
                        {details.genres.slice(0, 3).map((x) => (
                          <View className="mb-2 mr-2">
                            <Text
                              key={x.id}
                              className="border border-primary bg-primary/20 rounded-lg px-2 py-1 text-white"
                            >
                              {x.name}
                            </Text>
                          </View>
                        ))}
                      </View>
                      {/*<View className="flex-row items-center space-x-2">
                        <icons.Star_O height={20} width={20} stroke={"#ffffff"} />
                        <Text className="text-white">{details.vote_average.toPrecision(2)}</Text>
                      </View>*/}
                      <Text className="text-white rounded-md pl-0.5">
                        {details.adult ? "🔞   A" : "⚠️   U/A"}
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
                      <View className="flex-row items-center space-x-2 pr-10">
                        <icons.Monitor_F height={20} width={20} fill="#ffffff" />
                        <Text className="text-lightText">
                          {providers.length > 0 ? "Streaming on " : "-------------"}
                        </Text>
                        {providers.length > 0 &&
                          providers.map((x) => (
                            <View>
                              <Image
                                source={{
                                  uri: `https://image.tmdb.org/t/p/w500${x.logo_path}`,
                                }}
                                className="rounded-md h-5 w-5"
                              />
                            </View>
                          ))}
                      </View>
                    </View>
                  </View>
                  <Text className="text-white text-justify px-5 pb-5">{overview}</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View className="flex-row items-center space-x-5 justify-stretch px-5 mt-5">
            <View className="flex-row items-center space-x-2 border-primary border rounded-xl p-3 grow justify-center bg-primary/5">
              <images.Imdb_S height={30} width={30} />
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text className="text-lightText font-qmedium text-md">
                  {imdb ? `${imdb}/10` : "--"}
                </Text>
              )}
            </View>
            <View className="flex-row items-center space-x-3 border-primary border rounded-xl p-3 grow justify-center bg-primary/5">
              <images.Tomato_S height={30} width={30} />
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text className="text-lightText font-qmedium text-">
                  {tomatometer ? `${tomatometer}%` : "--"}
                </Text>
              )}
            </View>
          </View>
          <View>
            <View className="flex-row items-center py-2 px-4">
              <icons.Group_F height={20} width={20} fill="#f5cb5c" />
              <Text className="text-primary font-qmedium text-lg pl-2 pb-1">Cast</Text>
            </View>
            <FlatList
              className="px-2"
              contentContainerStyle={{ paddingRight: 10 }}
              data={credits}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={true}
              fadingEdgeLength={100}
            />
          </View>
          <View className="">
            <View className="flex-row items-center py-2 px-4">
              <icons.ThumbsUp_F height={20} width={20} fill="#f5cb5c" />
              <Text className="text-primary font-qmedium text-lg pl-2 pb-1">Recommendations</Text>
            </View>
            <FlatList
              class="px-5"
              contentContainerStyle={{ paddingRight: 10, paddingLeft: 10 }}
              data={recommendations}
              renderItem={renderRec}
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

export default SeriesDetail;
