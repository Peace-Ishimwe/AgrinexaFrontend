import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

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
import DrawerNavigator from './DrawerNavigator';

const SplashImage = () => (
  <View className='w-screen h-screen'>
    <Image source={require('../../assets/splash.png')} className='w-full h-full' />
  </View>
);

const RootNavigator = () => {
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

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'main' : 'welcome'} screenOptions={{ headerShown: false }}
      >
        {
          isLoggedIn ? (
            <Stack.Group>
              <Stack.Screen name='main' component={DrawerNavigator} />
              <Stack.Screen name='addaddress' component={AddAddress} />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name='welcome' component={Welcome} />
              <Stack.Screen name='contactUs' component={ContactUs} />
              <Stack.Screen name='login' component={Login} />
              <Stack.Screen name='registerwithphone' component={RegisterWithPhone} />
              <Stack.Screen name='registerwithemail' component={RegisterWithEmail} />
            </Stack.Group>
          )
        }
        <Stack.Group>
          <Stack.Screen name="onBoarding" component={OnBoarding} />
          <Stack.Screen name="personalize" component={PersonalizeExperience} />
          <Stack.Screen name='completedSuccess' component={CompletedSuccess} />
          <Stack.Screen name='verificationCode' component={VerificationCode} />
          <Stack.Screen name='resetpassword' component={ResetPassword} />
          <Stack.Screen name='completedSuccessVerified' component={CompletedSuccesVerified} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;