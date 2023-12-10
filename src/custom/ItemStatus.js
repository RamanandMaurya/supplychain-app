import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {width} from '../dimension/dimension';
import {imageConstant, colorConstant, fontConstant} from '../utils/constant';
export default function ItemStatus(props) {
  console.log('@@@@', props.openOrders[0]?.count);
  const data = [
    {
      id: '#01',
      title: 'OPEN',
      count: props.openOrders[1]?.count,
      discription: 'Deliveries',
      image: imageConstant.truck,
      color: colorConstant.green,
      bgImage: imageConstant.truckFast,
    },
    {
      id: '#02',
      title: 'IN STOCK',
      count: props.openOrders[0]?.count,
      discription: 'Deliveries',
      image: imageConstant.shop,
      color: colorConstant.green,
      bgImage: imageConstant.inStock,
    },
    {
      id: '#03',
      title: 'IN TRANSFER',
      count: 0,
      discription: 'Deliveries',
      image: imageConstant.truck,
      color: colorConstant.green,
      bgImage: imageConstant.truckFast,
    },
    {
      id: '#04',
      title: 'SOLD OUT',
      count: 0,
      discription: 'Deliveries',
      image: imageConstant.shoppingBag,
      color: colorConstant.green,
      bgImage: imageConstant.shopBag,
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
      }}>
      {data.map((item, index) => {
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
                item.title === 'OPEN'
                  ? props.OpenNavigation
                  : item.title === 'IN STOCK'
                  ? props.StockNavigation
                  : item.title === 'IN TRANSFER'
                  ? props.TransferNavigation
                  : item.title === 'SOLD OUT'
                  ? props.SoldoutNavigation
                  : props.AllOrderNavigation
              }>
              <ImageBackground source={item.bgImage} resizeMode="contain">
                <View style={styles.rowContainer}>
                  <Text
                    style={[
                      styles.titleText,
                      {
                        color:
                          item.title === 'OPEN'
                            ? colorConstant.green
                            : item.title === 'IN STOCK'
                            ? colorConstant.orange
                            : item.title === 'IN TRANSFER'
                            ? colorConstant.blue
                            : item.title === 'SOLD OUT'
                            ? colorConstant.red
                            : colorConstant.black,
                      },
                    ]}>
                    {item.title}
                  </Text>
                  <Image source={item.image} style={styles.img} />
                </View>
                <Text style={styles.countText}>{item.count}</Text>
                <Text style={[styles.subTitleText, {marginTop: width / 30}]}>
                  {item.discription}
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
