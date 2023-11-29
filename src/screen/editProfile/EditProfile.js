import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {useState, useEffect} from 'react';
import {colorConstant, baseUrl, imageConstant} from '../../utils/constant';
import Header from '../../custom/Header';
import InputBox from '../../custom/InputBox';
import Button from '../../custom/Button';
import {width} from '../../dimension/dimension';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfile(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileno, setMobileNumber] = useState('');
  const [dealer, setDealer] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  // get profile data

  const profileinfo = async () => {
    let url = `${baseUrl}/api/public/user/profile`;
    const token = await AsyncStorage.getItem('TOKEN');
    const AuthStr = 'Bearer '.concat(token);
    console.log('@@@@@', token);
    axios
      .get(url, {
        headers: {
          Authorization: AuthStr,
        },
      })
      .then(response => {
        console.log('res', response);
        setName(response.data.name);
        setEmail(response.data.email);
        setMobileNumber(response.data.phone);
        setDealer(response.data.role);
        setAddress(response.data.address);
        setCountry(response.data.country);
        setState(response.data.state);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    profileinfo();
  }, []);

  const editProfile = async () => {
    let url = `${baseUrl}/api/public/user/profile`;
    let body = {
      name: name,
      address: address,
      email: email,
      phone: mobileno,
      countryCode: '+91',
      profileImageId: 1,
      state: state,
      country: country,
    };
    const token = await AsyncStorage.getItem('TOKEN');
    const AuthStr = 'Bearer '.concat(token);
    console.log('token@@@', token);

    axios
      .put(url, body, {
        headers: {
          Authorization: AuthStr,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('apiresponse', response.data.message);
        if (response.data.message == 'profile updated successfully') {
          Alert.alert('', 'Profile updated successfully', [
            {
              text: 'OK',
              onPress: () => props.navigation.navigate('Profile'),
            },
          ]);
        }
      })
      .catch(error => {
        console.log('apierror', error.response.data); // Log the response data for more details
      });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title={'Edit Profile'} navigation={props.navigation} />
      <KeyboardAwareScrollView>
        <InputBox
          image={imageConstant.name}
          placeholder={'Name'}
          value={name}
          onChangeText={value => setName(value)}
        />
        <InputBox
          image={imageConstant.mail}
          placeholder={'Email Adress'}
          value={email}
          onChangeText={value => setEmail(value)}
        />
        <InputBox
          image={imageConstant.mobile}
          placeholder={'Mobile NUmber'}
          value={mobileno}
          onChangeText={value => setMobileNumber(value)}
        />
        <InputBox
          image={imageConstant.dropdown}
          placeholder={'Dealer'}
          value={dealer}
          onChangeText={value => setDealer(value)}
        />
        <InputBox
          image={imageConstant.location}
          placeholder={'Address'}
          value={address}
          onChangeText={value => setAddress(value)}
        />
        <InputBox
          image={imageConstant.dropdown}
          placeholder={'Country'}
          value={country}
          onChangeText={value => setCountry(value)}
        />
        <InputBox
          image={imageConstant.dropdown}
          placeholder={'State'}
          value={state}
          onChangeText={value => setState(value)}
        />
        <Button
          title={'Update Profile'}
          onButtonPress={editProfile}
          marginTop={50}
          marginBottom={20}
          // onButtonPress={(editProfile) => props.navigation.goBack()}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colorConstant.white,
  },
});
