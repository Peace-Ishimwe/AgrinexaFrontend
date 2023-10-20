import React from 'react'
import { ImageBackground, Text, View, SafeAreaView, Image } from 'react-native'
import { withExpoSnack } from 'nativewind';
import { useLinkTo } from '@react-navigation/native';
import ButtonOne from '../../components/buttons/buttonOne';
import BackPageButton from '../../components/buttons/backPageButton';

const ContactUs = () => {

    const linkTo = useLinkTo();

    return (
        <SafeAreaView className='bg-white h-[100vh] flex justify-between'>
            <View>
                <ImageBackground className='h-[90] w-full flex justify-center pt-4' source={require('../../assets/onBoarding/bgImageTop.png')}>
                    <View className='px-[25px] flex flex-row items-center gap-x-2'>
                        <BackPageButton />
                        <Text className='text-[#111111] text-[25px] font-medium'>Please reach out to us</Text>
                    </View>
                </ImageBackground>
                <View className='mt-[5vh]'>
                    <View className='w-fit ml-[10vw] flex flex-row items-center'>
                        <View className='h-16 w-16 border-[1px] border-black'>
                            <Image className='w-full h-full' source={require("../../assets/Socialicons/WhatsApp.png")} />
                        </View>
                        <Text className='text-[#111719] text-[18px] ml-4 font-semibold'>
                            (+91) 972-585-3396
                        </Text>
                    </View>
                    <View className='w-fit ml-[10vw] flex flex-row items-center'>
                        <View className='h-16 w-16 border-[1px] border-black'>
                            <Image className='w-full h-full' source={require("../../assets/Socialicons/Google.png")} />
                        </View>
                        <Text className='text-[#111719] text-[18px] ml-4 font-semibold'>
                            agrinexa.farm.com
                        </Text>
                    </View>
                    <View className='w-fit ml-[10vw] flex flex-row items-center'>
                        <View className='h-16 w-16 border-[1px] border-black'>
                            <Image className='w-full h-full' source={require("../../assets/Socialicons/Slack.png")} />
                        </View>
                        <Text className='text-[#111719] text-[18px] ml-4 font-semibold'>
                            agrinexa.farm.com
                        </Text>
                    </View>
                    <View className='w-fit ml-[10vw] flex flex-row items-center'>
                        <View className='h-16 w-16 border-[1px] border-black'>
                            <Image className='w-full h-full' source={require("../../assets/Socialicons/Google.png")} />
                        </View>
                        <Text className='text-[#111719] text-[18px] ml-4 font-semibold'>
                            agrinexa
                        </Text>
                    </View>
                    <View className='w-fit ml-[10vw] flex flex-row items-center'>
                        <View className='h-16 w-16 border-[1px] border-black'>
                            <Image className='w-full h-full' source={require("../../assets/Socialicons/Instagram.png")} />
                        </View>
                        <Text className='text-[#111719] text-[18px] ml-4 font-semibold'>
                            agrinexa
                        </Text>
                    </View>
                    <View className='w-fit ml-[10vw] flex flex-row items-center'>
                        <View className='h-16 w-16 border-[1px] border-black'>
                            <Image className='w-full h-full' source={require("../../assets/Socialicons/Facebook.png")} />
                        </View>
                        <Text className='text-[#111719] text-[18px] ml-4 font-semibold'>
                            agrinexa
                        </Text>
                    </View>
                    <View className='w-fit ml-[10vw] flex flex-row items-center'>
                        <View className='h-16 w-16 border-[1px] border-black'>
                            <Image className='w-full h-full' source={require("../../assets/Socialicons/LinkedIn.png")} />
                        </View>
                        <Text className='text-[#111719] text-[18px] ml-4 font-semibold'>
                            agrinexa
                        </Text>
                    </View>
                    <View className='w-fit ml-[10vw] flex flex-row items-center'>
                        <View className='h-16 w-16 border-[1px] border-black'>
                            <Image className='w-full h-full' source={require("../../assets/Socialicons/Twitter.png")} />
                        </View>
                        <Text className='text-[#111719] text-[18px] ml-4 font-semibold'>
                            agrinexa
                        </Text>
                    </View>
                </View>
            </View>
            <ButtonOne name='CONTINUE' onPress={() => linkTo("/completedSuccess")} />
        </SafeAreaView>
    )
}

export default withExpoSnack(ContactUs)