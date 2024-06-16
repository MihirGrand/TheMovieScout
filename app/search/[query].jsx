/* import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import icons from "../../constants/icons";

const Search = () => {
  const { query: initialQuery } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(initialQuery || "");
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    setQuery(initialQuery || "");
  }, [initialQuery]);

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

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_SECRET}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      if (query.trim() === "") return;
      const url = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjQxMTQ3ZTg2OWUyZjcyZTI4ZWE4NzlmNDFhZWQ5MCIsInN1YiI6IjY2NTQzYzlmZDlkMDIxY2FiNDVhOTlkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wUqnzd-PHcayBNqTZvX2h6kzvmC3wZDykeAOOUy5jcw",
        },
      };
      try {
        const res = await fetch(url, options);
        const json = await res.json();

        const movies = json.results
          .filter((result) => result.media_type === "movie")
          .sort((a, b) => b.popularity - a.popularity);
        const tv = json.results
          .filter((result) => result.media_type === "tv")
          .sort((a, b) => b.popularity - a.popularity);
        const people = json.results
          .filter((result) => result.media_type === "person")
          .sort((a, b) => b.popularity - a.popularity);
        setMovies(movies);
        setTv(tv);
        setPeople(people);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [query]);

  const renderItem = ({ item }) => {
    let occ = "";
    if (item.known_for_department === "Acting") {
      occ = "Actor";
    } else if (item.known_for_department === "Directing") {
      occ = "Director";
    } else if (item.known_for_department === "Writing") {
      occ = "Writer";
    } else if (item.known_for_department === "Production") {
      occ = "Producer";
    } else if (item.known_for_department === "Costume & Makeup") {
      occ = "Costume Designer";
    } else if (item.known_for_department === "Editing") {
      occ = "Editor";
    } else if (item.known_for_department === "Sound") {
      occ = "Singer";
    }
    return (
      <TouchableHighlight underlayColor={"transparent"} onPress={() => handlePersonPress(item)}>
        <View key={item.id} className=" w-28 p-2">
          <Image
            className="h-40 rounded-md"
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.profile_path}` }}
            resizeMode="cover"
          />
          <Text
            className="text-lightText font-qregular text-md text-wrap text-center pt-1"
            numberOfLines={2}
          >
            {item.name}
          </Text>
          <Text className="text-lightText font-qsemibold text-md text-wrap text-center">{occ}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const renderMovie = ({ item }) => {
    return (
      <TouchableHighlight
        className="mx-2"
        underlayColor={"transparent"}
        onPress={() => handlePersonPress(item)}
      >
        <View key={item.id} className="flex-row space-x-2">
          <Image
            className="w-24 h-36 rounded-md"
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
            resizeMode="cover"
          />
          <View>
            <Text
              className="text-lightText font-qsemibold text-lg text-wrap pr-20"
              numberOfLines={3}
            >
              {item.title}
            </Text>
            <Text
              className="text-lightText font-qregular text-md text-wrap pt-1 pr-20"
              numberOfLines={4}
            >
              {item.overview}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View className="pt-10 bg-bgdark-100 h-full">
      <View className="flex-row mx-4 space-x-2 items-center">
        <TouchableHighlight
          className="p-3 rounded-lg justify-center"
          underlayColor="#474947"
          onPress={() => router.back()}
        >
          <icons.Left_O height={20} width={20} stroke="#FFFFFFAD" />
        </TouchableHighlight>
        <TouchableOpacity className="flex-1 bg-bgdark-200 rounded-lg p-3">
          <TextInput
            cursorColor="#f5cb5c"
            selectionHandleColor="#f5cb5c"
            selectionColor="#f5cb5c"
            placeholder="Search"
            placeholderTextColor="#FFFFFF4A"
            className="text-lightText text-lg font-qsemibold"
            returnKeyType="search"
            value={query}
            onChangeText={(text) => setQuery(text)}
            onSubmitEditing={(event) => {
              setQuery(event.nativeEvent.text);
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {movies.length > 0 && (
          <>
            <View className="flex-row items-center py-2 px-4">
              <icons.Person_F height={20} width={20} fill="#f5cb5c" />
              <Text className="text-primary font-qmedium text-lg pl-2 pb-1">Movies</Text>
            </View>
            <FlatList
              className="px-2 pb-2"
              contentContainerStyle={{ paddingRight: 10, gap: 20 }}
              data={movies}
              renderItem={renderMovie}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              fadingEdgeLength={100}
            />
          </>
        )}

        {tv.length > 0 && (
          <>
            <View className="flex-row items-center py-2 px-4">
              <icons.Person_F height={20} width={20} fill="#f5cb5c" />
              <Text className="text-primary font-qmedium text-lg pl-2 pb-1">TV Shows</Text>
            </View>
            <FlatList
              className="px-2 pb-2"
              contentContainerStyle={{ paddingRight: 10, gap: 20 }}
              data={tv}
              renderItem={renderMovie}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              fadingEdgeLength={100}
            />
          </>
        )}

        {people.length > 0 && (
          <>
            <View className="flex-row items-center py-2 px-4">
              <icons.Person_F height={20} width={20} fill="#f5cb5c" />
              <Text className="text-primary font-qmedium text-lg pl-2 pb-1">People</Text>
            </View>
            <FlatList
              className="px-2 pb-2"
              contentContainerStyle={{ paddingRight: 10 }}
              data={people}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              fadingEdgeLength={100}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Search;
 */

import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import icons from "../../constants/icons";

const Search = () => {
  const { query: initialQuery } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(initialQuery || "");
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    setQuery(initialQuery || "");
  }, [initialQuery]);

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

  const handleSeriesPress = async (item) => {
    setLoading(true);
    try {
      const detailsUrl = `https://api.themoviedb.org/3/tv/${item.id}?language=en-US&append_to_response=credits,recommendations,external_ids`;
      const response = await fetch(detailsUrl, options);
      const responseJson = await response.json();
      setLoading(false);
      router.push({
        pathname: "seriesDetail",
        params: {
          deets: JSON.stringify(responseJson),
        },
      });
    } catch (error) {
      console.error("Error fetching series details:", error);
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

  useEffect(() => {
    const fetchData = async () => {
      if (query.trim() === "") return;
      const url = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjQxMTQ3ZTg2OWUyZjcyZTI4ZWE4NzlmNDFhZWQ5MCIsInN1YiI6IjY2NTQzYzlmZDlkMDIxY2FiNDVhOTlkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wUqnzd-PHcayBNqTZvX2h6kzvmC3wZDykeAOOUy5jcw",
        },
      };
      try {
        const res = await fetch(url, options);
        const json = await res.json();

        const movies = json.results
          .filter((result) => result.media_type === "movie")
          .sort((a, b) => b.popularity - a.popularity);
        const tv = json.results
          .filter((result) => result.media_type === "tv")
          .sort((a, b) => b.popularity - a.popularity);
        const people = json.results
          .filter((result) => result.media_type === "person")
          .sort((a, b) => b.popularity - a.popularity);
        setMovies(movies);
        setTv(tv);
        setPeople(people);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [query]);

  const renderItem = ({ item }) => {
    let occ = "";
    if (item.known_for_department === "Acting") {
      occ = "Actor";
    } else if (item.known_for_department === "Directing") {
      occ = "Director";
    } else if (item.known_for_department === "Writing") {
      occ = "Writer";
    } else if (item.known_for_department === "Production") {
      occ = "Producer";
    } else if (item.known_for_department === "Costume & Makeup") {
      occ = "Costume Designer";
    } else if (item.known_for_department === "Editing") {
      occ = "Editor";
    } else if (item.known_for_department === "Sound") {
      occ = "Singer";
    }
    return (
      <TouchableHighlight underlayColor={"transparent"} onPress={() => handlePersonPress(item)}>
        <View key={item.id} className=" w-28 p-2">
          {item.profile_path ? (
            <Image
              className="h-40 rounded-md"
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.profile_path}` }}
              resizeMode="cover"
            />
          ) : (
            <View className="w-24 h-36 justify-center items-center bg-bgdark-200 rounded-md">
              <icons.No_F height={20} width={20} stroke="#FFFFFFAD" />
            </View>
          )}
          <Text
            className="text-lightText font-qregular text-md text-wrap text-center pt-1"
            numberOfLines={2}
          >
            {item.name}
          </Text>
          <Text className="text-lightText font-qsemibold text-md text-wrap text-center">{occ}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const renderMovie = ({ item }) => {
    return (
      <TouchableHighlight
        className="mx-4 mb-5 mr-6"
        underlayColor={"transparent"}
        onPress={() => handleMoviePress(item)}
      >
        <View className="flex-row space-x-2">
          {item.poster_path ? (
            <Image
              className="w-24 h-36 rounded-md"
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              loadingIndicatorSource={require("../../assets/images/tomato.png")}
              resizeMode="cover"
            />
          ) : (
            <View className="w-24 h-36 justify-center items-center bg-bgdark-200 rounded-md">
              <icons.No_F height={20} width={20} stroke="#FFFFFFAD" />
            </View>
          )}
          <View>
            <Text
              className="text-lightText font-qsemibold text-lg text-wrap pr-20"
              numberOfLines={3}
            >
              {item.title}
            </Text>
            <Text
              className="text-lightText font-qregular text-md text-wrap pt-1 pr-20"
              numberOfLines={4}
            >
              {item.overview}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  const renderShow = ({ item }) => {
    return (
      <TouchableHighlight
        className="mx-4 mb-5 mr-6"
        underlayColor={"transparent"}
        onPress={() => handleSeriesPress(item)}
      >
        <View className="flex-row space-x-2">
          {item.poster_path ? (
            <Image
              className="w-24 h-36 rounded-md"
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              loadingIndicatorSource={require("../../assets/images/tomato.png")}
              resizeMode="cover"
            />
          ) : (
            <View className="w-24 h-36 justify-center items-center bg-bgdark-200 rounded-md">
              <icons.No_F height={20} width={20} stroke="#FFFFFFAD" />
            </View>
          )}
          <View>
            <Text
              className="text-lightText font-qsemibold text-lg text-wrap pr-20"
              numberOfLines={3}
            >
              {item.name}
            </Text>
            <Text
              className="text-lightText font-qregular text-md text-wrap pt-1 pr-20"
              numberOfLines={4}
            >
              {item.overview}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  const movieSection = () => {
    return (
      <View>
        <View className="flex-row items-center pb-2 px-4">
          <icons.Film_F height={20} width={20} fill="#f5cb5c" />
          <Text className="text-primary font-qmedium text-lg pl-2 pb-1">Movies</Text>
        </View>
        {movies.map((movie) => (movie ? renderMovie({ item: movie }) : null))}
      </View>
    );
  };

  const tvSection = () => {
    return (
      <View>
        <View className="flex-row items-center pb-2 px-4">
          <icons.Series_F height={20} width={20} fill="#f5cb5c" />
          <Text className="text-primary font-qmedium text-lg pl-2 pb-1">TV Shows</Text>
        </View>
        {tv.map((show) => (show ? renderShow({ item: show }) : null))}
      </View>
    );
  };

  const peopleSection = () => {
    return (
      <View>
        <View className="flex-row items-center py-2 px-4">
          <icons.Person_F height={20} width={20} fill="#f5cb5c" />
          <Text className="text-primary font-qmedium text-lg pl-2 pb-1">People</Text>
        </View>
        <FlatList
          className="px-2 pb-2"
          contentContainerStyle={{ paddingRight: 10, gap: 20 }}
          data={people}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          fadingEdgeLength={100}
        />
      </View>
    );
  };

  const sections = [
    { type: "Movies", data: movies, func: movieSection },
    { type: "TV Shows", data: tv, func: tvSection },
    { type: "People", data: people, func: peopleSection },
  ].sort((a, b) => {
    const popA = a.data.length > 0 ? a.data[0].popularity : -1;
    const popB = b.data.length > 0 ? b.data[0].popularity : -1;
    return popB - popA;
  });

  return (
    <View className=" bg-bgdark-100 h-full">
      <View className="flex-row mx-4 space-x-2 items-center pt-10 pb-5">
        <TouchableHighlight
          className="p-3 rounded-lg justify-center"
          underlayColor="#474947"
          onPress={() => router.back()}
        >
          <icons.Left_O height={20} width={20} stroke="#FFFFFFAD" />
        </TouchableHighlight>
        <TouchableOpacity className="flex-1 bg-bgdark-200 rounded-lg p-3">
          <TextInput
            cursorColor="#f5cb5c"
            selectionHandleColor="#f5cb5c"
            selectionColor="#f5cb5c"
            placeholder="Search"
            placeholderTextColor="#FFFFFF4A"
            className="text-lightText text-lg font-qsemibold"
            returnKeyType="search"
            value={query}
            onChangeText={(text) => setQuery(text)}
            onSubmitEditing={(event) => {
              setQuery(event.nativeEvent.text);
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ marginBottom: 50 }}>
        {
          sections.map((section) => {
            if (section.data.length === 0) return null;
            return <View key={section.type}>{section.func()}</View>;
          })
          /*sections.map((section) => {
          if (section.data.length === 0) return null;
          return (
            <View key={section.type}>
              <View className="flex-row items-center py-2 px-4">
                <icons.Person_F height={20} width={20} fill="#f5cb5c" />
                <Text className="text-primary font-qmedium text-lg pl-2 pb-1">{section.type}</Text>
              </View>
              <FlatList
                className="px-2 pb-2"
                contentContainerStyle={{ paddingRight: 10, gap: 20 }}
                data={section.data}
                renderItem={section.type === "People" ? renderItem : renderMovie}
                keyExtractor={(item) => item.id.toString()}
                horizontal={section.type === "People"}
                showsHorizontalScrollIndicator={false}
                fadingEdgeLength={100}
              />
            </View>
          );
        })*/
        }
      </ScrollView>
    </View>
  );
};

export default Search;
