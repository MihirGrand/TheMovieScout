/* import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  Modal,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useNavigation, router } from "expo-router";
import icons from "../../constants/icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const MovieDetail = () => {
  const { deets, creds } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const details = JSON.parse(deets);
  const credits = JSON.parse(creds);
  let desc = details.overview.split(".");
  let overview = desc.slice(0, 2).join(". ").trim();
  if (overview.length < 300 && details.overview.length > 300) {
    overview = desc.slice(0, 3).join(". ");
  }

  if (!overview.endsWith("?") && !overview.endsWith(".")) {
    overview += ".";
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_SECRET}`,
    },
  };

  let release = new Date(details.release_date);

  const handlePress = async (item) => {
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
      <View className="flex h-1 bg-white pt-10">
        <Text>Deets</Text>
      </View>
      {details ? (
        <>
          <Image
            className="w-full h-3/5 top-0 absolute"
            resizeMode="cover"
            source={{ uri: `https://image.tmdb.org/t/p/w780${details.backdrop_path}` }}
          />
          <View className="top-0 h-3/5 w-full absolute bg-black/70 rounded-bl-lg rounded-br-lg"></View>
          <View className="top-10 h-full absolute pt-10 ">
            <View className="items-center h-3/5 space-y-4">
              <View className="flex-row px-3 gap-3">
                <Image
                  style={styles.shadow}
                  className="h-40 w-20 rounded-md"
                  source={{ uri: `https://image.tmdb.org/t/p/w500${details.poster_path}` }}
                />
                <View className="w-2/3 h-40 justify-between">
                  <Text className="text-white font-qsemibold text-xl">{details.title}</Text>
                  <View className="flex-row items-center space-x-2">
                    <icons.Star_O height={20} width={20} stroke={"#ffffff"} />
                    <Text className="text-white">{details.vote_average.toPrecision(2)}</Text>
                  </View>
                  <Text className="text-white rounded-md pl-0.5">
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
 */

/* import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useNavigation, router } from "expo-router";
import icons from "../../constants/icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const MovieDetail = () => {
  const { deets, creds, recs } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
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

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_SECRET}`,
    },
  };

  let release = new Date(details.release_date);

  const handlePress = async (item) => {
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

  const renderRec = ({ item }) => (
    <TouchableHighlight underlayColor={"transparent"} onPress={() => handlePress(item)}>
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
        <ScrollView>
          <View className="h-full">
            <View className="h-3/5 rounded-bl-lg">
              <Image
                className="h-full"
                source={{ uri: `https://image.tmdb.org/t/p/w780${details.backdrop_path}` }}
              />
            </View>
            <View className="top-0 h-3/5 w-full absolute bg-black/70 rounded-bl-lg rounded-br-lg pt-10 justify-stretch">
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
              <View className="grow items-center space-y-4 justify-evenly">
                <View className="flex-row px-3 gap-3">
                  <Image
                    style={styles.shadow}
                    className="h-40 w-20 rounded-md"
                    source={{ uri: `https://image.tmdb.org/t/p/w500${details.poster_path}` }}
                  />
                  <View className="w-2/3 h-40 justify-between">
                    <Text className="text-white font-qsemibold text-xl">{details.title}</Text>
                    <View className="flex-row items-center space-x-2">
                      <icons.Star_O height={20} width={20} stroke={"#ffffff"} />
                      <Text className="text-white">{details.vote_average.toPrecision(2)}</Text>
                    </View>
                    <Text className="text-white rounded-md pl-0.5">
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
            </View>
            <View className="flex">
              <FlatList
                className=""
                data={credits}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={true}
              />
              <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
                <LinearGradient
                  colors={["#FFFFFF00", "#FFFFFF"]}
                  start={[0.9, 0]}
                  end={[1, 0]}
                  className="flex-1"
                />
              </View>
            </View>
            <View className="flex-1">
              <FlatList
                data={recoms}
                renderItem={renderRec}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={true}
              />
              <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
                <LinearGradient
                  colors={["#FFFFFF00", "#FFFFFF"]}
                  start={[0.9, 0]}
                  end={[1, 0]}
                  className="flex-1"
                />
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

export default MovieDetail; */

/* import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  Dimensions,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useNavigation, router } from "expo-router";
import icons from "../../constants/icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const MovieDetail = () => {
  const { deets, creds, recs } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
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

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_SECRET}`,
    },
  };

  useEffect(() => {
    console.log(setH(0.5, "bg-black rounded-b-3xl"));
  }, []);
  let release = new Date(details.release_date);

  const handlePress = async (item) => {
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

  const renderRec = ({ item }) => (
    <TouchableHighlight underlayColor={"transparent"} onPress={() => handlePress(item)}>
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

  const setH = (factor, className) => {
    const rem = Math.round(Dimensions.get("screen").height * factor) / 4;
    return `${className} h-${Math.round(rem)}`;
  };

  const getH = (factor) => {
    return Math.round(Dimensions.get("screen").height * factor);
  };

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
        <ScrollView>
          <View
            className={
              `h-${
                Dimensions.get("screen").height * 0.5
              }px bg-black rounded-b-3xl flex-1`
            }
          >
            <View className="rounded-bl-lg flex-1">
              <Image
                className="h-full"
                source={{ uri: `https://image.tmdb.org/t/p/w780${details.backdrop_path}` }}
              />
            </View>
          </View>
          <View className="flex-1">
            <FlatList
              data={recoms}
              renderItem={renderRec}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={true}
            />
            <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
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

export default MovieDetail; */

/* import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useNavigation, router } from "expo-router";
import icons from "../../constants/icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const MovieDetail = () => {
  const { deets, creds, recs } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
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

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_SECRET}`,
    },
  };

  let release = new Date(details.release_date);

  const handlePress = async (item) => {
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

  const renderRec = ({ item }) => (
    <TouchableHighlight underlayColor={"transparent"} onPress={() => handlePress(item)}>
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
              source={{ uri: `https://image.tmdb.org/t/p/w780${details.backdrop_path}` }}
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
                    source={{ uri: `https://image.tmdb.org/t/p/w500${details.poster_path}` }}
                  />
                  <View className="w-2/3 h-40 justify-between">
                    <Text className="text-white font-qsemibold text-xl">{details.title}</Text>
                    <View className="flex-row items-center space-x-2">
                      <icons.Star_O height={20} width={20} stroke={"#ffffff"} />
                      <Text className="text-white">{details.vote_average.toPrecision(2)}</Text>
                    </View>
                    <Text className="text-white rounded-md pl-0.5">
                      {details.adult ? "🔞  A" : "⚠️  U/A"}
                    </Text>
                    <View className="flex-row items-center space-x-2">
                      <icons.Calendar_O height={20} width={20} stroke="#ffffff" />
                      <Text className="text-white">
                        {details.status} on{" "}
                        {`${release.getDate()}/${release.getMonth() + 1}/${release.getFullYear()}`}
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
          </View>
          <View className="flex mt-4">
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

export default MovieDetail; */

import React, { useState } from "react";
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
import icons from "../../constants/icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const MovieDetail = () => {
  const { deets, creds, recs } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
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

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_SECRET}`,
    },
  };

  let release = new Date(details.release_date);

  const handlePress = async (item) => {
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

  const renderRec = ({ item }) => (
    <TouchableHighlight underlayColor={"transparent"} onPress={() => handlePress(item)}>
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
          <View className="flex-1 h-3/5">
            <ImageBackground
              source={{ uri: `https://image.tmdb.org/t/p/w780${details.backdrop_path}` }}
            >
              <View className=" bg-black/70 rounded-bl-lg rounded-br-lg pt-10 justify-stretch">
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
                      source={{ uri: `https://image.tmdb.org/t/p/w500${details.poster_path}` }}
                    />
                    <View className="w-2/3 h-40 justify-between">
                      <Text className="text-white font-qsemibold text-xl">{details.title}</Text>
                      <View className="flex-row items-center space-x-2">
                        <icons.Star_O height={20} width={20} stroke={"#ffffff"} />
                        <Text className="text-white">{details.vote_average.toPrecision(2)}</Text>
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
