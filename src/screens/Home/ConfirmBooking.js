import { Image, StyleSheet, Text, View, Alert, ToastAndroid, ActivityIndicator, PermissionsAndroid, Platform } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ScrollView } from 'react-native'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../utils/Api';
import RNFS from 'react-native-fs';
import { Fonts } from '../../utils';

import RNFetchBlob from 'rn-fetch-blob';

const ConfirmBooking = () => {
    const { userData, userId, activeBookings, carDetail, bookingDetail, dataUser } = useSelector(
        (state: any) => state.auth,
    );
    console.log('bookingDetail', bookingDetail)
    const [fileUrl, setFileUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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

    function GstPrice(price) {
        const numericPrice = parseFloat(price);

        // Check if the conversion is successful
        if (isNaN(numericPrice)) {
            // If price is not a valid number, return an error or handle it appropriately
            return "Invalid price";
        }

        const gstAmount = numericPrice * 0.05;

        return gstAmount;

    }
    const data = [
        {
            name: "Booking id",
            value: `${bookingDetail?.booking_id}`
        },
        {
            name: "Package  Name",
            value: `${bookingDetail?.package_name}`
        },
        {
            name: "Source City",
            value: `${activeBookings?.source_city}`
        },
        {
            name: "Car Name",
            value: `${carDetail?.car_name}`
        },
        {
            name: "Pickup Date & Time ",
            value: `${bookingDetail?.pickup_date}-${bookingDetail?.pickup_time}`
        },
        {
            name: "Pickup Location",
            value: `${bookingDetail?.pickup_location}`
        },

    ]
    // booking_price
    const Fare = [
        {
            name: 'Fare',
            value: `₹ ${carDetail?.car_price}`
        },
        // {
        //     name:'Booking Fare',
        //     value:"₹ 5261"
        // },
        {
            name: 'GST(5%)',
            value: `₹ ${carDetail?.service_tax}`
        },
        {
            name: 'Total Price',
            value: `₹ ${(carDetail?.total_price)}`
        }
    ]
    // const fileUrl = `https://web.bharattaxi.com/api${pdf}`

    const downloadFile = async (fileUrl) => {
        const url = fileUrl // Replace with your PDF URL
        const { config, fs } = RNFetchBlob;



        const fileExtension = url.split('.').pop();
        const fileName = `Bharat_Taxi${Date.now()}.${fileExtension}`;
        const path = `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`;

        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message: 'App needs access to your storage to download the file',
                    }
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
                    return;
                }
            }

            config({
                fileCache: true,
                path,
            })
                .fetch('GET', url)
                .then((res) => {
                    Alert.alert('Download complete', `File saved to ${res.path()}`);
                })
                .catch((error) => {
                    console.error('Download failed', error);
                    Alert.alert('Download failed', 'There was an error downloading the file');
                });
        } catch (error) {
            console.error('Download failed', error);
            Alert.alert('Download failed', 'There was an error downloading the file');
        } finally {
            setIsLoading(false)
        }
    };

    const _Download_list = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('booking_id', bookingDetail?.id);

            const username = 'btcal';
            const password = '123@cal';
            const basicAuth = 'Basic ' + btoa(username + ':' + password);

            const response = await axios.post(`${BASE_URL}bookingpdf`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': basicAuth,
                },
            });

            console.log('Response:', response?.data);

            downloadFile(response?.data?.pdf_url)
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <View style={{
            backgroundColor: 'white', flex: 1, padding: 15, borderTopWidth: 1,
            shadowColor: 'black',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.9,
            shadowRadius: 3.94,
            elevation: 7, // For An
            borderColor: '#BDC3C7'
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ borderBottomWidth: 1, borderColor: 'gray', paddingVertical: 10, flexDirection: 'row', borderColor: 'gray' }}>
                    <Image source={require('../../images/right.png')} />
                    <Text style={{
                        color: '#007BFF', fontWeight: '700',
                        fontSize: 17, marginLeft: 7,fontFamily: Fonts.Poppins_Regular
                    }}>Booking confirm</Text>
                    <View style={{ flexGrow: 1, alignItems: 'flex-end', justifyContent: "center", marginTop: -7 }}>
                        <TouchableOpacity style={{
                            backgroundColor: '#007BFF', padding: 10, borderRadius: 10,
                            justifyContent: 'center', alignItems: 'center',flexDirection:'row'
                        }}
                            onPress={() => _Download_list()}
                        >
                            <Image source={require('../../images/info.png')} tintColor={'white'}/>
                            <Text style={{ color: 'white', fontSize: 14,marginLeft:3 ,fontFamily: Fonts.Poppins_Regular}}>Download</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ paddingVertical: 10 }}>
                    <Text style={{ color: 'black', fontSize: 16 ,fontFamily: Fonts.Poppins_Regular}}>Hi {dataUser?.username},</Text>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 15, color: 'gray' ,fontFamily: Fonts.Poppins_Regular}}>Your booking is
                            created. You will soon receive a call/SMS/email from us after
                            verifying your booking details.</Text>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <View style={{ borderBottomWidth: 1, borderColor: 'gray', paddingVertical: 10 }}>
                        <Text style={{ color: 'black', fontSize: 17, fontWeight: '500',fontFamily: Fonts.Poppins_Regular }}>Booking details</Text>
                    </View>



                    {
                        data?.map((item) => {
                            return (
                                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                                    <View style={{ width: '50%' }}>
                                        <Text style={{ color: 'black', fontSize: 15,fontFamily: Fonts.Poppins_Regular }}>{item?.name}</Text>
                                    </View>
                                    <View style={{ width: '50%' }}>
                                        <Text style={{ color: 'gray' ,fontFamily: Fonts.Poppins_Regular}}>{item?.value}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }



                </View>


                <View style={{ marginTop: 20 }}>
                    <View style={{ borderBottomWidth: 1, borderColor: 'gray', paddingVertical: 10 }}>
                        <Text style={{ color: 'black', fontSize: 17, fontWeight: '500',fontFamily: Fonts.Poppins_Regular }}>Fare details</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: 'black', fontSize: 15 ,fontFamily: Fonts.Poppins_Regular}}>Fare</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: 'gray',fontFamily: Fonts.Poppins_Regular }}>{bookingDetail?.booking_price}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: 'black', fontSize: 15 ,fontFamily: Fonts.Poppins_Regular}}>GST(5%)</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: 'gray' ,fontFamily: Fonts.Poppins_Regular}}>{bookingDetail?.service_tax}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: 'black', fontSize: 15,fontFamily: Fonts.Poppins_Regular }}>Total price</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: 'gray',fontFamily: Fonts.Poppins_Regular }}>{bookingDetail?.total_price}</Text>
                        </View>
                    </View>




                   



                </View>
            </ScrollView>
            {isLoading &&
                <View style={{
                    flex: 1, justifyContent: 'center', alignItems
                        : 'center', position: 'absolute', height: '100%', width: '100%'
                        // ,backgroundColor:'#B2BABB'
                }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            }
        </View>
    )
}

export default ConfirmBooking

const styles = StyleSheet.create({})