import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { View, Image, Text, Pressable } from 'react-native'
import { styled } from 'nativewind'
import { MainShadow } from '../../../assets/styles/shadow';

interface onBoardingProps {
    next: () => void;
}

const StyledView = styled(View)

const Slide1: React.FC<onBoardingProps> = ({ next }) => {
    return (
        <View className='flex items-center'>
            <View className='w-full relative'>
                <Image source={require('../../../assets/dashboard/waterTracking.png')} className='rounded-2xl w-[100%]' />
                <StyledView className='absolute bg-white w-10/12 flex flex-row justify-between items-center bottom-[-40] rounded-xl px-5 py-3 left-[8%]' style={MainShadow}>
                    <View>
                        <Text className='text-xl font-medium'>Water Tracking</Text>
                        <Text className='text-textMainColor'>
                            You can irrigate your crops{'\n'}anywhere you're!
                        </Text>
                    </View>
                    <Pressable onPress={next} className='p-2 rounded-full bg-[#F3F9F6]'>
                        <MaterialIcons name="navigate-next" size={24} color="#0C9359" />
                    </Pressable>
                </StyledView>
            </View>
            <View className='flex flex-row gap-x-1 items-center justify-center mt-14'>
                <View className='w-[24px] h-[8px] rounded-full bg-[#0C9359]' ></View>
                <View className='w-[24px] h-[8px] rounded-full bg-[#93a59cea]' ></View>
                <View className='w-[24px] h-[8px] rounded-full bg-[#93a59cea]' ></View>
            </View>
        </View>
    )
}

export default Slide1