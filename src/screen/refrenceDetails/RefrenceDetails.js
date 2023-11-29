import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  colorConstant,
  fontConstant,
  baseUrl,
  imageConstant,
} from '../../utils/constant';
import {width} from '../../dimension/dimension';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
export default function RefrenceDetails({props, route, navigation}) {
  const {orderID, orderCount, orderTime, orderStatus} = route.params || {};

  const [qrStatusbyno, setQrStatusByNo] = useState([]);
  const [addressDetails, setAddressDetails] = useState('');

  console.log('!!!!!orderNo!@@@@@', orderID);
  console.log('@@@addressDetails', addressDetails);

  const allQrStatus = async () => {
    let url = `${baseUrl}/api/public/user/qr-order_no`;
    const token = await AsyncStorage.getItem('TOKEN');
    const AuthStr = 'Bearer '.concat(token);
    console.log('!!!!!token', token);
    let body = {
      order_no: orderID,
    };
    axios
      .post(url, body, {
        headers: {
          Authorization: AuthStr,
        },
      })
      .then(response => {
        console.log('@@qr', response.data.ProductData);
        setQrStatusByNo(response.data.ProductData);
        setAddressDetails(response.data.UserDetails);
      })
      .catch(error => {
        console.log('apierror', error);
      });
  };

  useEffect(() => {
    allQrStatus();
  }, []);
  const openItemCount = qrStatusbyno.filter(
    item => item.order_status === 'open',
  ).length;
  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.rowContainerHeder}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <Image source={imageConstant.cancel} style={styles.backImg} />
        </TouchableOpacity>
        <View style={styles.HeaderCon}>
          <View
            style={
              orderStatus === 'in transfer'
                ? {width: width / 2.2}
                : styles.columView
            }>
            <Text style={styles.titleText}>#{orderID}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.subTitleText}>
                {orderStatus === 'in stock' ? orderCount : qrStatusbyno.length}{' '}
                {orderCount || qrStatusbyno.length > 1 ? 'items' : 'item'}
              </Text>
              <Image source={imageConstant.dot} style={styles.imgDot} />
              <Text style={styles.subTitleText}>{orderTime}</Text>
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
                  color:
                    orderStatus === 'open'
                      ? colorConstant.green
                      : orderStatus === 'in stock'
                      ? colorConstant.orange
                      : orderStatus === 'in transfer'
                      ? colorConstant.blue
                      : orderStatus === 'sold out'
                      ? colorConstant.red
                      : colorConstant.black,
                  textTransform: 'uppercase',
                },
              ]}>
              {orderStatus}
            </Text>
            <Image
              source={
                orderStatus === 'open'
                  ? imageConstant.truckFast
                  : orderStatus === 'in stock'
                  ? imageConstant.inStock
                  : orderStatus === 'in transfer'
                  ? imageConstant.truckFast
                  : orderStatus === 'sold out'
                  ? imageConstant.shopBag
                  : imageConstant.truckFast
              }
              style={[
                styles.truckImg,
                {
                  tintColor:
                    orderStatus === 'open'
                      ? colorConstant.green
                      : orderStatus === 'in stock'
                      ? colorConstant.orange
                      : orderStatus === 'in transfer'
                      ? colorConstant.blue
                      : orderStatus === 'sold out'
                      ? colorConstant.red
                      : colorConstant.black,
                },
              ]}
            />
          </View>
        </View>
      </View>
      <ScrollView>
        {/* First View */}
        <View style={[styles.rowContainer, {marginTop: width / 20}]}>
          <View style={styles.columView1}>
            <Text style={styles.subTitleText}>Shipping Address</Text>
            <Text style={styles.subTitleText1}>
              {addressDetails.name}, {addressDetails.role}
            </Text>

            <Text style={styles.subTitleText2}>
              {addressDetails.shipping_address}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Image source={imageConstant.location} style={styles.locationImg} />
            <Text
              style={[
                styles.openText,
                {color: colorConstant.button, marginTop: width / 80},
              ]}>
              TRACK
            </Text>
          </View>
        </View>

        <View style={styles.line}></View>

        {/* second view */}

        {orderStatus != 'in stock' ? (
          <View>
            <View style={[styles.rowContainer, {marginTop: width / 20}]}>
              <View style={styles.columView1}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.text1}>
                    Scan {orderCount > 1 ? 'items' : 'item'}{' '}
                  </Text>
                  <Image
                    style={[styles.imgDot, {marginTop: 3}]}
                    source={imageConstant.dot}
                  />
                  <Text style={styles.text2}>
                    Left {openItemCount} out of {qrStatusbyno.length}
                  </Text>
                </View>
                <Text style={styles.blueText}>
                  Order auto move to In Stock after all items are scanned
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate('Scanner', {
                    orderID: orderID,
                  })
                }
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
        ) : null}

        {/* map */}
        {orderStatus === 'in stock'
          ? qrStatusbyno
              .filter(item => item.order_status === 'in stock')
              .map((item, key) => {
                const createdAgo = moment(item.times).fromNow();
                return (
                  <View key={key}>
                    <View
                      style={[styles.rowContainer, {marginTop: width / 20}]}>
                      <View style={[styles.columView, {width: width / 1.6}]}>
                        <Text style={styles.subTitleText2}>#{item.qr_id}</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={[
                              styles.subTitleText,
                              {
                                color:
                                  item.order_status === 'open'
                                    ? colorConstant.green
                                    : item.order_status === 'in stock'
                                    ? colorConstant.orange
                                    : item.order_status === 'in transfer'
                                    ? colorConstant.blue
                                    : item.order_status === 'sold out'
                                    ? colorConstant.red
                                    : colorConstant.red,
                                textTransform: 'capitalize',
                              },
                            ]}>
                            {item.order_status}
                          </Text>
                          <Image
                            source={imageConstant.dot}
                            style={styles.imgDot}
                          />
                          <Text style={styles.subTitleText}>{createdAgo}</Text>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        {item.order_status === 'in stock' ? (
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
                        ) : null}
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() =>
                            navigation.navigate('ItemDetails', {
                              orderID: orderID,
                              Qrid: item.qr_id,
                              orderStatus: item.order_status,
                            })
                          }
                          style={{
                            alignItems: 'center',
                          }}>
                          <Image
                            source={imageConstant.view}
                            style={styles.viewImg}
                          />
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
              })
          : qrStatusbyno
              .sort(a => {
                if (a.order_status === 'open') {
                  return -1;
                } else {
                  return 0;
                }
              })
              .map((item, key) => {
                const createdAgo = moment(item.times).fromNow();
                return (
                  <View key={key}>
                    <View
                      style={[styles.rowContainer, {marginTop: width / 20}]}>
                      <View style={[styles.columView, {width: width / 1.6}]}>
                        <Text style={styles.subTitleText2}>#{item.qr_id}</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={[
                              styles.subTitleText,
                              {
                                color:
                                  item.order_status === 'open'
                                    ? colorConstant.green
                                    : item.order_status === 'in stock'
                                    ? colorConstant.orange
                                    : item.order_status === 'in transfer'
                                    ? colorConstant.blue
                                    : item.order_status === 'sold out'
                                    ? colorConstant.red
                                    : colorConstant.red,
                                textTransform: 'capitalize',
                              },
                            ]}>
                            {item.order_status}
                          </Text>
                          <Image
                            source={imageConstant.dot}
                            style={styles.imgDot}
                          />
                          <Text style={styles.subTitleText}>{createdAgo}</Text>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        {item.order_status === 'in stock' ? (
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
                        ) : null}
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() =>
                            navigation.navigate('ItemDetails', {
                              orderID: orderID,
                              Qrid: item.qr_id,
                              orderStatus: item.order_status,
                            })
                          }
                          style={{
                            alignItems: 'center',
                          }}>
                          <Image
                            source={imageConstant.view}
                            style={styles.viewImg}
                          />
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
