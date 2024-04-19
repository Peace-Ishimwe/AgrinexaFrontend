import React, { useEffect, useRef, useState } from "react";
import { Text, View, ScrollView, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import PagerView from "react-native-pager-view";
import { withExpoSnack } from "nativewind";
import Slide1 from "./slides/Slide1";
import Slide2 from "./slides/Slide2";
import Slide3 from "./slides/Slide3";
import { deleteData, getData } from "../../utils/storage";
import { authorizedAPI } from "../../utils/api";
import { Image } from "react-native";
import { useLinkTo } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MainShadow } from "../../assets/styles/shadow";
const Dashboard = () => {
    const pageRef = useRef<PagerView | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [user, setUser] = useState<{ name: string; email: string } | null>(
        null
    );
    const [page, setPage] = useState<{ fields: any[] } | null>(null);
    console.log(page)
    const [loading, setLoading] = useState(true);
    const linkTo = useLinkTo(); ``
    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 0 && pageNumber <= 2) {
            setCurrentPage(pageNumber);
        }
    };
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await authorizedAPI.get("/dashboard");
                setPage(response.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getData("user");
                setUser(user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);
    const goToNextPage = () => {
        if (currentPage < 2) {
            handlePageChange(currentPage + 1);
            pageRef.current?.setPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 0) {
            handlePageChange(currentPage - 1);
            pageRef.current?.setPage(currentPage - 1);
        }
    };



    return (
        <SafeAreaView className="px-[2vh] bg-[#F5FDFB] h-[100vh]">
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} className="mt-[12px]">
                <Text className="text-[#111111] text-[21px] max-w-7/12 font-medium">
                    Hello, {user?.name} 🌿
                </Text>
                <Pressable onPress={() => {
                    deleteData("token")
                    deleteData("token2")
                    deleteData("user")
                    linkTo("/welcome")
                }} className="p-[8px] rounded-full bg-[#F3F9F6]">
                    <Ionicons name="settings" size={28} color="#0DFF4D" />
                </Pressable>
            </View>
            <ScrollView style={{}} className="mx-[-2vh] mt-[12px]">
                <View className='h-[270px] mx-[2vh]'>
                    <PagerView style={{ flex: 1 }} initialPage={0} ref={pageRef}>
                        <View key={1}>
                            <Slide1 next={goToNextPage} />
                        </View>
                        <View key={2}>
                            <Slide2 next={goToNextPage} back={goToPreviousPage} />
                        </View>
                        <View key={3}>
                            <Slide3 back={goToPreviousPage} />
                        </View>
                    </PagerView>
                </View>
                {loading ? (
                    <View style={{ display: "flex" }} className="items-center justify-center h-[100px]">
                        <Text className="text-gray-600 text-xl">Loading...</Text>
                    </View>
                ) : page?.fields.length === 0 ? (
                    <View style={{ display: "flex" }} className="items-center justify-center h-[100px]">
                        <Text className="text-gray-600 text-xl">No Fields Available</Text>
                    </View>
                ) : (
                    <View style={{ flexDirection: "row", justifyContent: "center", flexWrap: "wrap" }} className="flex-wrap py-[20px] px-[2vh] gap-[16]">
                        {page?.fields.map((field, i) => (
                            <Pressable key={i}
                                onPress={async () => {
                                    await AsyncStorage.setItem('selectedField', JSON.stringify(field));
                                    linkTo("/farm");
                                }}
                                style={{ flexDirection: "column", alignItems: "center", ...MainShadow }} className="rounded-lg bg-white p-[16px] items-center">
                                <Image
                                    source={require("../../assets/field.png")}
                                    style={{ width: 100, height: 100 }}
                                />
                                <Text className="text-[16px] font-medium mt-[8px]">{field.name}</Text>
                            </Pressable>
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default withExpoSnack(Dashboard);