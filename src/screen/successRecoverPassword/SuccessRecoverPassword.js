import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import Header from '../../custom/Header';
import {width} from '../../dimension/dimension';
import Button from '../../custom/Button';

export default function SuccessRecoverPassword(props) {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title={'Recover Password?'} navigation={props.navigation} />

      <Image source={imageConstant.success} style={styles.img} />
      <Text style={styles.successText}>Success</Text>
      <Text style={styles.text1}>
        Your password has been recovered successfully
      </Text>
      <Text style={styles.text2}>
        New Password has been sent to your registered business email address
      </Text>
      <Text style={styles.text3}>
        If you do not receive a email within 1 hour Please get in touch with our
        team:
      </Text>
      <Text style={styles.text4}>support@supplychainmonitoring.com</Text>

      <Button
        title={'Login Now'}
        position={'absolute'}
        bottom={width / 20}
        onButtonPress={() => props.navigation.navigate('Login')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colorConstant.white,
  },
  img: {
    resizeMode: 'contain',
    height: 50,
    width: 50,
    alignSelf: 'center',
    marginTop: width / 10,
  },
  successText: {
    color: colorConstant.black,
    fontSize: 24,
    fontFamily: fontConstant.semibold,
    alignSelf: 'center',
    marginTop: width / 20,
    lineHeight: 24,
  },
  text1: {
    color: colorConstant.lightText,
    fontSize: 14,
    fontFamily: fontConstant.medium,
    alignSelf: 'center',
    marginTop: width / 30,
    lineHeight: 24,
  },
  text2: {
    color: colorConstant.darkText,
    fontSize: 14,
    fontFamily: fontConstant.medium,
    alignSelf: 'center',
    marginTop: width / 30,
    textAlign: 'center',
    width: width / 1.3,
    lineHeight: 24,
  },
  text3: {
    color: colorConstant.darkText,
    fontSize: 14,
    fontFamily: fontConstant.medium,
    alignSelf: 'center',
    marginTop: width / 30,
    textAlign: 'center',
    width: width / 1.3,
    lineHeight: 24,
  },
  text4: {
    color: colorConstant.button,
    fontSize: 16,
    fontFamily: fontConstant.semibold,
    alignSelf: 'center',
    marginTop: width / 30,
    textAlign: 'center',
    width: width / 1.3,
    lineHeight: 24,
  },
});
