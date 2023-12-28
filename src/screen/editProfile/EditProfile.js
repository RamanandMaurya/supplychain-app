import {StyleSheet, SafeAreaView, Alert, RefreshControl} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colorConstant, baseUrl, imageConstant} from '../../utils/constant';
import Header from '../../custom/Header';
import InputBox from '../../custom/InputBox';
import Button from '../../custom/Button';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import {actions} from '../../redux/actions/actions';
import {useSelector, useDispatch} from 'react-redux';
export default function EditProfile(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileno, setMobileNumber] = useState('');
  const [dealer, setDealer] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const dispatch = useDispatch();
  // get profile data
  const token = useSelector(state => state.reducer.userToken);
  const userProfile = useSelector(state => state.reducer.userProfile);
  const userEdit = useSelector(state => state.reducer.userEdit);
  const profileinfo = async () => {
    setName(userProfile?.name);
    setEmail(userProfile?.email);
    setMobileNumber(userProfile?.phone);
    setDealer(userProfile?.role);
    setAddress(userProfile?.address);
    setCountry(userProfile?.country);
    setState(userProfile?.state);
  };
  useEffect(() => {
    profileinfo();
  }, [userProfile]);

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
          dispatch(actions.setUserEdit(userEdit ? false : true));
          Alert.alert('', 'Profile updated successfully', [
            {
              text: 'OK',
              onPress: () => props.navigation.navigate('Profile'),
            },
          ]);
        }
      })
      .catch(error => {
        console.log('apierror', error.response.data.error); // Log the response data for more details
        if (error.response.data.error === 'Token is expired') {
          dispatch(actions.setUserToken(null));
          dispatch(actions.setLoginStatus(null));
          dispatch(actions.setUserInfo(null));
        }
      });
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      profileinfo();
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title={'Edit Profile'} navigation={props.navigation} />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            progressBackgroundColor={'#ffffff'}
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#A94545']}
          />
        }>
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
