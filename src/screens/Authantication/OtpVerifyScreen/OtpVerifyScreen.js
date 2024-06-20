import React, { useState, useMemo } from "react";
import { Text, View, ScrollView, ImageBackground, KeyboardAvoidingView, TouchableOpacity, ToastAndroid } from "react-native";
import { Otpstyle } from '../../../styles';
import images from '../../../index';
import RouteName from '../../../routes/RouteName';
import { Button, ConfirmationAlert, OTPInput } from '../../../components';
import { useTranslation } from "react-i18next";
import { useTheme,CommonActions  } from '@react-navigation/native';
import { BASE_URL } from "../../../utils/Api";
import axios from "axios";
import { setDataUser } from "../../../redux/slice";
import { useDispatch } from "react-redux";

const OtpScreenset = (props, { route }) => {
    const { t } = useTranslation();
    const { Colors } = useTheme();
    const dispatch = useDispatch()
    const Otpstyles = useMemo(() => Otpstyle(Colors), [Colors]);
    const { navigation } = props;
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [okbutton, Setokbutton] = useState('');
    const [otp, setOtp] = useState('');
    console.log('route', props?.route?.params)

    const handleOTPChange = (otp) => {
        setOtp(otp);
    };
    const navigateToHomeAndClearStack = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Mpinset' }],
            })
        );
    };
    console.log('otp', otp)
    var alertdata = {
        'logout': t("Resand_Otp_Text_Modal"),
        'loginSuccess': t("Login_Successfull"),
    }
    const onoknutton = () => {
        if (okbutton === false) okbutton;
        if (okbutton === true) navigation.replace('Mpinset')
    }
    const [isLoading, setIsLoading] = useState(false);

    const _Resend_Otp = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();

            formData.append('password', props?.route?.params?.pass);
            formData.append('username', props?.route?.params?.uname);


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

            if (response?.data?.message === "success") {
                // setAlertVisible(true);
                ToastAndroid.show('Resend OTP successfully', ToastAndroid.SHORT);
             
            }
            if(response?.data?.message==="fail"){
                ToastAndroid.show(`${response?.data?.text}`, ToastAndroid.SHORT);
            }



        } catch (error) {
            // console.error('Error:', error);
            // ToastAndroid.show('Incorect mobile number and password', ToastAndroid.SHORT);
        } finally {
            setIsLoading(false);
        }
    };

    const Verify_OTP = async () => {
        try {
            const formData = new FormData();

            formData.append('user_otp', otp);



            const username = 'btcal';
            const password = '123@cal';
            const basicAuth = 'Basic ' + btoa(username + ':' + password);
            console.log('payload', formData)
            const response = await axios.post(`${BASE_URL}verifyotp`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': basicAuth,
                    // Add any additional headers here if needed
                },
            });

            console.log('response', response.data);


            if (response?.data?.message === "fail") {
                ToastAndroid.show('Incorrect OTP please check again', ToastAndroid.SHORT);
            }
            if (response?.data?.message === "success") {
                dispatch(setDataUser(response.data))
                // navigation.replace(RouteName.SIDE_NAVIGATOR)
                setAlertVisible(true);
                setAlertMessage(alertdata.loginSuccess);
                Setokbutton(true);
            }



        } catch (error) {
            console.error('Error:', error);
            // ToastAndroid.show('Incorect mobile number and password', ToastAndroid.SHORT);
        }
    };
    return (
        <View style={Otpstyles.MinViewScreen}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={Otpstyles.ScrollViewStyle}>
                <KeyboardAvoidingView enabled>
                    <View style={Otpstyles.MinFlexView}>
                        <View style={Otpstyles.MinViewSecond}>
                            <Text style={Otpstyles.EnterSixDigitText}>{t("Enter_Six_Digit_OTP")}</Text>
                            <Text style={Otpstyles.paregraph}>{t("Enter_The_Otp_Title")}</Text>
                            <OTPInput
                                style={Otpstyles.OtpViewStyles}
                                pinnum={6}
                                autoFocusOnLoad={false}
                                codeInputFieldStyle={Otpstyles.CodeInputStyles}
                                codeInputHighlightStyle={Otpstyles.CodeInputStyles}
                                codeChnaged={(code) => handleOTPChange(code)}
                            />
                            <View style={Otpstyles.FlexRowText}>
                                <Text style={Otpstyles.ParegraPhotpBottom}>{t("Didnt_Recevip_Otp")}</Text>
                                <TouchableOpacity onPress={() => {
                                    _Resend_Otp()

                                }}>
                                    <Text style={Otpstyles.ResendTextBold}>{t("Resend")}</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Button title={t("Verify_Text")} onPress={() => Verify_OTP()} />
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
            <ConfirmationAlert
                message={alertMessage}
                modalVisible={alertVisible}
                setModalVisible={setAlertVisible}
                onPress={() => { setAlertVisible(!alertVisible);  navigateToHomeAndClearStack(); }}
                buttonminview={Otpstyles.buttonotp}
                iconVisible={true}
                buttonText={t("Ok")}
            />
        </View>
    );
};
export default OtpScreenset;
