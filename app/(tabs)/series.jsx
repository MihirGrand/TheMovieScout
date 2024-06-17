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

import { createPlaceholderData, handleTvPress } from "../../constants/functions";
import { tmdbUrl, options } from "../../constants/constants";
import { useGlobalContext } from "../../context/GlobalProvider";

const Series = () => {
  const [airingToday, setAiringToday] = useState(createPlaceholderData(10));
  const [popular, setPopular] = useState(createPlaceholderData(10));
  const [topRated, setTopRated] = useState(createPlaceholderData(10));
  const [airingSoon, setAiringSoon] = useState(createPlaceholderData(10));
  const loading = false;
  const { setLoading } = useGlobalContext();

  const popularUrl = `${tmdbUrl}tv/popular?language=en-US&page=1`;
  const airingTodayUrl = `${tmdbUrl}tv/airing_today?language=en-US&page=1`;
  const topRatedUrl = `${tmdbUrl}tv/top_rated?language=en-US&page=1`;
  const airingSoonUrl = `${tmdbUrl}tv/on_the_air?language=en-US&page=1`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch(popularUrl, options),
          fetch(airingTodayUrl, options),
          fetch(topRatedUrl, options),
          fetch(airingSoonUrl, options),
        ]);
        const [popularResponse, airingTodayResponse, topRatedResponse, airingSoonResponse] =
          responses;
        const popularJson = await popularResponse.json();
        const airingTodayJson = await airingTodayResponse.json();
        const topRatedJson = await topRatedResponse.json();
        const airingSoonJson = await airingSoonResponse.json();
        setPopular(popularJson.results);
        setAiringToday(airingTodayJson.results);
        setTopRated(topRatedJson.results);
        setAiringSoon(airingSoonJson.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tv data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableHighlight
      underlayColor={"transparent"}
      onPress={() => handleTvPress(router, setLoading, item)}
    >
      <View key={item.id} className="w-28 p-2">
        {item.poster_path ? (
          <Image
            className="h-40 rounded-md"
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
            loadingIndicatorSource={images.Tomato}
            resizeMode="cover"
          />
        ) : (
          <View className="h-40 rounded-md bg-gray-200 flex justify-center items-center">
            <icons.CloudDown_O height={20} width={20} stroke={"#A9A9A9"} />
          </View>
        )}
        <Text className="font-qmedium text-center text-lightText pt-1" numberOfLines={2}>
          {item.name}
        </Text>
      </View>
    </TouchableHighlight>
  );

  const sections = [
    { title: "Popular", data: popular, icon: icons.Fire_F },
    { title: "Airing Today", data: airingToday, icon: icons.Clock_F },
    { title: "Top Rated", data: topRated, icon: icons.Increase_F },
    { title: "Airing This Week", data: airingSoon, icon: icons.Calendar_F },
  ];
  return (
    <View className="pt-10 bg-bgdark-100">
      <Modal visible={loading} transparent={true} animationType="fade">
        <View className="flex-1 justify-center items-center bg-[#00000080]">
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={{ color: "#ffffff", marginTop: 10 }}>Loading...</Text>
        </View>
      </Modal>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {sections.map((section, index) => {
          return (
            <View key={index}>
              <View className="flex-row items-center py-2 px-4">
                <section.icon height={20} width={20} fill="#f5cb5c" />
                <Text className="text-primary font-qmedium text-lg pl-2 pb-1">{section.title}</Text>
              </View>
              <FlatList
                className="px-2 pb-2"
                contentContainerStyle={{ paddingRight: 10 }}
                data={section.data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                fadingEdgeLength={100}
              />
              {index !== sections.length - 1 && (
                <LinearGradient
                  colors={["transparent", "#80808033", "transparent"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  locations={[0, 0.4, 2]}
                  className="h-[2] w-full my-2"
                />
              )}
            </View>
          );
        })}
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
};

export default Series;
