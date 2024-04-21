import React from 'react'
import { View, Pressable } from 'react-native'
import InfoCard from './InfoCard';
import StatusCard from './StatusCard';
import { Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { windowHeight } from '../../../utils/constants';
import { useFarmContext } from '../../../context/FarmContext';

interface props {
    handlOnPress: () => void;
}

const FarmData: React.FC<props> = ({ handlOnPress }) => {
    const { selectedField } = useFarmContext()

    return (
        <View style={{ marginTop: 20, paddingHorizontal: windowHeight * 2 / 100 }}>
            <View
                className=""
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                }}
            >
                <View className="w-[31%]">
                    <StatusCard icon={<MaterialCommunityIcons name="longitude" size={28} color="#0DFF4D" />} iconName='Longitude' value={selectedField?.long} />
                </View>
                <View className="w-[31%]">
                    <StatusCard icon={<MaterialCommunityIcons name="latitude" size={28} color="#0DFF4D" />} iconName='Latitude' value={selectedField?.lat} />
                </View>
                <View className="w-[31%]">
                    <StatusCard icon={<MaterialIcons name="photo-size-select-large" size={28} color="#0DFF4D" />} iconName='Farm size' value={selectedField?.size} />
                </View>
            </View>
            <View
                className=""
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    marginTop: 12
                }}
            >
                <View className="w-[31%]">
                    <StatusCard icon={<FontAwesome5 name="temperature-high" size={28} color="#0DFF4D" />} iconName='Temperature' value={selectedField?.temperature} />
                </View>
                <View className="w-[31%]">
                    <StatusCard icon={<Entypo name="drop" size={28} color="#0DFF4D" />} iconName='Moisture' value={selectedField?.moisture} />

                </View>
                <View className="w-[31%]">
                    <StatusCard icon={<MaterialIcons name="waves" size={28} color="#0DFF4D" />} iconName='Humidity' value={selectedField?.humidity} />
                </View>
            </View>
            <View
                className="mb-[170px]"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'stretch',
                    marginTop: 12,
                }}
            >
                <View className="w-[56%]">
                    <InfoCard />
                </View>
                <Pressable onPress={handlOnPress} style={{ width: '40%' }}>
                    <StatusCard
                        icon={<MaterialIcons name="sensors" size={28} color="#0DFF4D" />}
                        iconName="Sensor status"
                        value="ON"
                    />
                </Pressable>
            </View>
        </View>
    )
}

export default FarmData