import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React from 'react';
import {useEffect, useState} from 'react';
import {
  colorConstant,
  baseUrl,
  imageConstant,
  fontConstant,
} from '../utils/constant';
import {width, height} from '../dimension/dimension';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {actions} from '../redux/actions/actions';
export default function Orders({props, navigation}) {
  const token = useSelector(state => state.reducer.userToken);
  const [allorders, setAllOrders] = useState([]);
  console.log('&&&&&&allorders', allorders);
  const dispatch = useDispatch();
  const allOrders = async () => {
    let url = `${baseUrl}/api/public/user/user-count/all`;
    const AuthStr = 'Bearer '.concat(token);
    axios
      .get(url, {
        headers: {
          Authorization: AuthStr,
        },
      })
      .then(response => {
        console.log('@@@@@@@@orderRes', response.data);
        setAllOrders(response.data);
      })
      .catch(error => {
        console.log('error', error);
        if (error) {
          dispatch(actions.setUserToken(null));
          dispatch(actions.setLoginStatus(null));
          dispatch(actions.setUserInfo(null));
        }
      });
  };

  useEffect(() => {
    allOrders();
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return allorders ? (
    <FlatList
      refreshControl={
        <RefreshControl
          progressBackgroundColor={'#FBF6F6'}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      data={allorders}
      renderItem={({item}) => {
        const createdAgo = moment(item.created_at).fromNow();
        return (
          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.mainContainer}
              onPress={() =>
                navigation.navigation.navigate('RefrenceDetails', {
                  orderID: item.order_no,
                  orderCount: item.count,
                  orderTime: createdAgo,
                  orderStatus: item.order_status,
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
                      item.order_status === 'open'
                        ? colorConstant.green
                        : item.order_status === 'in stock'
                        ? colorConstant.orange
                        : item.order_status === 'in transfer'
                        ? colorConstant.blue
                        : item.order_status === 'sold out'
                        ? colorConstant.red
                        : colorConstant.black,
                    textTransform: 'uppercase',
                  },
                ]}>
                {item.order_status}
              </Text>
              <Image
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
                style={[
                  styles.img,
                  {
                    tintColor:
                      item.order_status === 'open'
                        ? colorConstant.green
                        : item.order_status === 'in stock'
                        ? colorConstant.orange
                        : item.order_status === 'in transfer'
                        ? colorConstant.blue
                        : item.order_status === 'sold out'
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
      }}
    />
  ) : (
    <View style={styles.activityIndicator}>
      <ActivityIndicator size="large" color="#A94545" />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: width / 1.05,
    alignSelf: 'center',
    //backgroundColor: 'red',
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
    marginTop: 3,
  },
  activityIndicator: {
    marginTop: height / 3,
  },
});
