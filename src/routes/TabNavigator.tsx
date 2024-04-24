import React, { useEffect, useState } from 'react';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { ParamListBase, RouteProp, useLinkTo } from '@react-navigation/native';
import Dashboard from '../screens/(dashboard)/Dashboard';
import Home from '../screens/home/Home';
import Weather from '../screens/weather/Weather';
import FarmDashBoard from '../screens/(dashboard)/FarmDashBoard';
import { getData } from '../utils/storage';
import UserProfile from '../screens/profile/UserProfile';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MainShadow } from '../assets/styles/shadow';

const Tab = createBottomTabNavigator();

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


const TabNavigator = () => {
    const [isLoading, setIsLoading] = useState(true);
    const linkTo = useLinkTo();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await getData("token");
                if (!token) linkTo("/login");
            } catch (error) {
                console.error('Error checking login status:', error);
            } finally {
                setIsLoading(false);
            }
        };
        checkLoginStatus();
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <Tab.Navigator initialRouteName='Homestack' screenOptions={screenOptions}>
                    <Tab.Screen
                        name="Homepage"
                        component={Home}
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
                    <Tab.Screen
                        name="weather"
                        component={Weather}
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
                    <Tab.Screen
                        name="Scan"
                        component={Dashboard}
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
                    <Tab.Screen
                        name="Settings"
                        component={Dashboard}
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
                    <Tab.Screen
                        name="Account"
                        component={UserProfile}
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
                    <Tab.Screen
                        name="Dashboard"
                        component={Dashboard}
                        options={{ 
                            tabBarButton: () => null,
                        }}
                    />
                    <Tab.Screen
                        name="Farm"
                        component={FarmDashBoard}
                        options={{ 
                            tabBarButton: () => null,
                        }}
                    />
                </Tab.Navigator>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
};

export default TabNavigator;