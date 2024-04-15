import React, { useState } from 'react'
import { ImageBackground, Pressable, View, Text, Image, SafeAreaView, StatusBar, StatusBarStyle } from 'react-native'
import { useLinkTo } from '@react-navigation/native'
const STYLES = ['default', 'dark-content', 'light-content'] as const;
const TRANSITIONS = ['fade', 'slide', 'none'] as const;
const Welcome = () => {
    const linkTo = useLinkTo();
    const [hidden, setHidden] = useState(false);
    const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>(
        STYLES[0],
    );
    const [statusBarTransition, setStatusBarTransition] = useState<
        'fade' | 'slide' | 'none'
    >(TRANSITIONS[0]);

    const changeStatusBarVisibility = () => setHidden(!hidden);

    const changeStatusBarStyle = () => {
        const styleId = STYLES.indexOf(statusBarStyle) + 1;
        if (styleId === STYLES.length) {
            setStatusBarStyle(STYLES[0]);
        } else {
            setStatusBarStyle(STYLES[styleId]);
        }
    };

    const changeStatusBarTransition = () => {
        const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
        if (transition === TRANSITIONS.length) {
            setStatusBarTransition(TRANSITIONS[0]);
        } else {
            setStatusBarTransition(TRANSITIONS[transition]);
        }
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={require("../../assets/Welcome.png")} style={{ flex: 1 }} className='px-[35]'>
            <StatusBar
                animated={true}
                barStyle={statusBarStyle}
                showHideTransition={statusBarTransition}
                translucent
                backgroundColor="transparent"
                hidden={hidden}
            />
                <View className='flex flex-row justify-end h-[10vh] items-end'>
                    <Pressable onPress={() => linkTo("/onBoarding")} className='bg-white px-[16] py-[8] rounded-full'>
                        <Text className='text-mainColor font-semibold'>skip</Text>
                    </Pressable>
                </View>
                <View className='mt-[50px] h-[43vh] flex justify-between px-[10px]'>
                    <View className=''>
                        <Text className='text-[36px] font-semibold text-white'>Welcome to {"\n"}<Text className='text-subMainColor text-[46px]'>AgriNexa</Text> </Text>
                    </View>
                    <View className=''>
                        <Text className='text-[18px] font-medium text-white leading-[27px]'>Make Easy Farming with fast soil & {"\n"}water management system .</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }} className='mt-[20px] items-center gap-x-3 justify-center'>
                    <View className='h-[1] bg-white w-3/12'></View>
                    <Text className='text-white text-base'>sign in with</Text>
                    <View className='h-[1] bg-white w-3/12'></View>
                </View>
                <View className='mt-[20px] flex flex-row justify-center gap-x-6'>
                    <Pressable className='bg-white flex rounded-full flex-row items-center px-[16px] py-[10px]'>
                        <Image source={require("../../assets/facebookIcon.png")} />
                        <Text className='mx-3 text-[16px]'>Facebook</Text>
                    </Pressable>
                    <Pressable className='bg-white flex rounded-full flex-row items-center px-[10px] py-[7px]'>
                        <Image source={require("../../assets/googleIcon.png")} />
                        <Text className='mx-6 text-[16px]'>Google</Text>
                    </Pressable>
                </View>
                <View className='mt-[20px] flex flex-col justify-center'>
                    <Pressable onPress={() => { linkTo("/registerwithemail") }} className='rounded-full border-[1px] mb-4 border-[#fff] py-3 flex items-center bg-[#ffffff35]'>
                        <Text className='text-[#fff] text-base'>Start with Email</Text>
                    </Pressable>
                    <Pressable onPress={() => linkTo("/registerwithphone")} className='rounded-full border-[1px] border-[#fff] py-3 flex items-center bg-[#ffffff35]'>
                        <Text className='text-[#fff] text-base'>Start with Phone</Text>
                    </Pressable>
                </View>
                <View className='mt-[30px] flex flex-row justify-center items-center'>
                    <Text className='text-center text-base text-white font-semibold'>Already have an account?</Text>
                    <Pressable>
                        <Text className='text-base ml-3 underline text-white'>
                            SignIn
                        </Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Welcome;