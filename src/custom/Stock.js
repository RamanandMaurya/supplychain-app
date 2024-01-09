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
import {
  colorConstant,
  baseUrl,
  imageConstant,
  fontConstant,
} from '../utils/constant';
import axios from 'axios';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {width, height} from '../dimension/dimension';
import {actions} from '../redux/actions/actions';
import {useSelector, useDispatch} from 'react-redux';
export default function Stock(props) {
  const [inStock, setInStock] = useState();
  const token = useSelector(state => state.reducer.userToken);
  const dataScaned = useSelector(state => state.reducer.dataScaned);
  const instockItems = useSelector(state => state.reducer.instockItems);
  const dispatch = useDispatch();
  const inStockStatusinfo = async () => {
    let url = `${baseUrl}/api/public/user/user-count/instock`;
    const AuthStr = 'Bearer '.concat(token);

    axios
      .get(url, {
        headers: {
          Authorization: AuthStr,
        },
      })
      .then(response => {
        setInStock(response?.data);
        dispatch(actions.setInstockItems(response?.data));
      })
      .catch(error => {
        console.log('error', error.response?.data.error);
        if (error.response.data.error === 'Token is expired') {
          dispatch(actions.setUserToken(null));
          dispatch(actions.setLoginStatus(null));
          dispatch(actions.setUserInfo(null));
          dispatch(actions.setAllUsers(null));
        }
      });
  };

  useEffect(() => {
    inStockStatusinfo();
  }, [token, dataScaned]);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      inStockStatusinfo();
      console.log('>>>>>>>>>>>>>>>>>>>>>>>', dataScaned);
    }, 2000);
  }, [dataScaned]);
  return inStock ? (
    <FlatList
      style={{marginTop: 35}}
      refreshControl={
        <RefreshControl
          progressBackgroundColor={'#ffffff'}
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#A94545']}
        />
      }
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
              {/* <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  props.navigation.navigation.navigate('TransferDelivery')
                }>
                <View style={styles.columnView}>
                  <Image source={imageConstant.truck} style={styles.img} />
                  <Text style={styles.text1}> TRANSFER</Text>
                </View>
              </TouchableOpacity> */}
            </View>
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
  activityIndicator: {
    marginTop: height / 2.3,
  },
});
