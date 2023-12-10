import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import {width} from '../../dimension/dimension';
import {useSelector} from 'react-redux';
export default function Splash(props) {
  const token = useSelector(state => state.reducer.userToken);
  useEffect(() => {
    setTimeout(async () => {
      if (token !== null) props.navigation.navigate('Home');
      else props.navigation.navigate('Login');
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <Image source={imageConstant.logo} style={styles.image} />
      <Text style={styles.mainText}>Delivery order and earn more</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    height: 64,
    width: 201,
  },
  mainText: {
    fontSize: 14,
    textAlign: 'center',
    color: colorConstant.lightGray,
    marginTop: width / 40,
    fontFamily: fontConstant.regular,
  },
});
