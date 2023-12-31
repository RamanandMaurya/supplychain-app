import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screen/login/Login';
import RecoverPassword from '../screen/recoverPassword/RecoverPassword';
import VerifyOtp from '../screen/verifyOtp/VerifyOtp';
import SuccessRecoverPassword from '../screen/successRecoverPassword/SuccessRecoverPassword';
const Stack = createNativeStackNavigator();

const StackRoot = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
      <Stack.Screen
        name="SuccessRecoverPassword"
        component={SuccessRecoverPassword}
      />
    </Stack.Navigator>
  );
};

export default StackRoot;
