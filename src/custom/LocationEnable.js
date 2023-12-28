import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
const LocationEnable = () => {
  return (
    <View>
      <Text>Location</Text>
    </View>
  );
};

const colors = {
  red: '#b90707',
  green: '#03b503',
  blue: '#0000f7',
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  disabled: {
    color: colors.red,
  },
  enabled: {
    color: colors.green,
  },
  status: {
    fontSize: 20,
    margin: 20,
  },
  undefined: {
    color: colors.blue,
  },
});

export default LocationEnable;
