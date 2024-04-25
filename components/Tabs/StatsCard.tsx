import React, { FC } from 'react';
import { Text, View } from 'react-native';

interface StatsCardProps {
    icon: React.ReactElement;
    name: string;
    value: string;
}

const StatsCard: FC<StatsCardProps> = ({ icon, name, value }) => {
    return (
        <View className='p-3 bg-[#BBF9D0] w-[48%] rounded-2xl' style={{ flexDirection: 'row', gap: 8 }}>
            <View style={{ display: "flex", justifyContent: "center", alignSelf: "center" }} className='bg-white p-2 rounded-full w-[42px] h-[42px]'>
                {icon}
            </View>
            <View className='ml-[6px]'>
                <Text className='font-semibold text-[16px]'>{name}</Text>
                <Text style={{ fontWeight: "600", marginTop: 8, fontSize: 16 }}>{value}</Text>
            </View>
        </View>
    );
};

export default StatsCard;