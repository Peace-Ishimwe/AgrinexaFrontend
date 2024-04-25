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
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        setIsLoggedIn(isAuthenticated)
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      }
    };
    checkLoginStatus();
  }, [isAuthenticated]);

  if (isLoading) {
    return <SplashImage />;
  }

  if (!isLoggedIn) {
    return <Redirect href="/Welcome" />;
  } else {
    return <Redirect href="/(tabs)/Home" />;
  }
}