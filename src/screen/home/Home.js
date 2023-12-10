import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import React, {useEffect} from 'react';
import axios from 'axios';
import {
  colorConstant,
  baseUrl,
  imageConstant,
  fontConstant,
} from '../../utils/constant';
import {useSelector, useDispatch} from 'react-redux';
import {actions} from '../../redux/actions/actions';
import {width, height} from '../../dimension/dimension';
import RecentOrders from '../../custom/RecentOrder';
import ItemStatus from '../../custom/ItemStatus';

export default function Home(props) {
  const token = useSelector(state => state.reducer.userToken);
  const userProfile = useSelector(state => state.reducer.userProfile);
  const dataScaned = useSelector(state => state.reducer.dataScaned);
  const dashboardData = useSelector(state => state.reducer.dashboardData);
  const dispatch = useDispatch();
  const homepageApi = async () => {
    let url = `${baseUrl}/api/public/user/order-count`;
    const AuthStr = 'Bearer '.concat(token);
    axios
      .get(url, {
        headers: {
          Authorization: AuthStr,
        },
      })
      .then(response => {
        dispatch(actions.setDashboardData(response.data));
      })
      .catch(error => {
        console.log(error);
        if (error.response.data.error === 'Token is expired') {
          dispatch(actions.setUserToken(null));
          dispatch(actions.setLoginStatus(null));
          dispatch(actions.setUserInfo(null));
        }
      });
  };

  useEffect(() => {
    homepageApi();
  }, [token, userProfile, dataScaned]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.mainView}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: colorConstant.white,
            width: width / 1.19,
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
          }}
          onPress={() => props.navigation.navigate('Profile')}>
          <Image source={imageConstant.profile} style={styles.profileImg} />
          <View style={styles.columView}>
            <Text style={styles.titleText}>{userProfile.name}</Text>
            <Text style={(styles.subTitleText, styles.textTransformText)}>
              {userProfile.role}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          //onPress={() => Alert.alert('Notification', 'Empty')}
          //onPress={() => props.navigation.navigate('Location')}
        >
          <ImageBackground
            source={imageConstant.notification}
            style={styles.notification}>
            <Image source={imageConstant.notificationDot} style={styles.dot} />
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{height: height}}
        refreshControl={
          <RefreshControl
            progressBackgroundColor={'#FBF6F6'}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <ItemStatus
          openOrders={dashboardData.Count}
          OpenNavigation={() =>
            props.navigation.navigate('Deliveries', {
              Open: 'Open',
            })
          }
          StockNavigation={() =>
            props.navigation.navigate('Deliveries', {
              Stock: 'Stock',
            })
          }
          TransferNavigation={() =>
            props.navigation.navigate('Deliveries', {
              Transfer: 'Transfer',
            })
          }
          SoldoutNavigation={() =>
            props.navigation.navigate('Deliveries', {
              Soldout: 'Soldout',
            })
          }
          AllOrderNavigation={() =>
            props.navigation.navigate('Deliveries', {
              Allorder: 'Allorder',
            })
          }
        />
        <Text style={styles.recentText}>Recent Orders</Text>
        <Text style={styles.subText}>Track your order in real time</Text>
        <RecentOrders recentOrders={dashboardData.Recent} navigation={props} />
        <View style={{height: 50}}></View>
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          props.navigation.navigate('Scanner', {
            orderID: 'ORD202311201644010963963658189',
          })
        }
        style={styles.scannerButton}>
        <Image source={imageConstant.scanner} style={styles.scannerImg} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  profileImg: {
    resizeMode: 'contain',
    width: 40,
    height: 40,
    borderColor: colorConstant.themeColor,
    borderWidth: 2,
    borderRadius: 20,
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
  columView: {
    width: width / 1.5,
    marginLeft: width / 30,
  },
  columView1: {
    width: width / 2,
  },
  notification: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    // backgroundColor: 'red',
    marginRight: 16,
  },
  dot: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginLeft: width / 22,
    marginTop: -5,
  },
  mapDataView: {
    backgroundColor: 'white',
    height: 'auto',
    padding: width / 40,
    width: width / 2.3,
    alignSelf: 'center',
    borderRadius: 8,
  },
  textTransformText: {
    textTransform: 'capitalize',
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
    marginTop: 10,
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
    width: 165,
    height: 56,
  },
  scannerButton: {
    resizeMode: 'contain',
    position: 'absolute',
    bottom: width / 4.7,
    alignSelf: 'center',
  },
  imgDot: {
    resizeMode: 'contain',
    height: 2,
    width: 2,
    marginLeft: 5,
    marginRight: 5,
  },
});
