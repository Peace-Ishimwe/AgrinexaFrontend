import React from 'react';
import { View, ImageBackground, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ButtonOne from '../../../components/buttons/buttonOne';

interface onBoardingProps {
    next: () => void;
}

const Board1: React.FC<onBoardingProps> = ({ next }) => {

    const navigation = useNavigation();

    return (
        <View className='h-[100vh] bg-white flex justify-between'>
            <ImageBackground className='h-[76] w-full' source={require('../../../assets/onBoarding/bgImageTop.png')}>
            </ImageBackground>
            <View className='main-view px-[35] mt-[-65px]'>
                <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={28} color="black" />
                <View className='flex flex-row items-center justify-center mt-5'><Image source={require("../../../assets/onBoarding/smartIrigation.png")} /></View>
                <Text className='font-bold text-[24px] text-center mt-8'>Smart irrigation of crops</Text>
                <Text className='text-base text-center text-textMainColor mt-14'>Quick and easy to set your crop's irrigation systems & then track their daily water intake progress.</Text>
                <View className='flex flex-row gap-x-1 items-center justify-center mt-5'>
                    <TouchableOpacity className='w-[24px] h-[8px] rounded-full bg-subMainColor' ></TouchableOpacity>
                    <TouchableOpacity className='w-[24px] h-[8px] rounded-full bg-[#979797]' ></TouchableOpacity>
                    <TouchableOpacity className='w-[24px] h-[8px] rounded-full bg-[#979797]' ></TouchableOpacity>
                </View>
            </View>
            <ButtonOne name='NEXT' onPress={next} />
        </View>
    );
};

export default Board1;