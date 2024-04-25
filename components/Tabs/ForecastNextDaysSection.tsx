import React, { FC } from 'react';
import { Image, Text, View, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { weatherImages } from '@/constants';

interface WeatherForecast {
    forecastday?: {
        date: string;
        day: {
            condition: {
                text: string;
                icon: string;
            };
            avgtemp_c: number;
        };
    }[];
}

interface Props {
    weather: {
        forecast: WeatherForecast;
    };
}

const ForecastNextDaysSection: FC<Props> = ({ weather }) => {
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
                        let options: Intl.DateTimeFormatOptions = { weekday: 'long' };
                        let dayName = date.toLocaleDateString('en-US', options);
                        return (
                            <View key={index} style={styles.container} className='space-y-2'>
                                <Image
                                    source={weatherImages[item?.day?.condition?.text as keyof typeof weatherImages] || { uri: `https:${item?.day?.condition?.icon}` }}
                                    style={styles.image}
                                />
                                <Text style={styles.text}>{dayName}</Text>
                                <Text style={[styles.text, styles.boldText]}> {item?.day?.avgtemp_c}&#176;</Text>
                            </View>
                        );
                    })
                }
            </ScrollView>
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

export default ForecastNextDaysSection;