import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity,ToastAndroid, ActivityIndicator} from 'react-native';
import { Button, Container, Input, Spacing, PasswordInput } from '../../../components';
import { RouteName } from '../../../routes';
import { Style, Login } from '../../../styles';
import { SH } from '../../../utils';
import { useTheme } from '@react-navigation/native';
import images from '../../../index';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { BASE_URL } from '../../../utils/Api';
import { setDataUser } from '../../../redux/slice';
import { useDispatch } from 'react-redux';

const LoginScreen = (props) => {
    const { Colors } = useTheme();
    const Logins = useMemo(() => Login(Colors), [Colors]);
    const dispatch=useDispatch()
    const { navigation } = props;
    const [mobileNumber, setMobileNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [passwordVisibility, setpasswordVisibility] = useState(true);
    const [TextInputPassword, setTextInputPassword] = useState('');
    console.log('prrrropeeppss',props?.route?.params?.data)
    const onChangeText = (text) => {
        if (text === 'TextInputPassword') setpasswordVisibility(!passwordVisibility);
    };
    const { t } = useTranslation();

    const OnRegisterPress = () => {
        navigation.navigate(RouteName.REGISTER_SCREEN);
    }

    const LoginApi = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();

            formData.append('password', TextInputPassword);
            formData.append('username', mobileNumber);


            const username = 'btcal';
            const password = '123@cal';
            const basicAuth = 'Basic ' + btoa(username + ':' + password);
            console.log('payload', formData)
            const response = await axios.post(`${BASE_URL}login`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': basicAuth,
                    // Add any additional headers here if needed
                },
            });

            console.log('response', response.data);
            if(response?.data?.message==="success"){
                dispatch(setDataUser(response.data))
                if(props?.route?.params?.data===1){
                    navigation.replace('Mpinset')
                }else{
                    navigation.replace(RouteName.SIDE_NAVIGATOR)
                }
               
            }
            if(response?.data?.message==="fail"){
                ToastAndroid.show(`${response?.data?.text}`, ToastAndroid.SHORT);
            }
              


        } catch (error) {
            // console.error('Error:', error);
            ToastAndroid.show('Incorect mobile number and password', ToastAndroid.SHORT);
        }finally{
            setIsLoading(false); 
          }
    };

    return (
        <Container>
            <View style={Logins.MinViewScreen}>
            {isLoading &&
                <View style={{
                    flex: 1, justifyContent: 'center', alignItems
                        : 'center', position: 'absolute', height: '100%', width: '100%',backgroundColor:'#B2BABB'
                }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            }
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={Style.ScrollViewStyles}>
                    <View style={Logins.Container}>
                        <View style={Style.MinViewContent}>
                            <View style={Logins.ManViewLogins}>
                                <Image style={Logins.ImageSet} resizeMode='contain' source={require('../../../images/logo-blue.png')} />
                            </View>
                            <Text style={Logins.LoginText}>{t("Login_Text")}</Text>
                            <Spacing space={SH(20)} />
                            <View style={Logins.InputSpaceView}>
                                <Input
                                    title={t("Mobile_Number")}
                                    placeholder={t("Mobile_Number")}
                                    onChangeText={(value) => {
                                        // Regular expression to remove non-numeric characters
                                        const numericValue = value.replace(/[^0-9]/g, '');
                                        setMobileNumber(numericValue);
                                    }}
                                    value={mobileNumber}
                                    inputType="numeric"
                                    maxLength={10}
                                    placeholderTextColor={Colors.gray_text_color}
                                />
                            </View>
                            <View style={Logins.InputSpaceView}>
                                <PasswordInput
                                    name={passwordVisibility ? 'eye-off' : 'eye'}
                                    label={t("Password_Text")}
                                    placeholder={t("Password_Text")}
                                    value={TextInputPassword}
                                    onPress={() => { onChangeText("TextInputPassword") }}
                                    onChangeText={(text) => setTextInputPassword(text)}
                                    secureTextEntry={passwordVisibility}
                                />
                            </View>
                            <Spacing space={SH(10)} />
                            <View style={Logins.ViewTextStyle}>
                                <Text style={Logins.TextStyle}>{t("Dont_Have_Account")} <Text style={Logins.registerTextStyle} onPress={() => OnRegisterPress()}> {t("Register_Text")}</Text></Text>
                            </View>
                            <Spacing space={SH(40)} />
                            <View style={Logins.LoginButton}>
                                <Button
                                    title={t("Login_Text")}
                                    onPress={() => LoginApi()}
                                />
                                <TouchableOpacity onPress={() => navigation.navigate(RouteName.Forget_Password)}>
                                    <Spacing space={SH(10)} />
                                    <Text style={Logins.ForgetPasswordStyles}>{t("Forgot_Password")}</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>
                </ScrollView>
            </View>
        </Container>
    );
}
export default LoginScreen;