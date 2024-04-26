import { Redirect } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { View } from "@/components/Themed";
import { Image } from "react-native";

const SplashImage = () => (
  <View className='w-screen h-screen'>
    <Image source={require('../assets/images/splash.png')} className='w-full h-full' />
  </View>
);

export default function TabOneScreen() {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return <Redirect href="/(public)/Welcome" />;
  } else {
    return <Redirect href="/(tabs)/Home" />;
  }
}