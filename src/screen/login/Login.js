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
import {Dropdown} from 'react-native-element-dropdown';
const data = [
  {label: 'Dealer', value: 'dealer'},
  {label: 'Retailer', value: 'retailer'},
  {label: 'Distributor', value: 'distributor'},
];
export default function Login(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const doLogin = () => {
    let url = `${baseUrl}/api/public/login`;
    console.log('doLogin URL', url);
    let body = {
      Password: password,
      email: email,
      role: role,
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
        console.log('doLogin ERROR', error?.response?.data);
        if (error?.response?.data?.error == 'email does not exist') {
          Alert.alert('', 'Email does not exist');
          return;
        }
        if (error?.response?.data?.error == 'password not matched') {
          Alert.alert('', error?.response?.data?.developerInfo);
          return;
        }
        if (error?.response?.data?.error == 'role does not match') {
          Alert.alert('', 'Role does not match');
          return;
        }
        if (role === null) {
          Alert.alert('', 'Please select role');
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
          <Dropdown
            style={[
              styles.dropdown,
              {
                borderColor: isFocus
                  ? colorConstant.blue
                  : colorConstant.inputBorder,
              },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            itemTextStyle={styles.itemTextStyle}
            maxHeight={300}
            labelField="label"
            valueField="value"
            mode="modal"
            containerStyle={{borderRadius: 12}}
            placeholder={!isFocus ? 'Select Role' : '...'}
            searchPlaceholder="Search..."
            value={role}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setRole(item.value);
              setIsFocus(false);
            }}
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

  dropdown: {
    height: width / 7,
    borderWidth: 1,
    width: width / 1.1,
    borderRadius: 12,
    paddingHorizontal: 8,
    marginTop: width / 20,
    paddingRight: width / 22,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    marginLeft: width / 20,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    marginLeft: width / 25,
  },
  selectedTextStyle: {
    fontSize: 14,
    marginLeft: width / 25,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  textItem: {
    flex: 1,
    fontSize: 30,
  },
  itemTextStyle: {
    paddingHorizontal: width / 45,
    fontSize: 14,
  },
});
