import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [onBoarded, setOnBoarded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOnBoarding = async () => {
      try {
        const onB = await AsyncStorage.getItem("onBoarded");
        if (onB === "true") {
          setOnBoarded(true);
        }
      } catch (error) {
        console.error("Failed to fetch onboarding status from AsyncStorage:", error);
      } finally {
        setLoading(false);
      }
    };

    checkOnBoarding();
  }, []);

  if (loading) {
    return null;
  }

  return <GlobalContext.Provider value={{ onBoarded }}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
