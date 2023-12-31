import {
  EMAIL_CHECK__FAILURE, EMAIL_CHECK__REQUEST,
  EMAIL_CHECK__RESET, EMAIL_CHECK__SUCCESS,
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
  LOGOUT__SUCCESS, MOBILE_MENU__CLOSE, MOBILE_MENU__OPEN,
  PROFILE_UPDATE__FAILURE,
  PROFILE_UPDATE__REQUEST,
  PROFILE_UPDATE__RESET,
  PROFILE_UPDATE__SUCCESS,
  REFRESH_TOKEN__FAILURE,
  REFRESH_TOKEN__REQUEST,
  REFRESH_TOKEN__SUCCESS,
  REFRESH_TOKEN_RESET,
  REGISTER__FAILURE, REGISTER__REQUEST,
  REGISTER__RESET,
  REGISTER__SUCCESS,
  RESET_PASSWORD__FAILURE,
  RESET_PASSWORD__REQUEST,
  RESET_PASSWORD__RESET,
  RESET_PASSWORD__SUCCESS,
} from '../constants/account';
import { TAccountActions } from '../actions/account';

type TAccountState = {
  emailCheckRequest: {
    success: boolean;
    error: boolean;
  };
  passwordResetRequest: {
    success: boolean;
    error: boolean;
  };
  registerRequest: {
    success: boolean;
    error: boolean;
  };
  refreshTokenRequest: {
    success: boolean;
    error: boolean;
  };
  loginRequest: {
    success: boolean;
    error: boolean;
  };
  logoutRequest: {
    success: boolean;
    error: boolean;
  };
  profileUpdateRequest: {
    success: boolean;
    error: boolean;
  };
  getUserRequest: {
    success: boolean;
    error: boolean;
  };
  user: {
    name: string;
    email: string;
    password?: string;
  };
  mobileMenu: 'open' | 'close';
};

const initialState: TAccountState = {
  emailCheckRequest: {
    success: false,
    error: false,
  },
  passwordResetRequest: {
    success: false,
    error: false,
  },
  registerRequest: {
    success: false,
    error: false,
  },
  refreshTokenRequest: {
    success: false,
    error: false,
  },
  loginRequest: {
    success: false,
    error: false,
  },
  logoutRequest: {
    success: false,
    error: false,
  },
  profileUpdateRequest: {
    success: false,
    error: false,
  },
  getUserRequest: {
    success: false,
    error: false,
  },
  user: {
    name: '',
    email: '',
  },
  mobileMenu: 'close',
};

const accountReducer = (
  // eslint-disable-next-line default-param-last
  state: TAccountState = initialState,
  action: TAccountActions,
): TAccountState => {
  switch (action.type) {
    case GET_USER__REQUEST: {
      return {
        ...state,
        getUserRequest: {
          success: false,
          error: false,
        },
      };
    }
    case GET_USER__SUCCESS: {
      return {
        ...state,
        getUserRequest: {
          success: true,
          error: false,
        },
        user: {
          name: action.payload.user.name,
          email: action.payload.user.email,
        },
      };
    }
    case GET_USER__FAILURE: {
      return {
        ...state,
        getUserRequest: {
          success: false,
          error: true,
        },
      };
    }
    case GET_USER__RESET: {
      return {
        ...state,
        getUserRequest: {
          success: false,
          error: false,
        },
      };
    }
    case PROFILE_UPDATE__REQUEST: {
      return {
        ...state,
        profileUpdateRequest: {
          success: false,
          error: false,
        },
      };
    }
    case PROFILE_UPDATE__SUCCESS: {
      return {
        ...state,
        profileUpdateRequest: {
          success: true,
          error: false,
        },
        user: {
          name: action.payload.user.name,
          email: action.payload.user.email,
        },
      };
    }
    case PROFILE_UPDATE__FAILURE: {
      return {
        ...state,
        profileUpdateRequest: {
          success: false,
          error: true,
        },
      };
    }
    case PROFILE_UPDATE__RESET: {
      return {
        ...state,
        profileUpdateRequest: {
          success: false,
          error: false,
        },
      };
    }
    case LOGOUT__REQUEST: {
      return {
        ...state,
        logoutRequest: {
          success: false,
          error: false,
        },
      };
    }
    case LOGOUT__SUCCESS: {
      return {
        ...state,
        logoutRequest: {
          success: true,
          error: false,
        },
        user: {
          name: '',
          email: '',
        },
      };
    }
    case LOGOUT__FAILURE: {
      return {
        ...state,
        logoutRequest: {
          success: false,
          error: true,
        },
      };
    }
    case LOGOUT__RESET: {
      return {
        ...state,
        logoutRequest: {
          success: false,
          error: false,
        },
      };
    }
    case LOGIN__REQUEST: {
      return {
        ...state,
        loginRequest: {
          success: false,
          error: false,
        },
      };
    }
    case LOGIN__SUCCESS: {
      return {
        ...state,
        loginRequest: {
          success: true,
          error: false,
        },
        user: {
          name: action.payload.user.name,
          email: action.payload.user.email,
        },
      };
    }
    case LOGIN__FAILURE: {
      return {
        ...state,
        loginRequest: {
          success: false,
          error: true,
        },
      };
    }
    case LOGIN__RESET: {
      return {
        ...state,
        loginRequest: {
          success: false,
          error: false,
        },
      };
    }
    case EMAIL_CHECK__REQUEST: {
      return {
        ...state,
        emailCheckRequest: {
          success: false,
          error: false,
        },
      };
    }
    case EMAIL_CHECK__SUCCESS: {
      return {
        ...state,
        emailCheckRequest: {
          success: true,
          error: false,
        },
      };
    }
    case EMAIL_CHECK__FAILURE: {
      return {
        ...state,
        emailCheckRequest: {
          success: false,
          error: true,
        },
      };
    }
    case EMAIL_CHECK__RESET: {
      return {
        ...state,
        emailCheckRequest: {
          success: false,
          error: false,
        },
      };
    }
    case REGISTER__REQUEST: {
      return {
        ...state,
        registerRequest: {
          success: false,
          error: false,
        },
      };
    }
    case REGISTER__SUCCESS: {
      return {
        ...state,
        registerRequest: {
          success: true,
          error: false,
        },
        user: {
          name: action.payload.user.name,
          email: action.payload.user.email,
        },
      };
    }
    case REGISTER__FAILURE: {
      return {
        ...state,
        registerRequest: {
          success: false,
          error: true,
        },
      };
    }
    case REGISTER__RESET: {
      return {
        ...state,
        registerRequest: {
          success: false,
          error: false,
        },
      };
    }
    case RESET_PASSWORD__REQUEST: {
      return {
        ...state,
        passwordResetRequest: {
          success: false,
          error: false,
        },
      };
    }
    case RESET_PASSWORD__SUCCESS: {
      return {
        ...state,
        passwordResetRequest: {
          success: true,
          error: false,
        },
      };
    }
    case RESET_PASSWORD__FAILURE: {
      return {
        ...state,
        passwordResetRequest: {
          success: false,
          error: true,
        },
      };
    }
    case RESET_PASSWORD__RESET: {
      return {
        ...state,
        passwordResetRequest: {
          success: false,
          error: false,
        },
      };
    }
    case REFRESH_TOKEN__REQUEST: {
      return {
        ...state,
        refreshTokenRequest: {
          success: false,
          error: false,
        },
      };
    }
    case REFRESH_TOKEN__SUCCESS: {
      return {
        ...state,
        refreshTokenRequest: {
          success: true,
          error: false,
        },
      };
    }
    case REFRESH_TOKEN__FAILURE: {
      return {
        ...state,
        refreshTokenRequest: {
          success: false,
          error: true,
        },
      };
    }
    case REFRESH_TOKEN_RESET: {
      return {
        ...state,
        refreshTokenRequest: {
          success: false,
          error: false,
        },
      };
    }
    case MOBILE_MENU__OPEN: {
      return {
        ...state,
        mobileMenu: 'open',
      };
    }
    case MOBILE_MENU__CLOSE: {
      return {
        ...state,
        mobileMenu: 'close',
      };
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-underscore-dangle
      const _exhaustiveCheck: never = action;
      return state;
    }
  }
};

export default accountReducer;
