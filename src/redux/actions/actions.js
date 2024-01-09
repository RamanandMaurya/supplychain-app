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
  setOpenItems: openItems => {
    return {
      type: types.OPEN_ITEMS,
      payload: {openItems: openItems},
    };
  },
  setInstockItems: instockItems => {
    return {
      type: types.INSTOCK_ITEMS,
      payload: {instockItems: instockItems},
    };
  },
  setAllOrders: allOrders => {
    return {
      type: types.ALL_ORDERS,
      payload: {allOrders: allOrders},
    };
  },
  setAddDataForTransfer: addDataForTransfer => {
    return {
      type: types.ADD_DATA_FOR_TRANSFER,
      payload: {addDataForTransfer: addDataForTransfer},
    };
  },
  setRemoveTransfer: removeTransfer => {
    return {
      type: types.REMOVE_TRANSFER,
      payload: {addDataForTransfer: []},
    };
  },
  setAllUsers: allUsers => {
    return {
      type: types.ALL_USERS,
      payload: {allUsers: allUsers},
    };
  },
};
