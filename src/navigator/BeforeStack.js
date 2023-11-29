import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screen/splash/Splash';
import Login from '../screen/login/Login';
import RecoverPassword from '../screen/recoverPassword/RecoverPassword';
import VerifyOtp from '../screen/verifyOtp/VerifyOtp';
import SuccessRecoverPassword from '../screen/successRecoverPassword/SuccessRecoverPassword';
import Home from '../screen/home/Home';
import Deliveries from '../screen/deliveries/Deliveries';
import Profile from '../screen/profile/Profile';
import TransferDelivery from '../screen/transferDelivery/TransferDelivery';
import TrackDelivery from '../screen/trackDelivery/TrackDelivery';
import ItemDetails from '../screen/itemDetails/ItemDetails';
import RefrenceDetails from '../screen/refrenceDetails/RefrenceDetails';
import Scanner from '../screen/scanner/Scanner';
import ChangePassword from '../screen/changePassword/ChangePassword';
import EditProfile from '../screen/editProfile/EditProfile';
const Stack = createNativeStackNavigator();

const StackRoot = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen
        name="SuccessRecoverPassword"
        component={SuccessRecoverPassword}
      />
      <Stack.Screen name="Deliveries" component={Deliveries} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="TransferDelivery" component={TransferDelivery} />
      <Stack.Screen name="TrackDelivery" component={TrackDelivery} />
      <Stack.Screen name="ItemDetails" component={ItemDetails} />
      <Stack.Screen name="RefrenceDetails" component={RefrenceDetails} />
      <Stack.Screen name="Scanner" component={Scanner} />
    </Stack.Navigator>
  );
};

export default StackRoot;
