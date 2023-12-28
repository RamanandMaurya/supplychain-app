import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {
  colorConstant,
  fontConstant,
  baseUrl,
  imageConstant,
} from '../../utils/constant';
import Header from '../../custom/Header';
import {width} from '../../dimension/dimension';
import {actions} from '../../redux/actions/actions';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {useEffect} from 'react';
import * as ImagePicker from 'react-native-image-picker';

export default function Profile(props) {
  const token = useSelector(state => state.reducer.userToken);
  const userProfile = useSelector(state => state.reducer.userProfile);
  const userEdit = useSelector(state => state.reducer.userEdit);
  const [selectedImage, setSelectedImage] = useState();
  const dispatch = useDispatch();
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };
  const profileinfo = async () => {
    let url = `${baseUrl}/api/public/user/profile`;
    const AuthStr = 'Bearer '.concat(token);
    console.log('@@@@@---', token);
    axios
      .get(url, {
        headers: {
          Authorization: AuthStr,
        },
      })
      .then(response => {
        const data = response.data;
        dispatch(actions.setUserProfile(data));
      })
      .catch(error => {
        console.log('error', error.response.data.error);
        if (error.response.data.error === 'Token is expired') {
          dispatch(actions.setUserToken(null));
          dispatch(actions.setLoginStatus(null));
          dispatch(actions.setUserInfo(null));
        }
      });
  };
  useEffect(() => {
    profileinfo();
  }, [userEdit]);

  //logoutapi//
  const logOutRemoveData = () => {
    dispatch(actions.setUserToken(null));
    dispatch(actions.setLoginStatus(null));
    dispatch(actions.setUserInfo(null));
    dispatch(actions.setUserProfile(null));
    dispatch(actions.setDashboardData(null));
    dispatch(actions.setOpenItems(null));
    dispatch(actions.setInstockItems(null));
    dispatch(actions.setAllOrders(null));
  };

  const logOut = async () => {
    let url = `${baseUrl}/api/public/user/logout`;
    let body = {};
    const AuthStr = 'Bearer '.concat(token);
    axios
      .post(url, body, {
        headers: {
          Authorization: AuthStr,
        },
      })
      .then(response => {
        if (response.status == 200) {
          logOutRemoveData();
          // Alert.alert('', 'Logout successfully !', [
          //   {
          //     text: 'OK',
          //     onPress: () => {}
          //   },
          // ]);
        }
      })
      .catch(error => {
        console.log('error', error.response.data.error);
        if (error.response.data.error === 'Token is expired') {
          Alert.alert('', 'Logout Faild !', [
            {
              text: 'OK',
              onPress: () => {},
            },
          ]);
        }
      });
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      profileinfo();
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header
        title={'Profile'}
        rightFlag={true}
        rightImg={imageConstant.edit}
        navigation={props.navigation}
        rightNavigation={() => props.navigation.navigate('EditProfile')}
      />

      <ScrollView
        refreshControl={
          <RefreshControl
            progressBackgroundColor={'#ffffff'}
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#A94545']}
          />
        }>
        {selectedImage ? (
          <Image source={{uri: selectedImage}} style={styles.profileImg} />
        ) : (
          // <View style={styles.profileImg} />
          <Image source={imageConstant.profile} style={styles.profileImg} />
        )}
        <TouchableOpacity activeOpacity={0.7} onPress={openImagePicker}>
          <Image
            source={imageConstant.profileEdit}
            style={styles.profileEditImg}
          />
        </TouchableOpacity>
        <Text style={styles.titleText}>{userProfile?.name}</Text>
        <Text style={styles.subText}>{userProfile?.role}</Text>

        <Text style={styles.text1}>Full Name</Text>
        <Text style={styles.text2}>{userProfile?.name}</Text>

        <Text style={styles.text1}>Business Email</Text>
        <Text style={styles.text2}>{userProfile?.email}</Text>

        <Text style={styles.text1}>Mobile Number</Text>
        <Text style={styles.text2}>{userProfile?.phone}</Text>

        <Text style={styles.text1}>Your Role</Text>
        <Text style={[styles.text2, {textTransform: 'capitalize'}]}>
          {userProfile?.role}
        </Text>

        <Text style={styles.text1}>Address</Text>
        <Text style={[styles.text2, {textTransform: 'capitalize'}]}>
          {userProfile?.address}
        </Text>

        <Text style={styles.text1}>Country</Text>
        <Text style={[styles.text2, {textTransform: 'capitalize'}]}>
          {userProfile?.country}
        </Text>

        <Text style={styles.text1}>State</Text>
        <Text style={[styles.text2, {textTransform: 'capitalize'}]}>
          {userProfile?.state}
        </Text>

        <Text style={styles.subText1}>Do you want update your password?</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.rowContainer}
          onPress={() => props.navigation.navigate('ChangePassword')}>
          <Text style={styles.text3}>Change Password</Text>
          <Image source={imageConstant.arrow} style={styles.arrowImg} />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} onPress={logOut}>
          <Text
            style={[
              styles.text3,
              {marginTop: width / 30, marginBottom: width / 30},
            ]}>
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colorConstant.white,
  },
  profileImg: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 100,
    width: 100,
    marginTop: width / 15,
    borderRadius: 50,
    borderColor: colorConstant.themeColor,
    borderWidth: 3,
  },
  textTransformText: {
    textTransform: 'capitalize',
  },
  profileEditImg: {
    resizeMode: 'contain',
    height: 36,
    width: 36,
    alignSelf: 'center',
    marginTop: -width / 10,
    marginLeft: width / 5,
  },
  titleText: {
    fontFamily: fontConstant.semibold,
    fontSize: 24,
    lineHeight: 24,
    marginTop: width / 15,
    textAlign: 'center',
    color: colorConstant.blackText,
  },
  subText: {
    color: colorConstant.lightBlackText,
    fontFamily: fontConstant.regular,
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: width / 30,
    marginBottom: width / 30,
    textTransform: 'capitalize',
  },
  text1: {
    color: colorConstant.lightBlackText,
    fontFamily: fontConstant.regular,
    fontSize: 14,
    lineHeight: 21,
    paddingLeft: width / 20,
    marginTop: width / 20,
  },
  text2: {
    fontFamily: fontConstant.semibold,
    fontSize: 16,
    lineHeight: 24,

    paddingLeft: width / 20,
    color: colorConstant.blackText,
  },
  subText1: {
    color: colorConstant.lightBlackText,
    fontFamily: fontConstant.regular,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: width / 10,
    marginBottom: width / 30,
  },
  text3: {
    fontFamily: fontConstant.semibold,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    // paddingLeft: width / 20,
    color: colorConstant.button,
  },
  rowContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  arrowImg: {
    resizeMode: 'contain',
    height: 16,
    width: 16,
    marginLeft: width / 80,
  },
});
