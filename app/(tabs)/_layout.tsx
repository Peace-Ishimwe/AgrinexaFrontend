import React, { useEffect, useState } from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { Redirect, Tabs, useRouter } from 'expo-router';
import { getData } from '@/utils/storage';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MainShadow } from '@/assets/styles/shadow';
import { DrawerNavigatorProvider } from '@/context/DrawerContext';
import CustomDrawer from '@/container/CustomDrawer';
import { useAuth } from '@/context/AuthContext';


const screenOptions = ({ route }: { route: RouteProp<ParamListBase, string>; navigation: any }): BottomTabNavigationOptions => ({
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 0,
    padding: 10,
    width: '100%',
    height: 94,
    zIndex: 0,
  },
  tabBarActiveTintColor: '#5DCCFC',
  tabBarInactiveTintColor: '#000',
});


const TabLayout = () => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return <Redirect href={"/Welcome"} />
  }
  return (
    <DrawerNavigatorProvider>
      <CustomDrawer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <Tabs initialRouteName='Home' screenOptions={screenOptions}>
              <Tabs.Screen
                name="Home"
                options={{
                  tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Feather name="home" size={28} color={focused ? '#5DCCFC' : '#000'} />
                      <Text style={{ fontSize: 16, color: focused ? '#5DCCFC' : '#000' }}>
                        Home
                      </Text>
                    </View>
                  ),
                }}
              />
              <Tabs.Screen
                name="Weather"
                options={{
                  tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <MaterialCommunityIcons name="google-analytics" size={28} color={focused ? '#5DCCFC' : '#000'} />
                      <Text style={{ fontSize: 16, color: focused ? '#5DCCFC' : '#000' }}>
                        Analysis
                      </Text>
                    </View>
                  ),
                }}
              />
              <Tabs.Screen
                name="Scan"
                options={{
                  tabBarIcon: ({ focused }) => (
                    <View
                      style={{
                        position: "absolute",
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: -20,
                        width: 72,
                        height: 72,
                        borderRadius: 50,
                        ...MainShadow
                      }}>
                      <Ionicons name="alarm-outline" size={42} color={focused ? '#5DCCFC' : '#000'} />
                    </View>
                  ),
                }}
              />
              <Tabs.Screen
                name="Settings"
                options={{
                  tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Ionicons name="settings-outline" size={28} color={focused ? '#5DCCFC' : '#000'} />
                      <Text style={{ fontSize: 16, color: focused ? '#5DCCFC' : '#000' }}>
                        Settings
                      </Text>
                    </View>
                  ),
                }}
              />
              <Tabs.Screen
                name="UserProfile"
                options={{
                  tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Feather name="user" size={28} color={focused ? '#5DCCFC' : '#000'} />
                      <Text style={{ fontSize: 16, color: focused ? '#5DCCFC' : '#000' }}>
                        Profile
                      </Text>
                    </View>
                  ),
                }}
              />
              <Tabs.Screen
                name="Dashboard"
                options={{
                  tabBarButton: () => null,
                }}
              />
              <Tabs.Screen
                name="FarmDashboard/[FarmId]"
                options={{
                  tabBarButton: () => null,
                }}
              />
            </Tabs>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </CustomDrawer>
    </DrawerNavigatorProvider>
  );
};

export default TabLayout;