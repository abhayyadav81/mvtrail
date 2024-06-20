
// import React, { useState, useMemo } from "react";
// import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, TextInput } from 'react-native';
// import { ChatStyles, Style } from '../../styles';
// import images from '../../index';
// import IconP from 'react-native-vector-icons/FontAwesome5';
// import IconL from 'react-native-vector-icons/AntDesign';
// import IconO from 'react-native-vector-icons/Ionicons';
// import { SH, SF } from "../../utils";
// import { Spacing } from '../../components';
// import { useTranslation } from "react-i18next";
// import { useTheme } from '@react-navigation/native';
// import { ScrollView } from 'react-native-virtualized-view';

// const Chatscreen = (props) => {
//     const { Colors } = useTheme();
//     const { t } = useTranslation();
//     const ChatStyless = useMemo(() => ChatStyles(Colors), [Colors]);
//     const Styles = useMemo(() => Style(Colors), [Colors]);

//     return (
//         <View style={ChatStyless.MinViewScreen}>
//             <ScrollView nestedScrollEnabled={true}
//                 keyboardShouldPersistTaps="handled"
//                 contentContainerStyle={Styles.contentContainerStyle}>
//                 <KeyboardAvoidingView enabled>
//                     <View style={ChatStyless.MinFlexView}>
//                         <View style={ChatStyless.MinContentView}>
//                             <View style={ChatStyless.MarginBottomSpace}>
//                                 <View style={ChatStyless.FlexRowJustyCenter}>
//                                     <View style={ChatStyless.ChatViewBgColor}>
//                                         <Text style={ChatStyless.TextColorMessage}>{t("ChatText_Let_Me")}</Text>
//                                         <Text style={ChatStyless.TextColorMessageTwo}>03:16</Text>
//                                     </View>
//                                 </View>
//                                 <Text style={ChatStyless.DataSandTimeColor}>10 Oct,2022</Text>
//                                 <Spacing space={SH(10)} />
//                             </View>
//                             <View style={ChatStyless.MarginBottomSpace}>
//                                 <View style={ChatStyless.FlexRowJustyCentertwo}>
//                                     <View style={ChatStyless.LeftImageView}>
//                                         <Image source={images.Chat_image_one} style={ChatStyless.ImagStyleandCall} resizeMode={'cover'} />
//                                     </View>
//                                     <View style={ChatStyless.MessageMinviewOwner}>
//                                         <Text style={ChatStyless.TextColorMessage}>{t("Chattext_Actually_I_Have")}</Text>
//                                         <View style={ChatStyless.FlexCheckSet}>
//                                             <View>
//                                                 <Text style={ChatStyless.TextColorMessageTwotwo}>03:18</Text>
//                                             </View>
//                                             <View style={ChatStyless.SetRightIconViewStyle}>
//                                                 <IconL color={Colors.white_text_color} name="check" />
//                                                 <IconL color={Colors.white_text_color} style={ChatStyless.SetIconPotion} name="check" />
//                                             </View>
//                                         </View>
//                                     </View>
//                                 </View>
//                             </View>
//                             <Spacing space={SH(20)} />
//                             <View style={ChatStyless.MarginBottomSpace}>
//                                 <View style={ChatStyless.FlexRowJustyCenter}>
//                                     <View style={ChatStyless.ChatViewBgColor}>
//                                         <Text style={ChatStyless.TextColorMessage}>{t("Chat_Can_You_Just")}</Text>
//                                         <Text style={ChatStyless.TextColorMessageTwo}>03:19</Text>
//                                     </View>
//                                 </View>
//                                 <Text style={ChatStyless.DataSandTimeColor}>10 Oct,2022</Text>
//                             </View>
//                             <Spacing space={SH(14)} />
//                             <View style={ChatStyless.MarginBottomSpace}>
//                                 <View style={ChatStyless.FlexRowJustyCentertwo}>
//                                     <View style={ChatStyless.LeftImageView}>
//                                         <Image source={images.Chat_image_one} style={ChatStyless.ImagStyleandCall} resizeMode={'cover'} />
//                                     </View>
//                                     <View style={ChatStyless.MessageMinviewOwner}>
//                                         <Text style={ChatStyless.TextColorMessage}>{t("Chat_Multipal_Project")}</Text>
//                                         <View style={ChatStyless.FlexCheckSet}>
//                                             <View>
//                                                 <Text style={ChatStyless.TextColorMessageTwotwo}>03:19</Text>
//                                             </View>
//                                             <View style={ChatStyless.SetRightIconViewStyle}>
//                                                 <IconL color={Colors.white_text_color} name="check" />
//                                                 <IconL color={Colors.white_text_color} style={ChatStyless.SetIconPotion} name="check" />
//                                             </View>
//                                         </View>
//                                     </View>
//                                 </View>
//                             </View>
//                             <Spacing space={SH(23)} />
//                             <View style={ChatStyless.MarginBottomSpace}>
//                                 <View style={ChatStyless.FlexRowJustyCenter}>
//                                     <View style={ChatStyless.ChatViewBgColor}>
//                                         <Text style={ChatStyless.TextColorMessage}>{t("Chat_Excellent")}</Text>
//                                         <Text style={ChatStyless.TextColorMessageTwo}>03:20</Text>
//                                     </View>
//                                 </View>
//                                 <Text style={ChatStyless.DataSandTimeColor}>10 Oct,2022</Text>
//                             </View>
//                             <Spacing space={SH(27)} />
//                             <View style={ChatStyless.MarginBottomSpace}>
//                                 <View style={ChatStyless.seticonrevirview}>
//                                     <View style={ChatStyless.FlexRowJustyCentertwo}>
//                                         <View style={ChatStyless.LeftImageView}>
//                                             <Image source={images.Chat_image_one} style={ChatStyless.ImagStyleandCall} resizeMode={'cover'} />
//                                         </View>
//                                         <View style={ChatStyless.MessageMinviewOwner}>
//                                             <Text style={ChatStyless.TextColorMessage}>{t("Chat_Last_Paregraph")}</Text>
//                                         </View>
//                                     </View>
//                                 </View>
//                             </View>
//                             <Spacing space={SH(27)} />
//                         </View>
//                     </View>
//                 </KeyboardAvoidingView>
//             </ScrollView>
//             <View style={ChatStyless.PostionAbsoluTeView}>
//                 <View style={ChatStyless.TextMessageView}>
//                     <View style={ChatStyless.FlexrowSendMesasage}>
//                         <View>
//                             <TextInput
//                                 style={ChatStyless.TextInputBorderBottom}
//                                 placeholder={t("Write_A_Reply")}
//                                 placeholderTextColor="black"
//                             />
//                         </View>
//                         <View style={ChatStyless.FlexrowImagiNations}>
//                             <TouchableOpacity>
//                                 <IconP name="grin" size={SF(25)} />
//                             </TouchableOpacity>
//                             <TouchableOpacity style={ChatStyless.MarginRightlikeicon}>
//                                 <IconO name="send" color={Colors.theme_background_topaz} size={SF(30)} />
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>
//             </View>
//         </View>
//     );
// };
// export default Chatscreen;

import React, { useEffect, useMemo, useReducer, useState } from "react";
import { View, KeyboardAvoidingView, FlatList, StatusBar, Text, StyleSheet, Image,ActivityIndicator } from "react-native";
import { ChatStyles } from "../../styles";
import { RouteName } from '../../../routes';
import { SH, SF } from '../../utils';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import IconT from "react-native-vector-icons/MaterialIcons";
import IconF from "react-native-vector-icons/Feather";
import IconO from 'react-native-vector-icons/Octicons';
import { Container, Spacing, MessageView } from '../../components';
import images from "../../images";
import { ScrollView } from 'react-native-virtualized-view';
import RidesTab from "../Home/Tab/RidesTabs";
import RidesView from "../../components/FlatListRender/RidesView";
import ItemButton from "../../components/Buttons/ItemButton";
import { useGlobalState } from "../../User-Context/Context";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { BASE_URL } from "../../utils/Api";
import { responsiveHeight } from "react-native-responsive-dimensions";
import CancelledIcon from '../../images/Cancelledimg.svg'
import PendingIcon from '../../images/Pendingimg.svg'
import ConfirmedIcon from '../../images/Confirmedimg.svg'

const Chatscreen = (props) => {
  //   const { navigation } = props;
  const navigation = useNavigation();
  const { Colors } = useTheme();
  const ChatStyless = useMemo(() => ChatStyles(Colors), [Colors]);
  const { t } = useTranslation();
  const [shouldshow, setShouldshow] = useState(0);
  const { state, dispatch } = useGlobalState();

  const [upcomingdata, setUpcoming] = useState([])
  const [runningdata, setRunning] = useState([])
  const [Rideoverdata, setRideover] = useState([])
  const [canceldata, setCancel] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  console.log('runningdata', runningdata)



  const RidesData = [
    {
      "id": 1,
      "Package": 'Package',
      "BookingID": 'Booking ID',
      "Bookingdate": 'Booking date',
      "Pickuplocation": 'Pickup location',
      "Fare": "Fare",
      "status": "Pending"
    },
    {
      "id": 2,
      "Package": 'Package',
      "BookingID": 'Booking ID',
      "Bookingdate": 'Booking date',
      "Pickuplocation": 'Pickup location',
      "Fare": "Fare",
      "status": "Confirmed"

    },
    {
      "id": 3,
      "Package": 'Package',
      "BookingID": 'Booking ID',
      "Bookingdate": 'Booking date',
      "Pickuplocation": 'Pickup location',
      "Fare": "Fare",
      "status": "Cancelled"

    },
    {
      "id": 4,
    },



  ];

  const Cancelled_Details = [

    {
      "id": 1,
      "Package": 'Package',
      "BookingID": 'Booking ID',
      "Bookingdate": 'Booking date',
      "Pickuplocation": 'Pickup location',
      "Fare": "Fare",
      "status": "Cancelled"

    },

  ];

  const Runnig_details = [

    {
      "id": 1,
      // "Package": 'Package',
      // "BookingID": 'Booking ID',
      // "Bookingdate": 'Booking date',
      // "Pickuplocation": 'Pickup location',
      // "Fare": "Fare",
      // "status": "Pending"
    },

  ];

  const Rideover_details = [

    {
      "id": 1,
      "Package": 'Package',
      "BookingID": 'Booking ID',
      "Bookingdate": 'Booking date',
      "Pickuplocation": 'Pickup location',
      "Fare": "Fare",
      "status": "Confirmed"

    },

  ];
  useEffect(() => {
    upcoming_()
    running_()
    rideover_()
    cancel_()
  }, [])
  const upcoming_ = async () => {
    setIsLoading(true)
    try {



      const username = 'btcal';
      const password = '123@cal';
      const basicAuth = 'Basic ' + btoa(username + ':' + password);

      const response = await axios.get(`${BASE_URL}upcomingBooking`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': basicAuth,
          // Add any additional headers here if needed
        },
      });

      if (response.data.message === "Upcoming booking not found") {
        // Set state or handle accordingly to show "No Ride" message
        setUpcoming([status = 0]);
      } else {
        if (response.data.upcoming) {
          setUpcoming(response.data.upcoming);
        }
      }
      console.log('response', response?.data?.upcoming)
      // if (response?.data?.upcoming) {
      //   setUpcoming(response?.data?.upcoming)
      // }

      // set_show_search_input(true)

    } catch (error) {
      console.error('Error:', error);

    } finally {
      setIsLoading(false)
    }
  };

  const running_ = async () => {
    try {



      const username = 'btcal';
      const password = '123@cal';
      const basicAuth = 'Basic ' + btoa(username + ':' + password);

      const response = await axios.get(`${BASE_URL}runningBooking`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': basicAuth,
          // Add any additional headers here if needed
        },
      });


      console.log('response==>', response?.data)
      if (response.data.message === "Running booking not found") {
        // Set state or handle accordingly to show "No Ride" message
        setRunning([status = 0]);
      } else {
        if (response.data.running) {
          setRunning(response.data.running);
        }
      }
      // if (response?.data?.running) {
      //   setRunning(response?.data?.running)
      // }
      // setRunning(response?.data)
      // set_show_search_input(true)

    } catch (error) {
      console.error('Error:', error);

    }
  };

  const rideover_ = async () => {
    try {



      const username = 'btcal';
      const password = '123@cal';
      const basicAuth = 'Basic ' + btoa(username + ':' + password);

      const response = await axios.get(`${BASE_URL}rideoverbooking`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': basicAuth,
          // Add any additional headers here if needed
        },
      });

      if (response.data.message === "Ride over booking not found") {
        // Set state or handle accordingly to show "No Ride" message
        setRideover([status = 0]);
      } else {
        if (response.data.rideover) {
          setRideover(response.data.rideover);
        }
      }
      console.log('response', response?.data)
      // if (response?.data?.rideover) {
      //   setRideover(response?.data?.rideover)
      // }

      // set_show_search_input(true)

    } catch (error) {
      console.error('Error:', error);

    }
  };

  const cancel_ = async () => {
    try {



      const username = 'btcal';
      const password = '123@cal';
      const basicAuth = 'Basic ' + btoa(username + ':' + password);

      const response = await axios.get(`${BASE_URL}cancelledbooking`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': basicAuth,
          // Add any additional headers here if needed
        },
      });
      if (response.data.message === "Cancelled booking not found") {
        // Set state or handle accordingly to show "No Ride" message
        setCancel([status = 0]);
      } else {
        if (response.data.cancelled) {
          setCancel(response.data.cancelled);
        }
      }

      console.log('response', response?.data)
      // if (response?.data?.cancelled) {
      //   setCancel(response?.data?.cancelled)
      // }

      // set_show_search_input(true)

    } catch (error) {
      console.error('Error:', error);

    }
  };

  const isEmptyArray = (arr) => {
    return Array.isArray(arr) && arr.length === 1 && Object.keys(arr[0]).length === 0;
  };
  const renderItem = ({ item }) => {
    // when no input, show all
    console.log('item', item)
    return (

      <View style={{}}>


        {
          (item) == 0 ?
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text style={{ fontSize: 17, fontWeight: "500", color: 'black' }}>No Upcoming Ride</Text>
            </View>
            :
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ paddingTop: 15, }}>

                <RidesView lable={"Package"} value={item.package_name} />
                <RidesView lable={"BookingID"} value={item.booking_id} />
                <RidesView lable={"Bookingdate"} value={item.pickup_date} />
                <RidesView lable={"Pickuplocation"} value={item.pickup_location} />
                <RidesView lable={"Fare"} value={item.total_price} />
                <View style={{ flexDirection: 'row', paddingHorizontal: 20, width: 260, justifyContent: 'space-between' }}>
                  <ItemButton
                    onPress1={() => {
                      navigation.navigate('Ridedetails', { data: item });
                      //  setShouldshow(1)
                    }}
                    // type="outline"
                    title="Detail"
                  />
                  <ItemButton
                    onPress1={() => {
                    }}
                    // type="outline"
                    title="Rebook"
                    status={item.status}

                  />
                </View>


                <View
                  style={{
                    borderBottomColor: 'grey',
                    borderBottomWidth: 0.5,
                    paddingTop: 10,
                    width: '90%',
                    alignSelf: 'center',
                    paddingBottom: 15,

                  }}
                />

              </View>
              {/* {item.status === "Pending" &&
          <Image source={require('../../images/pending.png')} resizeMode='cover' style={{ height: 100, width: 100, right: 20 }} />
        } */}
              {/* {item.status === "Confirmed" && */}
              <PendingIcon style={{ height: 100, width: 100, right: 100, bottom:responsiveHeight(0.8) }}/>
              {/* } */}
              {/* {item.status === "Cancelled" &&
          <Image source={require('../../images/cancel.png')} resizeMode='cover' style={{ height: 100, width: 100, right: 20 }} />
        } */}

            </View>
        }
      </View>
    )
  };
  console.log('runningdata', runningdata)
  const renderItemrunning = ({ item }) => {
    // when no input, show all
    console.log('item', item)
    return (

      <View style={{}}>


        {
          !(item) == 0 ?


            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ paddingTop: 15, }}>

                <RidesView lable={"Package"} value={item.package_name} />
                <RidesView lable={"BookingID"} value={item.booking_id} />
                <RidesView lable={"Bookingdate"} value={item.pickup_date} />
                <RidesView lable={"Pickuplocation"} value={item.pickup_location} />
                <RidesView lable={"Fare"} value={item.total_price} />
                <View style={{ flexDirection: 'row', paddingHorizontal: 20, width: 260, justifyContent: 'space-between' }}>
                  <ItemButton
                    // onPress1={() => {
                    //   navigation.navigate('Ridedetail');
                    //   //  setShouldshow(1)
                    // }}
                    // type="outline"
                    title="Detail"
                  />
                  <ItemButton
                    onPress1={() => {
                    }}
                    // type="outline"
                    title="Rebook"
                    status={item.status}

                  />
                </View>


                <View
                  style={{
                    borderBottomColor: 'grey',
                    borderBottomWidth: 0.5,
                    paddingTop: 10,
                    width: '90%',
                    alignSelf: 'center',
                    paddingBottom: 15,

                  }}
                />

              </View>
              {/* {item.status === "Pending" &&
          <Image source={require('../../images/pending.png')} resizeMode='cover' style={{ height: 100, width: 100, right: 20 }} />
        } */}
              {/* {item.status === "Confirmed" && */}
              <ConfirmedIcon style={{ height: 100, width: 100, right: 100 , bottom:responsiveHeight(0.8)}}/>
              {/* } */}
              {/* {item.status === "Cancelled" &&
          <Image source={require('../../images/cancel.png')} resizeMode='cover' style={{ height: 100, width: 100, right: 20 }} />
        } */}

            </View>
            :
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text style={{ fontSize: 17, fontWeight: "500", color: 'black' }}>No Running Ride</Text>
            </View>
        }
      </View>
    )
  };
  console.log('Rideoverdata', Rideoverdata)
  const renderItemrideover = ({ item }) => {
    // when no input, show all
    return (

      <View style={{}}>


        {
          !(item) === 0 ?


            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ paddingTop: 15, }}>

                <RidesView lable={"Package"} value={item.package_name} />
                <RidesView lable={"BookingID"} value={item.booking_id} />
                <RidesView lable={"Bookingdate"} value={item.pickup_date} />
                <RidesView lable={"Pickuplocation"} value={item.pickup_location} />
                <RidesView lable={"Fare"} value={item.total_price} />
                <View style={{ flexDirection: 'row', paddingHorizontal: 20, width: 260, justifyContent: 'space-between' }}>
                  <ItemButton
                    // onPress1={() => {
                    //   navigation.navigate('Ridedetail');
                    //   //  setShouldshow(1)
                    // }}
                    // type="outline"
                    title="Detail"
                  />
                  <ItemButton
                    onPress1={() => {
                    }}
                    // type="outline"
                    title="Rebook"
                    status={item.status}

                  />
                </View>


                <View
                  style={{
                    borderBottomColor: 'grey',
                    borderBottomWidth: 0.5,
                    paddingTop: 10,
                    width: '90%',
                    alignSelf: 'center',
                    paddingBottom: 15,

                  }}
                />

              </View>
              {/* {item.status === "Pending" &&
        <Image source={require('../../images/pending.png')} resizeMode='cover' style={{ height: 100, width: 100, right: 20 }} />
      } */}
              {/* {item.status === "Confirmed" && */}
              <ConfirmedIcon style={{ height: 100, width: 100, right: 100 , bottom:responsiveHeight(0.8)}}/>
              {/* } */}
              {/* {item.status === "Cancelled" &&
        <Image source={require('../../images/cancel.png')} resizeMode='cover' style={{ height: 100, width: 100, right: 20 }} />
      } */}

            </View>
            :
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text style={{ fontSize: 17, fontWeight: "500", color: 'black' }}>No Ride Over</Text>
            </View>
        }
      </View>
    )
  };

  const renderItemcancel = ({ item }) => {
    // when no input, show all
    return (

      <View style={{}}>


        {
          (item) === 0 ?
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text style={{ fontSize: 17, fontWeight: "500", color: 'black' }}>No Cancel Ride</Text>
            </View>
            :
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ paddingTop: 15, }}>

                <RidesView lable={"Package"} value={item.package_name} />
                <RidesView lable={"BookingID"} value={item.booking_id} />
                <RidesView lable={"Bookingdate"} value={item.pickup_date} />
                <RidesView lable={"Pickuplocation"} value={item.pickup_location} />
                <RidesView lable={"Fare"} value={item.total_price} />
                <View style={{ flexDirection: 'row', paddingHorizontal: 20, width: 260, justifyContent: 'space-between' }}>
                  <ItemButton
                    onPress1={() => {
                      navigation.navigate('Ridedetails', { data: item,cancel:1 });
                      //  setShouldshow(1)
                    }}
                    // type="outline"
                    title="Detail"
                  />
                  <ItemButton
                    onPress1={() => {
                    }}
                    // type="outline"
                    title="Rebook"
                    status={item.status}

                  />
                </View>


                <View
                  style={{
                    borderBottomColor: 'grey',
                    borderBottomWidth: 0.5,
                    paddingTop: 10,
                    width: '90%',
                    alignSelf: 'center',
                    paddingBottom: 15,

                  }}
                />

              </View>
              {/* {item.status === "Pending" &&
          <Image source={require('../../images/pending.png')} resizeMode='cover' style={{ height: 100, width: 100, right: 20 }} />
        } */}
              {/* {item.status === "Confirmed" && */}
              {/* <Image source={require('../../images/confirm.png')} resizeMode='cover' style={{ height: 100, width: 100, right: 100 }} /> */}
              {/* } */}
              {/* {item.status === "Cancelled" && */}
              <CancelledIcon style={{ height: 100, width: 100, right: 100, bottom:responsiveHeight(0.6)}}/>
              {/* } */}

            </View>
        }
      </View>
    )
  };
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bgWhite} />
      <View
        style={{
          borderBottomColor: '#c0c0c0',
          borderBottomWidth: 5,
          shadowOffset: { width: 5, height: 5, borderBottomWidth: 5, padding: 40 },
          shadowOpacity: 0.2,
          elevation: 2,
          opacity: 0.5,
          x: 0,
          y: 2,
        }}
      />
      <RidesTab />

      <View style={ChatStyless.MinViewScreen}>
        <ScrollView nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={ChatStyless.ContentContainerStyle} >
          <KeyboardAvoidingView enabled>
            <View style={ChatStyless.MinFlexViewtwo}>
              <View style={ChatStyless.MinViewSecond}>


                <View
                  style={{
                    borderBottomColor: 'grey',
                    borderBottomWidth: 0.5,
                    paddingTop: 10,
                    width: '90%',
                    alignSelf: 'center'
                  }}
                />
                {state.Tab === 'Upcoming' &&


                  <FlatList
                    data={upcomingdata}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                  />
                }
                {state.Tab === 'Running' &&


                  <FlatList
                    data={runningdata}
                    renderItem={renderItemrunning}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                  />
                }
                {state.Tab === 'Ride over' &&


                  <FlatList
                    data={Rideoverdata}
                    renderItem={renderItemrideover}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                  />
                }

                {state.Tab === 'Cancelled' &&


                  <FlatList
                    data={canceldata}
                    renderItem={renderItemcancel}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                  />
                }
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>

      {isLoading &&
        <View style={{
          flex: 1, justifyContent: 'center', alignItems
            : 'center', position: 'absolute', height: '100%', width: '100%',backgroundColor:'#85929E'
        }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      }
    </Container>
  );
};
export default Chatscreen;
