import { useMemo, useEffect, useReducer, useCallback } from 'react';

import axios, { endpoints } from 'src/utils/axios.util';

import { loginApi } from 'src/api/login.api';
import { registerApi } from 'src/api/register.api';
import { forgetPasswordApi } from 'src/api/forget-password.api';

import { AuthContext } from './auth-context';
import { setSession, setStorage, isValidToken } from './utils';
import { AuthUserType, ActionMapType, AuthStateType } from '../../types';

// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
  VERIFY = 'VERIFY',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
  [Types.VERIFY]: {
    nationalCode: string;
    mobileNumber: string;
    time: number;
  };
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  if (action.type === Types.VERIFY) {
    return {
      ...state,
      user: {
        nationalCode: action.payload.nationalCode,
        mobileNumber: action.payload.mobileNumber,
        time: action.payload.time,
      },
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      let accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (!accessToken) {
        accessToken = localStorage.getItem(STORAGE_KEY);
      }

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const res = await axios.get(endpoints.auth.me);

        const { user } = res.data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string, rememberMe: boolean) => {
    const res = await loginApi(email, password);

    const { accessToken, user, has2fa } = res;

    setSession(accessToken);

    const userData = {
      ...user,
      accessToken,
      has2fa,
    };

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...user,
          mobileNumber: res.user.mobile_number,
          accessToken,
          has2fa,
        },
      },
    });

    if (rememberMe) {
      localStorage.setItem(STORAGE_KEY, accessToken);
    } else {
      sessionStorage.setItem(STORAGE_KEY, accessToken);
    }

    // await new Promise((resolve) => setTimeout(resolve, 10000))
    return userData;
  }, []);

  const forgetPasswordCall = useCallback(
    async (nationalCode: string, mobileNumber: string): Promise<void> => {
      const res = await forgetPasswordApi(nationalCode, mobileNumber);

      const { message, status, time } = res;

      dispatch({
        type: Types.VERIFY,
        payload: {
          mobileNumber,
          nationalCode,
          time: Number(time),
        },
      });

      // @ts-ignore
      return { message, status, time };
    },
    []
  );

  // LOGIN WITH TOKEN
  const loginWithToken = useCallback(async (accessToken: string) => {
    setSession(accessToken);

    const res = await axios.get(endpoints.auth.me);

    const { user } = res.data;

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...user,
          accessToken,
        },
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(
    async (nationalCode: string, mobileNumber: string, referralCode?: string) => {
      const res = await registerApi(nationalCode, mobileNumber, referralCode);

      const { user } = res.data;

      dispatch({
        type: Types.REGISTER,
        payload: {
          user: {
            ...user,
          },
        },
      });

      return res;
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    setStorage(null);
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      loginWithToken,
      register,
      logout,
      forgetPasswordCall,
    }),
    [state.user, status, login, loginWithToken, register, logout, forgetPasswordCall]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
