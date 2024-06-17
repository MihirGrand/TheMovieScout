import { View, Image, Text, TouchableHighlight } from "react-native";
import { router } from "expo-router";
import icons from "../../constants/icons";
import { handleMoviePress } from "../../constants/functions";

const Card = (id, poster_path, title) => {
  return (
    <TouchableHighlight
      underlayColor={"transparent"}
      onPress={() => handleMoviePress(router, setLoading, item)}
    >
      <View key={id} className="w-28 p-2">
        {poster_path ? (
          <Image
            className="h-40 rounded-md"
            source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
            resizeMode="cover"
          />
        ) : (
          <View className="h-40 rounded-md bg-gray-200 flex justify-center items-center">
            <icons.CloudDown_O height={20} width={20} stroke={"#A9A9A9"} />
          </View>
        )}
        <Text className="font-qmedium text-center text-lightText pt-1" numberOfLines={2}>
          {title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default Card;
