import { View, ScrollView, KeyboardAvoidingView, Animated, Easing, } from 'react-native'
import React, { useEffect, useRef, useMemo } from 'react'
import { Login, Style } from '../../styles'
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import Lottie from 'lottie-react-native';

import { Button } from '../../components';

const SuccessfullConfirm = ({navigation}) => {

    const animationProgress = useRef(new Animated.Value(0))
    const { t } = useTranslation();
    const OnLoginsPress = () => {
        navigation.replace(RouteName.SIDE_NAVIGATOR);
    }

    useEffect(() => {
        Animated.timing(animationProgress.current, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: false
        }).start(() => {
            // Navigate to the desired screen here
            navigation.navigate('ConfirmBooking');
        });
    }, [])
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            borderTopWidth: 1,
            shadowColor: 'black',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.9,
            shadowRadius: 3.94,
            elevation: 7, // For An
            borderColor:'#BDC3C7'
        }}>
           
                <KeyboardAvoidingView enabled>
                    <View style={{
                        height: '100%',
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',backgroundColor:'white'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '90%',
                        }}>
                            <View style={{
                                width: '90%',
                                marginHorizontal: '5%',
                                height:"100%"
                            }}>
                                <Lottie
                                    resizeMode="contain"
                                    autoPlay={true}
                                    source={ require('../../images/LottieAnimation/Bookingdone.json')}
                                    progress={animationProgress.current}
                                />

                               
                            </View>
                        </View>
                        
                    </View>
                   
                </KeyboardAvoidingView>
         
        </View>
    )
}

export default SuccessfullConfirm

