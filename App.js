import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import mystore, {persistor} from './reduxStore';
import {Provider} from 'react-redux';
import RootStack from './src/navigator/RootStack';
import Splash from './src/screen/splash/Splash';
const App = () => {
  const [screens, setScreens] = useState({
    components: <Splash />,
  });
  useEffect(() => {
    setTimeout(function () {
      setScreens({
        ...screens,
        components: <RootStack />,
      });
    }, 2000);
  });
  return (
    <Provider store={mystore}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>{screens.components}</NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
