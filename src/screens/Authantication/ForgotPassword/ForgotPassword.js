import React, { useState, useMemo } from "react";
import { Text, View, ScrollView, TouchableOpacity, ToastAndroid, ActivityIndicator, Image } from "react-native";
import { Login, Style } from '../../../styles';
import IconM from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button, ConfirmationAlert, Spacing, AppHeader, Input, } from '../../../components';
import { SH, SF } from '../../../utils';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import { RouteName } from "../../../routes";
import { BASE_URL } from "../../../utils/Api";
import axios from "axios";


const ForgotPassword = (props) => {
  const { t } = useTranslation();
  const { Colors } = useTheme();
  const { navigation } = props;
  const Logins = useMemo(() => Login(Colors), [Colors]);
  const [email, setEmailValidError] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  var alertdata = {
    'logout': t("Email_Successfull"),
  }
  const onoknutton = () => {
    navigation.navigate(RouteName.LOGIN_SCREEN)
  }
  const _Forgot_password = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('email', email);

      const username = 'btcal';
      const password = '123@cal';
      const basicAuth = 'Basic ' + btoa(username + ':' + password);
      console.log('payload', formData)
      const response = await axios.post(`${BASE_URL}forgotPassword`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': basicAuth,
        },
      });

      console.log('Response:', response?.data);
      if (response?.data?.message === "Success") {
        setAlertVisible(true);
        setAlertMessage(alertdata.logout);
      }
      if (response?.data?.message === "Please enter valid email") {
        ToastAndroid.show(`${response?.data?.message}`, ToastAndroid.SHORT);
      }


    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={{ width: '100%', flex: 1, backgroundColor: '', padding: 10 }}>
      {isLoading &&
        <View style={{
          flex: 1, justifyContent: 'center', alignItems
            : 'center', position: 'absolute', height: '100%', width: '100%',backgroundColor:'#B2BABB'
        }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      }
      <View style={{marginTop:80}}>
      <View style={Logins.ManViewLogins}>
        <Image style={Logins.ImageSet} resizeMode='contain' source={require('../../../images/logo-blue.png')} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: "center" ,justifyContent:"center"}}>
        {/* <AntDesign name='arrowleft' size={20} style={{ color: "black" }} onPress={() => navigation.navigate(RouteName.LOGIN_SCREEN)} /> */}
        <Text style={{
          fontSize: SF(20),
          fontWeight: '700',
          marginLeft: 10,
          color: "black",
        }}>{t("Forget_Password")}</Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <View style={{}}>


          <View style={Logins.TabMinViewChild}>
            <View style={Logins.BorderWidth}>
              <TouchableOpacity style={Logins.WidthSet}>
                <Input
                  placeholder={t("Enter_Email")}
                  inputStyle={Logins.SearchInputBorder}
                  onChangeText={(e) => setEmailValidError(e)}
                  keyboardType={'email-address'}
                  value={email}
                  leftIcon={<IconM style={Logins.Marginright} name="email" size={SF(25)} color={'gray'}/>}
                />
              </TouchableOpacity>
            </View>
            <Spacing space={SH(20)} />
            <Text style={Logins.SeTextStyleForget}><Text style={Logins.StarColor}> * </Text> {t("We_Well_Sand_Message")}</Text>
            <Spacing space={SH(20)} />
            <Button onPress={() => {
              _Forgot_password();

            }} title={t("Submitbutton")} />
            <ConfirmationAlert
              message={alertMessage}
              buttonminview={Logins.CenterButton}
              modalVisible={alertVisible}
              setModalVisible={setAlertVisible}
              onPressCancel={() => setAlertVisible(!alertVisible)}

              onPress={() => { setAlertVisible(!alertVisible), onoknutton() }}
              iconVisible={true}
              buttonText={t("Ok")}
            />
          </View>
        </View>
      </View>

      </View>
    </View>
  );
};
export default ForgotPassword;