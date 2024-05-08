import React from 'react'
import { Image, ImageBackground, Pressable, SafeAreaView, Text, View } from 'react-native'
import { withExpoSnack } from 'nativewind';
import { styled } from 'nativewind';
import { useLinkTo } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const StyledPressable = styled(Pressable)

const CompletedSuccess = () => {
    const linkTo = useLinkTo();
    const router = useRouter();
    return (
        <SafeAreaView className='h-[100vh] bg-mainColor flex justify-between'>
            <View className='justify-between flex items-center'>
                <ImageBackground className='h-[76] w-full' source={require('../../assets/images/onBoarding/bgImageTop.png')}>
                </ImageBackground>
                <View className='pt-[10vh]'>
                    <Image className='mx-auto' source={require("../../assets/images/completedIcon.png")} />
                    <View className='pt-[2vh]'>
                        <Text className='text-[26px] font-[700] text-[#fff] text-center'>Welcome back <Text className='text-subMainColor'>Peace,</Text></Text>
                    </View>
                    <View className='pt-[3vh]'>
                        <Text className='text-[#1C1B1F] text-base text-center'>
                            Congratulations to you. You have now {"\n"} entered our farm!
                        </Text>
                    </View>
                    <View className='pt-[3vh]'>
                        <Text className='text-[#1C1B1F] text-base text-center'>
                            Continue to view our services!
                        </Text>
                    </View>
                </View>
            </View>
            <View className='h-[20vh] w-full flex items-center justify-center px-[35]'>
                <StyledPressable onPress={()=>{router.push("/(auth)/Login")}} className='bg-subMainColor shadow-2xl py-[20px] w-full rounded-[15px]'><Text className='text-center text-white font-[700] text-base'>CONTINUE</Text></StyledPressable>
            </View>
        </SafeAreaView>
    )
}

export default withExpoSnack(CompletedSuccess)