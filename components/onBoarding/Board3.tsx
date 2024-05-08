import React from 'react';
import { View, ImageBackground, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLinkTo } from '@react-navigation/native';
import ButtonOne from '@/components/buttons/buttonOne';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

interface onBoardingProps {
    back: () => void;
}

const Board3: React.FC<onBoardingProps> = ({ back }) => {

    const router = useRouter();

    return (
        <View className='h-[100vh] bg-white flex justify-between'>
            <ImageBackground style={{ position: "absolute" }} className='h-[76] w-full' source={require('../../assets/images/onBoarding/bgImageTop.png')}>
            </ImageBackground>
            <SafeAreaView>
                <View className='main-view px-[35]'>
                    <Ionicons onPress={back} name="arrow-back" size={28} color="black" />
                    <View className='flex flex-row items-center justify-center mt-5'><Image source={require("../../assets/images/onBoarding/trackCrops.png")} /></View>
                    <Text className='font-bold text-[24px] text-center mt-4'>Track your daily soil &{"\n"}crops life with us!</Text>
                    <Text className='text-base text-center text-textMainColor mt-3'>Achieve your crop's health goals with a {"\n"}simple tap!</Text>
                    <View className='flex flex-row gap-x-1 items-center justify-center mt-8'>
                        <TouchableOpacity className='w-[24px] h-[8px] rounded-full bg-[#979797]' ></TouchableOpacity>
                        <TouchableOpacity className='w-[24px] h-[8px] rounded-full bg-[#979797]' ></TouchableOpacity>
                        <TouchableOpacity className='w-[24px] h-[8px] rounded-full bg-subMainColor' ></TouchableOpacity>
                    </View>
                </View>
                <ButtonOne name='NEXT' onPress={() => router.push("/PersonalizeExperience")} />
            </SafeAreaView>
        </View>
    );
};

export default Board3;