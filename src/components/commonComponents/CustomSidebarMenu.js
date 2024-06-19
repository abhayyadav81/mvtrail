
import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Sidemenu } from '../../styles';
import { RouteName } from '../../routes';
import { ConfirmationAlert, VectorIcon } from '../../components';
import { Colors, SF } from '../../utils';
import { useTranslation } from "react-i18next";
import { setDataUser } from "../../redux/slice";
import { useDispatch } from "react-redux";
import { HomeTab } from "../../screens";
import { Profile } from "../../screens";
const CustomSidebarMenu = (props) => {
  const { t } = useTranslation();
  const { navigation } = props;
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [cancelbutton, SetCancelbutton] = useState(t("Cancel_Button"));
  const dispatch = useDispatch()
  var alertdata = {
    'logout': t("Are_You_Sure_logout"),
  }
  const onoknutton = () => {
    navigation.replace(RouteName.LOGIN_SCREEN);
  }
  const Onpressfunction = (e) => {
    navigation.toggleDrawer();
    navigation.navigate(e)
  };
  return (
    <ScrollView>
      <View style={Sidemenu.customslidebarmenu}>
        <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(HomeTab) 
        }>
          <VectorIcon icon="Feather"
            size={SF(19)}
            name="home"
            color={'#FFA807'}
          />
          <Text style={Sidemenu.hometextstyle}>{t("Home_Text")}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction('profile')
        }>
          <VectorIcon icon="FontAwesome" size={SF(19)}  name="user-circle" style={Sidemenu.logoimage} color={'#FFA807'} />
          <Text style={Sidemenu.hometextstyle}>{t("Profile_Text")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(RouteName.CHAT_SCREEN)
        }>
          <VectorIcon icon="Entypo" name="list" style={Sidemenu.logoimage} color={Colors.theme_background_topaz} size={SF(20)} color={'#FFA807'} />
          <Text style={Sidemenu.hometextstyle}>{t("My Rides")}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(RouteName.HELP_SCREEN)
        }>
          <VectorIcon icon="FontAwesome5" size={SF(19)} name="hands-helping" style={Sidemenu.logoimage} color={Colors.theme_background_topaz} />
          <Text style={Sidemenu.hometextstyle}>{t("Help_Text")}</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(RouteName.SETTING_SCREEN)
        }>
          <VectorIcon icon="AntDesign" size={19} name="setting" style={Sidemenu.logoimage} color={'#FFA807'} />
          <Text style={Sidemenu.hometextstyle}>{t("Setting_Text")}</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(RouteName.FAQ_SCREEN)
        }>
          <VectorIcon icon="Entypo" size={SF(19)} name="help" style={Sidemenu.logoimage} color={Colors.theme_background_topaz} />
          <Text style={Sidemenu.hometextstyle}>{t("FAQ_Text")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(RouteName.REVIEWS_SCREEN)
        }>
          <VectorIcon icon="Entypo" size={SF(19)} name="star" style={Sidemenu.logoimage} color={Colors.theme_background_topaz} />
          <Text style={Sidemenu.hometextstyle}>{t("Reviews_Screen")}</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={Sidemenu.flexrowset} onPress={
          () => Onpressfunction(RouteName.NOTIFICTION_SCREEN)
        }>
          <VectorIcon icon="Ionicons" size={SF(19)} name="notifications" style={Sidemenu.logoimage} color={Colors.theme_background_topaz} />
          <Text style={Sidemenu.hometextstyle}>{t("Notification_Text")}</Text>
        </TouchableOpacity> */}
        {/* <View style={Sidemenu.settingandlogout}> */}
          <TouchableOpacity style={Sidemenu.flexrowset} onPress={() => {

            setAlertVisible(true);
            setAlertMessage(alertdata.logout);

          }}>
            <VectorIcon icon="Entypo" name="log-out" color={'#FFA807'} size={SF(23)} />
            <Text style={Sidemenu.hometextstyle}>{t("Log_Out")}</Text>
          </TouchableOpacity>
        {/* </View> */}
        <ConfirmationAlert
          message={alertMessage}
          modalVisible={alertVisible}
          setModalVisible={setAlertVisible}
          onPressCancel={() => setAlertVisible(!alertVisible)}
          onPress={() => { dispatch(setDataUser('')), setAlertVisible(!alertVisible), onoknutton() }}
          cancelButtonText={cancelbutton}
          buttonText={t("Ok")}
        />
      </View>
    </ScrollView>
  );
};
export default CustomSidebarMenu;

