import React, { useState } from 'react'
import { Image, ImageBackground, Pressable, SafeAreaView, Text, TextInput, View, StatusBar } from 'react-native'
import BackPageButton from '@/components/buttons/backPageButton'
import ButtonTwo from '@/components/buttons/buttonTwo'
import styled from 'styled-components/native'
import { useLinkTo } from '@react-navigation/native'
import { Controller, SubmitErrorHandler, useForm } from 'react-hook-form'
import { unauthorizedAPI } from '@/utils/api'
import { storeData } from '@/utils/storage'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'expo-router';


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
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { handleSubmit, control } = useForm<FormData>();
    const { login } = useAuth();

    const onSubmit = async (data: FormData) => {
        setLoading(true)
        try {
            const response = await unauthorizedAPI.post(`/auth/login`, data);
            const { access_token, refresh_token, user } = response.data;
            await Promise.all([
                storeData("refresh_token", refresh_token),
                storeData("user", user)
            ]);
            login(access_token);
            router.replace('/(tabs)/Home');
        } catch (error) {
            console.error('Error posting data:', error);
        }
        setLoading(false);
    };

    const onError: SubmitErrorHandler<FormData> = (errors, e) => {
        return console.log(errors)
    }

    return (
        <SafeAreaView style={{ flex: 1 }} className='bg-white justify-between'>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={"light-content"} />
            <ImageBackground className='px-[2vh] pb-[2vh] pt-[6vh]' source={require("../../assets/images/authBgImage.png")} style={{ backgroundColor: "black" }}>
                <View className='flex flex-col items-start'>
                    <BackPageButton />
                    <Text className='text-[#fff] text-[37px] mt-4'>LogIn</Text>
                    <Text className='mt-3 text-[#fff] text-lg'>Fill in your credentials down there{"\n"}to enter your account!</Text>
                </View>
            </ImageBackground>
            <StyledScrollView className='h-full bg-white flex'>
                <View className='mt-4 px-[2vh]'>
                    <Text className='text-subMainColor text-[28px] font-semibold'>AgriNexa!</Text>
                    <View className='mt-5'>
                        <Text aria-label="Label for Username" className='text-base text-textMainColor font-medium' nativeID="email">E-mail</Text>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
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
                    <View style={{flexDirection: "row", justifyContent: "center"}} className='mt-[40px]'>
                        <ButtonTwo name='LOG IN' onPress={handleSubmit(onSubmit)} loading={loading} />
                    </View>
                    <View style={{ display: "flex", flexDirection: "row" }} className='mt-6 items-center justify-center'>
                        <Text className='text-center text-textMainColor text-[18px]'>Don't have an account?
                        </Text>
                        <Pressable onPress={() => router.push("/RegisterWithEmail")}>
                            <Text style={{ color: '#34A853', fontSize: 18 }} className='text-mainColor  ml-2 text-[18px]'>Signup</Text>
                        </Pressable>
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
                            <Image source={require("../../assets/images/facebookIcon.png")} />
                            <Text className='mx-3 text-[16px]'>Facebook</Text>
                        </Pressable>
                        <Pressable className='bg-white flex rounded-full flex-row items-center px-[10px] py-[7px]'>
                            <Image source={require("../../assets/images/googleIcon.png")} />
                            <Text className='mx-6 text-[16px]'>Google</Text>
                        </Pressable>
                    </View>
                </View>
            </StyledScrollView>
        </SafeAreaView>
    )
}

export default Login