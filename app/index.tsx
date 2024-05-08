import { Redirect } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { View } from "@/components/Themed";
import { Image } from "react-native";

const SplashImage = () => (
  <View className='w-screen h-screen'>
    <Image source={require('../assets/images/splash.png')} className='w-full h-full' />
  </View>
);

export default function TabOneScreen() {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) {
    return <SplashImage />;
  } else if (isAuthenticated) {
    return <Redirect href="/(tabs)/Home" />;
  } else {
    return <Redirect href="/(public)/Welcome" />;
  }
}