import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useState } from 'react'
import { Image, Text, View, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { theme } from '../../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { debounce } from "lodash"
import { fetchLocations, fetchWeatherForecast } from '../../api/weather'
import { weatherImages } from '../../constants'
import * as Progress from "react-native-progress"

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
    <View className='flex-1 relative'>
      <StatusBar style='light' />
      <Image blurRadius={30} source={require("../../assets/Weather/images/bg.png")} className='absolute w-full h-full' />
      {
        loading ? (
          <View className='flex-1 flex-row justify-center items-center'>
            <Progress.CircleSnail thickness={10} size={120} color={"#0bb3b2"} />
          </View>
        ) : (
          <SafeAreaView className='flex flex-1 pt-[12px]'>
            {/* Search section */}
            <View style={{ height: "7%" }} className='mx-4 relative z-50'>
              <View className='flex-row justify-end items-center rounded-full' style={{ backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent' }}>
                {
                  showSearch ? (
                    <TextInput
                      onChangeText={handleTextDebounce}
                      placeholder='Search city'
                      placeholderTextColor={"lightgray"}
                      className='pl-6 h-10 pb-1 flex-1 text-base text-white'
                    />
                  )
                    : null
                }
                <TouchableOpacity onPress={() => { toggleSearch(!showSearch) }} style={{ backgroundColor: theme.bgWhite(0.3) }} className='rounded-full p-3 m-1'>
                  <AntDesign name="search1" size={21} color="white" />
                </TouchableOpacity>
              </View>
              {
                locations.length > 0 && showSearch ? (
                  <View style={{ position: "absolute", top: 64 }} className='w-full bg-gray-300 rounded-3xl overflow-hidden'>
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
                            ...borderStyle, // Merge conditional border styles
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
            {/* forecast section */}
            <View className='mx-4 flex justify-around flex-1 mb-2'>
              {/* location */}
              <Text className='text-white text-center text-2xl font-bold'>
                {location?.name},
                <Text className='text-lg font-semibold text-gray-300'>
                  {" " + location?.country}
                </Text>
              </Text>
              {/* Weather image */}
              <View className='flex-row justify-center'>
                <Image
                  // source={{uri: "https:"+ current?.condition?.icon}}
                  source={weatherImages[current?.condition?.text]}
                  className='w-52 h-52'
                />
              </View>
              {/* degree celcius */}
              <View className="space-y-2">
                <Text className="text-center font-bold text-white text-6xl ml-5">
                  {current?.temp_c}&#176;
                </Text>
                <Text className="text-center text-white text-xl tracking-widest">
                  {current?.condition?.text}
                </Text>
              </View>

              {/* Other stats */}
              <View className="flex-row justify-between mx-4">
                <View className="flex-row space-x-2 items-center">
                  <Image
                    source={require('../../assets/Weather/icons/wind.png')}
                    className="h-6 w-6"
                  />
                  <Text className="text-white font-semibold text-base">
                    {current?.wind_kph}km
                  </Text>
                </View>
                <View className="flex-row space-x-2 items-center">
                  <Image
                    source={require('../../assets/Weather/icons/drop.png')}
                    className="h-6 w-6"
                  />
                  <Text className="text-white font-semibold text-base">
                    {current?.humidity}%
                  </Text>
                </View>
                <View className="flex-row space-x-2 items-center">
                  <Image
                    source={require('../../assets/Weather/icons/sun.png')}
                    className="h-6 w-6"
                  />
                  <Text className="text-white font-semibold text-base">
                  {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                  </Text>
                </View>
              </View>
            </View>
            {/* forecast for next days */}
            <View className="mb-2 space-y-3">
              <View className="flex-row items-center mx-6 space-x-2">
                <MaterialIcons name="calendar-month" size={20} color="white" />
                <Text className="text-white text-base"> Daily forecast</Text>
              </View>
              <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15 }}
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
                          source={weatherImages[item?.day?.condition?.text]}
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
          </SafeAreaView>
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
    backgroundColor: theme.bgWhite(0.15),
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