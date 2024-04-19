import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, Text, View, ScrollView, Image, Pressable, Dimensions, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { withExpoSnack, styled } from 'nativewind';
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { MainShadow } from '../../assets/styles/shadow';
import { useLinkTo } from '@react-navigation/native';
import { getData } from '../../utils/storage';


const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
        return 'Good Morning';
    } else if (hour >= 12 && hour < 18) {
        return 'Good Afternoon';
    } else {
        return 'Good Evening';
    }
};

const StyledView = styled(View)

const Home = () => {
    const greeting = getGreeting();
    const additionalStyles: ViewStyle = {
        position: "absolute",
        right: 0
    };
    const combinedStyles: ViewStyle = { ...MainShadow, ...additionalStyles };

    const linkTo = useLinkTo()
    const [user, setUser] = useState<{ name: string; email: string } | null>(
        null
    );
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getData("user");
                setUser(user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    return (
        <SafeAreaView className="px-[2vh] bg-[#FFF] h-[100vh]">
            <View className="pt-[8vh] flex flex-row items-center justify-between">
                <View>
                    <Text className="text-[#90A5B4] text-[16px] max-w-7/12 font-medium">
                        {greeting},
                    </Text>
                    <Text className="text-[#111111] text-[21px] max-w-7/12 font-semibold">
                    {user?.name} 🌿
                    </Text>
                </View>
                <View className="p-2 rounded-full bg-[#F3F9F6] relative">
                    <Ionicons name="notifications" size={20} color="black" />
                    <View style={{ position: "absolute" }} className='w-[10px] h-[10px] rounded-full bg-[#0DFF4D] right-0'></View>
                </View>
            </View>
            <ScrollView style={{marginTop: 24}} showsVerticalScrollIndicator={false}>
                <View style={{}} className='w-full relative'>
                    <Image source={require('../../assets/Home/Group481825.jpg')} className='rounded-2xl w-[100%]' />
                    <View className='absolute'>
                        <Text className='text-[20px] font-medium text-[#FF0000]'>Alert!</Text>
                        <Text className=''>Tomato farm</Text>
                    </View>
                    <Pressable style={{ position: "absolute" }} className='px-4 py-1 rounded-full bg-white bottom-5 left-4'>
                        <Text>Visit your farm</Text>
                    </Pressable>
                </View>
                <View style={{ position: "relative", marginTop: 48 }} >
                    <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" }}>
                        <View style={{ width: "50%", position: "relative" }}>
                            <Image source={require("../../assets/Home/Process.jpg")} className='h-fit' style={{ width: "100%", height: windowWidth / 2 - (windowHeight * 2 / 100) }} />
                            <View style={{ position: "absolute" }} className='top-[55%] left-[15%] -translate-x-1/2 -translate-y-1/2'>
                                <Text className='text-[#384144]'>Tomato farm</Text>
                                <Text className='text-white text-[20px] font-semibold ml-[20px]'>1000ml</Text>
                            </View>
                        </View>
                        <View style={MainShadow} className='rounded-md p-[10px] w-[118px]'>
                            <Text className='font-medium text-[16px] text-[#90A5B4] text-center'>Maximum</Text>
                            <Text style={{ fontWeight: "600", fontSize: 21, color: "black", textAlign: "center", marginTop: 6 }} className=''>100ml</Text>
                        </View>
                    </View>
                    <View style={combinedStyles} className='rounded-md p-[10px] w-[50%]'>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 24 }} className=''>
                            <Text className='font-medium text-[16px] text-[#90A5B4]'>9:30 AM</Text>
                            <View className='w-[44px] h-[4px] bg-[#90A5B4] rounded-full'></View>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} className='mt-[12px]'>
                            <Text className='font-semibold text-[21px] text-black'>2000ml</Text>
                            <Text style={{ color: "#90A5B4" }} className='text-[17px] font-medium'>
                                10%
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 48, display: "flex" }} className='items-center justify-center px-[35]'>
                    <Pressable
                        onPress={() => linkTo("/dashboard")}
                        style={{
                            backgroundColor: "#34A853",
                            paddingVertical: 20,
                            width: "100%",
                            borderRadius: 15,
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                color: "white",
                                fontWeight: "700",
                                fontSize: 16,
                            }}
                        >
                            GO TO DASHBOARD
                        </Text>
                    </Pressable>

                </View>
                <Text style={{ width: 220, textAlign: "center", color: "#90A5B4", fontWeight: "500", fontSize: 14, marginTop: 12, marginBottom: 120 }} className='mx-auto'>
                    You got 50% of today’s goal, keep focus on your health!
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};



export default withExpoSnack(Home);
