import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName='addaddress' screenOptions={{ headerShown: false }} >
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
        <stack.Screen name='main' component={TabNavigator} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;