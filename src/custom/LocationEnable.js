import * as React from 'react';
import {useState, useEffect} from 'react';
import {StyleSheet, View, Text, PermissionsAndroid} from 'react-native';
export default function LocationEnable() {
  const [PGranted, setPGranted] = useState();
  useEffect(() => {
    checkLocation();
  }, []);
  async function checkLocation() {
    let granted = await getLocationPermission();
    console.log(granted, '=> Permission');
    setPGranted(granted);
  }
  async function getLocationPermission() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).catch(err => {
      console.log('location error', err);
    });
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return (
    <View style={styles.container}>
      {PGranted ? <Text>location true</Text> : <Text>location no</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
