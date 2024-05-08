import React from 'react'
import { ImageBackground, Pressable, View, Text, Image, StatusBar, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { Redirect, useRouter } from 'expo-router';

const Welcome = () => {
    const router = useRouter();
    const { isAuthenticated } = useAuth()
    if (isAuthenticated) {
        <Redirect href={"/(tabs)/Home"} />
    }
    return (
        <ImageBackground source={require("../../assets/images/Welcome.png")} style={{ flex: 1, backgroundColor: "#40513C" }} className='px-[2vh]'>
            <StatusBar
                animated={true}
                barStyle={"light-content"}
                translucent
                backgroundColor="transparent"
            />
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: "row" }} className='justify-end items-end mt-2'>
                        <Pressable onPress={() => router.push("/OnBoarding")} className='bg-white px-[16] py-[8] rounded-full'>
                            <Text className='text-mainColor font-semibold'>skip</Text>
                        </Pressable>
                    </View>
                    <View style={{ flex: 1, flexDirection: "column" }} className='mt-12 h-[210px] justify-between px-[10px]'>
                        <View className=''>
                            <Text className='text-[36px] font-semibold text-white'>Welcome to {"\n"}<Text className='text-subMainColor text-[46px]'>AgriNexa</Text> </Text>
                        </View>
                    </View>
                    <View className=''>
                        <Text className='text-[18px] mt-[28px] font-medium text-white leading-[27px] text-center'>Make Easy Farming with fast soil & {"\n"}water management system .</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }} className='mt-[24px] items-center gap-x-3 justify-center'>
                        <View className='h-[1] bg-white w-3/12'></View>
                        <Text className='text-white text-base'>sign in with</Text>
                        <View className='h-[1] bg-white w-3/12'></View>
                    </View>
                    <View className='mt-[32px] flex flex-row justify-center gap-x-6'>
                        <Pressable className='bg-white flex rounded-full flex-row items-center px-[16px] py-[10px]'>
                            <Image source={require("../../assets/images/facebookIcon.png")} />
                            <Text className='mx-3 text-[16px]'>Facebook</Text>
                        </Pressable>
                        <Pressable className='bg-white flex rounded-full flex-row items-center px-[10px] py-[7px]'>
                            <Image source={require("../../assets/images/googleIcon.png")} />
                            <Text className='mx-6 text-[16px]'>Google</Text>
                        </Pressable>
                    </View>
                    <View className='mt-[20px] flex flex-col justify-center'>
                        <Pressable onPress={() => { router.push("/(auth)/RegisterWithEmail") }} className='rounded-full border-[1px] mb-4 border-[#fff] py-3 flex items-center bg-[#ffffff35]'>
                            <Text className='text-[#fff] text-base'>Start with Email</Text>
                        </Pressable>
                        <Pressable onPress={() => router.push("/(auth)/RegisterWithPhone")} className='rounded-full border-[1px] border-[#fff] py-3 flex items-center bg-[#ffffff35]'>
                            <Text className='text-[#fff] text-base'>Start with Phone</Text>
                        </Pressable>
                    </View>
                    <View className='my-[30px] flex flex-row justify-center items-center'>
                        <Text className='text-center text-base text-white font-semibold'>Already have an account?</Text>
                        <Pressable onPress={() => router.push("/(auth)/Login")}>
                            <Text className='text-base ml-3 underline text-white'>
                                SignIn
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default Welcome;