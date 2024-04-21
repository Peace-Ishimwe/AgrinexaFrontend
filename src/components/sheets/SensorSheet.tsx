import React, { forwardRef, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';

interface Props {
  title: string
}

type Ref = BottomSheet

const SensorSheet = forwardRef<Ref, Props>((props, ref) => {

  const snapPoints = useMemo(() => ["25%", "50%", "75%"], [])

  return (
    <BottomSheet
      index={1}
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: '#1d0f4e' }}
      handleIndicatorStyle={{ backgroundColor: '#fff' }}
    >
      <View>
        <Text>{props.title}</Text>
      </View>
    </BottomSheet>
  )
})

export default SensorSheet

const styles = StyleSheet.create({
  container: {
  }
});