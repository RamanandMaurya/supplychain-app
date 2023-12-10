import * as types from '../index';
export const actions = {
  setUserToken: userToken => {
    return {
      type: types.USER_TOKEN,
      payload: {userToken: userToken},
    };
  },
  setLoginStatus: loginStatus => {
    return {
      type: types.LOGIN_STATUS,
      payload: {loginStatus: loginStatus},
    };
  },
  setUserInfo: userInfo => {
    return {
      type: types.USER_INFO,
      payload: {userInfo: userInfo},
    };
  },
  setUserProfile: userProfile => {
    return {
      type: types.USER_PROFILE,
      payload: {userProfile: userProfile},
    };
  },
  setUserEdit: userEdit => {
    return {
      type: types.USER_EDIT,
      payload: {userEdit: userEdit},
    };
  },
  setDataScaned: dataScaned => {
    return {
      type: types.DATA_SCANED,
      payload: {dataScaned: dataScaned},
    };
  },
  setDashboardData: dashboardData => {
    return {
      type: types.DASHBOARD_DATA,
      payload: {dashboardData: dashboardData},
    };
  },
};
