import Home_Cinema from "../assets/images/home-cinema.svg";
import Video_Streaming from "../assets/images/video-streaming.svg";
import { Image } from "react-native";

const Imdb = (height, width, tintColor) => {
  return (
    <Image
      source={require("../assets/images/imdb.png")}
      resizeMode="cover"
      tintColor={tintColor}
      style={{ height: height, width: width }}
    />
  );
};

const Tomato = (height, width, tintColor) => {
  return (
    <Image
      source={require("../assets/images/tomato.png")}
      resizeMode="cover"
      tintColor={tintColor}
      style={{ height: height, width: width }}
    />
  );
};

export default { Home_Cinema, Video_Streaming, Imdb, Tomato };
