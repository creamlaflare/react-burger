import {
  combineReducers, compose,
} from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './reducers/ingredients';
import accountReducer from './reducers/account';
import { TIngredientsActions } from './actions/ingredients';
import { TAccountActions } from './actions/account';
import orderFeedReducer from './reducers/order-feed';
import { socketMiddleware } from './middleware/socket-middleware';
import {
  orderFeedConnect as wsConnectOrderFeed,
  orderFeedDisconnect as wsDisconnectOrderFeed,
  orderFeedConnecting as wsConnectingOrderFeed,
  orderFeedOpen as onOpenOrderFeed,
  orderFeedConnecting as onCloseOrderFeed,
  orderFeedError as onErrorOrderFeed,
  orderFeedMessage as onMessageOrderFeed,
} from './actions/order-feed';

const orderFeedWsActions = {
  wsConnect: wsConnectOrderFeed,
  wsDisconnect: wsDisconnectOrderFeed,
  wsConnecting: wsConnectingOrderFeed,
  onOpen: onOpenOrderFeed,
  onClose: onCloseOrderFeed,
  onError: onErrorOrderFeed,
  onMessage: onMessageOrderFeed,
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// const composeEnhancers = typeof window
// === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//   : compose;

const rootReducer = combineReducers({
  ingredientsStore: ingredientsReducer,
  accountStore: accountReducer,
  orderFeedStore: orderFeedReducer,
});

const wsMiddleware = socketMiddleware(orderFeedWsActions);
//
// const enhancer = composeEnhancers(
//   applyMiddleware(thunk, wsMiddleware),
// );

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wsMiddleware),
});

type TApplicationActions = TIngredientsActions | TAccountActions;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export type AppThunk<ReturnType = void> =
  (constructorIngredients: string[]) => (dispatch: AppDispatch) => ReturnType;

export default store;
