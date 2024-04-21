import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { Dimensions } from 'react-native';
const WindowWidth = Dimensions.get("window").width
import ToggleSwitch from 'toggle-switch-react-native'


type Ref = BottomSheetModal

const SensorSheet = forwardRef<Ref>((props, ref) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [switchLabel, setSwitchLabel] = useState(isEnabled ? "ON" : "OFF");
  const toggleSwitch = () => { setIsEnabled(previousState => !previousState) };
  useEffect(() => {
    if (isEnabled) {
      setSwitchLabel("ON")
    } else {
      setSwitchLabel("OFF")
    }
  }, [isEnabled])
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
        <View style={{ borderTopWidth: 2, borderBottomWidth: 2, flexDirection: "row", alignItems: "center" }} className='border-[#06492C]/10 mt-[20px] py-[20px] justify-between'>
          <Text className='text-[18px] text-[#06492C] font-semibold'>Sensors</Text>
          <ToggleSwitch
            isOn={isEnabled}
            onColor="#0DFF4D"
            offColor="#34A853"
            label={switchLabel}
            labelStyle={{ color: "black", fontWeight: "900" }}
            size="medium"
            onToggle={toggleSwitch}
          />
        </View>
        <View style={{ borderBottomWidth: 2, flexDirection: "row", alignItems: "center" }} className='border-[#06492C]/10 py-[20px] justify-between'>
          <Text className='text-[18px] text-[#06492C] font-semibold'>Automatic Settings</Text>
          <Text className=' text-[#06492C]/[69] font-semibold'>Off at Sunset</Text>
        </View>
        <Pressable>
          <Text className='text-[18px] text-center text-[#0C9359] font-semibold mt-[28px]'>Go to Settings</Text>
        </Pressable>
      </View>

    </BottomSheetModal>
  )
})

export default SensorSheet

const styles = StyleSheet.create({
  container: {
  }
});