import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { BASE_URL } from '../../utils/Api';
import { RouteName } from '../../routes';
const { width } = Dimensions.get('window');
const keySize = width / 4.2;

const MPINScreen = ({navigation}) => {
    const [pin, setPin] = useState(['', '', '', '']);

    const handleKeyPress = (digit) => {
        const newPin = [...pin];
        const emptyIndex = newPin.findIndex(p => p === '');
        if (emptyIndex !== -1) {
            newPin[emptyIndex] = digit;
            setPin(newPin);
        }
    };

    const handleDelete = () => {
        const newPin = [...pin];
        const filledIndex = newPin.findIndex(p => p === '');
        if (filledIndex === -1) {
            newPin[3] = '';
        } else if (filledIndex > 0) {
            newPin[filledIndex - 1] = '';
        }
        setPin(newPin);
    };
    // useEffect(()=>{
    //     handleChangeText()
    // },[pin])
    function formatPin(pinArray) {
        // Join the array elements into a string
        const formattedPin = pinArray.join('');
        return formattedPin;
    }
    const formattedPin = formatPin(pin);
    console.log(formattedPin);

    console.log('pin', pin)
    const fetchApi = async () => {
        // setIsLoading(true)
        try {

            const formData = new FormData()
            formData.append('mpin', formatPin(pin))
            const username = 'btcal';
            const password = '123@cal';
            const basicAuth = 'Basic ' + btoa(username + ':' + password);
            console.log('payload', formData)
            const response = await axios.post(`${BASE_URL}addMpin`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': basicAuth,
                },
            });

            console.log('ress----', response.data);
            if(response.data?.text==="MPIN added successfully"){
                navigation.navigate(RouteName.SIDE_NAVIGATOR)
            }else{
                ToastAndroid.show(`${response?.data}`, ToastAndroid.SHORT);
              }


        } catch (error) {
            console.error('Error:', error);

        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Set Pin Code</Text>
            <View style={styles.pinContainer}>
                {pin.map((digit, index) => (
                    <View key={index} style={styles.pinDot}>
                        <Text style={styles.pinDotText}>{digit !== '' ? '●' : ''}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.keypadContainer}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'SOS', 0].map((item) => (
                    <TouchableOpacity
                        style={styles.key}
                        onPress={() => {
                            if (item === 'SOS') {
                                // Handle SOS action
                                alert('SOS Pressed');
                            } else {
                                handleKeyPress(item);
                            }
                        }}
                        key={item}
                    >
                        {
                            item === 'SOS' ?
                                <TouchableOpacity style={styles.key} onPress={handleDelete}>
                                    <Icon name="backspace" size={30} color="white" />
                                </TouchableOpacity>
                                :

                                <Text style={styles.keyText}>{item}</Text>
                        }

                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.key} onPress={() => fetchApi()}>
                    <Text style={styles.keyText}>Done</Text>
                </TouchableOpacity>
            </View>
            {/* <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneButtonText}>DONE</Text>
      </TouchableOpacity> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1F1F2E',
    },
    title: {
        fontSize: 24,
        color: 'white',
        marginBottom: 20,
    },
    pinContainer: {
        flexDirection: 'row',
        marginBottom: 50,
    },
    pinDot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    pinDotText: {
        fontSize: 10,
        color: 'white',
    },
    keypadContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: width,
        justifyContent: 'center',
    },
    key: {
        width: keySize,
        height: keySize,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3A3A4A',
        margin: 5,
        borderRadius: keySize / 2,
    },
    keyText: {
        fontSize: 24,
        color: 'white',
    },
    doneButton: {
        width: keySize,
        height: keySize / 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3A3A4A',
        marginTop: 20,
        borderRadius: keySize / 2,
    },
    doneButtonText: {
        fontSize: 18,
        color: 'white',
    },
});

export default MPINScreen;
