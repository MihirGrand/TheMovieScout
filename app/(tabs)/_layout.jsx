import { View, Text } from "react-native";
import { Tabs, Redirect } from "expo-router";
//import Film from "./film.svg";
import Icons from "../../constants/icons.js";

const TabIcon = ({ name, icon, focused, color, size }) => {
  let style = "items-center justify-center gap-1 px-2 py-2";
  let element;
  if (focused) {
    const Ico = Icons[`${icon}_F`];
    return (
      <View className={style}>
        <Ico height={size} width={size} fill={color} />
        <Text>{name}</Text>
      </View>
    );
  } else {
    const Ico = Icons[`${icon}_O`];
    return (
      <View className={style}>
        <Ico height={size} width={size} stroke={color} />
        <Text>{name}</Text>
      </View>
    );
  }
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: { height: "10%" },
          tabBarActiveTintColor: "#ef233c",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused, size }) => (
              <TabIcon name="Home" icon="Home" focused={focused} color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="movies"
          options={{
            title: "Movies",
            headerShown: false,
            tabBarIcon: ({ color, focused, size }) => (
              <TabIcon name="Movies" icon="Film" focused={focused} color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="shows"
          options={{
            title: "Shows",
            headerShown: false,
            tabBarIcon: ({ color, focused, size }) => (
              <TabIcon name="Shows" icon="Series" focused={focused} color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="watchLater"
          options={{
            title: "Watchlist",
            headerShown: false,
            tabBarIcon: ({ color, focused, size }) => (
              <TabIcon name="Watchlist" icon="Clock" focused={focused} color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
