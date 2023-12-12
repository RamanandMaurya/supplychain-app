import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useState, useEffect} from 'react';
import {colorConstant, imageConstant, fontConstant} from '../utils/constant';
import {useSelector} from 'react-redux';
import {width} from '../dimension/dimension';
import moment from 'moment';

export default function RecentOrders({navigation}) {
  const dashboardData = useSelector(state => state.reducer.dashboardData);
  const recentOreder = dashboardData?.Recent;
  return recentOreder
    ? recentOreder.map((item, key) => {
        const createdAgo = moment(item.created_at).fromNow();
        return (
          <View key={key}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.mainContainer}
              onPress={() =>
                navigation.navigation.navigate('RefrenceDetails', {
                  orderID: item.order_no,
                  orderCount: item.count,
                  orderTime: createdAgo,
                  orderStatus: item.status,
                })
              }>
              <View style={styles.columView1}>
                <Text style={styles.titleText}>#{item.order_no}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.subTitleText}>
                    {item.count} {item.count > 1 ? 'items' : 'item'}
                  </Text>
                  <Image source={imageConstant.dot} style={styles.imgDot} />
                  <Text style={styles.subTitleText}> {createdAgo}</Text>
                </View>
              </View>

              <Text
                style={[
                  styles.text,
                  {
                    color:
                      item.status === 'open'
                        ? colorConstant.green
                        : item.status === 'in stock'
                        ? colorConstant.orange
                        : item.status === 'in transfer'
                        ? colorConstant.blue
                        : item.status === 'sold out'
                        ? colorConstant.red
                        : colorConstant.black,
                    textTransform: 'uppercase',
                  },
                ]}>
                {item.status}
              </Text>
              <Image
                source={
                  item.status === 'open'
                    ? imageConstant.truckFast
                    : item.status === 'in stock'
                    ? imageConstant.inStock
                    : item.status === 'in transfer'
                    ? imageConstant.truckFast
                    : item.status === 'sold out'
                    ? imageConstant.shopBag
                    : imageConstant.truckFast
                }
                style={[
                  styles.img,
                  {
                    tintColor:
                      item.status === 'open'
                        ? colorConstant.green
                        : item.status === 'in stock'
                        ? colorConstant.orange
                        : item.status === 'in transfer'
                        ? colorConstant.blue
                        : item.status === 'sold out'
                        ? colorConstant.red
                        : colorConstant.black,

                    marginRight: width / 30,
                  },
                ]}
              />
            </TouchableOpacity>
            <View style={styles.line}></View>
          </View>
        );
      })
    : null;
}

const styles = StyleSheet.create({
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
    width: width / 1.1,
    borderBottomWidth: 1,
    alignSelf: 'center',
    marginTop: width / 40,
    borderColor: colorConstant.line,
  },
  columView1: {
    width: width / 2,
    // backgroundColor: 'pink',
  },
  img: {
    resizeMode: 'contain',
    height: 24,
    width: 24,
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
  },
  imgDot: {
    resizeMode: 'contain',
    height: 3,
    width: 3,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 4,
  },
});
