import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import BeforeStack from './BeforeStack';
import AfterStack from './AfterStack';

const Stack = createNativeStackNavigator();
const RootStack = props => {
  const {loginStatus} = useSelector(state => state.reducer);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {loginStatus == null && (
        <Stack.Screen name="BeforeStack" component={BeforeStack} />
      )}

      {loginStatus == 'home' && (
        <Stack.Screen name="AfterStack" component={AfterStack} />
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
