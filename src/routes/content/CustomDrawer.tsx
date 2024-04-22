import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useLinkTo, useNavigation, useRoute } from '@react-navigation/native';
import { getActiveRouteState , getCurrentRouteName, RouteName } from '../../utils/constants';
import { Drawer } from 'react-native-drawer-layout';
import { useDrawerContext } from '../../context/DrawerContext';
import { useAuth } from '../../context/AuthContext';

const screens = [
    { name: 'My Farms', icon: 'document-text', screen: "Farm" },
    { name: 'My Profile', icon: 'person-sharp', screen: "UserProfile" },
    { name: 'Assets Address', icon: 'location-sharp', screen: "Farm" },
    { name: 'Payment Methods', icon: 'card-sharp', screen: "Scan" },
    { name: 'Contact Us', icon: 'call-sharp', screen: "Farm" },
];

const CustomDrawerContent = () => {
    const linkTo = useLinkTo()
    const route = useRoute()
    const navigation = useNavigation()
    const activeRoute = getCurrentRouteName(navigation.getState());
    console.log(activeRoute)
    const currentRouteName = RouteName()

    useEffect(() => {
        if (currentRouteName) {
            console.log(`Current route name: ${currentRouteName}`);
        } else {
            console.log('Current route name is undefined');
        }
    }, [currentRouteName]);
    const { open, setOpen } = useDrawerContext()
    const { logout } = useAuth();

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                contentContainerStyle={{ backgroundColor: '#34A853' }}
            >
                <View
                    style={{ padding: 20 }}
                >
                    <Image
                        source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
                        style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
                    />
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 18,
                            marginBottom: 5,
                        }}
                    >
                        John Doe
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={{
                                color: '#fff',
                                marginRight: 5,
                            }}
                        >
                            280 Coins
                        </Text>
                        <FontAwesome5 name="coins" size={14} color="#fff" />
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                    {screens.map(screen => (
                        <DrawerItem
                            key={screen.name}
                            icon={({ size }) => (
                                <Ionicons
                                    name={screen.icon}
                                    size={size}
                                    color={currentRouteName === screen.screen ? '#fff' : '#9796A1'}
                                    style={{ marginLeft: 4 }}
                                />
                            )}
                            label={screen.name}
                            style={{ backgroundColor: currentRouteName === screen.screen ? '#34A853' : '#fff', }}
                            labelStyle={{ marginLeft: -16, color: currentRouteName === screen.screen ? "#fff" : "#000" }}
                            onPress={() => {
                                linkTo('/' + screen.screen)
                                setOpen(!open)
                            }}
                        />
                    ))}
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "#34A853", width: 117, height: 43, borderRadius: 50, paddingLeft: 8 }}>
                        <View className='p-[4px] bg-white rounded-full'>
                            <Ionicons name="power-sharp" color={"#34A853"} size={20} />
                        </View>
                        <Text
                            style={{
                                fontSize: 16,
                                marginLeft: 8,
                                fontWeight: "600",
                                color: "white"
                            }}
                        >
                            Log Out
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

interface Drawerprops { children: React.ReactNode }

const CustomDrawer: React.FC<Drawerprops> = ({ children }) => {
    const { open, setOpen } = useDrawerContext()
    return (
        <Drawer
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            renderDrawerContent={() => {
                return <CustomDrawerContent />;
            }}
        >
            {children}
        </Drawer>
    )
}

export default CustomDrawer