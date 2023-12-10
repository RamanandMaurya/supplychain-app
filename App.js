import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import mystore, {persistor} from './reduxStore';
import {Provider} from 'react-redux';
import RootStack from './src/navigator/RootStack';

const App = () => {
  return (
    <Provider store={mystore}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
