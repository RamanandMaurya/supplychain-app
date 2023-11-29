import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import Header from '../../custom/Header';
import InputBox from '../../custom/InputBox';
import Button from '../../custom/Button';
import {width} from '../../dimension/dimension';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const commanState = {
  otpValue: '',
  loading: false,
};

export default function VerifyOtp(props) {
  const [state, setState] = useState(commanState);
  const onOTPFilled = item => {
    setState({...state, otpValue: item});
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title={'Verify OTP'} navigation={props.navigation}/>

      <Text style={styles.text}>
        OTP has been sent to registered email address
      </Text>

      <OTPInputView
        pinCount={6}
        autoFocusOnLoad={false}
        onCodeFilled={item => onOTPFilled(item)}
        style={{
          width: '95%',
          height: 50,
          alignSelf: 'center',
        }}
        codeInputFieldStyle={{
          borderWidth: 1,
          borderRadius: 8,
          borderColor: 'rgba(56, 56, 58, 0.1)',
          color: 'black',
          fontFamily: fontConstant.medium,
          fontSize: 16,
          color: colorConstant.black,
        }}
      />

      <View style={styles.rowContainer}>
        <Text style={styles.timeText}>0:59</Text>
        <Text style={styles.resendText}>Resend OTP</Text>
      </View>

      <Button
        title={'Verify'}
        position={'absolute'}
        bottom={width / 20}
        onButtonPress={() => props.navigation.navigate('SuccessRecoverPassword')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colorConstant.white,
  },
  text: {
    fontFamily: fontConstant.regular,
    fontSize: 14,
    textAlign: 'center',
    color: colorConstant.blackText,
    marginTop: width / 20,
    marginBottom: width / 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width / 3,
    // height: 50,
    // backgroundColor: 'red',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: width / 30,
    marginTop: width / 30,
  },
  timeText: {
    fontSize: 12,
    fontFamily: fontConstant.medium,
    color: colorConstant.blackText,
  },
  resendText: {
    fontSize: 14,
    fontFamily: fontConstant.semibold,
    color: colorConstant.button,
  },
});
