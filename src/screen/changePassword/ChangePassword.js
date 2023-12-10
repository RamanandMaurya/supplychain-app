import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {colorConstant, baseUrl} from '../../utils/constant';
import Header from '../../custom/Header';
import InputBox from '../../custom/InputBox';
import Button from '../../custom/Button';
import {width} from '../../dimension/dimension';
import {useSelector} from 'react-redux';

export default function ChangePassword(props) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmpassword, setConformPassword] = useState('');
  const token = useSelector(state => state.reducer.userToken);
  const changePassword = async () => {
    if (!oldPassword) {
      Alert.alert('', 'Please enter Old Password !');
      return;
    }

    if (!newPassword) {
      Alert.alert('', 'Please enter New Password !');
      return;
    }

    if (!confirmpassword) {
      Alert.alert('', 'Please enter Confirm Password !');
      return;
    }

    if (newPassword != confirmpassword) {
      Alert.alert('', "New Password and Confirm Password doesn't match !");
      return;
    }
    if (newPassword == oldPassword) {
      Alert.alert('', 'Do not use old password');
      return;
    }

    let url = `${baseUrl}/api/public/user/change-password`;
    let body = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    const AuthStr = 'Bearer '.concat(token);

    axios
      .post(url, body, {
        headers: {
          Authorization: AuthStr,
        },
      })
      .then(response => {
        if (response.data.message == 'successfully updated password') {
          Alert.alert('', 'Password Updated Successfully', [
            {
              text: 'OK',
              onPress: () => props.navigation.navigate('Profile'),
            },
          ]);
        }
      })
      .catch(error => {
        if (error.response.data.error == 'password not matched') {
          Alert.alert('', 'Old password not matched, Try again');
          return;
        }
      });
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title={'Change Password'} navigation={props.navigation} />
      <InputBox
        value={oldPassword}
        placeholder={'Old Password'}
        isPassword={true}
        onChangeText={value => setOldPassword(value)}
      />
      <InputBox
        value={newPassword}
        placeholder={'New Password'}
        onChangeText={value => setNewPassword(value)}
        isPassword={true}
      />
      <InputBox
        value={confirmpassword}
        placeholder={'Confrim Password'}
        isPassword={true}
        onChangeText={value => setConformPassword(value)}
      />

      <Button
        title={'Update Password'}
        position={'absolute'}
        bottom={width / 20}
        onButtonPress={changePassword}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colorConstant.white,
  },
});
