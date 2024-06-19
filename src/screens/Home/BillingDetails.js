
import {
    Image, StyleSheet, Text, View, TouchableOpacity, Modal,
    TextInput, Dimensions, ScrollView, Pressable, FlatList, Alert,
    ToastAndroid, ActivityIndicator
} from 'react-native'
import React, { useState, useEffect } from 'react'
// import { CheckBox } from '../../components';
import Geolocation from '@react-native-community/geolocation';
import { useSelector, useDispatch } from 'react-redux';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { BASE_URL } from '../../utils/Api';
import { setBookingDetail } from '../../redux/slice';
import CheckBox from '@react-native-community/checkbox';
import { color } from 'react-native-elements/dist/helpers';
import Geocoder from 'react-native-geocoding';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native';
import { Fonts } from '../../utils';

const BillingDetails = ({ navigation }) => {

    const termsText = `
  Welcome to the Bharat Taxi Customer App. These Terms and Conditions (&quot;Terms&quot;) govern
your access to and use of our mobile application and related services (collectively, the
&quot;Service&quot;) provided by Bharat Taxi (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By accessing or using
the Service, you agree to be bound by these Terms and all applicable laws and regulations.
`;
const termtext2 =`Bharat Taxi provides an online taxi booking platform that enables users to request taxi
services based on their current location. The Service includes features that allow users to
view and manage bookings, access taxi availability in real-time, and make payments directly
through the mobile application.`

const termtext3 =` Registration: To access and use certain features of the Service, you must register for
an account by providing your email address, mobile number, and creating a secure
password.
 Account Responsibility: You are responsible for maintaining the confidentiality of
your account login information and are fully responsible for all activities that occur
under your account.`

const termtext4 =` Collection and Use: The Service requires access to your device’s GPS location to
provide taxi booking services effectively. By using the Service, you agree to the
collection and use of your real-time geographical location information.
 Accuracy and Updates: You are responsible for providing accurate location data and
ensuring that your location services are enabled. We are not responsible for any
service issues resulting from inaccurate or outdated location data.`

const termtext5 =`You are prohibited from using the Service to:
 Engage in unlawful or fraudulent activities.
 Interfere with the proper operation of the Service.
 Violate the privacy or other rights of other users.`

    const _google_api_key = "AIzaSyBROrj6ildPHETPysda_MuT6cZYpAVyEAw"
    const { height } = Dimensions.get('screen')
    const dispatch = useDispatch()
    const { userData, userId, dataUser, carDetail, activeBookings } = useSelector(
        (state: any) => state.auth,
    );
    const [pickuploaction, setPickuploaction] = useState('')
    const [numberpassenger, setNumberpassenger] = useState('')
    const [location_name, setLocation_name] = useState('')
    const [position, setPosition] = useState();
    const [marker, setMarker] = useState(null);
    const [locationName, setLocationName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);

 
    const handleMapPress = async (event) => {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      setMarker({ latitude, longitude });
  
      try {
        const response = await Geocoder.from(latitude, longitude);
        const address = response.results[0].formatted_address;
        setLocationName(address);
      } catch (error) {
        console.error(error);
      }
    };

    console.log('locationName',locationName)
    useEffect(()=>{
        setPickuploaction(location_name?location_name:"")
    },[location_name])

    console.log('location_name',location_name)
    useEffect(() => {
        Geolocation.getCurrentPosition((pos) => {
            const crd = pos.coords;

            setPosition({
                latitude: crd.latitude,
                longitude: crd.longitude,
                latitudeDelta: 0.0421,
                longitudeDelta: 0.0421,

            });
            getLocationName(crd.latitude, crd.longitude)
        })

    }, []);

    const getLocationName = (latitude, longitude) => {
        return new Promise((resolve, reject) => {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${_google_api_key}`)
                .then(response => response.json())
                .then(data => {
                    if (data.results && data.results.length > 0) {
                        const locationName = data.results[0].formatted_address.slice(0, 40);
                        setLocation_name(locationName)
                        console.log('location anme', locationName)
                        resolve(locationName);
                    } else {
                        reject(new Error('No location found for the provided latitude and longitude.'));
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    };
    console.log('dataUser', dataUser)
    console.log('pickuploaction', pickuploaction)
    const stateArray = {
        toggleCheckBoxCancel_1: false,
        toggleCheckBoxCancel_2: false,
        toggleCheckBoxCancel_3: false,
        toggleCheckBoxCancel_4: false,
        toggleCheckBoxCancel_5: false,
    };
    const [state, setState] = useState(stateArray);

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

    const [searchQuery, setSearchQuery] = useState('');
    const [locations, setLocations] = useState([]);

    const fetchLocations = async (query) => {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${_google_api_key}`);
            const data = await response.json();
            setLocations(data.predictions);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const handleChangeText = (text) => {
        setSearchQuery(text);
        fetchLocations(text);
    };

    const renderLocationItem = ({ item }) => (

        <TouchableOpacity style={{ marginTop: 10, width: '100%' }} onPress={() => { setPickuploaction(item?.description); setModalVisible(!modalVisible) }}>
            <Text style={{ color: 'black', fontWeight: '500',fontFamily: Fonts.Poppins_Regular }}>{item.description}</Text>
        </TouchableOpacity>


    );

    const [isLoading, setIsLoading] = useState(false);
    const _Booking_Confirm = async () => {
        setIsLoading(true); // Set loading state to true when API call starts

        if (!pickuploaction) {
            setIsLoading(false); // Set loading state to false if validation fails
            ToastAndroid.show('Fill pickup location', ToastAndroid.SHORT);
        } else if (state.toggleCheckBoxCancel_2 === false) {
            setIsLoading(false); // Set loading state to false if condition fails
            ToastAndroid.show('checked the book now pay later', ToastAndroid.SHORT);
        } else if (state.toggleCheckBoxCancel_3 === false) {
            setIsLoading(false); // Set loading state to false if condition fails
            ToastAndroid.show('Accept term and condition', ToastAndroid.SHORT);
        } else {
            try {
                const formData = new FormData();
                formData.append('uname', dataUser?.username);
                formData.append('email', dataUser?.email);
                formData.append('mobileno', dataUser?.mobile);
                formData.append('id', carDetail?.id);
                formData.append('pickup_location', pickuploaction);

                const username = 'btcal';
                const password = '123@cal';
                const basicAuth = 'Basic ' + btoa(username + ':' + password);
                console.log('payload',formData)

                const response = await axios.post(`${BASE_URL}bookingConfirm`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': basicAuth,
                    },
                });
                console.log('response', response?.data?.message )
                if (response?.data?.message == "success") {
                    dispatch(setBookingDetail(response?.data?.result));
                    navigation.navigate('SuccessfullConfirm');
                }else{
                    ToastAndroid.show(`${response?.data?.message}`, ToastAndroid.SHORT);
                }
               

            } catch (error) {
                console.error('Error:===>>>>>>>>>>', error);
                
            } finally {
                setIsLoading(false); // Set loading state to false when API call completes (success or error)
            }
        }
    };
    console.log('dataUser', userId)

    console.log('checkstatataaaaa', state.toggleCheckBoxCancel_2);
    // const [modalVisible, setModalVisible] = useState(false);
    return (
        < >

            <View style={{
                flex: 1,
                padding: 15,
                backgroundColor: 'white',
                borderTopWidth: 1,
                shadowColor: 'black',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.9,
                shadowRadius: 3.94,
                elevation: 7, // For An
                borderColor: '#BDC3C7',
                height:height
            }}>

                <View style={{ height: height / 2.2, }}>
                    <View style={{ borderBottomWidth: 1, borderColor: 'gray', paddingVertical: 10 }}>
                        <Text style={{ color: 'black', fontWeight: '700', fontSize: 17 ,fontFamily: Fonts.Poppins_Regular}}>Billing details</Text>
                    </View>
                    <View style={{ height: '55%', paddingVertical: 10 }}>

                        <View style={{}}>
                            <Text style={{ color: 'black', fontSize: 15, fontWeight: '600',fontFamily: Fonts.Poppins_Regular }}>Mobile no.</Text>
                            <Text style={{ color: "gray" ,fontFamily: Fonts.Poppins_Regular}}>{dataUser?.mobile}</Text>
                        </View>



                        <View style={{ marginTop: 20 }}>
                            <Text style={{ color: 'black', fontSize: 15, fontWeight: '600',fontFamily: Fonts.Poppins_Regular }}>Email</Text>
                            <Text style={{ color: "gray" ,fontFamily: Fonts.Poppins_Regular}}>{dataUser?.email}</Text>
                        </View>


                        <View style={{ marginTop: 20 }}>
                            <Text style={{ color: 'black', fontSize: 15, fontWeight: '600' ,fontFamily: Fonts.Poppins_Regular}}>Full name</Text>
                            <Text style={{ color: "gray" ,fontFamily: Fonts.Poppins_Regular}}>{dataUser?.username}</Text>
                        </View>
                        {/* <View style={{ marginTop: 20 }}>
                            <Text style={{ color: 'black', fontSize: 15, fontWeight: '600' }}>Number of Passenger</Text>
                            <TextInput style={{ borderWidth: 1, borderRadius: 10, height: 40, marginTop: 10, paddingHorizontal: 10 }}
                                placeholder='Enter Number of passenger'
                                placeholderTextColor={"gray"}
                                onChangeText={(text) => setNumberpassenger(text)}
                                keyboardType='numeric'
                            />
                        </View> */}

                        <View style={{ marginTop: 20 }}>
                            <Text style={{ color: 'black', fontSize: 15, fontWeight: '600',fontFamily: Fonts.Poppins_Regular }}>Pickup location</Text>
                            <TextInput style={{ borderWidth: 1, borderRadius: 10, height: 40, marginTop: 10, paddingHorizontal: 10 , color:'black'}}
                                placeholder='Enter pickup location'
                                placeholderTextColor={'#bbb'}
                                placeholderTextColor={"gray"}
                                onChangeText={(text) => setPickuploaction(text)}
                                value={pickuploaction}
                            />
                        </View>

                        <TouchableOpacity style={{
                            flexDirection: 'row', marginTop
                                : 7, alignItems: 'center'
                        }}
                            onPress={() => setModalVisible(true)}
                        >
                            <Image source={require('../../images/location.png')} />
                            <Text style={{ marginLeft: 6, color: "#007BFF", fontWeight: "500",fontFamily: Fonts.Poppins_Regular }}>Mark your location</Text>
                        </TouchableOpacity>

                    </View>


                </View>
                <View style={{ height: height /4.5}}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',

                        marginTop: 5,

                    }}>
                        <CheckBox disabled={false}
                            value={state.toggleCheckBoxCancel_2}
                            tintColors={{ true: '#007BFF', false: "gray" }}
                            onValueChange={(text) => setState({ ...state, toggleCheckBoxCancel_2: text })} />
                        <Text style={{ color: '#173B86' ,fontFamily: Fonts.Poppins_Regular}}>Book now pay later</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',

                        marginTop: 5
                    }}>
                        <CheckBox disabled={false}
                            value={state.toggleCheckBoxCancel_3}
                            tintColors={{ true: '#007BFF', false: "gray" }}
                            onValueChange={(text) => setState({ ...state, toggleCheckBoxCancel_3: text })} />
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {setModalVisible1(true)}}>
                            <Text style={{ color: '#173B86',fontFamily: Fonts.Poppins_Regular }}>I accept</Text>
                            <Text style={{ color: '#007BFF', marginLeft: 5 ,fontFamily: Fonts.Poppins_Regular}}>term and condition</Text>
                        </TouchableOpacity>

                    </View>

                </View>
                <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible1(!modalVisible1);
        }}>
        <View style={styles.centeredView}>
        <SafeAreaView style={styles.safeArea}>
    <View style={styles.header}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="cross" size={40} color={'#fff'} paddingHorizontal={15} />
          </TouchableOpacity>
      
    </View>

    <ScrollView style={styles.container}>
    <Text style={[styles.headerText, {textAlign:'center'}]}>Terms and Conditions for Bharat Taxi Customer App</Text>
    <Text style={[styles.headerText, {top:5}]}>Last Updated: 14-06-2024</Text>

      <Text style={styles.text}>{termsText}</Text>
    <Text style={[styles.headerText, {top:5}]}>1. Service Description</Text>
    <Text style={[styles.text, {top:10}]}>{termtext2}</Text>
    <Text style={styles.text}>{termsText}</Text>
    <Text style={[styles.headerText, {top:5}]}>2. User Accounts</Text>
    <Text style={[styles.text, {top:10}]}>{termtext3}</Text>
    <Text style={[styles.headerText, {top:5}]}>3. Location Data</Text>
    <Text style={[styles.text, {top:10}]}>{termtext4}</Text>
    <Text style={[styles.headerText, {top:5}]}>4. Bookings and Payments</Text>
    <Text style={[styles.text, {top:10}]}>{termtext5}</Text>
    


    </ScrollView>
  </SafeAreaView>
        </View>
      </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {

                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{ flex: 1, }}>

                                <MapView
                                    region={{
                                        latitude: position ? position.latitude : 22.2990017,
                                        longitude: position ? position.longitude : 70.7945285,
                                        latitudeDelta: position ? 0.015 : 0.015,
                                        longitudeDelta: position ? 0.0121 : 0.0121,
                                    }}
                                    onPress={handleMapPress}
                                    initialRegion={position}
                                    showsUserLocation={true}
                                    showsMyLocationButton={true}
                                    followsUserLocation={true}
                                    showsCompass={true}
                                    scrollEnabled={true}
                                    zoomEnabled={true}
                                    pitchEnabled={true}
                                    rotateEnabled={true}
                                    style={{
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        bottom: 0,
                                        position: 'absolute',
                                    }}
                                    provider={PROVIDER_GOOGLE}
                                >
                                    <Marker
                                        coordinate={
                                            {
                                                latitude: position ? position.latitude : 22.2990017,
                                                longitude: position ? position.longitude : 70.7945285,
                                                latitudeDelta: position ? 0.015 : 0.015,
                                                longitudeDelta: position ? 0.0121 : 0.0121,
                                            }
                                        }>

                                    </Marker>
                                    <Marker
                                        coordinate={
                                            {
                                                latitude: position ? position.latitude + 0.001 : 22.2990017,
                                                longitude: position ? position.longitude + 0.002 : 70.7945285,
                                                latitudeDelta: position ? 0.015 : 0.015,
                                                longitudeDelta: position ? 0.0121 : 0.0121,
                                            }
                                        }>

                                    </Marker>
                                    <Marker
                                        coordinate={
                                            {
                                                latitude: position ? position.latitude + 0.002 : 22.2990017,
                                                longitude: position ? position.longitude - 0.003 : 70.7945285,
                                                latitudeDelta: position ? 0.015 : 0.015,
                                                longitudeDelta: position ? 0.0121 : 0.0121,
                                            }
                                        }>

                                    </Marker>
                                </MapView>

                            </View>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center', paddingHorizontal: 10, position: 'absolute', backgroundColor: 'white'
                            }}>
                                <View style={{
                                    width
                                        : "90%"
                                }}>
                                    <TextInput
                                        placeholder='search pickup location'
                                        style={{ borderWidth: 1, borderRadius: 10, paddingHorizontal: 10 ,color:'black'}}
                                        onChangeText={handleChangeText}
                                        placeholderTextColor={"black"}
                                    />

                                </View>

                                <View style={{ flexGrow: 1, alignItems: "flex-end",borderWidth:2,borderRadius:30 ,marginLeft:4}}>
                                    <Entypo name={'cross'} size={30} onPress={() => setModalVisible(!modalVisible)} color={'black'}/>
                                </View>


                            </View>

                            <View style={{
                                position: "absolute", backgroundColor: 'white',
                                marginTop: 55, padding: 10, width: '100%'
                            }}>

                                <FlatList
                                    data={locations}
                                    renderItem={renderLocationItem}
                                    keyExtractor={(item) => item.place_id}
                                />
                            </View>


                        </View>
                    </View>
                </Modal>
                <TouchableOpacity  disabled={state.toggleCheckBoxCancel_2 === true  &&  state.toggleCheckBoxCancel_3 === true ? false : true} style={{
                    backgroundColor: state.toggleCheckBoxCancel_2 === true  && state.toggleCheckBoxCancel_3 === true ? '#007BFF' : 'grey' ,
                    borderRadius: 10, justifyContent: 'center', alignItems: 'center', height: 45, bottom:0, top: responsiveHeight(2),
                }}
                    // onPress={() => navigation.navigate('SuccessfullConfirm')}
                    onPress={() => _Booking_Confirm()}
                // disabled={!pickuploaction}

                >
                    <Text style={{ color: 'white',fontSize:17,fontFamily: Fonts.Poppins_Regular }}>Book now</Text>
                </TouchableOpacity>
            </View>

            {isLoading &&
                <View style={{
                    flex: 1, justifyContent: 'center', alignItems
                        : 'center', position: 'absolute', height: '100%', width: '100%',backgroundColor:'#B2BABB'
                }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            }
        </>
    )
}

export default BillingDetails

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        height: '100%', width: '100%',
        margin: 10,
        backgroundColor: 'white',
        marginTop: -1,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    safeArea: {
        flex:1,
        backgroundColor: '#fff',
        
      },
      header: {
        height: 60,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        flexDirection:'row'
      },
      headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: Fonts.Poppins_Regular
      },
      container: {
     paddingHorizontal:20,
        // padding: 20,
        backgroundColor: '#000',
      },
      text: {
        fontSize: 12,
        color: '#fff',
        lineHeight: 24,
        textAlign:'center',
        fontFamily: Fonts.Poppins_Regular
      },
})
