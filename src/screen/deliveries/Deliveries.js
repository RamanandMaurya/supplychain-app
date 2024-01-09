import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import Header from '../../custom/Header';
import {width} from '../../dimension/dimension';
import Orders from '../../custom/Orders';
import Open from '../../custom/Open';
import Stock from '../../custom/Stock';
import {useSelector, useDispatch} from 'react-redux';
import {actions} from '../../redux/actions/actions';
import {ScrollView} from 'react-native-gesture-handler';
import Transfer from '../../custom/Transfer';
import SoldOut from '../../custom/SoldOut';
export default function Deliveries(props) {
  const [checked, setChecked] = useState(0);
  const [checked1, setChecked1] = useState(0);
  const [checked2, setChecked2] = useState(0);
  const [checked3, setChecked3] = useState(0);
  const [checked4, setChecked4] = useState(0);
  const [selectIndex, setSelectIndex] = useState(0);
  const token = useSelector(state => state.reducer.userToken);
  const adddata = useSelector(state => state.reducer.addDataForTransfer);
  const userInfo = useSelector(state => state.reducer.userInfo);
  const roleData = userInfo?.userInfo?.role;
  const dispatch = useDispatch();
  //console.log('@@@@', props?.route?.params);
  useEffect(() => {
    if (props?.route?.params?.Open) {
      open();
    } else if (props?.route?.params?.Stock) {
      stock();
    } else if (props?.route?.params?.Transfer) {
      transfer();
    } else if (props?.route?.params?.Soldout) {
      soldout();
    } else if (props?.route?.params?.Allorder) {
      allOrders();
    } else {
      allOrders();
    }
  }, [token]);

  const allOrders = () => {
    setChecked(1);
    setSelectIndex(1);
    setChecked1(0);
    setChecked2(0);
    setChecked3(0);
    setChecked4(0);
  };

  const open = () => {
    setChecked(0);
    setSelectIndex(2);
    setChecked1(1);
    setChecked2(0);
    setChecked3(0);
    setChecked4(0);
  };

  const stock = () => {
    setChecked(0);
    setSelectIndex(3);
    setChecked1(0);
    setChecked2(1);
    setChecked3(0);
    setChecked4(0);
  };

  const transfer = () => {
    setChecked(0);
    setSelectIndex(4);
    setChecked1(0);
    setChecked2(0);
    setChecked3(1);
    setChecked4(0);
  };
  const soldout = () => {
    setChecked(0);
    setSelectIndex(5);
    setChecked1(0);
    setChecked2(0);
    setChecked3(0);
    setChecked4(1);
    handleScrollToRight();
  };

  const scrollViewRef = useRef(null);

  const handleScrollToRight = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  };
  const removeAddData = () => {
    dispatch(actions.setRemoveTransfer());
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title={'Deliveries'} navigation={props.navigation} />
      <ScrollView
        ref={scrollViewRef}
        style={styles.rowContainer}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'space-between',
          width: roleData === 'retailer' ? width / 1.1 : null,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}>
        {checked === 0 ? (
          <TouchableOpacity
            style={[
              styles.tabstyle,
              {width: roleData === 'retailer' ? width / 3.4 : width / 4.4},
            ]}
            activeOpacity={0.7}
            onPress={() => allOrders()}>
            <Text style={styles.text1}>ALL ORDERS</Text>
          </TouchableOpacity>
        ) : (
          <View
            style={[
              styles.tabstyle,
              {width: roleData === 'retailer' ? width / 3.4 : width / 4.4},
            ]}>
            <Text style={styles.text2}>ALL ORDERS</Text>
            <View style={styles.line}></View>
          </View>
        )}

        {checked1 === 0 ? (
          <TouchableOpacity
            style={[
              styles.tabstyle,
              {width: roleData === 'retailer' ? width / 3.4 : width / 4.4},
            ]}
            activeOpacity={0.7}
            onPress={() => open()}>
            <Text style={styles.text1}>OPEN</Text>
          </TouchableOpacity>
        ) : (
          <View
            style={[
              styles.tabstyle,
              {width: roleData === 'retailer' ? width / 3.4 : width / 4.4},
            ]}>
            <Text style={styles.text2}>OPEN</Text>
            <View style={styles.line}></View>
          </View>
        )}

        {checked2 === 0 ? (
          <TouchableOpacity
            style={[
              styles.tabstyle,
              {width: roleData === 'retailer' ? width / 3.4 : width / 4.4},
            ]}
            activeOpacity={0.7}
            onPress={() => stock()}>
            <Text style={styles.text1}>IN STOCK</Text>
          </TouchableOpacity>
        ) : (
          <View
            style={[
              styles.tabstyle,
              {width: roleData === 'retailer' ? width / 3.4 : width / 4.4},
            ]}>
            <Text style={styles.text2}>IN STOCK</Text>
            <View style={styles.line}></View>
          </View>
        )}

        {checked3 === 0 && roleData != 'retailer' ? (
          <TouchableOpacity
            style={[
              styles.tabstyle,
              {width: roleData === 'retailer' ? width / 3.4 : width / 4.4},
            ]}
            activeOpacity={0.7}
            onPress={() => transfer()}>
            <Text style={styles.text1}>IN TRANSFER</Text>
          </TouchableOpacity>
        ) : roleData != 'retailer' ? (
          <View
            style={[
              styles.tabstyle,
              {width: roleData === 'retailer' ? width / 3.4 : width / 4.4},
            ]}>
            <Text style={styles.text2}>IN TRANSFER</Text>
            <View style={styles.line}></View>
          </View>
        ) : (
          ''
        )}
        {checked4 === 0 && roleData != 'retailer' ? (
          <TouchableOpacity
            style={[
              styles.tabstyle,
              {width: roleData === 'retailer' ? width / 3.4 : width / 4.4},
            ]}
            activeOpacity={0.7}
            onPress={() => soldout()}>
            <Text style={styles.text1}>SOLD OUT</Text>
          </TouchableOpacity>
        ) : roleData != 'retailer' ? (
          <View
            style={[
              styles.tabstyle,
              {width: roleData === 'retailer' ? width / 3.4 : width / 4.4},
            ]}>
            <Text style={styles.text2}>SOLD OUT</Text>
            <View style={styles.line}></View>
          </View>
        ) : (
          ''
        )}
      </ScrollView>
      {checked === 1 ? <Orders navigation={props} /> : null}
      {checked1 === 1 ? <Open navigation={props} /> : null}
      {checked2 === 1 ? <Stock navigation={props} /> : null}
      {checked3 === 1 ? <Transfer navigation={props} /> : null}
      {checked4 === 1 ? <SoldOut navigation={props} /> : null}
      {checked2 === 1 && roleData != 'retailer' ? (
        <View style={styles.scannerButton}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              removeAddData();
              props.navigation.navigate('TransferScan');
            }}>
            <Image
              source={imageConstant.transferScan}
              style={styles.scannerImg}
            />
          </TouchableOpacity>
          {adddata.length >= 1 && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => props.navigation.navigate('Transfer')}
              style={{marginLeft: 13}}>
              <View style={styles.transferstl}>
                <Image source={imageConstant.truck} style={styles.scanImg} />
                <View style={styles.transferItem}>
                  <Text style={{color: '#fff'}}>{adddata.length}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      ) : null}
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
    marginTop: width / 40,
    borderBottomColor: colorConstant.line,
    borderBottomWidth: 1,
    marginBottom: 5,
    position: 'absolute',
    top: 55,
    alignSelf: 'center',
  },
  line: {
    height: 2,
    backgroundColor: colorConstant.button,
  },
  tabstyle: {
    //width: roleData === 'retailer' ? width / 3.4 : width / 4.4,
  },
  scannerImg: {
    width: 157,
    height: 48,
  },
  scannerButton: {
    width: width,
    justifyContent: 'center',
    bottom: width / 12,
    alignSelf: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
  scanImg: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  transferstl: {
    backgroundColor: '#fff',
    paddingHorizontal: 11,
    paddingVertical: 11,
    borderRadius: 11,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#A94545',
  },
  transferItem: {
    width: 27,
    height: 27,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -10,
    right: -15,
    backgroundColor: '#A94545',
    borderColor: '#fff',
    borderWidth: 3,
  },
});
