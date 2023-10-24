import React, { useState } from 'react'
import { Image, ImageBackground, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native'
import BackPageButton from '../../../components/buttons/backPageButton'
import ButtonTwo from '../../../components/buttons/buttonTwo'
import { useLinkTo } from '@react-navigation/native'

const RegisterWithEmail = () => {

    const [password, setPassword] = useState("");
    const linkTo = useLinkTo();
    return (
        <SafeAreaView className='bg-white h-[100vh] flex justify-between'>
            <ScrollView>
                <View>
                    <ImageBackground className='h-[33vh] px-[2vh] pt-[4vh]' source={require("../../../assets/authBgImage.png")}>
                        <View className='flex flex-col items-start'>
                            <BackPageButton />
                            <Text className='text-[#fff] text-[37px] mt-4'>Sign Up</Text>
                            <Text className='mt-3 text-[#fff] text-lg'>Fill in your credentials down there{"\n"}to create an account😊</Text>
                        </View>
                    </ImageBackground>
                    <View className='mt-4 px-[2vh]'>
                        <Text className='text-subMainColor text-[28px] font-semibold'>AgriNexa!</Text>
                        <View className='mt-5'>
                            <Text aria-label="Label for Username" className='text-base text-textMainColor font-medium' nativeID="fullName">Full names</Text>
                            <TextInput keyboardType='default' aria-labelledby="fullName" className='border-[1px] bg-white mt-3 border-subMainColor p-4 text-xl' placeholder='ex: Peace Ishimwe' />
                        </View>
                        <View className='mt-5'>
                            <Text aria-label="Label for Username" className='text-base text-textMainColor font-medium' nativeID="email">E-mail</Text>
                            <TextInput keyboardType='email-address' aria-labelledby="email" className='border-[1px] bg-white mt-3 border-subMainColor p-4 text-xl' placeholder='peaceishimwem@gmail.com' />
                        </View>
                        <View className='mt-5'>
                            <Text aria-label="Label for Username" className='text-base text-textMainColor font-medium' nativeID="password">Password</Text>
                            <TextInput
                                placeholder="* * * * * * * * "
                                value={password}
                                onChangeText={val => setPassword(val)}
                                className='border-[1px] bg-white mt-3 border-subMainColor p-4 text-xl'
                                secureTextEntry={true}
                                aria-accessibilityLabelledBy={"password"}
                            />
                        </View>
                        <View className='mt-10'>
                            <ButtonTwo name='SIGN UP' />
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
    )
}

export default RegisterWithEmail