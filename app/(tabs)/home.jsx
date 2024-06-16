import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  TouchableHighlight,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import icons from "../../constants/icons";
import images from "../../constants/images";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

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
  const [loading, setLoading] = useState(true);

  const popularUrl = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  const nowPlayingUrl = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
  const topRatedUrl = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
  const date = new Date();
  const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  date.setDate(date.getDate() + 15);
  const later = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const upcomingUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en_US&page=1&region=US&release_date.gte=${today}&release_date.lte=${later}&sort_by=primary_release_date.asc`;

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

  const renderItem = ({ item }) => (
    <TouchableHighlight underlayColor={"transparent"} onPress={() => handlePress(item)}>
      <View key={item.id} className="w-28 p-2">
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
        <Text className="font-qmedium text-center text-lightText pt-1" numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View className="pt-10 bg-bgdark-100">
      <View className="flex-row items-center justify-center py-2 pb-4">
        <images.Detective height={30} width={30} fill="#f5cb5c" />
        <Text className="text-primary font-qsemibold text-xl pl-3">The Movie Scout</Text>
      </View>
      <TouchableOpacity className="mx-10 bg-bgdark-200 rounded-lg p-4">
        <TextInput
          cursorColor="#f5cb5c"
          selectionHandleColor="#f5cb5c"
          selectionColor="#f5cb5c"
          placeholder="Search"
          placeholderTextColor="#FFFFFF4A"
          className="text-lightText text-lg font-qsemibold"
          returnKeyType="search"
          onSubmitEditing={(event) => router.navigate(`/search/${event.nativeEvent.text}`)}
        ></TextInput>
      </TouchableOpacity>
      <Modal visible={loading} transparent={true} animationType="fade">
        <View className="flex-1 justify-center items-center bg-[#00000080]">
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={{ color: "#ffffff", marginTop: 10 }}>Loading...</Text>
        </View>
      </Modal>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View className="flex-row items-center py-2 px-4">
          <icons.Fire_F height={20} width={20} fill="#f5cb5c" />
          <Text className="text-primary font-qmedium text-lg pl-2 pb-1">Popular</Text>
        </View>
        <FlatList
          className="px-2 pb-2"
          contentContainerStyle={{ paddingRight: 10 }}
          data={popular}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          fadingEdgeLength={100}
        />
        {/*<View className="border-b border-[#80808033] py-2" />*/}
        <LinearGradient
          colors={["transparent", "#80808033", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0, 0.4, 2]}
          className="h-[2] w-full my-2"
        />
        <View className="flex-row items-center py-2 px-4">
          <icons.Clock_F height={20} width={20} fill="#f5cb5c" />
          <Text className="text-primary font-qmedium text-lg pl-2 pb-1">Now Playing</Text>
        </View>
        <FlatList
          className="px-2 pb-2"
          contentContainerStyle={{ paddingRight: 10 }}
          data={nowPlaying}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          fadingEdgeLength={100}
        />
        <LinearGradient
          colors={["transparent", "#80808033", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0, 0.4, 2]}
          className="h-[2] w-full my-2"
        />
        <View className="flex-row items-center py-2 px-4">
          <icons.Increase_F height={20} width={20} fill="#f5cb5c" />
          <Text className="text-primary font-qmedium text-lg pl-2 pb-1">Top Rated</Text>
        </View>
        <FlatList
          className="px-2 pb-2"
          contentContainerStyle={{ paddingRight: 10 }}
          data={topRated}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          fadingEdgeLength={100}
        />
        <LinearGradient
          colors={["transparent", "#80808033", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0, 0.4, 2]}
          className="h-[2] w-full my-2"
        />
        <View className="flex-row items-center py-2 px-4">
          <icons.Calendar_F height={20} width={20} fill="#f5cb5c" />
          <Text className="text-primary font-qmedium text-lg pl-2 pb-1">Upcoming</Text>
        </View>
        <FlatList
          className="px-2 pb-2"
          contentContainerStyle={{ paddingRight: 10 }}
          data={upcoming}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          fadingEdgeLength={100}
        />
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
};

export default Home;
