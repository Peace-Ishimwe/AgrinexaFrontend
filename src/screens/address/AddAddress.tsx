import React from 'react'
import { ImageBackground, SafeAreaView, Text, TextInput, View } from 'react-native'
import BackPageButton from '../../components/buttons/backPageButton'
import ButtonTwo from '../../components/buttons/buttonTwo'
import styled from 'styled-components/native'

const StyledScrollView = styled.ScrollView.attrs(() => ({
    contentContainerStyle: {
        justifyContent: 'space-between'
    },
}))``;

const AddAddress = () => {


    return (
        <SafeAreaView className='bg-white h-[100vh] flex justify-between'>
            <StyledScrollView className='h-full bg-white flex'>
                <View>
                    <ImageBackground className='h-[20vh] px-[2vh] pt-[4vh]' source={require("../../assets/authBgImage.png")}>
                        <View className='flex flex-col items-start'>
                            <BackPageButton />
                            <Text className='text-[#fff] text-[37px] mt-4'>Add your Address</Text>
                        </View>
                    </ImageBackground>
                    <View className='px-[2vh] mt-1'>
                        <View className='mt-5'>
                            <Text aria-label="Label for Username" className='text-base text-textMainColor font-medium' nativeID="email">Full names</Text>
                            <TextInput keyboardType='email-address' aria-labelledby="email" className='border-[1px] bg-white mt-3 border-subMainColor p-4 text-xl' placeholder='ex: Peace Ishimwe' defaultValue='Peace Ishimwe' />
                        </View>
                        <View className='mt-5'>
                            <Text aria-label="Label for Username" className='text-base text-textMainColor font-medium' nativeID="password">Mobile number</Text>
                            <TextInput keyboardType='phone-pad' className='mt-3 border-[1px] bg-white border-subMainColor p-4 text-xl' placeholder='(+91) 972-585-3396' />
                        </View>
                        <View className='mt-5'>
                            <Text aria-label="Label for Username" className='text-base text-textMainColor font-medium' nativeID="email">State</Text>
                            <TextInput keyboardType='email-address' aria-labelledby="email" className='border-[1px] bg-white mt-3 border-subMainColor p-4 text-xl' placeholder='ex: Peace Ishimwe' defaultValue='Select State' />
                        </View>
                        <View className='mt-5'>
                            <Text aria-label="Label for Username" className='text-base text-textMainColor font-medium' nativeID="email">City</Text>
                            <TextInput keyboardType='email-address' aria-labelledby="email" className='border-[1px] bg-white mt-3 border-subMainColor p-4 text-xl' placeholder='ex: Peace Ishimwe' defaultValue='Select City' />
                        </View>
                        <View className='mt-5'>
                            <Text aria-label="Label for Username" className='text-base text-textMainColor font-medium' nativeID="email">Street (Include farm index number)</Text>
                            <TextInput keyboardType='email-address' aria-labelledby="email" className='border-[1px] bg-white mt-3 border-subMainColor p-4 text-xl' placeholder='ex: Peace Ishimwe' defaultValue='Street' />
                        </View>
                        <View className='my-10'>
                            <ButtonTwo name='SAVE' />
                        </View>
                    </View>
                </View>
            </StyledScrollView>
        </SafeAreaView>
    )
}

export default AddAddress