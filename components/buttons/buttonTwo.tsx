import React from 'react'
import { View, Pressable, Text, ActivityIndicator } from 'react-native'

interface buttonProps{
  onPress?: () => void;
  name: string;
  loading:boolean
}

const ButtonTwo : React.FC<buttonProps> = ({ onPress , name,loading }) => {
  return (
    <View className='flex items-center justify-center px-[35px] w-full'>
      <Pressable onPress={onPress} className='bg-mainColor py-[20px] w-10/12 max-w-[280px] rounded-full'>
      {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text className='text-center text-white font-[700] text-base'>{name}</Text>
          )}
        </Pressable>
    </View>
  )
}

export default ButtonTwo