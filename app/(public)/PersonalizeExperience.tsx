import React from 'react'
import { ImageBackground, Text, View, SafeAreaView, TextInput } from 'react-native'
import { withExpoSnack } from 'nativewind';
import { AntDesign } from '@expo/vector-icons';
import ButtonOne from '@/components/buttons/buttonOne';
import BackPageButton from '@/components/buttons/backPageButton';
import { useRouter } from 'expo-router';


const PersonalizeExperience = () => {

    const router = useRouter();

    return (
        <SafeAreaView className='bg-white h-[100vh] flex justify-between'>
            <View>
                <ImageBackground className='h-[90] w-full flex justify-center' source={require('../../assets/images/onBoarding/bgImageTop.png')}>
                    <View className='px-[25px] flex flex-row'>
                        <BackPageButton />
                    </View>
                </ImageBackground>
                <View className='mt-16 px-[28px] flex'>
                    <Text className='text-[25px] text-black font-medium'>
                        Let's personalize your experience
                    </Text>
                    <Text className='mt-8 text-[18px] leading-[26px]'>
                        What can we call you? Could be your name, a nickname or something funny ☺.
                    </Text>
                    <View className='mt-16 flex flex-row border-b-[1px] border-subMainColor py-3'>
                        <AntDesign name="user" size={24} color="#9796A1" />
                        <TextInput
                            placeholder="Name"
                            className='w-11/12 text-[#9796A1] placeholder:text-[#9796A1] text-[18px] mx-2'
                        />
                    </View>
                </View>
            </View>
            <ButtonOne name='CONTINUE' onPress={() => router.push("/(public)/CompletedSuccesVerified")} />
        </SafeAreaView>
    )
}

export default withExpoSnack(PersonalizeExperience)