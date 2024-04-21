import "react-native-gesture-handler";
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { withExpoSnack } from 'nativewind';
import StatusCard from './cards/StatusCard';
import InfoCard from './cards/InfoCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import PagerViewComponent from './PagerViewComponent';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import SensorSheet from "../../components/sheets/SensorSheet";
import BottomSheet, { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";

const FarmDashboard = () => {
    const [selectedField, setSelectedField] = useState<any>(null);
    useEffect(() => {
        const retrieveSelectedField = async () => {
            try {
                // Retrieve the saved field object from local storage
                const savedFieldJSON = await AsyncStorage.getItem('selectedField');
                if (savedFieldJSON !== null) {
                    const savedField = JSON.parse(savedFieldJSON);
                    setSelectedField(savedField);
                }
            } catch (error) {
                console.error('Error retrieving field data from local storage:', error);
            }
        };
        retrieveSelectedField();
        return () => {
        };
    }, []);
    // Sensor sheet handlers
    const bottomSheetRef = useRef<BottomSheetModal>(null)
    const handleClosePress = () => bottomSheetRef.current?.close();
    const handleOpenPress = () => {
        bottomSheetRef.current?.present()
        bottomSheetRef.current?.snapToIndex(0)
    };
    const handleCollapsePress = () => bottomSheetRef.current?.collapse();

    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaView style={{ backgroundColor: "#F5FDFB" }} className="bg-[#F5FDFB]">
                <View style={{ flexDirection: "row" }} className="items-center justify-between mt-[12px] px-[2vh]">
                    <Text className="text-[#111111] text-[21px] max-w-7/12 font-medium">
                        {selectedField?.name} 🌿
                    </Text>
                    <View className="p-2 rounded-full bg-[#F3F9F6]">
                        <Ionicons name="settings" size={28} color="#0DFF4D" />
                    </View>
                </View>
                <ScrollView style={{}} className='' showsVerticalScrollIndicator={false}>
                    <View className='h-[270px] mt-[20px] px-[2vh]'>
                        <PagerViewComponent />
                    </View>
                    <View className="mt-5 px-[2vh]">
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
                            <Pressable onPress={handleOpenPress} style={{ width: '40%' }}>
                                <StatusCard
                                    icon={<MaterialIcons name="sensors" size={28} color="#0DFF4D" />}
                                    iconName="Sensor status"
                                    value="ON"
                                />
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <SensorSheet ref={bottomSheetRef} />
        </GestureHandlerRootView>
    );
};
export default withExpoSnack(FarmDashboard);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});