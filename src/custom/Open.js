import {
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React from 'react';
import {
  colorConstant,
  baseUrl,
  imageConstant,
  fontConstant,
} from '../utils/constant';
import {width, height} from '../dimension/dimension';
import axios from 'axios';
import {useEffect, useState} from 'react';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import {actions} from '../redux/actions/actions';
export default function Open({navigation}) {
  const token = useSelector(state => state.reducer.userToken);
  const openItems = useSelector(state => state.reducer.openItems);
  const dataScaned = useSelector(state => state.reducer.dataScaned);
  const [status, setStatus] = useState();
  const dispatch = useDispatch();
  const openOrderStatusinfo = async () => {
    let url = `${baseUrl}/api/public/user/user-count/open`;
    const AuthStr = 'Bearer '.concat(token);
    axios
      .get(url, {
        headers: {
          Authorization: AuthStr,
        },
      })
      .then(response => {
        setStatus(response?.data);
        dispatch(actions.setOpenItems(response?.data));
      })
      .catch(error => {
        console.log('error--', error.response.data.error);
        if (error.response.data.error === 'Token is expired') {
          dispatch(actions.setUserToken(null));
          dispatch(actions.setLoginStatus(null));
          dispatch(actions.setUserInfo(null));
        }
      });
  };

  useEffect(() => {
    openOrderStatusinfo();
  }, [token, dataScaned]);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      openOrderStatusinfo();
    }, 2000);
  }, []);
  return status ? (
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
      data={status}
      renderItem={({item}) => {
        const createdAgo = moment(item.created_at).fromNow();
        return (
          <View>
            <View style={styles.mainContainer}>
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
                  <Text style={styles.subTitleText}>{createdAgo}</Text>
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigation.navigate('Scanner', {
                    orderID: item.order_no,
                  })
                }
                style={styles.columnView}>
                <Image source={imageConstant.scan} style={styles.img} />
                <Text style={styles.text1}>SCAN</Text>
              </TouchableOpacity>
              <View style={styles.columnView1}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigation.navigate('RefrenceDetails', {
                      orderID: item.order_no,
                      orderCount: item.count,
                      orderTime: createdAgo,
                      orderStatus: item.order_status,
                    })
                  }>
                  <Image source={imageConstant.view} style={styles.img} />
                  <Text
                    style={[
                      styles.text1,
                      {color: colorConstant.lightBlackText},
                    ]}>
                    VIEW
                  </Text>
                </TouchableOpacity>
              </View>
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
    width: width / 1.5,
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
    width: width / 10,
    // backgroundColor: 'green',
    justifyContent: 'center',
  },
  columnView1: {
    flexDirection: 'column',
    alignItems: 'center',
    width: width / 10,
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
