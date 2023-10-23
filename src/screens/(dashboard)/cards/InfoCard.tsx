import React from 'react'
import { Text, View } from 'react-native'
import { HumidityIcon } from '../../../assets/icons/icons'


const InfoCard = () => {

  return (
    <View className='bg-[#fff] pl-3 py-3 w-[120px] rounded-xl' style={{
      shadowColor: '#0C9559',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.13,
      shadowRadius: 24,
      elevation: 12
    }}>
      <View className='mb-1'><HumidityIcon /></View>
      <Text className='text-textSubMainColor text-base'>Humidity</Text>
      <Text className='mt-1 text-[#06492C] font-bold text-xl'>74%</Text>
    </View>
  )
}

export default InfoCard