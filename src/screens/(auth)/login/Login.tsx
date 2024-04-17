import React, { useState } from 'react'
import { Image, ImageBackground, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native'
import BackPageButton from '../../../components/buttons/backPageButton'
import ButtonTwo from '../../../components/buttons/buttonTwo'
import styled from 'styled-components/native'
import { useLinkTo } from '@react-navigation/native'
import { Controller, SubmitErrorHandler, useForm } from 'react-hook-form'
import axios from 'axios'

const StyledScrollView = styled.ScrollView.attrs(() => ({
    contentContainerStyle: {
        justifyContent: 'space-between'
    },
}))``;


interface FormData {
    email: string;
    password: string;
}
const Login = () => {
    const linkTo = useLinkTo();
    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm<FormData>();
    const onSubmit = async (data: FormData) => {
        console.log(data)
        try {
          const response = await axios.post(process.env.EXPO_PUBLIC_BACKEND_URL as string + "/auth/login", data);
          console.log('Response from server:', response.data);
          // Optionally, you can handle success responses here
          linkTo("/addaddress")
        } catch (error) {
          console.error('Error posting data:', error);
          // Optionally, you can handle error responses here
        }
      };

    const onError: SubmitErrorHandler<FormData> = (errors, e) => {
        return console.log(errors)
    }

    return (
        <SafeAreaView className='bg-white h-[100vh] flex justify-between'>
            <StyledScrollView className='h-full bg-white flex'>
                <View>
                    <ImageBackground className='h-[33vh] px-[2vh] pt-[4vh]' source={require("../../../assets/authBgImage.png")}>
                        <View className='flex flex-col items-start'>
                            <BackPageButton />
                            <Text className='text-[#fff] text-[37px] mt-4'>LogIn</Text>
                            <Text className='mt-3 text-[#fff] text-lg'>Fill in your credentials down there{"\n"}to enter your account!</Text>
                        </View>
                    </ImageBackground>
                    <View className='mt-4 px-[2vh]'>
                        <Text className='text-subMainColor text-[28px] font-semibold'>AgriNexa!</Text>
                        <View className='mt-5'>
                            <Text aria-label="Label for Username" className='text-base text-textMainColor font-medium' nativeID="email">E-mail</Text>
                            <Controller
                                control={control}
                                render={({ field: {onChange, value} }) => (
                                    <TextInput keyboardType='email-address'
                                        aria-labelledby="email" className='border-[1px] bg-white mt-3 border-subMainColor p-4 text-xl' placeholder='peaceishimwem@gmail.com' 
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )}
                                name='email'
                                rules={{ required: 'You must enter your email', pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email address' } }}
                            />
                        </View>
                        <View className='mt-5'>
                            <Text aria-label="Label for Username" className='text-base text-textMainColor font-medium' nativeID="password">Password</Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        placeholder="* * * * * * * * "
                                        className='border-[1px] bg-white mt-3 border-subMainColor p-4 text-xl'
                                        secureTextEntry={true}
                                        aria-accessibilityLabelledBy={"password"}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )}
                                name="password"
                                rules={{ required: 'You must enter your password' }}
                            />
                        </View>
                        <View className='mt-10'>
                            <ButtonTwo name='SIGN UP' />
                        </View>
                        <View className='mt-6 flex flex-row items-center justify-center'>
                            <Text className='text-center text-textMainColor text-[18px]'>Don't have an account?
                            </Text>
                            <Pressable onPress={() => linkTo("/registerwithphone")}>
                                <Text style={{ color: '#34A853', fontSize: 18 }} className='text-mainColor  ml-2 text-[18px]'>Signup</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View className='py-4'>
                    <View className='flex flex-row items-center gap-x-3 justify-center'>
                        <View className='h-[1] bg-[#B3B3B380] w-3/12'></View>
                        <Text className='text-textMainColor text-base'>sign in with</Text>
                        <View className='h-[1] bg-[#B3B3B380] w-4/12'></View>
                    </View>
                    <View className='mt-[20px] flex flex-row justify-center gap-x-6'>
                        <Pressable className='bg-white flex rounded-full flex-row items-center px-[16px] py-[10px]'>
                            <Image source={require("../../../assets/facebookIcon.png")} />
                            <Text className='mx-3 text-[16px]'>Facebook</Text>
                        </Pressable>
                        <Pressable className='bg-white flex rounded-full flex-row items-center px-[10px] py-[7px]'>
                            <Image source={require("../../../assets/googleIcon.png")} />
                            <Text className='mx-6 text-[16px]'>Google</Text>
                        </Pressable>
                    </View>
                </View>
            </StyledScrollView>
        </SafeAreaView>
    )
}

export default Login