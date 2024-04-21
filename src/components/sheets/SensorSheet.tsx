import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { Dimensions } from 'react-native';
const WindowWidth = Dimensions.get("window").width
import ToggleSwitch from 'toggle-switch-react-native'


type Ref = BottomSheetModal

const SensorSheet = forwardRef<Ref>((props, ref) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const snapPoints = useMemo(() => ["25%", "40%", "75%"], [])

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        animatedIndex={{
          value: 1,
        }}
      />
    ),
    []
  )

  return (
    <BottomSheetModal
      index={1}
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: '#fff' }}
      handleIndicatorStyle={{ backgroundColor: '#000' }}
      style={{ borderRadius: 40, overflow: 'hidden' }}
      backdropComponent={renderBackdrop}
      handleComponent={() =>
        <View className=''>
          <View className='bg-mainColor/25 w-[48px] h-[8px] mx-auto mt-[16px] rounded-full'></View>
        </View>
      }
    >
      <View style={{ paddingHorizontal: WindowWidth * 5 / 100 }} className='px-[]'>
        <Text className='text-[18px] text-[#111111] font-semibold text-center mt-[20px]'>Sensor Status</Text>
        <View style={{ borderTopWidth: 2, borderBottomWidth: 2, flexDirection: "row" }} className='border-[#06492C]/10 mt-[20px] py-[20px] justify-between'>
          <Text className='text-[18px] text-[#06492C] font-semibold'>Sensors</Text>
          <ToggleSwitch
            isOn={false}
            onColor="green"
            offColor="red"
            label="Example label"
            labelStyle={{ color: "black", fontWeight: "900" }}
            size="large"
            onToggle={isOn => console.log("changed to : ", isOn)}
          />
        </View>
      </View>
    </BottomSheetModal>
  )
})

export default SensorSheet

const styles = StyleSheet.create({
  container: {
  }
});