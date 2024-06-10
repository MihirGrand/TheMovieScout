import React from "react";
import { View, Text, Image, Button, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";

const MovieDetail = () => {
  const { deets } = useLocalSearchParams();
  const navigation = useNavigation();
  const details = JSON.parse(deets);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {details ? (
        <>
          <Image
            style={{ width: 200, height: 300 }}
            source={{ uri: `https://image.tmdb.org/t/p/w500${details.poster_path}` }}
          />
          <Text>{details.title}</Text>
          <Text>{details.overview}</Text>
          <Text>{details.vote_average}</Text>
          {/* Add Back button */}
          <Button title="Back" onPress={() => navigation.goBack()} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default MovieDetail;
