import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableHighlight,
  Modal,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import icons from "../../constants/icons";

// Function to create placeholder data
const createPlaceholderData = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `placeholder-${index}`,
    title: "Loading...",
    poster_path: null,
  }));
};

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState(createPlaceholderData(10));
  const [popular, setPopular] = useState(createPlaceholderData(10));
  const [topRated, setTopRated] = useState(createPlaceholderData(10));
  const [upcoming, setUpcoming] = useState(createPlaceholderData(10));
  const [loading, setLoading] = useState(true); // State for loading modal

  const popularUrl = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  const nowPlayingUrl = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
  const topRatedUrl = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
  const upcomingUrl = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_SECRET}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch(popularUrl, options),
          fetch(nowPlayingUrl, options),
          fetch(topRatedUrl, options),
          fetch(upcomingUrl, options),
        ]);
        const [popularResponse, nowPlayingResponse, topRatedResponse, upcomingResponse] = responses;
        const popularJson = await popularResponse.json();
        const nowPlayingJson = await nowPlayingResponse.json();
        const topRatedJson = await topRatedResponse.json();
        const upcomingJson = await upcomingResponse.json();
        setPopular(popularJson.results);
        setNowPlaying(nowPlayingJson.results);
        setTopRated(topRatedJson.results);
        setUpcoming(upcomingJson.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePress = async (item) => {
    setLoading(true);
    try {
      const detailsUrl = `https://api.themoviedb.org/3/movie/${item.id}?language=en-US`;
      const creditsUrl = `https://api.themoviedb.org/3/movie/${item.id}/credits?language=en-US`;
      const responses = await Promise.all([fetch(detailsUrl, options), fetch(creditsUrl, options)]);
      const [detailsResponse, creditsResponse] = responses;
      const detailsJson = await detailsResponse.json();
      const credJson = await creditsResponse.json();
      const creditsJson = credJson.cast.sort((a, b) => b.rank - a.rank).slice(0, 10);
      setLoading(false);
      router.push({
        pathname: "movieDetail",
        params: { deets: JSON.stringify(detailsJson), creds: JSON.stringify(creditsJson) },
      });
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableHighlight underlayColor={"transparent"} onPress={() => handlePress(item)}>
      <View key={item.id} className="w-24 p-2">
        {item.poster_path ? (
          <Image
            className="h-40 rounded-md"
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
            resizeMode="cover"
          />
        ) : (
          <View className="h-40 rounded-md bg-gray-200 flex justify-center items-center">
            <icons.CloudDown_O height={20} width={20} stroke={"#A9A9A9"} />
          </View>
        )}
        <Text className="font-qmedium text-wrap text-center">{item.title}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View className="pt-10">
      <Text>Home</Text>
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
      <ScrollView>
        <Text>Popular</Text>
        <FlatList
          data={popular}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <View className="border-b border-gray-300" />
        <Text>Now Playing</Text>
        <FlatList
          data={nowPlaying}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <View className="border-b border-gray-300" />
        <Text>Top Rated</Text>
        <FlatList
          data={topRated}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <View className="border-b border-gray-300" />
        <Text>Upcoming</Text>
        <FlatList
          data={upcoming}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </View>
  );
};

export default Home;
