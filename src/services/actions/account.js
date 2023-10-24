import request from '../../utils/apiUtils';

export const EMAIL_CHECK__REQUEST = 'PASSWORD_RESET__REQUEST';
export const EMAIL_CHECK__SUCCESS = 'PASSWORD_RESET__SUCCESS';
export const EMAIL_CHECK__FAILURE = 'PASSWORD_RESET__FAILURE';

export const REGISTER__REQUEST = 'REGISTER__REQUEST';
export const REGISTER__SUCCESS = 'REGISTER__SUCCESS';
export const REGISTER__FAILURE = 'REGISTER__FAILURE';

export const RESET_PASSWORD__REQUEST = 'RESET_PASSWORD__REQUEST';
export const RESET_PASSWORD__SUCCESS = 'RESET_PASSWORD__SUCCESS';
export const RESET_PASSWORD__FAILURE = 'RESET_PASSWORD__FAILURE';

export function resetPasswordRequest(password, token) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD__REQUEST,
    });
    request('/password-reset/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, token }),
    })
      .then((res) => {
        if (res.success) {
          dispatch({
            type: RESET_PASSWORD__SUCCESS,
            payload: password,
          });
        } else {
          dispatch({
            type: RESET_PASSWORD__FAILURE,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: RESET_PASSWORD__FAILURE,
        });
      });
  };
}

export function passwordResetRequest(email) {
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
      .then((res) => {
        if (res.success) {
          dispatch({
            type: EMAIL_CHECK__SUCCESS,
          });
        } else {
          dispatch({
            type: EMAIL_CHECK__FAILURE,
          });
        }
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
        if (res.success) {
          dispatch({
            type: REGISTER__SUCCESS,
            payload: res,
          });
        } else {
          dispatch({
            type: REGISTER__FAILURE,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: REGISTER__FAILURE,
        });
      });
  };
}
