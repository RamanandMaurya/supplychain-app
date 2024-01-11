import {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  View,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React from 'react';
import axios from 'axios';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Header from '../../custom/Header';
import {actions} from '../../redux/actions/actions';
import {
  colorConstant,
  fontConstant,
  baseUrl,
  imageConstant,
} from '../../utils/constant';
import {width, height} from '../../dimension/dimension';
import Geolocation from '@react-native-community/geolocation';
import {useSelector, useDispatch} from 'react-redux';
export default function TransferScan(props) {
  const dataScaned = useSelector(state => state.reducer.dataScaned);
  const adddata = useSelector(state => state.reducer.addDataForTransfer);
  const [scanned, setScanned] = useState(false);
  const [qrdata, setQrData] = useState('');
  //const orderID = props.route.params.orderID;
  const token = useSelector(state => state.reducer.userToken);
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  const onSuccess1 = async e => {
    // if (location) {
    //   onSuccess(e);
    // }
    onSuccess(e);
  };

  const onSuccess = async e => {
    try {
      if (e.bounds && e.data) {
        var resultArray = e.data.split(' ');
        var resultString = resultArray[2].replace('Batch', '').trim();
        var resultToString = resultString.toString();
        setQrData(resultToString);
        //(resultToString);
        addData(resultToString);
        setScanned(true);
      }
    } catch (err) {
      console.error('Error setting scanned QR:', err);
      Alert.alert('', 'The QR code has not scaned', [
        {
          text: 'OK',
          onPress: () => handleScanNext(),
        },
      ]);
    }
  };
  // const sendApiRequest = async resultQrData => {
  //   let url = `${baseUrl}/api/public/user/dealer-receive`;
  //   const AuthStr = 'Bearer '.concat(token);
  //   let body = {
  //     qrdata: resultQrData,
  //     //order_no: orderID,
  //     lon: longitude.toString(),
  //     lat: latitude.toString(),
  //   };
  //   try {
  //     const response = await axios.post(url, body, {
  //       headers: {
  //         Authorization: AuthStr,
  //       },
  //     });
  //     console.log('API Response Success:', response.data.message);
  //     if (response.data.message === 'The Order is already is in stock') {
  //       Alert.alert('', 'This order is already in stock', [
  //         {
  //           text: 'OK',
  //           onPress: () => handleScanNext(),
  //         },
  //       ]);
  //     }
  //     if (
  //       response.data.message ===
  //       'The Order status is currently open and will change to in stock'
  //     ) {
  //       dispatch(actions.setDataScaned(dataScaned ? false : true));
  //       setScanned(true);
  //     }
  //     if (response.data.message === 'Invalid QR Code') {
  //       Alert.alert('', `This item does not exist in this order`, [
  //         {
  //           text: 'OK',
  //           onPress: () => handleScanNext(),
  //         },
  //       ]);
  //     }
  //     if (response.data.message === undefined) {
  //       Alert.alert(
  //         '',
  //         'QR code information mismatch with order. Please try again!',
  //         [
  //           {
  //             text: 'OK',
  //             onPress: () => handleScanNext(),
  //           },
  //         ],
  //       );
  //     }
  //   } catch (error) {
  //     if (error.response.data.error === 'Token is expired') {
  //       console.error('API No Response:', error.response.data.error);
  //       props.navigation.navigate('Logout');
  //     }
  //   }
  // };
  const handleScanNext = () => {
    setScanned(false);
    scannerNode.reactivate();
  };

  const addData = data => {
    const isDataAlreadyPresent = adddata.includes(data);
    if (isDataAlreadyPresent) {
      Alert.alert('', `${data} already saved`, [
        {
          text: 'OK',
          //onPress: () => handleScanNext(),
        },
      ]);
    } else {
      dispatch(actions.setAddDataForTransfer(data));
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        leftImg={imageConstant.cancel}
        navigation={props.navigation}
        title={'Scan Delivery'}
      />
      <QRCodeScanner
        onRead={onSuccess1}
        showMarker={true}
        reactivate={false}
        ref={node => {
          scannerNode = node;
        }}
        customMarker={
          <Image
            source={imageConstant.scanVector}
            style={{
              height: width / 1.4,
              width: width / 1.4,
              resizeMode: 'contain',
              marginTop: -width / 1.5,
            }}
          />
        }
        cameraStyle={{
          height: height,
          width: width,
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      />
      {scanned && (
        <View style={styles.ScanedView}>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setScanned(false), props.navigation.navigate('Transfer');
              }}
              style={{marginRight: 30}}>
              <View style={styles.transferstl}>
                <Image
                  source={imageConstant.truckFastimg}
                  style={styles.scanImg}
                />
                <View style={styles.transferItem}>
                  <Text style={{color: '#fff'}}>{adddata.length}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleScanNext}
              style={[styles.rightColumnView, {marginTop: 3}]}>
              <Image source={imageConstant.scan} style={styles.scanImg} />
              <Text style={styles.scanText}>SCAN NEXT</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.line}></View>
          {adddata
            .filter((item, key) => key === 0)
            .map((item, ind) => {
              return (
                <View
                  style={[styles.rowContainer1, {paddingBottom: 8}]}
                  key={ind}>
                  <View style={styles.leftColumnView}>
                    <Text style={styles.refernceIdText}>QR #{item}</Text>
                    <View
                      style={[
                        styles.underRowContainer,
                        {
                          width: width / 2,
                        },
                      ]}>
                      <Text style={styles.scanItemText}>
                        Updated 30 sec ago
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.rightColumnView, {paddingTop: 5}]}>
                    <Image
                      source={imageConstant.success}
                      style={styles.scanImg}
                    />
                    <Text
                      style={[styles.viewText, {color: colorConstant.green}]}>
                      Scanned
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
  },
  rowContainer1: {
    width: width / 1.1,
    marginTop: width / 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
  },
  leftColumnView: {
    width: width / 1.5,
    flexDirection: 'column',
    height: 45,
  },
  rightColumnView: {
    alignItems: 'center',
    width: width / 5.5,
    flexDirection: 'column',
  },
  scanImg: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  scanText: {
    color: colorConstant.button,
    fontSize: 12,
    fontFamily: fontConstant.semibold,
    textAlign: 'center',
    paddingTop: 5,
  },
  underRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 1.5,
    marginTop: width / 80,
  },
  scanItemText: {
    color: colorConstant.lightBlackText,
    fontSize: 12,
    fontFamily: fontConstant.semibold,
  },
  dotImg: {
    width: 2,
    height: 2,
    resizeMode: 'contain',
    paddingHorizontal: 8,
  },
  leftItemText: {
    color: colorConstant.blackText,
    fontSize: 12,
    fontFamily: fontConstant.semibold,
  },
  subText: {
    color: colorConstant.blue,
    fontSize: 10,
    fontFamily: fontConstant.regular,
    marginTop: width / 40,
  },
  ScanedView: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    paddingBottom: 16,
    paddingTop: 20,
    width: width,
  },
  line: {
    width: width / 1.1,
    borderBottomWidth: 1,
    alignSelf: 'center',
    marginTop: width / 18,
    borderColor: colorConstant.line,
  },
  viewText: {
    color: colorConstant.lightBlackText,
    fontSize: 12,
    fontFamily: fontConstant.semibold,
    textAlign: 'center',
    paddingTop: 5,
    textTransform: 'uppercase',
  },
  refernceIdText: {
    color: colorConstant.black,
    fontFamily: fontConstant.regular,
    fontSize: 14,
  },
  transferstl: {
    backgroundColor: '#A94545',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    position: 'relative',
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
