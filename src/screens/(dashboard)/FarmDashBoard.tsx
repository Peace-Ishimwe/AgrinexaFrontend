import "react-native-gesture-handler";
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { withExpoSnack } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PagerViewComponent from './PagerViewComponent';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import SensorSheet from "../../components/sheets/SensorSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import FarmData from "./_comp/FarmData";
import { StatusBar } from "expo-status-bar";
const windowHeight = Dimensions.get('window').height;
import { useFarmContext } from "../../context/FarmContext";


const FarmDashboard = () => {
    const { selectedField } = useFarmContext()
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
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: windowHeight * 2 / 100 }} className="mt-[12px]">
                    <Text className="text-[#111111] text-[21px] max-w-7/12 font-medium">
                        {selectedField?.name} 🌿
                    </Text>
                    <View className="p-2 rounded-full bg-[#F3F9F6]">
                        <Ionicons name="settings" size={28} color="#0DFF4D" />
                    </View>
                </View>
                <ScrollView className='' showsVerticalScrollIndicator={false}>
                    <View style={{ height: 270, marginTop: 20, paddingHorizontal: windowHeight * 2 / 100 }} >
                        <PagerViewComponent />
                    </View>
                    <FarmData handlOnPress={handleOpenPress} />
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