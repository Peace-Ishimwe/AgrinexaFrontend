import React, { useRef, useState } from 'react';
import { SafeAreaView, Text, View, ScrollView, Image, Pressable, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { withExpoSnack } from 'nativewind';
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


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

const Dashboard = () => {
    const greeting = getGreeting();

    return (
        <SafeAreaView className="px-[2vh] bg-[#FFF] h-[100vh]">
            <View className="pt-[8vh] flex flex-row items-center justify-between">
                <View>
                    <Text className="text-[#90A5B4] text-[16px] max-w-7/12 font-medium">
                        {greeting},
                    </Text>
                    <Text className="text-[#111111] text-[21px] max-w-7/12 font-semibold">
                        Castella!
                    </Text>
                </View>
                <View className="p-2 rounded-full bg-[#F3F9F6] relative">
                    <Ionicons name="notifications" size={20} color="black" />
                    <View style={{ position: "absolute" }} className='w-[10px] h-[10px] rounded-full bg-[#0DFF4D] right-0'></View>
                </View>
            </View>
            <View className='w-full relative mt-[48px]'>
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
                <View style={{ width: "50%", position: "relative" }}>
                    <Image source={require("../../assets/Home/Process.jpg")} className='h-fit' style={{ width: "100%", height: windowWidth / 2 - (windowHeight * 2 / 100) }} />
                    <View style={{ position: "absolute" }} className='top-[55%] left-[15%] -translate-x-1/2 -translate-y-1/2'>
                        <Text className='text-[#384144]'>Tomato farm</Text>
                        <Text className='text-white text-[20px] font-semibold ml-[20px]'>1000ml</Text>
                    </View>
                </View>
                <View>
                    <View>
                        <Text className='font-medium text'>9:30 AM</Text>
                        <View></View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};



export default withExpoSnack(Dashboard);
