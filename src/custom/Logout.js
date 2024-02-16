import React, {useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {actions} from '../redux/actions/actions';
import axios from 'axios';
import {baseUrl} from '../utils/constant';
import {width, height} from '../dimension/dimension';
export default function Logout(navigation) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.reducer.userToken);
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
    dispatch(actions.setAllUsers(null));
    dispatch(actions.setRemoveTransfer());
  };
  useEffect(() => {
    logOut();
  }, [token]);
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
        }
      })
      .catch(error => {
        console.log('error-new-----', error?.response?.data?.error);
        logOutRemoveData();
        // if (error?.response?.data?.error === 'Token is expired') {
        //   logOutRemoveData();
        // }
      });
  };
  return (
    <>
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="#A94545" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: height / 2.2,
  },
});
