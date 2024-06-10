/* import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, ScrollView, TouchableHighlight, Modal } from "react-native";
import { router, useNavigation, useLocalSearchParams } from "expo-router";

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
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
        setLoading(false); // Hide loading modal after data is fetched
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableHighlight
      underlayColor={"transparent"}
      onPress={async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${item.id}?language=en-US`,
          options
        );
        const json = await response.json();
        router.push({ pathname: "movieDetail", params: { deets: JSON.stringify(json) } });
      }}
    >
      <View key={item.id} className="w-24 p-2">
        <Image
          className="h-40 rounded-md"
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          resizeMode="cover"
        />
        <Text className="font-medium text-wrap text-center">{item.title}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View className="pt-10">
      <Text>Home</Text>
      <Modal visible={loading} transparent={true}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Loading...</Text>
        </View>
      </Modal>
      <ScrollView>
        <FlatList
          data={popular}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <FlatList
          data={nowPlaying}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <FlatList
          data={topRated}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
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
 */

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

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading modal

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
    setLoading(true);
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
      }
    };
    fetchData();
  }, []);

  const handlePress = async (item) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${item.id}?language=en-US`,
        options
      );
      const json = await response.json();
      setLoading(false);
      router.push({ pathname: "movieDetail", params: { deets: JSON.stringify(json) } });
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableHighlight underlayColor={"transparent"} onPress={() => handlePress(item)}>
      <View key={item.id} className="w-24 p-2">
        <Image
          className="h-40 rounded-md"
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          resizeMode="cover"
        />
        <Text className="font-medium text-wrap text-center">{item.title}</Text>
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
        <FlatList
          data={popular}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <FlatList
          data={nowPlaying}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <FlatList
          data={topRated}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
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
