import request, { fetchWithRefresh } from '../../utils/apiUtils';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import {
  EMAIL_CHECK__FAILURE,
  EMAIL_CHECK__REQUEST,
  EMAIL_CHECK__RESET,
  EMAIL_CHECK__SUCCESS,
  GET_USER__FAILURE,
  GET_USER__REQUEST,
  GET_USER__RESET,
  GET_USER__SUCCESS,
  LOGIN__FAILURE,
  LOGIN__REQUEST,
  LOGIN__RESET,
  LOGIN__SUCCESS,
  LOGOUT__FAILURE,
  LOGOUT__REQUEST,
  LOGOUT__RESET,
  LOGOUT__SUCCESS,
  PROFILE_UPDATE__FAILURE,
  PROFILE_UPDATE__REQUEST,
  PROFILE_UPDATE__RESET,
  PROFILE_UPDATE__SUCCESS,
  REFRESH_TOKEN__FAILURE,
  REFRESH_TOKEN__REQUEST,
  REFRESH_TOKEN__SUCCESS,
  REFRESH_TOKEN_RESET,
  REGISTER__FAILURE,
  REGISTER__REQUEST,
  REGISTER__RESET,
  REGISTER__SUCCESS,
  RESET_PASSWORD__FAILURE,
  RESET_PASSWORD__REQUEST,
  RESET_PASSWORD__RESET,
  RESET_PASSWORD__SUCCESS,
} from '../constants/account';

export interface ILoginRequestAction {
    readonly type: typeof LOGIN__REQUEST;
}

export interface ILoginSuccessAction {
    readonly type: typeof LOGIN__SUCCESS;
    readonly payload: {
        refreshToken: string;
        accessToken: string;
    };
}

export interface ILoginFailureAction {
    readonly type: typeof LOGIN__FAILURE;
}

export interface ILoginResetAction {
    readonly type: typeof LOGIN__RESET;
}

export interface IRegisterRequestAction {
    readonly type: typeof REGISTER__REQUEST;
}

export interface IRegisterSuccessAction {
    readonly type: typeof REGISTER__SUCCESS;
    readonly payload: {
        refreshToken: string;
        accessToken: string;
    };
}

export interface IRegisterFailureAction {
    readonly type: typeof REGISTER__FAILURE;
}

export interface IRegisterResetAction {
    readonly type: typeof REGISTER__RESET;
}

export interface IEmailCheckRequestAction {
    readonly type: typeof EMAIL_CHECK__REQUEST;
}

export interface IEmailCheckSuccessAction {
    readonly type: typeof EMAIL_CHECK__SUCCESS;
}

export interface IEmailCheckFailureAction {
    readonly type: typeof EMAIL_CHECK__FAILURE;
}

export interface IEmailCheckResetAction {
    readonly type: typeof EMAIL_CHECK__RESET;
}

export interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD__REQUEST;
}

export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD__SUCCESS;
    readonly payload: string;
}

export interface IResetPasswordFailureAction {
    readonly type: typeof RESET_PASSWORD__FAILURE;
}

export interface IResetPasswordResetAction {
    readonly type: typeof RESET_PASSWORD__RESET;
}

export interface IRefreshTokenRequestAction {
    readonly type: typeof REFRESH_TOKEN__REQUEST;
}

export interface IRefreshTokenSuccessAction {
    readonly type: typeof REFRESH_TOKEN__SUCCESS;
    readonly payload: {
        refreshToken: string;
        accessToken: string;
    };
}

export interface IRefreshTokenFailureAction {
    readonly type: typeof REFRESH_TOKEN__FAILURE;
}

export interface IRefreshTokenResetAction {
    readonly type: typeof REFRESH_TOKEN_RESET;
}

export interface IGetUserRequestAction {
    readonly type: typeof GET_USER__REQUEST;
}

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER__SUCCESS;
    readonly payload: {
        name: string;
        email: string;
    };
}

export interface IGetUserFailureAction {
    readonly type: typeof GET_USER__FAILURE;
}

export interface IGetUserResetAction {
    readonly type: typeof GET_USER__RESET;
}

export interface ILogoutRequestAction {
    readonly type: typeof LOGOUT__REQUEST;
}

export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT__SUCCESS;
}

export interface ILogoutFailureAction {
    readonly type: typeof LOGOUT__FAILURE;
}

export interface ILogoutResetAction {
    readonly type: typeof LOGOUT__RESET;
}

export interface IProfileUpdateRequestAction {
    readonly type: typeof PROFILE_UPDATE__REQUEST;
}

export interface IProfileUpdateSuccessAction {
    readonly type: typeof PROFILE_UPDATE__SUCCESS;
    readonly payload: {
        name: string;
        email: string;
    };
}

export interface IProfileUpdateFailureAction {
    readonly type: typeof PROFILE_UPDATE__FAILURE;
}

export interface IProfileUpdateResetAction {
    readonly type: typeof PROFILE_UPDATE__RESET;
}

export type TAccountActions =
    | ILoginRequestAction
    | ILoginSuccessAction
    | ILoginFailureAction
    | ILoginResetAction
    | IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterFailureAction
    | IRegisterResetAction
    | IEmailCheckRequestAction
    | IEmailCheckSuccessAction
    | IEmailCheckFailureAction
    | IEmailCheckResetAction
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordFailureAction
    | IResetPasswordResetAction
    | IRefreshTokenRequestAction
    | IRefreshTokenSuccessAction
    | IRefreshTokenFailureAction
    | IRefreshTokenResetAction
    | IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserFailureAction
    | IGetUserResetAction
    | ILogoutRequestAction
    | ILogoutSuccessAction
    | ILogoutFailureAction
    | ILogoutResetAction
    | IProfileUpdateRequestAction
    | IProfileUpdateSuccessAction
    | IProfileUpdateFailureAction
    | IProfileUpdateResetAction;

export function resetPasswordReset(): IResetPasswordResetAction {
  return {
    type: RESET_PASSWORD__RESET,
  };
}

export function emailCheckReset(): IEmailCheckResetAction {
  return {
    type: EMAIL_CHECK__RESET,
  };
}

export function registerReset(): IRegisterResetAction {
  return {
    type: REGISTER__RESET,
  };
}

export function refreshTokenReset(): IRefreshTokenResetAction {
  return {
    type: REFRESH_TOKEN_RESET,
  };
}

export function loginReset(): ILoginResetAction {
  return {
    type: LOGIN__RESET,
  };
}

export function getUserReset(): IGetUserResetAction {
  return {
    type: GET_USER__RESET,
  };
}

export function logoutReset(): ILogoutResetAction {
  return {
    type: LOGOUT__RESET,
  };
}

export function profileUpdateReset(): IProfileUpdateResetAction {
  return {
    type: PROFILE_UPDATE__RESET,
  };
}

export function refreshTokenRequest() {
  return function (dispatch) {
    dispatch({
      type: REFRESH_TOKEN__REQUEST,
    });
    request('/auth/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(getCookie('refreshToken')),
    })
      .then((res) => {
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken);
        dispatch({
          type: REFRESH_TOKEN__SUCCESS,
          payload: res,
        });
      })
      .catch(() => {
        dispatch({
          type: REFRESH_TOKEN__FAILURE,
        });
      });
  };
}

export function getUserRequest() {
  return async function (dispatch) {
    dispatch({
      type: GET_USER__REQUEST,
    });
    await fetchWithRefresh('/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken'),
      },
    }, refreshTokenRequest, dispatch)
      .then((res) => {
        dispatch({
          type: GET_USER__SUCCESS,
          payload: res,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_USER__FAILURE,
        });
      });
  };
}

export const profileUpdateRequest = (name, email, password) => (dispatch) => {
  dispatch({
    type: PROFILE_UPDATE__REQUEST,
  });
  fetchWithRefresh('/auth/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
    body: JSON.stringify({ name, email, password }),
  }, refreshTokenRequest, dispatch)
    .then((res) => {
      dispatch({
        type: PROFILE_UPDATE__SUCCESS,
        payload: res,
      });
    })
    .catch(() => {
      dispatch({
        type: PROFILE_UPDATE__FAILURE,
      });
    });
};

export function logoutRequest() {
  return function (dispatch) {
    dispatch({
      type: LOGOUT__REQUEST,
    });
    request('/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: getCookie('refreshToken') }),
    })
      .then(() => {
        deleteCookie('refreshToken');
        deleteCookie('accessToken');
        dispatch({
          type: LOGOUT__SUCCESS,
        });
      })
      .catch(() => {
        dispatch({
          type: LOGOUT__FAILURE,
        });
      });
  };
}

export function resetPasswordRequest(password, token) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD__REQUEST,
    });
    fetchWithRefresh('/password-reset/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, token }),
    }, refreshTokenRequest, dispatch)
      .then(() => {
        dispatch({
          type: RESET_PASSWORD__SUCCESS,
          payload: password,
        });
      })
      .catch(() => {
        dispatch({
          type: RESET_PASSWORD__FAILURE,
        });
      });
  };
}

export function loginRequest(email, password) {
  return function (dispatch) {
    dispatch({
      type: LOGIN__REQUEST,
    });
    fetchWithRefresh('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }, refreshTokenRequest, dispatch)
      .then((res) => {
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken);
        dispatch({
          type: LOGIN__SUCCESS,
          payload: res,
        });
      })
      .catch(() => {
        dispatch({
          type: LOGIN__FAILURE,
        });
      });
  };
}

export function emailCheckRequest(email) {
  return function (dispatch) {
    dispatch({
      type: EMAIL_CHECK__REQUEST,
    });
    request('/password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(() => {
        dispatch({
          type: EMAIL_CHECK__SUCCESS,
        });
      })
      .catch(() => {
        dispatch({
          type: EMAIL_CHECK__FAILURE,
        });
      });
  };
}

export function registerRequest(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: REGISTER__REQUEST,
    });
    request('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    })
      .then((res) => {
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken);
        dispatch({
          type: REGISTER__SUCCESS,
          payload: res,
        });
      })
      .catch(() => {
        dispatch({
          type: REGISTER__FAILURE,
        });
      });
  };
}