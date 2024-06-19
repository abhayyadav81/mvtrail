import React, { useState, useMemo ,useEffect} from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking ,ToastAndroid} from 'react-native';
import { Input, Button, CheckBox, Spacing, Countrycode, PasswordInput } from '../../../components';
import { SH } from '../../../utils';
import { RouteName } from '../../../routes';
import { Login, Style } from '../../../styles';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import { setUserId } from '../../../redux/slice';
import { useDispatch, useSelector } from 'react-redux';
const Register = (props) => {
    const { userData ,userDocuments} = useSelector(
        (state: any) => state.auth,
    );
    console.log('userDocuments', userDocuments)
    const { navigation } = props;
    const { Colors } = useTheme();
    const dispatch=useDispatch()
    const Logins = useMemo(() => Login(Colors), [Colors]);
    const stateArray = {
        username: "",
        emailId: "",
        mobileNumber: "",
        toggleCheckBox: false,
    };
    const [state, setState] = useState(stateArray);
    const { t } = useTranslation();
    const [passwordVisibility, setpasswordVisibility] = useState(true);
    const [TextInputPassword, setTextInputPassword] = useState('');
    const [position,setPosition]=useState('')
    const onChangeText = (text) => {
        if (text === 'TextInputPassword') setpasswordVisibility(!passwordVisibility);
    };
    useEffect(() => {
        Geolocation.getCurrentPosition((pos) => {
            const crd = pos.coords;

            setPosition({
                latitude: crd.latitude,
                longitude: crd.longitude,
                latitudeDelta: 0.0421,
                longitudeDelta: 0.0421,

            });

        })
    }, []);

    const Register = async () => {
        try {
            const formData = new FormData();
            formData.append('name', state.username);
            formData.append('email', state.emailId);
            formData.append('password', TextInputPassword);
            formData.append('mobile', state.mobileNumber);
            formData.append('latitude', position?.latitude);
            formData.append('longitude', position?.longitude);
            dispatch(setUserId([{
                "name":state.username,
                "email":state.emailId,
                "mobile":state.mobileNumber
            }]))
            const username = 'btcal';
            const password = '123@cal';
            const basicAuth = 'Basic ' + btoa(username + ':' + password);
            console.log('payload', formData)
            const response = await axios.post(`https://web.bharattaxi.com/api/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': basicAuth,
                    // Add any additional headers here if needed
                },
            });
           
            console.log('response', response.data);
            if(response.data?.message=="fail"){
                ToastAndroid.show(`${response?.data?.text}`, ToastAndroid.SHORT);
            }
            
            // dispatch(User_Data_action(response?.data))
            if (response?.data?.message==="success") {
                navigation.navigate(RouteName.OTP_VERYFY_SCREEN)
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View style={Logins.MinViewBgColor}>
            <ScrollView
                contentContainerStyle={Logins.ScrollViewStyle}>
                <View style={Logins.Container}>
                    <View style={Logins.MinViewContent}>
                        <View style={Logins.TopSpaceRegister}>
                            <Text style={Logins.RegisterText}>{t("Sign_Up_Text")}</Text>
                        </View>
                        <Input
                            title={t("Enter_Your_Name")}
                            placeholder={t("Enter_Your_Name")}
                            onChangeText={(text) => setState({ ...state, username: text })}
                            value={state.username}
                        />
                        <Spacing space={SH(20)} />
                        <View style={Logins.FlexRowPassword}>
                            <View style={Logins.InputViewWidth}>
                                <View style={Logins.CountryCodeIconCenter}>
                                    <Countrycode />
                                </View>
                                <Input
                                    title={t("Mobile_Number")}
                                    placeholder={t("Mobile_Number")}
                                    onChangeText={(text) => setState({ ...state, mobileNumber: text })}
                                    value={state.mobileNumber}
                                    maxLength={10}
                                    inputType="numeric"
                                    placeholderTextColor={Colors.gray_text_color}
                                    inputStyle={Logins.PaddingLeftCountryInput}
                                />
                            </View>
                        </View>
                        <Spacing space={SH(20)} />
                        <Input
                            title={t("Enter_Your_Email")}
                            placeholder={t("Enter_Your_Email")}
                            onChangeText={(text) => setState({ ...state, emailId: text })}
                            value={state.emailId}
                            placeholderTextColor={Colors.gray_text_color}
                        />
                        <PasswordInput
                            name={passwordVisibility ? 'eye-off' : 'eye'}
                            label={t("Password_Text")}
                            placeholder={t("Password_Text")}
                            value={TextInputPassword}
                            onPress={() => { onChangeText("TextInputPassword") }}
                            onChangeText={(text) => setTextInputPassword(text)}
                            secureTextEntry={passwordVisibility}
                        />
                        <Spacing space={SH(20)} />
                        <View style={Logins.FlexRowChekBox}>
                            <View style={Logins.CheckBoxView}>
                                <CheckBox
                                    value={state.toggleCheckBox}
                                    tintColors={{ true: Colors.theme_background_topaz, false: Colors.theme_background_topaz }}
                                    onValueChange={(text) => setState({ ...state, toggleCheckBox: text })}
                                />
                            </View>
                            <Text style={Logins.SimpleTextStyle}>{t("I_Agree_Text")} <Text style={Logins.borderbottomTwo}><Text style={Logins.bluecolor} onPress={() => Linking.openURL('https://myaccount.google.com/')}> {t("Terms_Of_Service")}  </Text></Text>{t("And_text")}  <Text onPress={() => Linking.openURL('https://myaccount.google.com/')} style={Logins.bluecolor}>{t("Privacy_Policy")}</Text></Text>
                        </View>
                        <Spacing space={SH(20)} />
                        <View style={Logins.ButtonView}>
                            <Button
                                title={t("Sign_Up_Text")}
                                onPress={() => Register()}
                               
                            />
                            <Spacing space={SH(20)} />
                            <View style={Logins.TopSpace}>
                                <View style={Logins.AlredyAndLoginBox}>
                                    <Text style={Logins.MemberTextStyle}>{t("Already_Member")}</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate(RouteName.LOGIN_SCREEN)}>
                                        <Text style={Logins.LoginScreenText}>{t("Login_Text")}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
export default Register;
