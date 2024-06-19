import React, { useState, useMemo, useEffect } from 'react';
import { Image } from 'react-native';
import { HomeTabStyles } from '../../styles';
import { useTranslation } from "react-i18next";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import images from '../../index';
import { useTheme } from '@react-navigation/native';

const CommonMapView = (props) => {
    const _google_api_key="AIzaSyBROrj6ildPHETPysda_MuT6cZYpAVyEAw"
    const { t } = useTranslation();
    const { navigation } = props;
    const { Colors } = useTheme();
    const HomeTabStyless = useMemo(() => HomeTabStyles(Colors), [Colors]);
    const [_search_location, set_search_location] = useState('');

    const [position, setPosition] = useState();
    // console.log('position==>', position)
    useEffect(() => {
        Geolocation.getCurrentPosition((pos) => {
            const crd = pos.coords;
            setPosition({
                latitude: crd.latitude,
                longitude: crd.longitude,
                latitudeDelta: 0.0421,
                longitudeDelta: 0.0421,

            });
        })
    }, []);

    const handleSearch = () => {
        // Make a request to the Distance Matrix API
        axios.get(`https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${position.latitude},${position.longitude}&destinations=${searchLocation.latitude},${searchLocation.longitude}&key=YOUR_API_KEY`)
          .then(response => {
            // Parse the response and extract coordinates or route details
            const route = response.data.routes[0];
            const coordinates = route.geometry.coordinates; // Assuming the API returns route coordinates
            setRouteCoordinates(coordinates);
          })
          .catch(error => console.log(error));
      };

      const _search_for_location = async () => {
        await fetch(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${_search_location}&components=country:IN&key=${_google_api_key}`,
          {
            method: 'GET',
          },
        )
          .then(Response => Response.json())
          .then(async data => {
            set_search_location_data(data.predictions);
            return JSON.stringify(data);
          });
      };
      useEffect(() => {
        _search_for_location();
      }, [_search_location]);

    return (
        <MapView
            region={{
                latitude: position ? position.latitude : 22.2990017,
                longitude: position ? position.longitude : 70.7945285,
                latitudeDelta: position ? 0.015 : 0.015,
                longitudeDelta: position ? 0.0121 : 0.0121,
            }}
            initialRegion={position}
            showsUserLocation={true}
            showsMyLocationButton={true}
            followsUserLocation={true}
            showsCompass={true}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}
            style={HomeTabStyless.mapstyleset}
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
                        latitude: position ? position.latitude+0.001  : 22.2990017,
                        longitude: position ? position.longitude +0.002 : 70.7945285,
                        latitudeDelta: position ? 0.015 : 0.015,
                        longitudeDelta: position ? 0.0121 : 0.0121,
                    }
                }>
                <Image resizeMethod='resize'
                    source={images.CarIcon}
                    style={HomeTabStyless.SetImahMapStyle}
                    resizeMode="contain"
                />
            </Marker>
            <Marker
                coordinate={
                    {
                        latitude: position ? position.latitude+0.002 : 22.2990017,
                        longitude: position ? position.longitude-0.003 : 70.7945285,
                        latitudeDelta: position ? 0.015 : 0.015,
                        longitudeDelta: position ? 0.0121 : 0.0121,
                    }
                    }>
                <Image resizeMethod='resize'
                    source={images.CarIcon}
                    style={HomeTabStyless.SetImahMapStyle}
                    resizeMode="contain"
                />
            </Marker>
        </MapView>
    );
};
export default CommonMapView;
