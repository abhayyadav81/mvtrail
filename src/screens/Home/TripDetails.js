
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { setcarDetail } from '../../redux/slice';
import Timeline from 'react-native-timeline-flatlist';
import { HomeTabStyles } from '../../styles';
import images from '../../../index'
import { useTheme } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import CarsDetail from './CarsDetail';
import Dimensions from '../../utils/Dimension';
import { Fonts } from '../../utils';
import Caricon from '../../images/caricon'
import DatePickerIcon from '../../images/calandericon.svg'
import DesitnationPointicon from '../../images/Destinationicon.svg'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


const TripDetails = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { userData, activeBookings } = useSelector(
    (state: any) => state.auth,
  );
  const { Colors } = useTheme();
  const HomeTabStyless = useMemo(() => HomeTabStyles(Colors), [Colors]);
  // console.log('data for user', route?.params?.data)
  useEffect(() => {
    dispatch(setcarDetail(route?.params?.data))
  }, [])
  const createTimelineData = (activeBookings) => {
    const data = [];
    let destinations = [];

    // Add source city as the first item if it exists
    if (activeBookings.source_city) {
      data.push({
        title: (
          <View>
            <Text style={{ color: 'black', fontFamily: Fonts.Poppins_Regular }}>{activeBookings.source_city}</Text>
          </View>
        ),
        icon: <Image source={require('../../images/destination.png')} resizeMode="contain" style={styles.icon} />
      });
    }

    // Handle multiple destinations if they exist
    if (activeBookings.destinations) {
      destinations = activeBookings.destinations.split(' to ').filter(dest => dest.trim() !== '');
    } else if (activeBookings.destination_city) {
      // Handle single destination city if it exists
      destinations.push(activeBookings.destination_city);
    }

    destinations.forEach((destination, index) => {
      data.push({
        title: (
          <View>
            <Text style={{ color: 'black', fontFamily: Fonts.Poppins_Regular }}>{destination}</Text>
          </View>
        ),
        icon: <Image source={require('../../images/destination.png')} resizeMode="contain" style={styles.icon} />
      });
    });

    // Change the icon for the last destination
    if (data.length > 1) {
      data[data.length - 1].icon = <AntDesign name="arrowdown" size={20} color={'#34495E'} />
    }

    return data;
  };



  const data = createTimelineData(activeBookings);
  console.log('daaa', data)

  console.log('llllllll', activeBookings);


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
  console.log('activeBookings', activeBookings)




  const itemHeight = 23; // Adjust this value based on your item height
  const dynamicHeight = data.length * itemHeight;

  // ];
  return (
    <View style={{
      flex: 1, padding: 15, backgroundColor: 'white', borderTopWidth: 1,
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
      <ScrollView>
        <View style={{ height: '92%' }}>
          <View style={{ borderBottomWidth: 1, borderColor: 'gray', paddingVertical: 10 }}>
            <Text style={{ color: 'black', fontWeight: '700', fontSize: 17, fontFamily: Fonts.Poppins_Regular }}>Trip details</Text>
          </View>
          <View style={{ paddingVertical: 10 }}>


            <View>
              <Text style={{ fontSize: 17, fontWeight: "700", color: 'black', fontFamily: Fonts.Poppins_Regular }}>{route?.params?.data?.car_name}</Text>
            </View>



            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <View style={{ top: responsiveHeight(0.4) }}>
                <DesitnationPointicon />
                {/* <Image source={require('../../images/Vector2.png')} style={{ height: 30, width: 30, resizeMode: 'contain' }} /> */}
              </View>
              <View style={{ marginHorizontal: 10 }}>
                <Text style={{ color: 'black', fontSize: 15, fontWeight: '700', fontFamily: Fonts.Poppins_Regular }}>Trip for</Text>
                {/* <Text style={{ color: "gray" }}>{activeBookings?.source_city}</Text> */}
              </View>


            </View>
            {
              activeBookings?.destination_city ?
                <View style={{ height: dynamicHeight, marginLeft: responsiveWidth(-2.8), marginTop: 4 }}>
                  <Timeline
                    data={data}
                    circleSize={20}
                    circleColor='#fff'
                    lineColor={'gray'}
                    isUsingFlatlist={true}
                    innerCircle={'icon'}
                    showTime={false}
                    titleStyle={HomeTabStyless.Title}
                    descriptionStyle={HomeTabStyless.DescriptionStyle}
                  />

                </View>
                :
                <View style={{ paddingHorizontal: 30 }}>

                  <Text style={{ color: "gray", bottom: Dimensions.hp(0.5), fontFamily: Fonts.Poppins_Regular }}>{activeBookings?.source_city}</Text>
                </View>
            }

            {
              activeBookings?.drop_location ?
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <View style={{ marginTop: -5 }}>
                    <Image source={require('../../images/connectingarrow.png')} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
                  </View>
                  <View style={{ marginHorizontal: 10 }}>

                    <Text style={{ color: "gray", fontFamily: Fonts.Poppins_Regular }}>{activeBookings?.drop_location}</Text>
                  </View>


                </View>
                :
                null
            }





            <View style={{ flexDirection: 'row', marginTop: 18 }}>
              <View style={{ top: responsiveHeight(0.5) }}>
                <Caricon />
                {/* <Image source={require('../../images/Vector.png')} style={{ height: 25, width: 25, resizeMode: 'contain' }} /> */}
              </View>
              <View style={{ marginHorizontal: 10 }}>
                <Text style={{ color: 'black', fontSize: 15, fontWeight: '600', fontFamily: Fonts.Poppins_Regular }}>Package name</Text>
                {
                  activeBookings?.package_name ?
                    <Text style={{ color: "gray", fontFamily: Fonts.Poppins_Regular }}>{activeBookings?.package_name}</Text>
                    :
                    <Text style={{ color: "gray", fontFamily: Fonts.Poppins_Regular }}>{route?.params?.data?.package_name}</Text>
                }

              </View>
            </View>


            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <View style={{ top: responsiveHeight(0.5) }}>
                <DatePickerIcon />
                {/* <Image source={require('../../images/Vector1.png')} style={{ height: 25, width: 25, resizeMode: 'contain' }} /> */}
              </View>
              <View style={{ marginHorizontal: 10 }}>
                <Text style={{ color: 'black', fontSize: 15, fontWeight: '600', fontFamily: Fonts.Poppins_Regular }}>Pick up date & time</Text>
                <Text style={{ color: "gray", fontFamily: Fonts.Poppins_Regular }}>{activeBookings?.pickup_date}</Text>
              </View>
            </View>

            {activeBookings?.drop_date &&
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <View>
                  <DatePickerIcon/> 
                  {/* <Image source={require('../../images/Vector1.png')} style={{ height: 25, width: 25, resizeMode: 'contain' }} /> */}
                </View>
                <View style={{ marginHorizontal: 10 }}>
                  <Text style={{ color: 'black', fontSize: 15, fontWeight: '600', fontFamily: Fonts.Poppins_Regular }}>Drop date & time</Text>
                  <Text style={{ color: "gray", fontFamily: Fonts.Poppins_Regular }}>{activeBookings?.drop_date}</Text>
                </View>
              </View>}
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{ color: 'black', fontSize: 15, fontWeight: '600', fontFamily: Fonts.Poppins_Regular }}>Fair details</Text>
          </View>
          <View style={{ borderTopWidth: 1, borderColor: 'gray', marginTop: 15 }}>

          </View>

          <View style={{ paddingVertical: 10, flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ color: 'black', fontSize: 17, fontWeight: '700', fontFamily: Fonts.Poppins_Regular }}>Total fare</Text>
            {
              route?.params?.data?.total_price ?

                <Text style={{ color: 'black', fontWeight: '700', fontSize: 17, fontFamily: Fonts.Poppins_Regular }}> ₹ {route?.params?.data?.total_price}</Text>
                :
                <Text style={{ color: 'black', fontWeight: '700', fontSize: 17, fontFamily: Fonts.Poppins_Regular }}> ₹ {route?.params?.data?.car_price}</Text>

            }

          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={{
        backgroundColor: '#007BFF',
        borderRadius: 10, justifyContent: 'center', alignItems: 'center', height: 45
      }}
        onPress={() => navigation.navigate('BillingDetails')}
      >
        <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', fontFamily: Fonts.Poppins_Regular }}>Next</Text>
      </TouchableOpacity>
    </View >
  )
}

export default TripDetails

const styles = StyleSheet.create({})
