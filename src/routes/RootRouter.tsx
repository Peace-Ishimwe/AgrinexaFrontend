import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, View, StyleSheet } from 'react-native';

const stack = createNativeStackNavigator();

import Welcome from '../screens/welcome/Welcome';
import OnBoarding from '../screens/onBoarding/OnBoarding';
import PersonalizeExperience from '../screens/PersonalizeExperience/PersonalizeExperience';
import CompletedSuccess from '../screens/completedSuccess/CompletedSuccess';
import CompletedSuccesVerified from '../screens/completedSuccess/CompletedSuccesVerified';
import RegisterWithPhone from '../screens/(auth)/register/RegisterWithPhone';
import RegisterWithEmail from '../screens/(auth)/register/RegisterWithEmail';
import VerificationCode from '../screens/(auth)/verification/VerificationCode';
import ResetPassword from '../screens/(auth)/reset-password/ResetPassword';
import Login from '../screens/(auth)/login/Login';
import AddAddress from '../screens/address/AddAddress';
import ContactUs from '../screens/contactUs/ContactUs';
import TabNavigator from './TabNavigator';
import Weather from '../screens/weather/Weather';
import { getData } from '../utils/storage';

const SplashImage = () => (
  <View className='w-screen h-screen'>
    <Image source={require('../../assets/splash.png')} className='w-full h-full' />
  </View>
);

const RootNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await getData("token");
        setIsLoggedIn(!!token);
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  if (isLoading) {
    return <SplashImage />;
  }
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName={isLoggedIn ? 'main' : 'welcome'} screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <stack.Group>
            <stack.Screen name="main" component={TabNavigator} />
            <stack.Screen name='weather' component={Weather} />
          </stack.Group>
        ) : (
          <stack.Group>
            <stack.Screen name="welcome" component={Welcome} />
            <stack.Screen name="onBoarding" component={OnBoarding} />
            <stack.Screen name="personalize" component={PersonalizeExperience} />
            <stack.Screen name='completedSuccess' component={CompletedSuccess} />
            <stack.Screen name='registerwithphone' component={RegisterWithPhone} />
            <stack.Screen name='registerwithemail' component={RegisterWithEmail} />
            <stack.Screen name='verificationCode' component={VerificationCode} />
            <stack.Screen name='resetpassword' component={ResetPassword} />
            <stack.Screen name='login' component={Login} />
            <stack.Screen name='addaddress' component={AddAddress} />
            <stack.Screen name='completedSuccessVerified' component={CompletedSuccesVerified} />
            <stack.Screen name='contactUs' component={ContactUs} />
          </stack.Group>
        )}
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;