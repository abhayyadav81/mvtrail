
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { BottomSheet } from '../../components'
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../utils';
import TripDetails from './TripDetails';
import { useDispatch } from 'react-redux';
import { setcarDetail } from '../../redux/slice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RenderHTML from 'react-native-render-html';
import Dimensions from '../../utils/Dimension';
import {Fonts} from '../../utils';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const CarsDetail = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const [istripDetails, setIstripDetails] = useState(false);
    console.log('route', route?.params?.data)
    const [isTextVisible, setTextVisibility] = useState(false);
    const [Exclusion, setExcluion] = useState(false)
    const [extra, setExtra] = useState(false)
    const [term, setTerm] = useState(false)
    const [packagee, setPackage] = useState(false)
    const [itneray, setItinerary] = useState(false)
    const [int, setInt] = useState(false)
    useEffect(() => {
        dispatch(setcarDetail(route?.params?.data))
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

    const cleanTermsCondition = (html) => {
        if (!html) return []; // Return an empty array if html is falsy
        return html
            .replace(/<\/?li>/g, '') // Remove <li> and </li> tags
            .trim()
            .split('\n') // Split by newline
            .filter((item) => item.trim().length > 0); // Remove empty lines
    };

    const termsCondition = route?.params?.data?.terms_condition || ''; // Default to empty string if undefined or null
    const conditions = cleanTermsCondition(termsCondition);
    return (
        <View style={{
            flex: 1, height: '100%', backgroundColor: 'white', padding: 10,
            borderTopWidth: 1,
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


            <View style={{ borderWidth: 1, borderRadius: 10, borderColor: 'gray', padding: 10, marginTop: 10, height: '100%' }}>
                <View style={{
                    backgroundColor: 'gray', alignItems: "center", justifyContent: 'center',
                    width: '10%', marginHorizontal: 10, borderRadius: 5
                }}>
                    <Icon name="arrow-back" size={(25)} color={"white"} onPress={() => navigation.goBack()} />
                </View>
                <ScrollView>
                    <View style={{ height: "85%" }}>

                        <View style={{ flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1.5, borderColor: 'gray', marginHorizontal: 10 }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Image source={{ uri: `https://www.bharattaxi.com/images/car_image/${route?.params?.data?.car_image}` }}
                                    style={{ height: 30, width: 50 }} resizeMode='contain'
                                />
                            </View>


                            <View style={{ flexGrow: 1, marginLeft: 10, width: '56%' }}>
                                <Text style={{ fontSize: 17, fontWeight: "700", color: 'black' ,fontFamily:Fonts.Poppins_Regular}}>{route?.params?.data?.car_name}</Text>
                                <View style={{
                                    borderWidth: 1, width: '30%', justifyContent: 'center',
                                    alignItems: 'center', borderRadius: 5, marginTop: 5, borderColor: 'gray'
                                }}>
                                    <Text style={{ color: 'gray', fontSize: 12 ,fontFamily:Fonts.Poppins_Regular}}>{route?.params?.data?.class_name}</Text>
                                </View>

                                <View style={{ borderRadius: 5, marginTop: 5, flexDirection: 'row' }}>
                                    <Text style={{ color: 'black', fontSize: 14,fontFamily:Fonts.Poppins_Regular, fontWeight:'500' }}>Package</Text>
                                    <View style={{ width: '80%' }}>
                                        <Text style={{ marginLeft: 10, color: 'gray', fontSize: 12,fontFamily:Fonts.Poppins_Regular, marginTop:responsiveHeight(0.3) }}>{route?.params?.data?.package_name}</Text>
                                    </View>
                                </View>

                                {route?.params?.Idetails &&
                                    <View style={{ borderRadius: 5, marginTop: 5, flexDirection: 'row' }}>
                                    <Text style={{ color: 'black', fontSize: 14,fontFamily:Fonts.Poppins_Regular, fontWeight:'500' }}>Charged distance</Text>
                                    <View style={{ width: '80%' }}>
                                        <Text style={{ marginLeft: 10, color: 'gray', fontSize: 12,fontFamily:Fonts.Poppins_Regular, marginTop:responsiveHeight(0.3) }}>{route?.params?.Idetails}</Text>
                                    </View>
                                </View>
}
                            </View>
                            <View style={{ alignItems: "flex-end", }}>

                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={{
                                        width: 20, borderRadius: 10,
                                        justifyContent: "center", alignItems: 'center', backgroundColor: '#FFA807', height: 20
                                    }}>
                                        <Text style={{ color: 'white' ,fontFamily:Fonts.Poppins_Regular }}>i</Text>
                                    </TouchableOpacity>
                                    <View style={{marginLeft:5}}>
                                    {
                                        route?.params?.data?.total_price ?
                                            <Text style={{ color: 'black', fontWeight: '700',fontFamily:Fonts.Poppins_Regular }}>
                                                ₹ {route?.params?.data?.total_price}</Text>
                                            :
                                            <Text style={{ color: 'black', fontWeight: '700',fontFamily:Fonts.Poppins_Regular }}>
                                                ₹ {route?.params?.data?.car_price}</Text>
                                    }
                                    </View>

                                </View>

                                <View style={{ marginTop: 6 }}>
                                    <Text style={{ fontSize: 12, color: 'gray' ,fontFamily:Fonts.Poppins_Regular}}>Inc. GST &DA</Text>
                                </View>


                            </View>





                        </View>
                        {route?.params?.data?.base_fare &&
                            <TouchableOpacity
                                style={{
                                    paddingVertical: 10, borderBottomWidth: 1, borderColor: 'gray',
                                    marginHorizontal: 10, marginTop: 5, flexDirection: 'row'
                                }}
                                onPress={() => { setTextVisibility(!isTextVisible); setExtra(false); setExcluion(false); setTerm(false) }}
                            >
                                <Text style={{ color: "black", fontWeight: '600',fontFamily:Fonts.Poppins_Regular }}>Fare breakup</Text>
                                {
                                    isTextVisible === true ?
                                        <View style={{ flexGrow: 1, alignItems: 'flex-end' }}>
                                            <MaterialIcons name={'keyboard-arrow-up'} size={25} color={'gray'} />
                                        </View>
                                        :
                                        <View style={{ flexGrow: 1, alignItems: 'flex-end' }}>
                                            <MaterialIcons name={'keyboard-arrow-down'} size={25} color={'gray'} />
                                        </View>}

                                {/* <MaterialIcons name={'keyboard-arrow-down'} size={25} /> */}
                            </TouchableOpacity>
                        }
                        {
                            isTextVisible === true ?
                                <>
                                    <View style={{ flexDirection: 'row', padding: 15, marginHorizontal: 10 }}>
                                        <Text style={{ color: 'gray', fontWeight: '600' ,width:'50%',fontFamily:Fonts.Poppins_Regular}}>Base Fare</Text>
                                        <View style={{ flexGrow: 1,  }}>
                                            <Text style={{ color: 'gray', fontWeight: '600' ,fontFamily:Fonts.Poppins_Regular}}> ₹{route?.params?.data?.base_fare}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginHorizontal: 25 }}>
                                        <Text style={{ color: 'gray', fontWeight: '600' ,width:'50%',fontFamily:Fonts.Poppins_Regular}}>GST(5%)</Text>
                                        <View style={{ flexGrow: 1, }}>
                                            <Text style={{ color: 'gray', fontWeight: '600',fontFamily:Fonts.Poppins_Regular }}> ₹{route?.params?.data?.total_gst}</Text>
                                        </View>
                                    </View>
                                    <View style={{ borderTopWidth: 1, borderColor: 'gray', marginTop: 15,marginHorizontal:10 }}>

                                    </View>

                                    <View style={{ flexDirection: 'row', marginHorizontal: 25, marginTop: 15, }}>
                                        <Text style={{ color: 'black', fontWeight: '600',width:'50%',fontFamily:Fonts.Poppins_Regular }}>Total Fare</Text>
                                        <View style={{ flexGrow: 1, }}>
                                            <Text style={{ color: 'black', fontWeight: '600' ,fontFamily:Fonts.Poppins_Regular}}> ₹{route?.params?.data?.total_price}</Text>
                                        </View>
                                    </View>
                                </>
                                :
                                null
                        }

                        {route?.params?.data?.base_fare && <TouchableOpacity
                            style={{
                                paddingVertical: 10, borderBottomWidth: 1, borderColor: 'gray',
                                marginHorizontal: 10, marginTop: 5, flexDirection: 'row'
                            }}
                            onPress={() => { setExcluion(!Exclusion); setExtra(false), setTextVisibility(false); setTerm(false) }}
                        >
                            <Text style={{ color: "black", fontWeight: '600',fontFamily:Fonts.Poppins_Regular }}>Exclusion</Text>
                            {
                                Exclusion === true ?
                                    <View style={{ flexGrow: 1, alignItems: 'flex-end' }}>
                                        <MaterialIcons name={'keyboard-arrow-up'} size={25} color={'gray'} />
                                    </View>
                                    :
                                    <View style={{ flexGrow: 1, alignItems: 'flex-end' }}>
                                        <MaterialIcons name={'keyboard-arrow-down'} size={25} color={'gray'} />
                                    </View>}
                        </TouchableOpacity>}

                        {
                            Exclusion &&
                            <>
                                <View style={{ flexDirection: 'row', marginHorizontal: 25, marginTop: 15 }}>
                                    <Text style={{ color: 'gray', fontWeight: '600',fontFamily:Fonts.Poppins_Regular }}>Toll Tax</Text>


                                </View>

                                <View style={{ flexDirection: 'row', marginHorizontal: 25, marginTop: 15 }}>
                                    <Text style={{ color: 'gray', fontWeight: '600',fontFamily:Fonts.Poppins_Regular }}>Parking</Text>

                                </View>
                            </>
                        }


                        {route?.params?.data?.extra_km && <TouchableOpacity
                            style={{
                                paddingVertical: 10, borderBottomWidth: 1, borderColor: 'gray',
                                marginHorizontal: 10, marginTop: 5, flexDirection: 'row'
                            }}
                            onPress={() => { setExtra(!extra); setExcluion(false); setTextVisibility(false); setTerm(false) }}
                        >
                            <Text style={{ color: "black", fontWeight: '600',fontFamily:Fonts.Poppins_Regular }}>Extra charges</Text>
                            {
                                extra === true ?
                                    <View style={{ flexGrow: 1, alignItems: 'flex-end' }}>
                                        <MaterialIcons name={'keyboard-arrow-up'} size={25}  color={'gray'}/>
                                    </View>
                                    :
                                    <View style={{ flexGrow: 1, alignItems: 'flex-end' }}>
                                        <MaterialIcons name={'keyboard-arrow-down'} size={25} color={'gray'}/>
                                    </View>}
                        </TouchableOpacity>}
                        {
                            extra === true ?
                                <>
                                    <View style={{ flexDirection: 'row', padding: 15, marginHorizontal: 10 }}>
                                        <Text style={{ color: 'gray', fontWeight: '600' ,fontFamily:Fonts.Poppins_Regular}}>Extra Km</Text>
                                        <View style={{ flexGrow: 1, alignItems: "flex-end" }}>
                                            <Text style={{ color: 'gray', fontWeight: '600',fontFamily:Fonts.Poppins_Regular }}>Rs. {(route?.params?.data?.extra_km)}/km</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginHorizontal: 25 }}>
                                        <Text style={{ color: 'gray', fontWeight: '600',fontFamily:Fonts.Poppins_Regular }}>Extra Hour</Text>
                                        <View style={{ flexGrow: 1, alignItems: "flex-end" }}>
                                            <Text style={{ color: 'gray', fontWeight: '600',fontFamily:Fonts.Poppins_Regular }}>Rs. {route?.params?.data?.extra_hour}/hour</Text>
                                        </View>
                                    </View>


                                </>
                                :
                                null
                        }

                        {
                            route?.params?.data?.package_summary && <TouchableOpacity style={{
                                paddingVertical: 10, borderBottomWidth: 1, borderColor: 'gray', marginHorizontal: 10,
                                marginTop: 5, marginBottom
                                    : 10, flexDirection: "row"
                            }}
                                onPress={() => {
                                    setPackage(!packagee); setTextVisibility(false);
                                    setExcluion(false); setExtra(false), setItinerary(false); setInt(false)
                                }}
                            >
                                <Text style={{ color: "black", fontWeight: '600',fontFamily:Fonts.Poppins_Regular }}>Package Summary</Text>
                                {
                                    term === true ?
                                        <View style={{ flexGrow: 1, alignItems: 'flex-end' }}>
                                            <MaterialIcons name={'keyboard-arrow-up'} size={25} color={'gray'} />
                                        </View>
                                        :
                                        <View style={{ flexGrow: 1, alignItems: 'flex-end' }}>
                                            <MaterialIcons name={'keyboard-arrow-down'} size={25} color={'gray'} />
                                        </View>}
                            </TouchableOpacity>
                        }

                        {
                            packagee &&
                            <>

                                <View style={{ marginHorizontal: 10 }}>
                                    <View style={{}}>
                                        <RenderHTML
                                            style={{}}
                                            contentWidth={30}
                                            source={{ html: route?.params?.data?.package_summary }}
                                        />
                                    </View>

                                </View>

                            </>
                        }

                        {
                            route?.params?.data?.terms_condition &&
                            <TouchableOpacity style={{
                                paddingVertical: 10, borderBottomWidth: 1, borderColor: 'gray', marginHorizontal: 10,
                                marginTop: 5, marginBottom
                                    : 10, flexDirection: "row"
                            }}
                                onPress={() => { setTerm(!term); setTextVisibility(false); setExcluion(false); setExtra(false) }}
                            >
                                <Text style={{ color: "black", fontWeight: '600' ,fontFamily:Fonts.Poppins_Regular}}>Terms & conditions</Text>
                                {
                                    term === true ?
                                        <View style={{ flexGrow: 1, alignItems: 'flex-end' }}>
                                            <MaterialIcons name={'keyboard-arrow-up'} size={25}color={'gray'} />
                                        </View>
                                        :
                                        <View style={{ flexGrow: 1, alignItems: 'flex-end' }}>
                                            <MaterialIcons name={'keyboard-arrow-down'} size={25} color={'gray'}/>
                                        </View>}
                            </TouchableOpacity>}



                        {
                            term &&
                            <>
                                {conditions.map((condition, index) => (
                                    <View key={index} style={styles.conditionContainer}>

                                        <Text style={styles.icon}>
                                            ✓
                                        </Text>
                                        <Text style={styles.text}>{condition.trim()}</Text>
                                    </View>
                                ))}
                            </>
                        }

                        {
                            route?.params?.data?.itenary &&
                            <TouchableOpacity style={{
                                paddingVertical: 10, borderBottomWidth: 1, borderColor: 'gray', marginHorizontal: 10,
                                marginTop: 5, marginBottom
                                    : 10, flexDirection: "row"
                            }}
                                onPress={() => {
                                    setInt(!int); setTextVisibility(false);
                                    setExcluion(false); setExtra(false), setPackage(false); setItinerary(false)
                                }}
                            >
                                <Text style={{ color: "black", fontWeight: '600',fontFamily:Fonts.Poppins_Regular }}>Itineary</Text>
                                {
                                    int === true ?
                                        <View style={{ flexGrow: 1, alignItems: 'flex-end' }}>
                                            <MaterialIcons name={'keyboard-arrow-up'} size={25} color={'gray'} />
                                        </View>
                                        :
                                        <View style={{ flexGrow: 1, alignItems: 'flex-end' }}>
                                            <MaterialIcons name={'keyboard-arrow-down'} size={25} color={'gray'} />
                                        </View>}
                            </TouchableOpacity>}

                        {
                            int &&
                            <>

                                <View style={{}}>


                                    <View style={{ marginHorizontal: 10 }}>

                                        <RenderHTML
                                            style={{}}
                                            contentWidth={30}
                                            source={{ html: route?.params?.data?.itenary }}
                                        />
                                    </View>


                                </View>

                            </>
                        }

                        {
                            route?.params?.data?.exclution &&
                            <TouchableOpacity style={{
                                paddingVertical: 10, borderBottomWidth: 1, borderColor: 'gray', marginHorizontal: 10,
                                marginTop: 5, marginBottom
                                    : 10, flexDirection: "row"
                            }}
                                onPress={() => {
                                    setItinerary(!itneray); setTextVisibility(false);
                                    setExcluion(false); setExtra(false); setInt(false); setPackage(false)
                                }}
                            >
                                <Text style={{ color: "black", fontWeight: '600' ,fontFamily:Fonts.Poppins_Regular}}>T&C</Text>
                                {
                                    itneray === true ?
                                        <View style={{ flexGrow: 1, alignItems: 'flex-end' }}>
                                            <MaterialIcons name={'keyboard-arrow-up'} size={25} color={'gray'} />
                                        </View>
                                        :
                                        <View style={{ flexGrow: 1, alignItems: 'flex-end' }}>
                                            <MaterialIcons name={'keyboard-arrow-down'} size={25} color={'gray'} />
                                        </View>}
                            </TouchableOpacity>}

                        {
                            itneray &&
                            <>

                                <View style={{ marginHorizontal: 10 }}>
                                    <View>
                                        <Text style={{ color: "black", fontSize: 16, fontWeight: '500' ,fontFamily:Fonts.Poppins_Regular}}>Inclusion</Text>
                                        <RenderHTML
                                            style={{}}
                                            contentWidth={30}
                                            source={{ html: route?.params?.data?.inclusion }}
                                        />
                                    </View>

                                    <View style={{}}>
                                        <Text style={{ color: "black", fontSize: 16, fontWeight: '500',fontFamily:Fonts.Poppins_Regular }}>Exclusion</Text>
                                        <RenderHTML
                                            style={{}}
                                            contentWidth={30}
                                            source={{ html: route?.params?.data?.exclution }}
                                        />
                                    </View>


                                </View>

                            </>
                        }


                    </View>
                </ScrollView>

                <TouchableOpacity style={{
                    marginBottom: 30, backgroundColor: '#007BFF', justifyContent: 'center', alignItems: 'center', marginTop: 20, height: 40,
                    marginHorizontal: 10, borderRadius: 10
                }} onPress={() => { navigation.navigate('TripDetails', { data: route?.params?.data }) }}>
                    <Text style={{ color: 'white',fontFamily:Fonts.Poppins_Regular }}>Confirm booking</Text>
                </TouchableOpacity>

            </View>



        </View>
    )
}

export default CarsDetail

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    conditionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        marginRight: 10,
        color: "blue"
    },
    text: {
        flex: 1,
        fontSize: 16,
        color:'gray'
    },
})
