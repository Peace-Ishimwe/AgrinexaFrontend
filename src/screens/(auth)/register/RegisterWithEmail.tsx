import React, { useState } from 'react';
import { Image, ImageBackground, Pressable, SafeAreaView, ScrollView, Text, TextInput, View, StatusBar } from 'react-native';
import { useForm, Controller, SubmitErrorHandler } from 'react-hook-form';
import { useLinkTo } from '@react-navigation/native';
import BackPageButton from '../../../components/buttons/backPageButton';
import ButtonTwo from '../../../components/buttons/buttonTwo';
import axios from 'axios';

interface FormData {
    name: string;
    email: string;
    password: string;
}

const RegisterWithEmail: React.FC = () => {
    const linkTo = useLinkTo();
    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm<FormData>();
    const onSubmit = async (data: FormData) => {
        try {
          const response = await axios.post(process.env.EXPO_PUBLIC_BACKEND_URL as string + "/auth/register", data);
          console.log('Response from server:', response.data);
          // Optionally, you can handle success responses here
        } catch (error) {
          console.error('Error posting data:', error);
          // Optionally, you can handle error responses here
        }
      };

    const onError: SubmitErrorHandler<FormData> = (errors, e) => {
        return console.log(errors)
    }

    return (
        <SafeAreaView style={{ flex: 1 }} className='bg-white h-[100vh] flex justify-between'>
            <ImageBackground className='h-[28vh] px-[2vh] pt-[6vh]' source={require("../../../assets/authBgImage.png")}>
                <StatusBar translucent backgroundColor={'transparent'} />
                <View className='flex flex-col items-start'>
                    <BackPageButton />
                    <Text className='text-[#fff] text-[37px] mt-4'>Sign Up</Text>
                    <Text className='mt-3 text-[#fff] text-lg'>Fill in your credentials down there{"\n"}to create an account😊</Text>
                </View>
            </ImageBackground>
            <ScrollView>
                <View>
                    <View className='mt-4 px-[2vh]'>
                        <Text className='text-subMainColor text-[28px] font-semibold'>AgriNexa!</Text>
                        <View className='mt-5'>
                            <Text aria-label="Label for Username" className='text-base text-textMainColor font-medium' nativeID="fullName">Full names</Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput keyboardType='default'
                                        aria-labelledby="fullName" className='border-[1px] bg-white mt-3 border-subMainColor p-4 text-xl' placeholder='ex: Peace Ishimwe'
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )}
                                name="name"
                                rules={{ required: 'You must enter your name' }}
                            />
                        </View>
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
                            <ButtonTwo name='SIGN UP' onPress={handleSubmit(onSubmit)} />
                        </View>
                        <View className='mt-6 flex flex-row items-center justify-center'>
                            <Text className='text-center text-textMainColor text-[18px]'>Already have an account?
                            </Text>
                            <Pressable onPress={() => linkTo("/login")}>
                                <Text style={{ color: '#34A853', fontSize: 18 }} className='text-mainColor  ml-2 text-[18px]'>Login</Text>
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
            </ScrollView>
        </SafeAreaView>
    );
}

export default RegisterWithEmail;