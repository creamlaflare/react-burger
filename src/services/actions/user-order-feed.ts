import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  USER_ORDER_FEED_CLOSE,
  USER_ORDER_FEED_CONNECT,
  USER_ORDER_FEED_CONNECTING,
  USER_ORDER_FEED_DISCONNECT,
  USER_ORDER_FEED_ERROR,
  USER_ORDER_FEED_MESSAGE,
  USER_ORDER_FEED_OPEN,
} from '../constants/user-order-feed';
import { TOrder } from '../reducers/order-feed';
import { setCookie } from '../../utils/cookie';
import request from '../../utils/apiUtils';

type TServerResponse = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export const userOrderFeedConnect = createAction<
string,
typeof USER_ORDER_FEED_CONNECT
>(USER_ORDER_FEED_CONNECT);
export const userOrderFeedDisconnect = createAction(USER_ORDER_FEED_DISCONNECT);
export const userOrderFeedClose = createAction(USER_ORDER_FEED_CLOSE);
export const userOrderFeedOpen = createAction(USER_ORDER_FEED_OPEN);
export const userOrderFeedConnecting = createAction(USER_ORDER_FEED_CONNECTING);
export const userOrderFeedError = createAction<
string,
typeof USER_ORDER_FEED_ERROR
>(USER_ORDER_FEED_ERROR);
export const userOrderFeedMessage = createAction<
TServerResponse,
  typeof USER_ORDER_FEED_MESSAGE
>(USER_ORDER_FEED_MESSAGE);

export const refreshToken = createAsyncThunk(
  'userOrderFeed/refreshToken',
  async () => {
    try {
      const refreshData = await request('/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: localStorage.getItem('refreshToken'),
        }),
      });

      if (!refreshData.success) {
        throw new Error('Refresh token failed');
      }

      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
    } catch (error) {
      console.error(error);
    }
  },
);

export type UserOrderFeedActions = ReturnType<typeof userOrderFeedConnect>
| ReturnType<typeof userOrderFeedDisconnect>
| ReturnType<typeof userOrderFeedClose>
| ReturnType<typeof userOrderFeedOpen>
| ReturnType<typeof userOrderFeedConnecting>
| ReturnType<typeof userOrderFeedError>
| ReturnType<typeof userOrderFeedMessage>
| ReturnType<typeof refreshToken>;
