import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Text, View, TextInput, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { theme } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Feather, FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import { debounce } from "lodash";
import { fetchLocations, fetchWeatherForecast } from '../../api/weather';
import { weatherImages } from '../../constants';
import * as Progress from "react-native-progress";
import SearchSection from './_comp/SearchSection';
import ForecastNextDaysSection from './_comp/ForecastNextDaysSection';
import StatsCard from './_comp/StatsCard';

type WeatherForecastDay = /*unresolved*/ any

interface WeatherData {
  location?: {
    name: string;
    country: string;
  };
  current?: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    precip_mm: number;
    pressure_mb: number;
    uv: string;
  };
  forecast?: {
    forecastday?: WeatherForecastDay[];
  };
}

const Weather = () => {
  const [showSearch, toggleSearch] = useState<boolean>(false);
  const [locations, setLocations] = useState<any[]>([]);
  const [weather, setWeather] = useState<WeatherData>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleLocation = (loc: any) => {
    setLocations([]);
    toggleSearch(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7'
    }).then((data: WeatherData) => {
      setWeather(data);
      setLoading(false);
    });
  };

  const handleSearch = (value: string) => {
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data: any[]) => {
        setLocations(data);
      });
    }
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    setLoading(true);
    fetchWeatherForecast({
      cityName: "Nyabihu",
      days: '7'
    }).then((data: WeatherData) => {
      setWeather(data);
      setLoading(false);
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 200), []);
  const { location, current } = weather;

  return (
    <View className='flex-1 relative bg-white'>
      <StatusBar style='light' />
      {loading ? (
        <View className='flex-1 flex-row justify-center items-center'>
          <Progress.CircleSnail thickness={6} size={80} color={"#34A853"} />
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
                      source={weatherImages[current?.condition?.text as keyof typeof weatherImages] || { uri: "https:" + current?.condition?.icon }}
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
                <StatsCard icon={<Feather name="sun" size={24} color="black" />} name={"UV Index"} value={current?.uv as string} />
              </View>
            </View>
            {/* forecast for next days */}
            <ForecastNextDaysSection weather={weather as WeatherForecastDay} />
            {/* sun rise and sun set */}
            <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 0, marginBottom: 340, paddingHorizontal: 16 }} className='w-full'>
              <StatsCard
                icon={<Feather name="sunrise" size={24} color="black" />}
                name={"Sun rise"}
                value={weather?.forecast?.forecastday?.[0]?.astro?.sunrise}
              />
              <StatsCard
                icon={<Feather name="sunset" size={24} color="black" />}
                name={"Sun set"}
                value={weather?.forecast?.forecastday?.[0]?.astro?.sunset}
              />

            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

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

export default Weather;