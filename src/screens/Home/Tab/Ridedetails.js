import React, { useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, PermissionsAndroid, Alert } from 'react-native';
import RidesView from '../../../components/FlatListRender/RidesView';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';

import { ChatStyles } from '../../../styles';
import axios from 'axios';
import { BASE_URL } from '../../../utils/Api';
import RNFetchBlob from 'rn-fetch-blob';
import { Fonts } from '../../../utils';
import Downloadicon from '../../../images/Downloadicon.svg'

const Ridedetails = ({ route }) => {
  const { Colors } = useTheme();
  const navigation = useNavigation();
  const ChatStyless = useMemo(() => ChatStyles(Colors), [Colors]);
  console.log('route', route?.params?.cancel)
  const [data, setData] = useState('')
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    _AllDetail()
  }, [])
  const _AllDetail = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      formData.append('booking_id', route?.params?.data?.id);
      const username = 'btcal';
      const password = '123@cal';
      const basicAuth = 'Basic ' + btoa(username + ':' + password);
      console.log('payload', formData)
      const response = await axios.post(`${BASE_URL}bookingDetails`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': basicAuth,
          // Add any additional headers here if needed
        },
      });


      console.log('response', response?.data?.booking_details)
      setData(response?.data?.booking_details)

    } catch (error) {
      console.error('Error:', error);

    } finally {
      setIsLoading(false);
    }
  };
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
      formData.append('booking_id', route?.params?.data?.id);

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
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {isLoading &&
        <View style={{
          flex: 1, justifyContent: 'center', alignItems
            : 'center', position: 'absolute', height: '100%', width: '100%', backgroundColor: '#B2BABB'
        }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      }

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
        <Text style={{ paddingHorizontal: 25, fontSize: 20, fontWeight: '500', color: '#000',fontFamily: Fonts.Poppins_Regular }}>Ride details</Text>
        <View style={{ flexDirection: 'row' }}>
          {
            route?.params?.cancel == 1 ?
              <Text style={{
                justifyContent: 'flex-end', fontSize: 14, fontWeight: '500', color: '#fff',
                backgroundColor: '#007BFF', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 5,fontFamily: Fonts.Poppins_Regular
              }}>CANCELLED</Text>
              :
              <Text style={{
                justifyContent: 'flex-end', fontSize: 14, fontWeight: '500', color: '#fff',
                backgroundColor: '#007BFF', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 5,fontFamily: Fonts.Poppins_Regular
              }}>PENDING</Text>

          }

          <TouchableOpacity onPress={() => navigation.goBack()} style={{justifyContent:"center",paddingHorizontal:15}}>
            <Image source={require('../../../images/close.png')} />
            {/* <Entypo name="cross" size={40} color={'#000'} paddingHorizontal={15} /> */}
          </TouchableOpacity>
        </View>

      </View>

      <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 0.5,
          paddingTop: 10,
          width: '90%',
          alignSelf: 'center'
        }}
      />
      {
        route?.params?.cancel == 1 ?
          null
          :
          <TouchableOpacity style={{
            marginLeft: 20, backgroundColor: "#007BFF",
            justifyContent: "center", alignItems: 'center', width: "50%", marginTop: 15,
            height: 35, borderRadius: 5, flexDirection: 'row'
          }}
            onPress={() => _Download_list()}
          >
            <Downloadicon/>
            <Text style={{ color: 'white', marginLeft: 7 ,fontFamily: Fonts.Poppins_Regular}}>Download receipt</Text>
          </TouchableOpacity>
      }

      <View style={{ paddingTop: 20 }}>
        <RidesView lable={'Boking Id'} value={data?.booking_id} />
        <RidesView lable={'Package Name'} value={data?.package_name} />
        <RidesView lable={'Source City'} value={data?.source_cities} />
        <RidesView lable={'Car Name'} value={data?.car_name} />
        <RidesView lable={'Pickup Date & Time'} value={`${data?.pickup_date} @ ${data?.pickup_time}`} />
        <RidesView lable={'Pickup Location'} value={data?.pickup_location} />

      </View>
      {isLoading &&
        <View style={{
          flex: 1, justifyContent: 'center', alignItems
            : 'center', position: 'absolute', height: '100%', width: '100%'
        }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FFFFF',
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'blue'
  },

});

export default Ridedetails;