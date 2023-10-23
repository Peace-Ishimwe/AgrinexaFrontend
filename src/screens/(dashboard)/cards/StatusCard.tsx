import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { HumidityIcon } from '../../../assets/icons/icons';

const StatusCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <HumidityIcon />
      </View>
      <Text style={styles.title}>Humidity</Text>
      <Text style={styles.value}>74%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingLeft: 9,
    paddingVertical: 9,
    width: 120,
    borderRadius: 8,
    shadowColor: '#0C9559',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.13,
    shadowRadius: 24,
    elevation: 12,
  },
  iconContainer: {
    marginBottom: 3,
  },
  title: {
    color: '#9796A1',
    fontSize: 18,
    marginTop: 6
  },
  value: {
    marginTop: 12,
    color: '#06492C',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default StatusCard;
