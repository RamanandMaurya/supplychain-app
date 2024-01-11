import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screen/home/Home';
import ChangePassword from '../screen/changePassword/ChangePassword';
import Deliveries from '../screen/deliveries/Deliveries';
import Profile from '../screen/profile/Profile';
import TransferDelivery from '../screen/transferDelivery/TransferDelivery';
import TrackDelivery from '../screen/trackDelivery/TrackDelivery';
import ItemDetails from '../screen/itemDetails/ItemDetails';
import RefrenceDetails from '../screen/refrenceDetails/RefrenceDetails';
import Scanner from '../screen/scanner/Scanner';
import EditProfile from '../screen/editProfile/EditProfile';
import LocationEnable from '../custom/LocationEnable';
import TransferScan from '../screen/transferScan/TransferScan';
import Transfer from '../screen/transferItem/Transfer';
import TransferredItems from '../screen/transferredItems/TransferredItems';
import Logout from '../custom/Logout';
const Stack = createNativeStackNavigator();

const AfterStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Deliveries" component={Deliveries} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="TransferDelivery" component={TransferDelivery} />
      <Stack.Screen name="TrackDelivery" component={TrackDelivery} />
      <Stack.Screen name="ItemDetails" component={ItemDetails} />
      <Stack.Screen name="RefrenceDetails" component={RefrenceDetails} />
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Location" component={LocationEnable} />
      <Stack.Screen name="TransferScan" component={TransferScan} />
      <Stack.Screen name="Transfer" component={Transfer} />
      <Stack.Screen name="TransferredItems" component={TransferredItems} />
      <Stack.Screen name="Logout" component={Logout} />
    </Stack.Navigator>
  );
};

export default AfterStack;
