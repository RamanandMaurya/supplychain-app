import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import {height, width} from '../../dimension/dimension';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash(props) {
  useEffect(() => {
    setTimeout(async () => {
      const userInfo = JSON.parse(await AsyncStorage.getItem('USERINFO'));
      console.log('????', userInfo);

      if (userInfo?.token) props.navigation.navigate('Home');
      else props.navigation.navigate('Login');
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <Image source={imageConstant.logo} style={styles.image} />
      <Text style={styles.mainText}>Delivery order and earn more</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    height: 64,
    width: 201,
  },
  mainText: {
    fontSize: 14,
    textAlign: 'center',
    color: colorConstant.lightGray,
    marginTop: width / 40,
    fontFamily: fontConstant.regular,
  },
});
