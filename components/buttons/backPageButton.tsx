import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, View } from 'react-native'
import { withExpoSnack } from 'nativewind'
import { styled } from 'nativewind'
import { useNavigation } from '@react-navigation/native'

const StyledView = styled(View)

const BackPageButton = () => {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.goBack()}>
            <StyledView className='bg-white p-[5px] rounded-xl shadow-2xl'>
                <Ionicons name="chevron-back" size={24} color="black" />
            </StyledView>
        </Pressable>
    )
}

export default withExpoSnack(BackPageButton)