import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import ContextProviders from '@/context/ContextProviders';
import { useAuth } from '@/context/AuthContext';

export { ErrorBoundary } from 'expo-router';
export const unstable_settings = { initialRouteName: '(tabs)' };
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  useEffect(() => { if (error) throw error; }, [error]);
  useEffect(() => { if (loaded) { SplashScreen.hideAsync(); } }, [loaded]);
  if (!loaded) { return null; }
  return <RootLayoutNav />;
}
function RootLayoutNav() {
  return (
    <ContextProviders >
      <Stack initialRouteName='(tabs)' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name='(public)' />
        <Stack.Screen name='(auth)' />
        <Stack.Screen name='AddAddress' />
        <Stack.Screen name='ContactUs' />
      </Stack>
    </ContextProviders>
  );
}