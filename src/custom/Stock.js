import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  colorConstant,
  baseUrl,
  imageConstant,
  fontConstant,
} from '../utils/constant';
import axios from 'axios';
import moment from 'moment';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {width} from '../dimension/dimension';

export default function Stock(props, navigation) {
  const [inStock, setInStock] = useState('');
  console.log('@@@@@!~~~~~~', inStock);

  const inStockStatusinfo = async () => {
    let url = `${baseUrl}/api/public/user/user-count/instock`;
    const token = await AsyncStorage.getItem('TOKEN');
    const AuthStr = 'Bearer '.concat(token);

    axios
      .get(url, {
        headers: {
          Authorization: AuthStr,
        },
      })
      .then(response => {
        console.log('@@@@@@@@instockRes', response.data);
        setInStock(response.data);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    inStockStatusinfo();
  }, []);

  return (
    <FlatList
      data={inStock}
      renderItem={({item}) => {
        const createdAgo = moment(item.created_at).fromNow();
        return (
          <View>
            <View style={styles.mainContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  props.navigation.navigation.navigate('RefrenceDetails', {
                    orderID: item.order_no,
                    orderCount: item.count,
                    orderTime: createdAgo,
                    orderStatus: item.order_status,
                  })
                }
                style={styles.columView1}>
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
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  props.navigation.navigation.navigate('TransferDelivery')
                }>
                <View style={styles.columnView}>
                  <Image source={imageConstant.truck} style={styles.img} />
                  <Text style={styles.text1}> TRANSFER</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.line}></View>
          </View>
        );
      }}
    />
  );
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
    height: 0.5,
    width: width / 1.1,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: width / 40,
    borderColor: colorConstant.line,
  },
  columView1: {
    width: width / 1.4,
  },
  img: {
    resizeMode: 'contain',
    height: 24,
    width: 24,
    // marginRight: width / 30,
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
  columnView: {
    flexDirection: 'column',
    alignItems: 'center',
    width: width / 6,
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
  text1: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 10,
    lineHeight: 12,
    fontFamily: fontConstant.semibold,
    color: colorConstant.button,
    marginTop: width / 80,
    // marginRight: 20,
  },
  imgDot: {
    resizeMode: 'contain',
    height: 3,
    width: 3,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 3,
  },
});
