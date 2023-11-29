import * as types from './index';
import globalState from './globalState';

/**
 * Reducer
 */

export default function parentFlowReducer(
  state = globalState.localStates,
  action,
) {
  switch (action.type) {
    case types.LOGIN_STATUS:
      return {
        ...state,
        loginStatus: action.payload.loginStatus,
      };

    default:
      return state;
  }
}

/**
 * Actions
 */

export const actions = {
  setLoginStatus: loginStatus => {
    return {
      type: types.LOGIN_STATUS,
      payload: {loginStatus: loginStatus},
    };
  },
};
