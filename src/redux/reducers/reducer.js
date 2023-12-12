import * as types from '../index';
import globalState from '../globalState';

/**
 * Reducer
 */

export default function parentFlowReducer(
  state = globalState.localStates,
  action,
) {
  switch (action.type) {
    case types.USER_TOKEN:
      return {
        ...state,
        userToken: action.payload.userToken,
      };
    case types.LOGIN_STATUS:
      return {
        ...state,
        loginStatus: action.payload.loginStatus,
      };
    case types.USER_INFO:
      return {
        ...state,
        userInfo: action.payload.userInfo,
      };
    case types.USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload.userProfile,
      };
    case types.USER_EDIT:
      return {
        ...state,
        userEdit: action.payload.userEdit,
      };
    case types.DATA_SCANED:
      return {
        ...state,
        dataScaned: action.payload.dataScaned,
      };
    case types.DASHBOARD_DATA:
      return {
        ...state,
        dashboardData: action.payload.dashboardData,
      };
    case types.OPEN_ITEMS:
      return {
        ...state,
        openItems: action.payload.openItems,
      };
    case types.INSTOCK_ITEMS:
      return {
        ...state,
        instockItems: action.payload.instockItems,
      };
    case types.ALL_ORDERS:
      return {
        ...state,
        allOrders: action.payload.allOrders,
      };

    default:
      return state;
  }
}
