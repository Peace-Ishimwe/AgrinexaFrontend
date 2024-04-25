import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface StatusCardProps {
  iconName: string;
  value: string;
  icon: React.ReactNode;
}

const StatusCard = ({ iconName, value, icon }: StatusCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.title}>{iconName}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingLeft: 9,
    paddingVertical: 9,
    minWidth: 105,
    width: "100%",
    borderRadius: 8,
    shadowColor: '#0C9559',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.13,
    shadowRadius: 24,
    elevation: 12
  },
  iconContainer: {
    marginBottom: 3,
  },
  title: {
    color: '#9796A1',
    fontSize: 14,
    marginTop: 6
  },
  value: {
    marginTop: 12,
    color: '#06492C',
    fontSize: 18,
    fontWeight: '700',
  },
});

export { StatusCard }