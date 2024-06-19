import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slice';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'accessToken',
    'isAuthorized',
    'isAuthorized',
    'isLoggedIn',
    'onboardingShown',
    'userId',
    'accessTokens',
    'userData',
    'latitude',
    'longitude',
    'city',
    'country',
    'name',
    'region',
    'district',
    'street',
    'streetNumber',
    'subRegion',
    'profileImageUrl',
    "messageId",
    "Email",
    "AlternateMobile",
    "Housenumber",
    "Locality",
    "City",
    "State",
    "carDetail",
    "dataUser",
    "bookingDetail",
    "roadPackage"
  ],
};
export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);

// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });
