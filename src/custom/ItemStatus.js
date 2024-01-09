import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {width} from '../dimension/dimension';
import {useSelector} from 'react-redux';
import {imageConstant, colorConstant, fontConstant} from '../utils/constant';
export default function ItemStatus(props) {
  const dashboardData = useSelector(state => state.reducer.dashboardData);
  const userInfo = useSelector(state => state.reducer.userInfo);
  const roleData = userInfo?.userInfo?.role;
  const countData = dashboardData?.Count;
  console.log('@@@@-----', countData);
  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
      }}>
      {roleData === 'retailer'
        ? countData &&
          countData
            .filter((items, key) => key === 0 || key === 1)
            .map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    marginTop: width / 20,
                    marginLeft: width / 25,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.mapDataView}
                    onPress={
                      item.order_status === 'open'
                        ? props.OpenNavigation
                        : item.order_status === 'in stock'
                        ? props.StockNavigation
                        : item.order_status === 'in transfer'
                        ? props.TransferNavigation
                        : item.order_status === 'sold out'
                        ? props.SoldoutNavigation
                        : props.AllOrderNavigation
                    }>
                    <ImageBackground
                      source={
                        item.order_status === 'open'
                          ? imageConstant.truckFast
                          : item.order_status === 'in stock'
                          ? imageConstant.inStock
                          : item.order_status === 'in transfer'
                          ? imageConstant.truckFast
                          : item.order_status === 'sold out'
                          ? imageConstant.shopBag
                          : imageConstant.truckFast
                      }
                      resizeMode="contain">
                      <View style={styles.rowContainer}>
                        <Text
                          style={[
                            styles.titleText,
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
                                  : colorConstant.black,
                            },
                          ]}>
                          {item.order_status}
                        </Text>
                        <Image
                          source={
                            item.order_status === 'open'
                              ? imageConstant.truck
                              : item.order_status === 'in stock'
                              ? imageConstant.shop
                              : item.order_status === 'in transfer'
                              ? imageConstant.truck
                              : item.order_status === 'sold out'
                              ? imageConstant.shoppingBag
                              : imageConstant.truck
                          }
                          style={styles.img}
                        />
                      </View>
                      <Text style={styles.countText}>{item.count}</Text>
                      <Text
                        style={[styles.subTitleText, {marginTop: width / 30}]}>
                        Deliveries
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              );
            })
        : countData &&
          countData.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  marginTop: width / 20,
                  marginLeft: width / 25,
                }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.mapDataView}
                  onPress={
                    item.order_status === 'open'
                      ? props.OpenNavigation
                      : item.order_status === 'in stock'
                      ? props.StockNavigation
                      : item.order_status === 'in transfer'
                      ? props.TransferNavigation
                      : item.order_status === 'sold out'
                      ? props.SoldoutNavigation
                      : props.AllOrderNavigation
                  }>
                  <ImageBackground
                    source={
                      item.order_status === 'open'
                        ? imageConstant.truckFast
                        : item.order_status === 'in stock'
                        ? imageConstant.inStock
                        : item.order_status === 'in transfer'
                        ? imageConstant.truckFast
                        : item.order_status === 'sold out'
                        ? imageConstant.shopBag
                        : imageConstant.truckFast
                    }
                    resizeMode="contain">
                    <View style={styles.rowContainer}>
                      <Text
                        style={[
                          styles.titleText,
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
                                : colorConstant.black,
                          },
                        ]}>
                        {item.order_status}
                      </Text>
                      <Image
                        source={
                          item.order_status === 'open'
                            ? imageConstant.truck
                            : item.order_status === 'in stock'
                            ? imageConstant.shop
                            : item.order_status === 'in transfer'
                            ? imageConstant.truck
                            : item.order_status === 'sold out'
                            ? imageConstant.shoppingBag
                            : imageConstant.truck
                        }
                        style={styles.img}
                      />
                    </View>
                    <Text style={styles.countText}>{item.count}</Text>
                    <Text
                      style={[styles.subTitleText, {marginTop: width / 30}]}>
                      Deliveries
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            );
          })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 14,
    fontFamily: fontConstant.medium,
    color: colorConstant.blackText,
    lineHeight: 21,
    textTransform: 'uppercase',
  },
  mapDataView: {
    backgroundColor: 'white',
    height: 'auto',
    padding: width / 40,
    width: width / 2.3,
    // width:'30%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: width / 40,
    width: width / 2.3,
    justifyContent: 'space-between',
  },
  img: {
    resizeMode: 'contain',
    height: 24,
    width: 24,
  },
  countText: {
    fontSize: 16,
    fontFamily: fontConstant.bold,
    lineHeight: 21,
    color: colorConstant.black,
  },
  recentText: {
    fontSize: 20,
    fontFamily: fontConstant.semibold,
    marginLeft: width / 30,
    color: colorConstant.black,
  },
  subText: {
    fontFamily: fontConstant.regular,
    fontSize: 12,
    color: colorConstant.gray,
    marginLeft: width / 30,
    marginTop: width / 40,
  },
  mainContainer: {
    width: width / 1.05,
    alignSelf: 'center',
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: width / 30,
    padding: width / 80,
  },
  text: {
    fontSize: 12,
    fontFamily: fontConstant.semibold,
    lineHeight: 21,
    width: '30%',
    // backgroundColor: 'green',
    textAlign: 'right',
  },
  line: {
    height: 0.5,
    width: width / 1.1,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: width / 40,
    borderColor: colorConstant.line,
  },
  scannerImg: {
    resizeMode: 'contain',
    position: 'absolute',
    bottom: width / 5,
    width: 165,
    height: 56,
    alignSelf: 'center',
  },
  imgDot: {
    resizeMode: 'contain',
    height: 2,
    width: 2,
    marginLeft: 5,
    marginRight: 5,
  },
  subTitleText: {
    fontSize: 12,
    fontFamily: fontConstant.regular,
    color: colorConstant.lightBlackText,
    lineHeight: 21,
  },
});
