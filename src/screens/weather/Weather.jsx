import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useState } from 'react'
import { Image, Text, View, TextInput, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native'
import { theme } from '../../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Feather, FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import { debounce } from "lodash"
import { fetchLocations, fetchWeatherForecast } from '../../api/weather'
import { weatherImages } from '../../constants'
import * as Progress from "react-native-progress"

const SearchSection = ({ showSearch, locations, toggleSearch, handleTextDebounce, handleLocation }) => {
  return (
    <View style={{ marginHorizontal: 16 }} className='relative mt-3'>
      <View className='flex-row justify-end items-center rounded-full' style={{ backgroundColor: showSearch ? theme.bgWhite(1) : 'transparent' }}>
        {
          showSearch ? (
            <TextInput
              onChangeText={handleTextDebounce}
              placeholder='Search city'
              placeholderTextColor={"#34A853"}
              className='pl-6 h-10 pb-1 flex-1 text-base text-[#34A853]'
            />
          )
            : null
        }
        <TouchableOpacity onPress={() => { toggleSearch(!showSearch) }} style={{}} className='rounded-full p-3 m-1 bg-[#34A853]'>
          <AntDesign name="search1" size={21} color="white" />
        </TouchableOpacity>
      </View>
      {
        locations.length > 0 && showSearch ? (
          <View style={{ position: "absolute", top: 64, zIndex: 999 }} className='w-full bg-gray-100 rounded-3xl overflow-hidden'>
            {locations.map((loc, index) => {
              const showBorder = index + 1 !== locations.length;
              const borderStyle = showBorder
                ? { borderBottomWidth: 2, borderBottomColor: 'gray' }
                : {};
              return (
                <TouchableOpacity
                  onPress={() => handleLocation(loc)}
                  key={index}
                  className='flex-row items-center border-0 p-3 px-4 mb-1'
                  style={{
                    gap: 1,
                    ...borderStyle,
                  }}
                >
                  <FontAwesome5 name="map-marker-alt" size={18} color="gray" />
                  <Text className='text-black text-lg ml-2'>{loc?.name}, {loc?.country}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null
      }
    </View>
  )
}

const ForecastNextDaysSection = ({ weather }) => {
  return (
    <View className="mb-2 mt-[24px]">
      <View className="flex-row items-center mx-6 space-x-2">
        <MaterialIcons name="calendar-month" size={20} color="black" />
        <Text className="text-black text-lg font-semibold"> Daily forecast</Text>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 7 }}
        showsHorizontalScrollIndicator={false}
      >
        {
          weather?.forecast?.forecastday?.map((item, index) => {
            let date = new Date(item?.date);
            let options = { weekday: 'long' };
            let dayName = date.toLocaleDateString('en-US', options);
            dayName = dayName.split('')
            return (
              <View key={index} style={styles.container} className='space-y-2'>
                <Image
                  source={weatherImages[item?.day?.condition?.text] || { uri: `https:${item?.day?.condition?.icon}` }}
                  style={styles.image}
                />

                <Text style={styles.text}>{dayName}</Text>
                <Text style={[styles.text, styles.boldText]}> {item?.day?.avgtemp_c}&#176;</Text>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

const StatsCard = ({ icon, name, value }) => {
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
  )
}

const Weather = () => {
  const [showSearch, toggleSearch] = useState(false)
  const [locations, setLocations] = useState([])
  const [weather, setWeather] = useState({})
  const [loading, setLoading] = useState(false)

  const handleLocation = (loc) => {
    setLocations([]);
    toggleSearch(false)
    setLoading(true)
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7'
    }).then((data) => {
      setWeather(data)
      setLoading(false)
    });
  };

  const handleSearch = (value) => {
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => {
        setLocations(data);
      })
    }
  }

  useEffect(() => {
    fetchMyWeatherData()
  }, [])

  const fetchMyWeatherData = async () => {
    setLoading(true)
    fetchWeatherForecast({
      cityName: "Nyabihu",
      days: '7'
    }).then((data) => {
      setWeather(data)
      setLoading(false)
    });
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 200), [])
  const { location, current } = weather;
  return (
    <View className='flex-1 relative bg-white'>
      <StatusBar style='light' />
      {/* <Image blurRadius={30} source={require("../../assets/Weather/images/bg.png")} className='absolute w-full h-full' /> */}
      {
        loading ? (
          <View className='flex-1 flex-row justify-center items-center'>
            <Progress.CircleSnail thickness={10} size={120} color={"#0bb3b2"} />
          </View>
        ) : (
          <View>
            <ImageBackground source={require("../../assets/Weather/images/bgWeather.png")} style={{ paddingBottom: 18 }}>
              {/* Search section */}
              <SafeAreaView>
                <SearchSection locations={locations} showSearch={showSearch} toggleSearch={toggleSearch} handleTextDebounce={handleTextDebounce} handleLocation={handleLocation} />
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center" }} className='mx-4'>
                  <View>
                    <Text className='text-white text-xl ml-2'><Text className='text-2xl text-white font-semibold'>{location?.name},</Text> {location?.country}</Text>
                    <Text style={{ fontSize: 64, color: "white" }} className='font-semibold mx-[21px]'>
                      {current?.temp_c}&#176;
                    </Text>
                  </View>
                  <View className='w-6/12'>
                    {/* Weather image */}
                    <View style={{ display: "flex" }} className='mr-[21px] flex items-center'>
                      <Image
                        source={weatherImages[current?.condition?.text] || { uri: "https:" + current?.condition?.icon }}
                        className='w-[71px] h-[71px]'
                      />
                      <Text className="text-center  text-white text-xl tracking-widest">
                        {current?.condition?.text}
                      </Text>
                    </View>
                  </View>
                </View>
              </SafeAreaView>
            </ImageBackground>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Stats */}
              <View className='mt-[12px]' style={{ marginHorizontal: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }} className='w-full'>

                  <StatsCard icon={<Feather name="wind" size={24} color="black" />} name={"Wind speed"} value={current?.wind_kph + "km/h"} />
                  <StatsCard icon={<Feather name="cloud-rain" size={24} color="black" />} name={"Precipitation"} value={current?.precip_mm + "mm"} />

                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 16 }} className='w-full'>
                  <StatsCard icon={<MaterialIcons name="waves" size={24} color="black" />} name={"Pressure"} value={current?.pressure_mb + "mb"} />
                  <StatsCard icon={<Feather name="sun" size={24} color="black" />} name={"UV Index"} value={current?.uv} />
                </View>
              </View>
              {/* forecast for next days */}
              <ForecastNextDaysSection weather={weather} />
              {/* sun rise and sun set */}
              <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 0, marginBottom: 340 }} className='w-full px-4'>
                <StatsCard icon={<Feather name="sunrise" size={24} color="black" />} name={"Sun rise"} value={weather?.forecast?.forecastday[0]?.astro?.sunrise} />
                <StatsCard icon={<Feather name="sunset" size={24} color="black" />} name={"Sun set"} value={weather?.forecast?.forecastday[0]?.astro?.sunset} />
              </View>
            </ScrollView>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    width: 96,
    borderRadius: 24,
    paddingVertical: 12,
    marginVertical: 12,
    backgroundColor: "#34A853",
    marginLeft: 12
  },
  image: {
    height: 44,
    width: 44,
  },
  text: {
    color: 'white',
  },
  boldText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Weather