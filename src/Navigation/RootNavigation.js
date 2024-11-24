import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ScreenNames from "../Constants/ScreenNames";
import SplashScreen from "../Screens/SplashScreen";
import AboutScreen from "../Screens/InforCustomers/AboutScreen";
import LoginScreen from "../Screens/InforCustomers/LoginScreen";
import RegisterScreen from "../Screens/InforCustomers/RegisterScreen";
import ActiveAccount from "../Screens/InforCustomers/ActiveAccount";
import ForgotPasswordScreen from "../Screens/InforCustomers/ForgotPasswordScreen";
import { BottomTabNavigator } from "./BottomTabNavigator";
import First from "../Screens/First";
import AuthHome from "../Screens/InforCustomers/AuthHome";
import History from "../Screens/Home/History";
import Welfare from "../Screens/Home/Welfare";
import Account from "../Screens/Home/Account";
import HomeScreen from "../Screens/Home/HomeScreen";
import AddressSearch from "../Screens/Service/AddressSearch";
import ConfirmBooking from "../Screens/Service/ConfirmBooking";
import WaitingStaffScreen from "../Screens/Service/WaitingStaffScreen";
import CashScreen from "../Screens/Service/CashScreen";
import RatingServiceScreen from "../Screens/Service/RatingServiceScreen";
import ViewLocationStaff from "../Screens/Service/ViewLocationStaff";
import ViewStaff from "../Screens/Service/ViewStaff";
import ServiceCarouselDetail from "../Screens/Home/ServiceCarouselDetail";
import ContrubutionsDetailScreen from "../Screens/Home/ContrubutionsDetailScreen";
import ViewAllStaff from "../Screens/Service/ViewAllStaff";
import GiftDetailScreen from "../Screens/Home/GiftDetailScreen";
import ViewMyMap from "../Screens/Service/ViewMyMap";
import ChatDetailScreen from "../chat/ChatDetailScreen";
import { BookingForm } from "../Screens/Service";
import ShowMap from "../Screens/Service/ShowMap";

const MainStack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{ headerShown: false, animationEnabled: false }}
        initialRouteName={ScreenNames.MAIN_NAVIGATOR}
      >
        <MainStack.Screen name={ScreenNames.FIRST} component={First} />
        <MainStack.Screen name={ScreenNames.SPLASH} component={SplashScreen} />
        <MainStack.Screen name={ScreenNames.AUTH_HOME} component={AuthHome} />
        <MainStack.Screen name={ScreenNames.ABOUT} component={AboutScreen} />
        <MainStack.Screen name={ScreenNames.LOGIN} component={LoginScreen} />
        <MainStack.Screen
          name={ScreenNames.REGISTER}
          component={RegisterScreen}
        />
        <MainStack.Screen
          name={ScreenNames.ACTIVE_ACCOUNT}
          component={ActiveAccount}
        />
        <MainStack.Screen
          name={ScreenNames.FORGOT_PASSWORD}
          component={ForgotPasswordScreen}
        />
        <MainStack.Screen
          name={ScreenNames.MAIN_NAVIGATOR}
          component={BottomTabNavigator}
        />
        <MainStack.Screen
          name={ScreenNames.ChatDetailScreen}
          component={ChatDetailScreen}
        />
        <MainStack.Screen
          name={ScreenNames.RATING_SERVICE}
          component={RatingServiceScreen}
        />
        <MainStack.Screen
          name={ScreenNames.CASH_SCREEN}
          component={CashScreen}
        />
        <MainStack.Screen name={ScreenNames.HOME} component={HomeScreen} />
        <MainStack.Screen
          name={ScreenNames.HISTORY} //Lịch sử
          component={History}
        />
        <MainStack.Screen
          name={ScreenNames.WELFARE} //Phúc lợi
          component={Welfare}
        />
        <MainStack.Screen
          name={ScreenNames.ACCOUNT} //Tài khoản
          component={Account}
        />
        <MainStack.Screen
          name={ScreenNames.ADDRESS_SEARCH} //Tìm kiếm địa chỉ book dịch vụ
          component={AddressSearch}
        />
        <MainStack.Screen
          name={ScreenNames.CONFIRM_BOOKING} //sửa xac nhan dat
          component={ConfirmBooking}
        />
        <MainStack.Screen
          name={ScreenNames.WAITING_STAFF} 
          component={WaitingStaffScreen}
        />
        <MainStack.Screen
          name={ScreenNames.VIEW_LOCATION_STAFF}
          component={ViewLocationStaff}
        />
        <MainStack.Screen
          name={ScreenNames.VIEW_ALL_STAFF}
          component={ViewAllStaff}
        />
        <MainStack.Screen
          name={ScreenNames.SERVICE_CAROUSEL_DETAIL}
          component={ServiceCarouselDetail}
        />
        <MainStack.Screen
          name={ScreenNames.CONTRIBUTIONS_DETAIL}
          component={ContrubutionsDetailScreen}
        />
        <MainStack.Screen
          name={ScreenNames.GIFT_DETAIL}
          component={GiftDetailScreen}
        />
        <MainStack.Screen
          name={ScreenNames.VIEW_MY_MAP}
          component={ViewMyMap}
        />
        <MainStack.Screen
          name={ScreenNames.BOOKING_FORM_SCREEN}
          component={BookingForm}
        />
        <MainStack.Screen
          name={ScreenNames.SHOW_MAP}
          component={ShowMap}
        />
        <MainStack.Screen name={ScreenNames.VIEW_STAFF} component={ViewStaff} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;
