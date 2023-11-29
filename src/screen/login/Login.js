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
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useDispatch} from 'react-redux';
// import {actions} from '../../redux/reducer';

export default function Login(props) {
  // const dispatch = useDispatch();
  // const goToHome = () => {
  //   dispatch(actions.setLoginStatus('home'));
  // };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [info, setInfo] = useState('');

  const doLogin = () => {
    // alert('doLogin');
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
        // alert('doLogin then RESPONSE');
        console.log('doLogin RESPONSE', response);
        if (response.data.token) {
          AsyncStorage.setItem('USERINFO', JSON.stringify(response.data));
          AsyncStorage.setItem('TOKEN', response.data.token);
          if (response.status == 200) {
            props.navigation.navigate('Home');
            // alert('doLogin then Condition');
          }
        }
      })
      .catch(error => {
        console.log('doLogin ERROR', error);
        if (error.response.data.error == 'email does not exist') {
          Alert.alert('', error.response.data.developerInfo);
          return;
        }
        if (error.response.data.error == 'password not matched') {
          Alert.alert('', error.response.data.developerInfo);
          return;
        }
      });
  };

  // const getAPI = () => {
  //   let url = `${baseUrl}/api/public/user/dashboard`;
  //   const AuthStr = 'Bearer '.concat(
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImRldmljZUlkIjoiIiwiZW1haWwiOiJoYXJpc2gxMkBnbWFpbC5jb20iLCJleHBpcmVzQXQiOiIyMDIzLTA5LTIzIDE5OjE2OjQxLjIzOTAzNjM2OSArMDAwMCBVVEMgbT0rMzM5NTcuNzM5MzE0NzcxIiwiaWQiOiI1IiwiaXNzdWVyIjoiNSIsIm1vZGVsTmFtZSI6IiIsIm5hbWUiOiJoYXJpc2giLCJvU1ZlcnNpb24iOiIiLCJwbGF0Zm9ybSI6IiIsInJvbGUiOiJkZWFsZXIiLCJ1c2VybmFtZSI6ImhhcmlzaCIsInV1aWRUb2tlbiI6IjNiYzU4NjBmLThhYWItNDhhZS04MGRhLTBlNjUxNDhkY2M5YiJ9LCJleHAiOjE2OTU0OTY2MDEsImlzcyI6IjUifQ.Fe02lmWPqho59vpQuaxpQ3X-QG4Lk9ahFH46Kc7DlpI',
  //   );

  //   axios
  //     .get(url, {
  //       headers: {
  //         Authorization: AuthStr,
  //       },
  //     })
  //     .then(response => {
  //       console.log('!!!!! ', response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            height: height,
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
    bottom: width / 20,
    position: 'absolute',
  },
  conactus: {
    color: colorConstant.button,
  },
});
