import React, { useState, useRef } from 'react';
import { Image, ImageBackground, Pressable, SafeAreaView, Text, View, Animated, StatusBar } from 'react-native';
import BackPageButton from '@/components/buttons/backPageButton';
import ButtonTwo from '@/components/buttons/buttonTwo';
import { useLinkTo } from '@react-navigation/native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from 'react-native-confirmation-code-field';

import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from './styles';
import { useRouter } from 'expo-router';

const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 4;

const VerificationCode: React.FC = () => {
  const router = useRouter()
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const animationsColor = useRef([...new Array(CELL_COUNT)].map(() => new Value(0))).current;
  const animationsScale = useRef([...new Array(CELL_COUNT)].map(() => new Value(1))).current;

  const animateCell = ({ hasValue, index, isFocused }: { hasValue: boolean; index: number; isFocused: boolean }) => {
    Animated.parallel([
      Animated.timing(animationsColor[index], {
        useNativeDriver: false,
        toValue: isFocused ? 1 : 0,
        duration: 250,
      }),
      Animated.spring(animationsScale[index], {
        useNativeDriver: false,
        toValue: hasValue ? 0 : 1,
        // duration: hasValue ? 300 : 250,
      }),
    ]).start();
  };

  const renderCell = ({ index, symbol, isFocused }: { index: number; symbol: string | null; isFocused: boolean }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
          inputRange: [0, 1],
          outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        })
        : animationsColor[index].interpolate({
          inputRange: [0, 1],
          outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);
    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className='bg-white h-[100vh] flex justify-between'>
      <StatusBar translucent backgroundColor={'transparent'} />
      <View>
        <ImageBackground className='h-[28vh] px-[2vh] pt-[6vh]' source={require("../../assets/images/authBgImage.png")}>
          <View className='flex flex-col items-start'>
            <BackPageButton />
            <Text className='text-[#fff] text-[37px] mt-4'>Verification Code</Text>
            <Text className='mt-3 text-[#fff] text-lg'>Please enter the recieved code{"\n"}sent to your email!</Text>
          </View>
        </ImageBackground>
        <View className='mt-4 px-[2vh]'>
          <Text className='text-subMainColor text-[28px] font-semibold'>AgriNexa!</Text>
          <Text className='text-textSubMainColor mt-6 text-base font-medium'>Please type the verification code sent to{"\n"}peaceishimwem@gmail.com</Text>
          <View className='mt-5'>
            {/* <TextInput className='border-[1px] bg-white border-subMainColor p-4 text-xl' placeholder='(+91) 972-585-3396' /> */}
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={renderCell}
            />
          </View>
          <View className='mt-10'>
            <Text className='text-center text-textMainColor text-[18px]'>Didn't recieve the code<Text className='text-mainColor'>  Please resend</Text></Text>
          </View>
          <View className='mt-10'>
            <ButtonTwo onPress={() => router.push("/public/CompletedSuccesVerified")} name='SEND' loading={false} />
          </View>
        </View>
      </View>
      <View className='pb-4'>
        <View className='flex flex-row items-center gap-x-3 justify-center'>
          <View className='h-[1] bg-[#B3B3B380] w-3/12'></View>
          <Text className='text-textMainColor -base'>sign in with</Text>
          <View className='h-[1] bg-[#B3B3B380] w-4/12'></View>
        </View>
        <View className='mt-[20px] flex flex-row justify-center gap-x-6'>
          <Pressable className='bg-white flex rounded-full flex-row items-center px-[16px] py-[10px]'>
            <Image source={require("../../assets/images/facebookIcon.png")} />
            <Text className='mx-3 text-[16px]'>Facebook</Text>
          </Pressable>
          <Pressable className='bg-white flex rounded-full flex-row items-center px-[10px] py-[7px]'>
            <Image source={require("../../assets/images/googleIcon.png")} />
            <Text className='mx-6 text-[16px]'>Google</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default VerificationCode
