import { View, Text, Dimensions } from "react-native";
import { Tabs, Redirect, useRouter } from "expo-router";
//import Film from "./film.svg";
import Icons from "../../constants/icons.js";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "./home.jsx";
import Movies from "./movies.jsx";
import Series from "./series.jsx";
import WatchLater from "./watchLater.jsx";

const Tab = createMaterialTopTabNavigator();

const TabIcon = ({ name, icon, focused, color, size }) => {
  let style = "items-center justify-center gap-1 px-2 py-2 h-12";
  let element;
  if (focused) {
    const Ico = Icons[`${icon}_F`];
    return (
      <View className={style}>
        <Ico height={size} width={size} fill={color} />
        <Text className="text-primary">{name}</Text>
      </View>
    );
  } else {
    const Ico = Icons[`${icon}_O`];
    return (
      <View className={style}>
        <Ico height={size} width={size} stroke={color} />
        <Text className="text-[#808080]">{name}</Text>
      </View>
    );
  }
};

/* const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#242423",
            height: "10%",
            display:
              route.name === "movieDetail" || route.name === "personDetail" ? "none" : "flex",
            borderTopWidth: 0,
            elevation: 8,
          },
          tabBarActiveTintColor: "#f5cb5c",
        })}
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
          name="series"
          options={{
            title: "Series",
            headerShown: false,
            tabBarIcon: ({ color, focused, size }) => (
              <TabIcon name="Series" icon="Series" focused={focused} color={color} size={size} />
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

*/
/* const TabsLayout = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      style={{ backgroundColor: "#333533" }}
      screenOptions={({ route }) => ({
        tabBarPressOpacity: 0,
        tabBarPressColor: "transparent",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#242423",
          height: "10%",
          borderTopWidth: 0,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          overflow: "hidden",
        },
        tabBarActiveTintColor: "#f5cb5c",
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name == "Home") {
            return <TabIcon name="Home" icon="Home" focused={focused} color={color} size={size} />;
          } else if (route.name == "Movies") {
            return (
              <TabIcon name="Movies" icon="Film" focused={focused} color={color} size={size} />
            );
          } else if (route.name == "Series") {
            return (
              <TabIcon name="Series" icon="Series" focused={focused} color={color} size={size} />
            );
          } else if (route.name == "Watch Later") {
            return (
              <TabIcon name="Library" icon="Clock" focused={focused} color={color} size={size} />
            );
          }
        },
        tabBarIconStyle: {
          width: "100%",
          justifyContent: "center",
          height: "100%",
          paddingTop: 5,
        },
        tabBarIndicatorStyle: {
          display: "none",
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Movies" component={Movies} />
      <Tab.Screen name="Series" component={Series} />
      <Tab.Screen name="Watch Later" component={WatchLater} />
    </Tab.Navigator>
  );
}; */

const TabsLayout = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      style={{ backgroundColor: "#333533", borderTopWidth: 0, elevation: 8 }}
      initialLayout={{ width: Dimensions.get("window").width }}
      screenOptions={({ route }) => ({
        tabBarPressOpacity: 0,
        tabBarPressColor: "transparent",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#242423",
          height: "10%",
          borderTopWidth: 0,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          overflow: "hidden",
        },
        tabBarActiveTintColor: "#f5cb5c",
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name == "Home") {
            return <TabIcon name="Home" icon="Home" focused={focused} color={color} size={size} />;
          } else if (route.name == "Movies") {
            return (
              <TabIcon name="Movies" icon="Film" focused={focused} color={color} size={size} />
            );
          } else if (route.name == "Series") {
            return (
              <TabIcon name="Series" icon="Series" focused={focused} color={color} size={size} />
            );
          } else if (route.name == "Watch Later") {
            return (
              <TabIcon name="Library" icon="Clock" focused={focused} color={color} size={size} />
            );
          }
        },
        tabBarIconStyle: {
          width: "100%",
          justifyContent: "center",
          height: "100%",
          paddingTop: 5,
        },
        tabBarIndicatorStyle: {
          display: "none",
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Movies" component={Movies} />
      <Tab.Screen name="Series" component={Series} />
      <Tab.Screen name="Watch Later" component={WatchLater} />
    </Tab.Navigator>
  );
};

export default TabsLayout;
