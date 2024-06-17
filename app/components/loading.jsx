import { View, Text, Modal, ActivityIndicator } from "react-native";
import React from "react";
import { useGlobalContext } from "../../context/GlobalProvider";

const LoadingIndicator = () => {
  const { loading } = useGlobalContext();
  if (!loading) return null;
  return (
    <Modal visible={loading} transparent={true} animationType="fade">
      <View className="flex-1 justify-center items-center bg-[#00000080]">
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={{ color: "#ffffff", marginTop: 10 }}>Loading...</Text>
      </View>
    </Modal>
  );
};

export default LoadingIndicator;
