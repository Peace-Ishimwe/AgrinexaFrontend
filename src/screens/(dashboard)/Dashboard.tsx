import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, Text, View, ScrollView, FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PagerView from "react-native-pager-view";
import { withExpoSnack } from "nativewind";

import Slide1 from "./slides/Slide1";
import Slide2 from "./slides/Slide2";
import Slide3 from "./slides/Slide3";
import StatusCard from "./cards/StatusCard";
import InfoCard from "./cards/InfoCard";
import { getData } from "../../utils/storage";
import { authorizedAPI } from "../../utils/api";
import { Image } from "react-native";
import { useLinkTo } from "@react-navigation/native";

const Dashboard = () => {
  const pageRef = useRef<PagerView | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [page, setPage] = useState<{ fields: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const linkTo = useLinkTo();

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
      <View className="h-[15vh] flex flex-row items-center justify-between">
        <Text className="text-[#111111] text-[21px] max-w-7/12 font-medium">
          Hello, {user?.name} 🌿
        </Text>
        <View className="p-2 rounded-full bg-[#F3F9F6]">
          <Ionicons name="settings" size={28} color="#0DFF4D" />
        </View>
      </View>
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
      <ScrollView style={{ maxHeight: "53%" }} className="mx-[-2vh]">
        {loading ? (
          <View className="flex items-center justify-center h-[100px]">
            <Text className="text-gray-600 text-xl">Loading...</Text>
          </View>
        ) : page?.fields.length === 0 ? (
          <View className="flex items-center justify-center h-[100px]">
            <Text className="text-gray-600 text-xl">No Fields So Far</Text>
          </View>
        ) : (
          <View className="flex flex-row gap-3 flex-wrap justify-between p-5">
            {page?.fields.map((field, i) => (
              <Pressable key={i} onPress={() => linkTo(`/farm/${field.id}`)} className="w-[45%] mb-5 shadow rounded-lg bg-white py-4 flex flex-col items-center gap-5 ">
                  <Image
                    source={require("../../assets/field.png")}
                    style={{ width: 100, height: 100 }}
                  />
                  <Text>{field.name}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default withExpoSnack(Dashboard);
