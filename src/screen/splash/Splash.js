import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import {width} from '../../dimension/dimension';
export default function Splash(props) {
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
