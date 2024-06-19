import { StyleSheet, Text, View, TouchableOpacity, Easing, Image, Animated, FlatList } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import CarsDetail from './CarsDetail';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import images from '../../../index';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../utils/Api';
import axios from 'axios';
import Dimensions from '../../utils/Dimension';
import {Fonts} from '../../utils';


const CarsPriceDetail = () => {
    const { userData, activeBookings } = useSelector(
        (state: any) => state.auth,
    );
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isCarDetails, setIsCarDetails] = useState(false);
    const navigation = useNavigation()
    const animationProgress = useRef(new Animated.Value(0))
    // console.log('userdata of car detail', userData)
    const [isTextVisible, setTextVisibility] = useState(false);
    useEffect(() => {
        Animated.timing(animationProgress.current, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: false
        }).start();
    }, [])


    function totalprice(price) {
        const numericPrice = parseFloat(price);

        // Check if the conversion is successful
        if (isNaN(numericPrice)) {
            // If price is not a valid number, return an error or handle it appropriately
            return "Invalid price";
        }

        const gstAmount = numericPrice * 0.05;
        const totalAmount = numericPrice + gstAmount;
        return totalAmount;

    }
    const [selectedItem, setSelectedItem] = useState(null);

    // Automatically select the first item when the component mounts or data changes


    // Function to handle the selection of an item
    const selectItem = (item) => {
        setSelectedItem(item);
    };
    // console.log('selectitme', selectedItem)

    const _Select_car = async (id) => {
        // setIsLoading(true);


        try {
            const formData = new FormData();
            formData.append('car_id', id);

            const username = 'btcal';
            const password = '123@cal';
            const basicAuth = 'Basic ' + btoa(username + ':' + password);
            console.log('payload', formData)

            const response = await axios.post(`${BASE_URL}changecar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': basicAuth,
                },
            });
            console.log('response', response?.data)
            // if (response?.data?.message == "success") {
            //     dispatch(setBookingDetail(response?.data?.result));
            //     navigation.navigate('SuccessfullConfirm');
            // }else{
            //     ToastAndroid.show(`${response?.data?.message}`, ToastAndroid.SHORT);
            // }


        } catch (error) {
            console.error('Error:===>>>>>>>>>>', error);

        }
        //  finally {
        //     setIsLoading(false); // Set loading state to false when API call completes (success or error)
        // }
    }

    const [selectedCarId, setSelectedCarId] = useState(null);
    const [selectedSubCar, setSelectedSubCar] = useState({});

    const selectCar = (carId) => {
        setSelectedCarId(selectedCarId === carId ? null : carId);
    };

    const selectSubCar = (mainCarId, subCar) => {
        setSelectedSubCar((prevState) => ({
            ...prevState,
            [mainCarId]: subCar,
        }));
    };
    // console.log('setSelectedSubCar', selectedSubCar)
    const selectedCar = selectedSubCar[selectedCarId];
    // console.log('selectedCar', selectedCar)
    return (
        <>

            {
                userData ? (
                    <View style={{
                        flex: 1,
                        padding: 15,
                        backgroundColor: 'white',
                        borderTopWidth: 1,
                        shadowColor: 'black',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.9,
                        shadowRadius: 3.94,
                        elevation: 7,
                        borderColor: '#BDC3C7'
                    }}>
                        <FlatList
                            data={userData}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => {
                                const mainCarData = selectedSubCar[item.id] || item;
                                return (
                                    <View style={{ borderWidth: 1, borderRadius: 10, borderColor: 'gray', marginTop: 10 }}>
                                        <View style={{ flexDirection: 'row', padding: 10 }}>
                                            <View style={{ justifyContent: 'center' }}>
                                                <Image
                                                    source={{ uri: `https://www.bharattaxi.com/images/car_image/${mainCarData.car_image}` }}
                                                    style={{ height: 30, width: 50 }}
                                                    resizeMode='contain'
                                                />
                                            </View>
                                            <View style={{ flexGrow: 1, marginLeft: 10, width: "50%" }}>
                                                <View style={{ width: "90%" }}>
                                                    <Text style={{ fontSize: 17, fontWeight: "700", color: 'black', width: "80%" ,fontFamily:Fonts.Poppins_Regular}}>{mainCarData.car_name}</Text>
                                                </View>
                                                <View style={{
                                                    borderWidth: 1, width: '50%', justifyContent: 'center',
                                                    alignItems: 'center', borderRadius: 5, marginTop: 5, borderColor: 'gray'
                                                }}>
                                                    <Text style={{ color: 'gray',fontFamily:Fonts.Poppins_Regular }}>{mainCarData.class_name}</Text>
                                                </View>
                                                <View style={{ borderRadius: 5, marginTop: 5, flexDirection: 'row', width: '75%' }}>
                                                    <Text style={{ color: 'black', fontSize: 12 }}>Package</Text>
                                                    <Text style={{ marginLeft: 10, color: 'gray', fontSize: 12 ,fontFamily:Fonts.Poppins_Regular}}>{mainCarData.package_name}</Text>
                                                </View>
                                            </View>
                                            <View style={{ justifyContent: "center" }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <TouchableOpacity
                                                        style={{
                                                            borderWidth: 1, width: 17, borderRadius: 10, height: 17,
                                                            justifyContent: "center", alignItems: 'center', borderColor: '#FFA807',
                                                            top: Dimensions.hp(0.3)
                                                        }}
                                                        onPress={() => { navigation.navigate('CarsDetail', { data: mainCarData }) }}>
                                                        <Text style={{ color: '#FFA807',fontFamily:Fonts.Poppins_Regular, bottom: Dimensions.hp(0.3) }}>i</Text>
                                                    </TouchableOpacity>
                                                    <Text style={{ color: 'black', fontWeight: '700', paddingLeft:Dimensions.wp(1.5) ,fontFamily:Fonts.Poppins_Regular}}>
                                                        ₹ {mainCarData.total_price || mainCarData.car_price}
                                                    </Text>
                                                </View>
                                                <View style={{ marginTop: 6 }}>
                                                    <Text style={{ fontSize: 12, color: 'gray',fontFamily:Fonts.Poppins_Regular }}>Inc. GST &DA</Text>
                                                </View>
                                                <TouchableOpacity
                                                    style={{
                                                        backgroundColor: '#007BFF', paddingHorizontal: 20, height: 30,
                                                        justifyContent: 'center', alignItems: 'center', borderRadius: 6
                                                    }}
                                                    onPress={() => navigation.navigate('TripDetails', { data: mainCarData })}>
                                                    <Text style={{ color: 'white',fontFamily:Fonts.Poppins_Regular }}>Select</Text>

                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        {item.select &&
                                            <View style={{ marginHorizontal: 10, borderTopWidth: 1, borderColor: "gray" }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ width: '40%' }}>
                                                        <Text style={{ fontSize: 15, fontWeight: "500", color: "black",fontFamily:Fonts.Poppins_Regular }}>Duration</Text>
                                                    </View>

                                                    <View style={{}}>
                                                        <Text style={{color:"black",fontFamily:Fonts.Poppins_Regular}}>{mainCarData?.duration}</Text>
                                                    </View>
                                                </View>

                                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                    <View style={{ width: '40%' }}>
                                                        <Text style={{ fontSize: 15, fontWeight: "500", color: "black" ,fontFamily:Fonts.Poppins_Regular}}>Start</Text>
                                                    </View>

                                                    <View>
                                                        <Text style={{color:"black",fontFamily:Fonts.Poppins_Regular}}>{activeBookings?.state}</Text>
                                                    </View>
                                                </View>

                                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                    <View style={{ width: '40%' }}>
                                                        <Text style={{ fontSize: 15, fontWeight: "500", color: "black",fontFamily:Fonts.Poppins_Regular }}>Max. member</Text>
                                                    </View>

                                                    <View>
                                                        <Text style={{color:"black",fontFamily:Fonts.Poppins_Regular}}>{mainCarData?.capacity}</Text>
                                                    </View>
                                                </View>

                                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                    <View style={{ width: '40%' }}>
                                                        <Text style={{ fontSize: 15, fontWeight: "500", color: "black",fontFamily:Fonts.Poppins_Regular }}>Luggage</Text>
                                                    </View>

                                                    <View>
                                                        <Text style={{color:"black",fontFamily:Fonts.Poppins_Regular}}>{mainCarData?.luggage}</Text>
                                                    </View>
                                                </View>
                                            </View>}
                                        {item.select &&
                                            <TouchableOpacity
                                                style={{
                                                    paddingVertical: 10, borderColor: 'gray',
                                                    marginHorizontal: 10, marginTop: 5, flexDirection: 'row', alignItems: 'center'
                                                }}
                                                onPress={() => selectCar(item.id)}
                                            >
                                                <Text style={{ color: "#007BFF", fontWeight: '700',fontFamily:Fonts.Poppins_Regular }}>Select Car</Text>
                                                <AntDesign name={'caretdown'} size={10} color={"#007BFF"} style={{ marginLeft: 5 }} />
                                            </TouchableOpacity>}
                                        {selectedCarId === item.id && (
                                            <View style={{ width: '95%', marginHorizontal: 10, marginVertical: 5,borderTopWidth:1,borderColor:'gray' }}>
                                                <FlatList
                                                    data={item.select}
                                                    keyExtractor={(selectItem, index) => index.toString()}
                                                    numColumns={3}
                                                    renderItem={({ item: subCarItem }) => {
                                                        const isSelected = selectedSubCar[item.id]?.car_id === subCarItem.car_id;
                                                        return (
                                                            <TouchableOpacity
                                                                style={{ flexGrow: 1, marginTop: 5 }}
                                                                onPress={() => selectSubCar(item.id, subCarItem)}
                                                            >
                                                                <View style={{
                                                                    backgroundColor: isSelected ? '#007BFF' : 'white',
                                                                    justifyContent: "center", alignItems: "center", height: 40, borderRadius: 5
                                                                }}>
                                                                    <View style={{}}>
                                                                        <Text style={{ color: isSelected ? 'white' : 'black',fontFamily:Fonts.Poppins_Regular }}>{subCarItem.car_name}</Text>
                                                                    </View>

                                                                </View>
                                                            </TouchableOpacity>
                                                        );
                                                    }}
                                                />
                                            </View>
                                        )}
                                    </View>
                                );
                            }}
                        />
                    </View>
                ) : (
                    <View style={{ padding: 10, justifyContent: "center", alignItems: "center", flex: 1 }}>
                        <Text style={{ color: 'black', fontSize: 18 ,fontFamily:Fonts.Poppins_Regular}}>No search result to this city</Text>
                    </View>
                )
            }
        </>

    )
}

export default CarsPriceDetail

const styles = StyleSheet.create({})