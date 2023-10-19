import React from 'react'
import { View, Pressable, Text } from 'react-native'

interface buttonProps{
  onPress?: () => void;
  name: string;
}

const ButtonTwo : React.FC<buttonProps> = ({ onPress , name }) => {
  return (
    <View className='flex items-center justify-center px-[35]'>
      <Pressable onPress={onPress} className='bg-mainColor py-[20px] w-10/12 max-w-[280px] rounded-full'><Text className='text-center text-white font-[700] text-base'>{name}</Text></Pressable>
    </View>
  )
}

export default ButtonTwo