import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colorConstant, fontConstant} from '../../utils/constant';
import Header from '../../custom/Header';
import {width} from '../../dimension/dimension';
import Orders from '../../custom/Orders';
import Open from '../../custom/Open';
import Stock from '../../custom/Stock';
export default function Deliveries(props) {
  const [checked, setChecked] = useState(0);
  const [checked1, setChecked1] = useState(0);
  const [checked2, setChecked2] = useState(0);
  const [checked3, setChecked3] = useState(0);
  const [checked4, setChecked4] = useState(0);
  const [selectIndex, setSelectIndex] = useState(0);
  console.log('@@@@', props);
  useEffect(() => {
    if (props?.route?.params?.Open) {
      open();
    } else if (props?.route?.params?.Stock) {
      stock();
    } else if (props?.route?.params?.Transfer) {
      transfer();
    } else if (props?.route?.params?.Soldout) {
      allOrders();
    } else if (props?.route?.params?.order) {
      allOrders();
    } else {
      allOrders();
    }
  }, []);

  const allOrders = () => {
    setChecked(1);
    setSelectIndex(1);
    setChecked1(0);
    setChecked2(0);
    setChecked3(0);
  };

  const open = () => {
    setChecked(0);
    setSelectIndex(2);
    setChecked1(1);
    setChecked2(0);
    setChecked3(0);
  };

  const stock = () => {
    setChecked(0);
    setSelectIndex(3);
    setChecked1(0);
    setChecked2(1);
    setChecked3(0);
  };

  const transfer = () => {
    setChecked(0);
    setSelectIndex(4);
    setChecked1(0);
    setChecked2(0);
    setChecked3(1);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title={'Deliveries'} navigation={props.navigation} />

      <View style={styles.rowContainer}>
        {checked === 0 ? (
          <TouchableOpacity activeOpacity={0.7} onPress={() => allOrders()}>
            <Text style={styles.text1}>ALL ORDERS</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <Text style={styles.text2}>ALL ORDERS</Text>
            <View style={styles.line}></View>
          </View>
        )}

        {checked1 === 0 ? (
          <TouchableOpacity activeOpacity={0.7} onPress={() => open()}>
            <Text style={styles.text1}>OPEN</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <Text style={styles.text2}>OPEN</Text>
            <View style={styles.line}></View>
          </View>
        )}

        {checked2 === 0 ? (
          <TouchableOpacity activeOpacity={0.7} onPress={() => stock()}>
            <Text style={styles.text1}>IN STOCK</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <Text style={styles.text2}>IN STOCK</Text>
            <View style={styles.line}></View>
          </View>
        )}

        {checked3 === 0 ? (
          <TouchableOpacity activeOpacity={0.7} onPress={() => transfer()}>
            <Text style={styles.text1}>IN TRANSFER</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <Text style={styles.text2}>IN TRANSFER</Text>
            <View style={styles.line}></View>
          </View>
        )}
      </View>
      {checked === 1 ? <Orders navigation={props} /> : null}
      {checked1 === 1 ? <Open navigation={props} /> : null}
      {checked2 === 1 ? <Stock navigation={props} /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colorConstant.white,
  },
  text1: {
    fontFamily: fontConstant.semibold,
    fontSize: 12,
    marginBottom: width / 80,
    textAlign: 'center',
    color: colorConstant.lightGray,
    marginBottom: width / 30,
  },
  text2: {
    fontFamily: fontConstant.semibold,
    fontSize: 12,

    textAlign: 'center',
    color: colorConstant.button,
    marginBottom: width / 30,
  },

  rowContainer: {
    width: width / 1.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: width / 40,
    borderBottomColor: colorConstant.line,
    borderBottomWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: width / 40,
  },
  line: {
    height: 2,
    backgroundColor: colorConstant.button,
    // width: width / 4.7,
  },
  // columContainer: {
  //   flexDirection: 'column',
  //   alignItems: 'center',
  // },
});
