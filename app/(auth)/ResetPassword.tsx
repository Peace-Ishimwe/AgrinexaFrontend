import React from 'react'
import { Image, ImageBackground, Pressable, SafeAreaView, Text, TextInput, View , StatusBar } from 'react-native'
import BackPageButton from '@/components/buttons/backPageButton'
import ButtonTwo from '@/components/buttons/buttonTwo'
import { useLinkTo } from '@react-navigation/native'

const ResetPassword = () => {

    const linkTo = useLinkTo();

    return (
        <SafeAreaView style={{flex: 1}} className='bg-white h-[100vh] flex justify-between'>
            <StatusBar translucent backgroundColor={'transparent'} />
                <View>
                    <ImageBackground className='h-[28vh] px-[2vh] pt-[6vh]' source={require("../../assets/images/authBgImage.png")}>
                        <View className='flex flex-col items-start'>
                            <BackPageButton />
                            <Text className='text-[#fff] text-[37px] mt-4'>Reset Password</Text>
                            <Text className='mt-3 text-[#fff] text-lg'>Do you want to change your{"\n"}password?</Text>
                        </View>
                    </ImageBackground>
                    <View className='mt-4 px-[2vh]'>
                        <Text className='text-subMainColor text-[28px] font-semibold'>AgriNexa!</Text>
                        <Text className='text-textSubMainColor mt-6 text-base font-medium'>Please enter your email address to  {"\n"}request a password reset</Text>
                        <View className='mt-10'>
                            <TextInput keyboardType='email-address' className='border-[1px] bg-white border-subMainColor p-4 text-xl' placeholder='ex: peaceishimwem@gmail.com' />
                        </View>
                        <View className='mt-10'>
                            <Text className='text-center text-textMainColor text-[18px]'>Don't have an account? <Text className='text-mainColor'> SignUp</Text></Text>
                        </View>
                        <View className='mt-10'>
                            <ButtonTwo loading onPress={() => linkTo("/verificationCode")} name='SEND' />
                        </View>
                    </View>
                </View>
                <View className='pb-4'>
                    <View className='flex flex-row items-center gap-x-3 justify-center'>
                        <View className='h-[1] bg-[#B3B3B380] w-3/12'></View>
                        <Text className='text-textMainColor -base'>sign in with</Text>
                        <View className='h-[1] bg-[#B3B3B380] w-4/12'></View>
                    </View>
                    <View className='mt-[20px] flex flex-row justify-center gap-x-6'>
                        <Pressable className='bg-white flex rounded-full flex-row items-center px-[16px] py-[10px]'>
                            <Image source={require("../../assets/images/facebookIcon.png")} />
                            <Text className='mx-3 text-[16px]'>Facebook</Text>
                        </Pressable>
                        <Pressable className='bg-white flex rounded-full flex-row items-center px-[10px] py-[7px]'>
                            <Image source={require("../../assets/images/googleIcon.png")} />
                            <Text className='mx-6 text-[16px]'>Google</Text>
                        </Pressable>
                    </View>
                </View>
        </SafeAreaView>
    )
}

export default ResetPassword