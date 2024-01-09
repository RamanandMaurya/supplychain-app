import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  colorConstant,
  fontConstant,
  baseUrl,
  imageConstant,
} from '../../utils/constant';
import Geolocation from '@react-native-community/geolocation';
import Button from '../../custom/Button';
import {width} from '../../dimension/dimension';
import axios from 'axios';
import moment from 'moment';
import {actions} from '../../redux/actions/actions';
import {useSelector, useDispatch} from 'react-redux';
export default function Transfer({props, route, navigation}) {
  const token = useSelector(state => state.reducer.userToken);
  const dataScaned = useSelector(state => state.reducer.dataScaned);
  const adddata = useSelector(state => state.reducer.addDataForTransfer);
  const dispatch = useDispatch();
  const [location, setLocation] = useState({lat: null, lng: null});
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {}, [token, dataScaned]);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const geoOptions = {
      enableHighAccuracy: false,
      timeOut: 20000, // 20 seconds
      // maximumAge: 1000 // 1 second
    };

    setReady(false);
    setError(null);

    Geolocation.getCurrentPosition(geoSuccess, geoFailure, geoOptions);

    return () => {
      // Cleanup or clear any subscriptions or timers if needed
    };
  }, [reload]);

  const geoSuccess = position => {
    console.log(position.coords.latitude);
    setLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
    setReady(true);
  };

  const geoFailure = err => {
    setError(err.message);
  };
  const handleLocation = () => {
    if (reload) {
      setReload(false);
    }
    if (!reload) {
      setReload(true);
    }
  };
  const transferItems = () => {
    if (location.lat === null && location.lng === null) {
      Alert.alert('', 'Please turn on your location', [
        {
          text: 'OK',
          onPress: () => handleLocation(),
        },
      ]);
    }
    if (ready) {
      navigation.navigate('TransferDelivery', {
        lat: location.lat,
        log: location.lng,
      });
    }
  };
  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.rowContainerHeder}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <Image source={imageConstant.cancel} style={styles.backImg} />
        </TouchableOpacity>
        <View style={styles.HeaderCon}>
          <View style={styles.columView}>
            <Text style={styles.titleText}>Transfer Items Details</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.subTitleText}>
                {adddata.length} {adddata.length > 1 ? 'items' : 'item'}
              </Text>
              <Image source={imageConstant.dot} style={styles.imgDot} />
              <Text style={styles.subTitleText}>1 hour ago</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={[
                styles.text,
                {
                  color: colorConstant.green,
                  textTransform: 'uppercase',
                },
              ]}>
              Open
            </Text>
            <Image
              source={imageConstant.truckFast}
              style={[
                styles.truckImg,
                {
                  tintColor: colorConstant.green,
                },
              ]}
            />
          </View>
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            progressBackgroundColor={'#ffffff'}
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#A94545']}
          />
        }>
        {/* map */}
        <View>
          <View style={[styles.rowContainer, {marginTop: width / 15}]}>
            <View style={styles.columView1}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={styles.text1}>
                  Scan {adddata.length > 1 ? 'items' : 'item'}{' '}
                </Text>
                <Image
                  style={[styles.imgDot, {marginTop: 3}]}
                  source={imageConstant.dot}
                />
                <Text style={styles.text2}>{adddata.length}</Text>
              </View>
              <Text style={styles.blueText}>
                Order auto move to In Stock after all items are scanned
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('TransferScan')}
              style={{
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Image source={imageConstant.scan} style={styles.locationImg} />
              <Text
                style={[
                  styles.openText,
                  {color: colorConstant.button, marginTop: width / 80},
                ]}>
                SCAN
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.line}></View>
        </View>
        {adddata.map((item, key) => {
          return (
            <View key={key}>
              <View style={[styles.rowContainer, {marginTop: width / 20}]}>
                <View style={[styles.columView, {width: width / 1.6}]}>
                  <Text style={styles.subTitleText2}>QR #{item}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={[
                        styles.subTitleText,
                        {
                          color: colorConstant.green,
                          textTransform: 'capitalize',
                        },
                      ]}>
                      Open
                    </Text>
                    <Image source={imageConstant.dot} style={styles.imgDot} />
                    <Text style={styles.subTitleText}>1 hour ago</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      alignItems: 'center',
                      marginRight: 20,
                    }}>
                    <Image
                      source={imageConstant.success}
                      style={styles.viewImg}
                    />
                    <Text style={styles.scanText}>SCANNED</Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    // onPress={() =>
                    //   navigation.navigate('ItemDetails')
                    // }
                    style={{
                      alignItems: 'center',
                    }}>
                    <Image source={imageConstant.view} style={styles.viewImg} />
                    <Text
                      style={[
                        styles.openText,
                        {
                          color: colorConstant.lightBlackText,
                          marginTop: 0,
                        },
                      ]}>
                      VIEW
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.line}></View>
            </View>
          );
        })}
      </ScrollView>
      <Button
        title={'Transfer Items'}
        position={'absolute'}
        bottom={width / 20}
        onButtonPress={transferItems}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colorConstant.white,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    width: width / 1.1,
    marginTop: width / 30,
  },
  rowContainerHeder: {
    flexDirection: 'row',
    width: width / 1.1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: width / 30,
  },
  HeaderCon: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  backImg: {
    resizeMode: 'contain',
    height: 48,
    width: 48,
  },
  truckImg: {
    resizeMode: 'contain',
    height: 24,
    width: 24,
  },
  columView: {
    width: width / 1.9,
  },
  columView1: {
    width: width / 1.3,
  },
  openText: {
    fontSize: 12,
    fontFamily: fontConstant.semibold,
    lineHeight: 21,
  },
  titleText: {
    fontSize: 14,
    fontFamily: fontConstant.medium,
    color: colorConstant.blackText,
    lineHeight: 21,
  },
  subTitleText: {
    fontSize: 12,
    fontFamily: fontConstant.regular,
    color: colorConstant.lightBlackText,
    lineHeight: 21,
    marginTop: width / 80,
  },
  subTitleText1: {
    fontSize: 14,
    fontFamily: fontConstant.semibold,
    color: colorConstant.blackText,
    lineHeight: 21,
    marginTop: width / 80,
  },
  subTitleText2: {
    fontSize: 14,
    fontFamily: fontConstant.regular,
    color: colorConstant.blackText,
    lineHeight: 21,
  },
  imgDot: {
    resizeMode: 'contain',
    height: 3,
    width: 3,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 8,
  },
  locationImg: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    tintColor: colorConstant.button,
  },
  line: {
    height: 0.5,
    width: width / 1.1,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: width / 20,
    borderColor: colorConstant.line,
    // backgroundColor: 'red',
  },
  text1: {
    fontFamily: fontConstant.semibold,
    fontSize: 12,
    lineHeight: 21,
    color: colorConstant.lightBlackText,
  },
  text2: {
    fontFamily: fontConstant.semibold,
    fontSize: 12,
    lineHeight: 21,
    color: colorConstant.blackText,
  },
  blueText: {
    fontFamily: fontConstant.regular,
    fontSize: 10,
    lineHeight: 21,
    color: colorConstant.blue,
  },
  viewImg: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginBottom: 3,
  },
  scanText: {
    fontFamily: fontConstant.semibold,
    color: colorConstant.green,
    lineHeight: 15,
    fontSize: 10,
    marginTop: 5,
  },
  text: {
    fontSize: 12,
    fontFamily: fontConstant.semibold,
    lineHeight: 21,
    paddingRight: 6,
  },
});
