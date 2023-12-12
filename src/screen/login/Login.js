import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  Alert,
} from 'react-native';
import axios from 'axios';
import React from 'react';
import {
  baseUrl,
  colorConstant,
  fontConstant,
  imageConstant,
} from '../../utils/constant';
import {width, height} from '../../dimension/dimension';
import InputBox from '../../custom/InputBox';
import Button from '../../custom/Button';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {actions} from '../../redux/actions/actions';

export default function Login(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doLogin = () => {
    let url = `${baseUrl}/api/public/login`;
    console.log('doLogin URL', url);
    let body = {
      Password: password,
      email: email,
      role: 'dealer',
    };
    console.log('doLogin BODY', body);
    axios
      .post(url, body, {
        headers: {},
      })
      .then(async response => {
        console.log('doLogin RESPONSE', response?.status);
        if (response?.data?.token) {
          const userToken1 = response?.data?.token;
          if (response?.status == 200) {
            const data = response?.data;
            dispatch(actions.setLoginStatus('home'));
            dispatch(actions.setUserToken(userToken1));
            dispatch(actions.setUserInfo(data));
          }
        }
      })
      .catch(error => {
        console.log('doLogin ERROR', error);
        if (error?.response?.data?.error == 'email does not exist') {
          Alert.alert('', error?.response?.data?.developerInfo);
          return;
        }
        if (error?.response?.data?.error == 'password not matched') {
          Alert.alert('', error?.response?.data?.developerInfo);
          return;
        }
      });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            height: height - 15,
          }}>
          <Image source={imageConstant.logo} style={styles.logoImg} />

          <Text style={styles.text}>Delivery order and earn more</Text>

          <InputBox
            value={email}
            image={imageConstant.mail}
            placeholder={'Business Email'}
            onChangeText={value => setEmail(value)}
          />

          <InputBox
            value={password}
            placeholder={'Password'}
            isPassword={true}
            onChangeText={value => setPassword(value)}
          />

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.recoverButton}
            onPress={() => props.navigation.navigate('RecoverPassword')}>
            <Text style={styles.recoverText}>Recover Password?</Text>
          </TouchableOpacity>
          <Button title={'Login'} onButtonPress={doLogin} />

          <View style={styles.rowText}></View>

          <Text style={styles.needhelp}>
            Need Help? <Text style={styles.conactus}>Contact Us</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoImg: {
    resizeMode: 'contain',
    width: 201.72,
    height: 60,
    alignSelf: 'center',
  },
  text: {
    color: colorConstant.lightGray,
    marginTop: width / 15,
    alignSelf: 'center',
    marginBottom: width / 20,
    fontFamily: fontConstant.regular,
  },
  recoverButton: {
    marginTop: width / 40,
    alignSelf: 'flex-end',
    marginBottom: width / 20,
    marginTop: width / 30,
  },
  recoverText: {
    color: colorConstant.lightGray,
    fontFamily: fontConstant.regular,
  },
  rowText: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  needhelp: {
    color: colorConstant.lightGray,
    alignSelf: 'center',
    fontFamily: fontConstant.medium,
    bottom: 10,
    position: 'absolute',
  },
  conactus: {
    color: colorConstant.button,
  },
});
