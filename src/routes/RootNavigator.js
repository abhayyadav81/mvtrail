import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from "react-redux";
import { Colors } from '../utils';


import { RouteName, SideNavigator } from '../routes';

import {
  LoginScreen, RegisterScreen, OtpVeryfiveScreen,
  SplashScreen, RegistrationSuccessful,
  Swiperscreen,
  TranslationScreen, ForgotPassword, SelectAddress,
  WhereToScreen, DriverSelectScreen, PaymentScreen, PaytmSuccessFully,
  CreditCardScreen, CancelTripScreen, Chatscreen
} from '../screens';
import CarsDetail from '../screens/Home/CarsDetail';
import CarsPriceDetail from '../screens/Home/CarsPriceDetail';
import Ridedetails from '../screens/Home/Tab/Ridedetails';
import { Profile } from '../screens';
import ProfileTab from '../screens/Home/Tab/Profile';
import TermNcondition from '../screens/Home/TermNcondition';

const RootNavigator = props => {
  const { userData, userId, dataUser, carDetail, activeBookings } = useSelector(
    (state: any) => state.auth,
);
  const Stack = createNativeStackNavigator();
  console.log('datauser',dataUser?.access_token)

  const { colorrdata } = useSelector(state => state.commonReducer) || {};
  const MyTheme = {
    ...DefaultTheme,
    Colors: Colors
  };
  const [colorValue, setColorValue] = useState(MyTheme)
  useEffect(() => {
    if (Colors.length != 0 && colorrdata != "") {
      Colors.theme_background_topaz = colorrdata;
      const MyThemeNew = {
        ...DefaultTheme,
        Colors: Colors
      };
      setColorValue(MyThemeNew)
    }
  }, [colorrdata, Colors])
  return (
    <NavigationContainer theme={colorValue}>
      <Stack.Navigator screenOptions={{ headerShown: false }}
       initialRouteName={dataUser?.access_token ?  RouteName.SIDE_NAVIGATOR :'SplashScreen'}
      //  initialRouteName={RouteName.SIDE_NAVIGATOR}
      >
        <Stack.Screen name={'SplashScreen'} component={SplashScreen} />
        <Stack.Screen name={RouteName.LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen name={RouteName.REGISTER_SCREEN} component={RegisterScreen} />
        <Stack.Screen name={'profile'} component={Profile} />
        <Stack.Screen name={RouteName.SIDE_NAVIGATOR} component={SideNavigator} />
        <Stack.Screen name={RouteName.REGIATRAION_SUCCESSFULL} component={RegistrationSuccessful} />
        <Stack.Screen name={RouteName.OTP_VERYFY_SCREEN} component={OtpVeryfiveScreen} />
        <Stack.Screen name={RouteName.SWIPER_SCREEN} component={Swiperscreen} />
        <Stack.Screen name={RouteName.SELECT_LANGUAGE} component={TranslationScreen} />
        <Stack.Screen name={RouteName.Forget_Password} options={{ headerShown: false, headerShadowVisible: false }} component={ForgotPassword} />
        <Stack.Screen name={RouteName.SELECTION_ADDRESS_SCREEN} component={SelectAddress} />
        <Stack.Screen name={RouteName.WHERE_TO_SCREEN} component={WhereToScreen} />
        <Stack.Screen name={RouteName.DRIVER_SELECT_SCREEN} component={DriverSelectScreen} />



        <Stack.Screen name={RouteName.PATMENT_SUCCESSFULL_SCREEN} component={PaytmSuccessFully} />
        <Stack.Screen name={RouteName.CREDIT_CARD_SCREEN} component={CreditCardScreen} />
        <Stack.Screen name={RouteName.CANCEL_TRIP_SCREEN} component={CancelTripScreen} />
        <Stack.Screen name={RouteName.CHAT_SCREEN} component={Chatscreen} />
        <Stack.Screen name={RouteName.RIDE_DETAIL} component={Ridedetails} />
        <Stack.Screen name={RouteName.PROFILE_TAB} component={ProfileTab} />
        <Stack.Screen name={RouteName.TERM_CONDITION} component={TermNcondition} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default RootNavigator;