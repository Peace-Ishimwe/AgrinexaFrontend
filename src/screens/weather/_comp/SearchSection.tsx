import React, { FC, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { theme } from '../../../theme';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

interface Location {
    name: string;
    country: string;
}

interface Props {
    showSearch: boolean;
    locations: Location[];
    toggleSearch: (show: boolean) => void;
    handleTextDebounce: (text: string) => void;
    handleLocation: (location: Location) => void;
}

const SearchSection: FC<Props> = ({ showSearch, locations, toggleSearch, handleTextDebounce, handleLocation }) => {
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

export default SearchSection;