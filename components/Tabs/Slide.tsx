import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { MainShadow } from '@/assets/styles/shadow';

interface SlideProps {
    imageSource: any;
    title: string;
    description: string;
    onPressBack?: () => void;
    onPressNext?: () => void;
    active?: number;
}

const Slide: React.FC<SlideProps> = ({ imageSource, title, description, onPressBack, onPressNext, active }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ width: '100%', position: 'relative' }}>
                <Image
                    source={imageSource}
                    style={{ borderRadius: 20, width: '100%' }}
                />
                <View style={{ position: 'absolute', width: '85%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', bottom: -40, borderRadius: 20, paddingHorizontal: 20, paddingVertical: 15, left: '8%', ...MainShadow }}>
                    {onPressBack && (
                        <Pressable onPress={onPressBack} style={{ padding: 8, borderRadius: 20, backgroundColor: '#F3F9F6' }}>
                            <Ionicons name="chevron-back" size={24} color="#0C9359" />
                        </Pressable>
                    )}
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
                        <Text style={{ color: '#333', marginTop: 5 }}>{description}</Text>
                    </View>
                    {onPressNext && (
                        <Pressable onPress={onPressNext} style={{ padding: 8, borderRadius: 20, backgroundColor: '#F3F9F6' }}>
                            <MaterialIcons name="navigate-next" size={24} color="#0C9359" />
                        </Pressable>
                    )}
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 56, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 24, height: 8, borderRadius: 4, backgroundColor: active == 1 ? '#0C9359' : '#93a59cea' }} />
                <View style={{ width: 24, height: 8, borderRadius: 4, backgroundColor: active == 2 ? '#0C9359' : '#93a59cea', marginHorizontal: 5 }} />
                <View style={{ width: 24, height: 8, borderRadius: 4, backgroundColor: active == 3 ? '#0C9359' : '#93a59cea' }} />
            </View>
        </View>
    );
}

export default Slide;