import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colorConstant, imageConstant} from '../../utils/constant';
import InputBox from '../../custom/InputBox';
import Button from '../../custom/Button';
import {width} from '../../dimension/dimension';
import Header from '../../custom/Header';

export default function RecoverPassword(props) {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title={'Recover Password?'} navigation={props.navigation} />
      <InputBox image={imageConstant.mail} placeholder={'Business Email'} />
      <Button
        title={'Send OTP'}
        position={'absolute'}
        bottom={width / 20}
        onButtonPress={() => props.navigation.navigate('VerifyOtp')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, 
    backgroundColor: colorConstant.white
  },
});
