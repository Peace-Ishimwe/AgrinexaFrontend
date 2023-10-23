import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { HumidityIcon } from '../../../assets/icons/icons';

const InfoCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nutrient Level</Text>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <HumidityIcon />
        </View>
        <View>
          <Text style={styles.text}>5 grams left</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <HumidityIcon />
        </View>
        <View>
          <Text style={styles.text}>5 grams left</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingLeft: 9,
    paddingVertical: 9,
    width: '100%',
    borderRadius: 8,
    shadowColor: '#0C9559',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.13,
    shadowRadius: 24,
    elevation: 12,
  },
  title: {
    color: '#9796A1',
    fontSize: 16,
    marginBottom: 9
  },
  row: {
    flexDirection: 'row',
    marginTop: 2,
  },
  iconContainer: {
    marginBottom: 1,
  },
  text: {
    marginTop: 1,
    marginLeft: 2,
    color: '#06492C',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default InfoCard;
