import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import Dashboard from '../screens/(dashboard)/Dashboard';

const Tab = createBottomTabNavigator();
const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: 'absolute',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        padding: 10,
        width: '100%',
        height: 94,
        zIndex: 0,
    },
    tabBarActiveTintColor: '#5DCCFC',
    tabBarInactiveTintColor: '#000',
};

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="home"
                component={Dashboard}
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
                name="search"
                component={Dashboard}
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
                name="scan"
                component={Dashboard}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View className='absolute top-[-20] bg-white p-4 rounded-full' style={{
                            alignItems: 'center', justifyContent: 'center', shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.29,
                            shadowRadius: 4.65,
                            elevation: 7
                        }}>
                            <Ionicons name="alarm-outline" size={42} color={focused ? '#5DCCFC' : '#000'} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="like"
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
                name="account"
                component={Dashboard}
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
        </Tab.Navigator>
    );
};

export default TabNavigator;
