import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
const LocationEnable = () => {
  const [location, setLocation] = useState({lat: null, lng: null});
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const geoOptions = {
      enableHighAccuracy: false,
      timeOut: 20000, // 20 seconds
      // maximumAge: 1000 // 1 second
    };

    setReady(false);
    setError(null);

    Geolocation.getCurrentPosition(geoSuccess, geoFailure, geoOptions);

    return () => {
      // Cleanup or clear any subscriptions or timers if needed
    };
  }, []);

  const geoSuccess = position => {
    console.log(position.coords.latitude);
    setLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });

    setReady(true);
  };

  const geoFailure = err => {
    setError(err.message);
    alert('location not enable');
  };

  return (
    <View style={styles.container}>
      {!ready && (
        <Text style={styles.big}>Using Geolocation in React Native.</Text>
      )}
      {error && <Text style={styles.big}>Error: {error}</Text>}
      {ready && (
        <Text style={styles.big}>
          Latitude: {location.lat} Longitude: {location.lng}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  big: {
    fontSize: 25,
  },
});

export default LocationEnable;
