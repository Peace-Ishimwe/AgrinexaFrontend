import React from 'react'
import { View, Pressable, Text } from 'react-native'

interface buttonProps{
  onPress: () => void;
  name: string;
}

const ButtonOne : React.FC<buttonProps> = ({ onPress , name }) => {
  return (
    <View className='h-[20vh] flex items-center justify-center px-[35]'>
      <Pressable onPress={onPress} className='bg-mainColor py-[20px] w-full rounded-[15px]'><Text className='text-center text-white font-[700] text-base'>{name}</Text></Pressable>
    </View>
  )
}

export default ButtonOne