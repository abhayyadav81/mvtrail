
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import {
    View, Text, TouchableOpacity, Image, StatusBar, onPress, TextInput, ScrollView, Pressable,
    Keyboard, ToastAndroid, FlatList, ActivityIndicator, Alert, Modal, Platform, Dimensions,
    StyleSheet
} from 'react-native';
import { HomeTabStyles, CarSelectScreenStyle } from '../../../styles';
import { useTranslation } from "react-i18next";
import { Input, Container, CommonMapView, Button } from '../../../components';
import images from '../../../index';
import Timeline from 'react-native-timeline-flatlist';
import { useTheme } from '@react-navigation/native';
import { RouteName } from '../../../routes';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Autocomplete from 'react-native-autocomplete-input';
import Geolocation from '@react-native-community/geolocation';
import { border } from 'native-base/lib/typescript/theme/styled-system';
import { color } from 'react-native-elements/dist/helpers';
import { Spacing, VectorIcon, BottomSheet } from '../../../components';
import { SH, SF, heightPercent } from '../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import { Fonts } from '../../../utils';
import CarsDetail from '../CarsDetail';
import CarsPriceDetail from '../CarsPriceDetail';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { setUserData, setActiveBookings, setRoadPackage, setCityRedux, setCountryRedux, setLocalitys } from '../../../redux/slice';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../../utils/Api';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { SW } from '../../../utils'
import {
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveScreenFontSize
} from "react-native-responsive-dimensions";
import Rentcars from '../../../images/Rentcars.svg'
import OneWi from '../../../images/onewayicon.svg'
import Roundt from '../../../images/Roundtrip.svg'
import Roadt from '../../../images/Roadtrip.svg'
import Localt from '../../../images/localtrip.svg'
import RentalActive from '../../../images/RentalActive.svg'
import OnewayActive from '../../../images/Onewayt.svg'
import RoundtActive from '../../../images/roundtripActive.svg'
import RoadtActive from '../../../images/roadtripActive.svg'
import LocaltActive from '../../../images/localtripActive.svg'
import PickupIcon from '../../../images/pickupicon.svg'
import Caricon from '../../../images/caricon.svg'
import DatePickerIcon from '../../../images/calandericon.svg'
import DesitnationPointicon from '../../../images/Destinationicon.svg'




const _search_location_data = [
    {
        description: "Noida",
    },
    {
        description: "Delhi",
    },
    {
        description: "Lucknow",
    },
    {
        description: "Mumbai",
    },
    {
        description: "Kerla",
    },
    {
        description: "Kolkata",
    },
    {
        description: "Chennai",
    },
    {
        description: "Banglore",
    },
    {
        description: "Jaipur",
    },
    {
        description: "Gujrat",
    }

]
const HomeTab = (props) => {
    const _google_api_key = "AIzaSyBROrj6ildPHETPysda_MuT6cZYpAVyEAw"
    const dispatch = useDispatch()
    const { userData, userId, cityRedux, countryRedux, Locality } = useSelector(
        (state: any) => state.auth,
    );
    // console.log('cityRedux', cityRedux)

    const { message, modalVisible, setModalVisible, buttonminview, onPress, onPressCancel, buttonText, cancelButtonText, iconVisible } = props;
    const { t } = useTranslation();
    const { navigation } = props;
    const { Colors } = useTheme();
    const HomeTabStyless = useMemo(() => HomeTabStyles(Colors), [Colors]);
    // console.log('nnanananana', name)
    // console.log('name==>', name)
    const [_search_location, set_search_location] = useState();
    // const [_search_location_data, set_search_location_data] = useState([]);
    const [_currant_location_name, set_currant_location_name] = useState('');
    const [_currant_location_names, set_currant_location_names] = useState('');
    const [renatalname, setRentalname] = useState('')
    const [_show_search_input, set_show_search_input] = useState(true);
    const [position, setPosition] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [homesearch, setHomeSearch] = useState('');
    // const [filteredCities, setFilteredCities] = useState([]);
    const [filteredCitiess, setFilteredCitiess] = useState([]);
    const [location_name, setLocation_name] = useState('')
    const [selectedButton, setSelectedButton] = useState('Rentals');
    const [selectedPackage, setSelectedPackage] = useState();
    const [selectPackagetype, setSelectPakcagetype] = useState(1)
    const [selectedButton1, setSelectedButton1] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateTime, setDateTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [_rental, setRental] = useState(false)

    const [_get_packages, set_Get_package] = useState([])
    const [name, setName] = useState()

    console.log('setnameeee', name);
    const [_Oneway_search, set_oneway_search] = useState(_onewayname ? _onewayname : '');
    const [_Oneway_data, setOneway_data] = useState([]);
    const [_oneway, setOneway] = useState(true)
    const [_onewaydestination, setOnewaydestination] = useState('')

    const [_onewaySource, setOnewaysource] = useState(true)
    const [_oneway_destination, set_oneway_destination] = useState('')
    const [_onewayname, setOnewayname] = useState('')
    const [_destination_city, set_Destination_city] = useState([])
    const [_destination_name, setDestination_name] = useState()
    const [dest, setDest] = useState(true)

    const [__roundtrip_city, _Set_Round_city] = useState('')
    const [_roundTrip_data, set_Roundtrip_Data] = useState([])
    const [destinationRoundTrip, setDestination_roundtrip] = useState('')
    const [destination_round_data, set_DestinationRound_data] = useState([])
    const [dropdate, setDropdate] = useState(new Date())
    const [rounddropdate, setRoundDropdate] = useState(false)
    const [droppicker, setDroppicker] = useState(false)
    const [droptime, setDroptime] = useState(new Date())


    const [_roadtrip, setRoadtrip] = useState('')
    const [_roadtrip_data, set_Roadtrip_data] = useState([])
    const [_roadtrip_name, setRoadtripname] = useState('')
    const [_roundtripname, setRoundtripname] = useState('')
    const [_roundtrip, setRoundtrip] = useState(true)
    const [_rounddestinationname, setRounddestinationname] = useState()
    const [_rounddestination, setRounddestination] = useState(true)
    const [numberdays, setNumberdays] = useState(0)

    const [_localtrip, setLocaltrip] = useState('')
    const [_localtrip_data, setLocaltrip_data] = useState([])
    const [localname, setLocalname] = useState('')
    const [_droplocation, setDroplocation] = useState('')
    const [_droplocation_data, set_localdroploction_data] = useState([])
    const [localdropname, setLocaldropname] = useState('')
    const [destinationCities, setDestinationCities] = useState(['']);


    const [isLoading, setIsLoading] = useState(false);

    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false)
    const [suggestionsList, setSuggestionsList] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)
    const dropdownController = useRef(null)
    const dropdownController1 = useRef(null)
    const dropdownController2 = useRef(null)
    const dropdownController3 = useRef(null)
    const dropdownController4 = useRef(null)
    const dropdownController5 = useRef(null)
    const dropdownController6 = useRef(null)





    const searchRef = useRef(null)
    const searchRef1 = useRef(null)
    const searchRef2 = useRef(null)
    const searchRef3 = useRef(null)
    const searchRef4 = useRef(null)
    const searchRef5 = useRef(null)
    const searchRef6 = useRef(null)
    console.log('name', name)

    useEffect(() => {
        if (name) {
            _Get_packgae();
        }

    }, [name])
    //
    const [citydata, setCitydata] = useState([]);
    const [filteredCityData, setFilteredCityData] = useState([]);
    if (cityRedux) {
        useEffect(() => {
            if (cityRedux) {
                const transformedData = cityRedux.map((item) => ({
                    id: item.city_id,
                    title: item.city_name,
                }));
                setCitydata(transformedData);
                setFilteredCityData(transformedData); // Initialize with full data
            }
        }, [cityRedux]);
    }

    const [airdata, setAirdata] = useState([]);
    const [filteredair, setFilteredair] = useState([]);
    if (countryRedux) {
        useEffect(() => {
            if (countryRedux) {
                const transformedData = countryRedux?.map((item) => ({
                    id: item.city_id,
                    title: item.city_name,
                }));
                setAirdata(transformedData);
                setFilteredair(transformedData); // Initialize with full data
            }
        }, [countryRedux]);
    }
    const handleTextChange = (text) => {
        set_search_location(text);
        _search_for_location();
        const filteredData = citydata.filter(item =>
            item.title.toLowerCase().startsWith(text.toLowerCase())
        );
        setFilteredCityData(filteredData);
    };

    const handleTextChangeair = (text) => {
        set_search_location(text);
        _search_for_location();
        const filteredData = airdata.filter(item =>
            item.title.toLowerCase().startsWith(text.toLowerCase())
        );
        setFilteredair(filteredData);
    };


    const [localdata, setLocaldata] = useState([]);
    const [filteredlocal, setFilteredlocal] = useState([]);
    if (Locality) {
        useEffect(() => {
            if (Locality) {
                const transformedData = Locality?.map((item) => ({
                    id: item.city_id,
                    title: item.city_name,
                }));
                setLocaldata(transformedData);
                setFilteredlocal(transformedData); // Initialize with full data
            }
        }, [Locality]);
    }
    const handleTextChangelocal = (text) => {
        set_search_location(text);
        _search_for_location();
        const filteredData = localdata.filter(item =>
            item.title.toLowerCase().startsWith(text.toLowerCase())
        );
        setFilteredlocal(filteredData);
    };

    useEffect(() => {
        get_all_cities()
        _current_location();  // Initial call
        _get_all_air_cities()

        const interval = setInterval(() => {
            _current_location();
        }, 5000); // Call every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);
    const _get_all_air_cities = async () => {
        try {

            const username = 'btcal';
            const password = '123@cal';
            const basicAuth = 'Basic ' + btoa(username + ':' + password);

            const response = await axios.get('https://web.bharattaxi.com/api/userAllAirportSourceCity', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': basicAuth,
                    // Add any additional headers here if needed
                },
            });

            // console.log('air cities==>>', response?.data?.city_list)

            dispatch(setCountryRedux(response?.data?.city_list))
            // setLocaltrip_data(response?.data?.city_name)

            // set_show_search_input(true)

        } catch (error) {
            console.error('Error:', error);

        }
    };



    //   const fetchItemDetails = async () => {
    //     let URL = '';
    //     const response = await axios.get(URL);
    //     if (response) {
    //      console.log('datatatata',response);
    //     } else {
    //     //   setData([]);
    //     console.log('ellsesss');
    //     }
    //   };
    const get_all_cities = async () => {
        try {

            const username = 'btcal';
            const password = '123@cal';
            const basicAuth = 'Basic ' + btoa(username + ':' + password);

            const response = await axios.get('https://web.bharattaxi.com/api/userCityFirst', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': basicAuth,
                    // Add any additional headers here if needed
                },
            });

            // console.log('response', response?.data?.city_list)
            dispatch(setCityRedux(response?.data?.city_list))
            // setLocaltrip_data(response?.data?.city_name)

            // set_show_search_input(true)

        } catch (error) {
            console.error('Error:', error);

        }
    };
    // console.log('locatiysss', Locality)

    useEffect(() => {
        if (localname) {
            _Get_Localities();
        }

    }, [localname])
    const _Get_Localities = async () => {
        // console.log('item===>>', name)
        try {
            const formData = new FormData();
            // if (selectedButton === "Rentals") {
            formData.append('city_name', localname);
            // } else if (selectedButton === "One way") {
            //     formData.append('city_name', _Oneway_search);
            // }





            const username = 'btcal';
            const password = '123@cal';
            const basicAuth = 'Basic ' + btoa(username + ':' + password);
            console.log('payload', formData)
            const response = await axios.post(`${BASE_URL}allLocalities`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': basicAuth,
                    // Add any additional headers here if needed
                },
            });
            // const packageNames = response?.data?.map(item => item.package_name);
            console.log('localotrss===>>>', response?.data?.local_city);
            dispatch(setLocalitys(response?.data?.local_city))
            // set_Get_package(response?.data)
            // setSelectedPackage(response?.data[0]?.id)
            // setPackagename(response?.data[0]?.package_name)


            // if (selectedButton === "Rentals") {
            //     setFilteredCitiess(response?.data?.city_name)
            // } else if (selectedButton === "One way") {
            //     setOneway_data(response?.data?.city_name)
            // }
            // set_show_search_input(true)





        } catch (error) {
            console.error('Error:', error);

        }
    };
    const _current_location = async () => {
        try {

            const username = 'btcal';
            const password = '123@cal';
            const basicAuth = 'Basic ' + btoa(username + ':' + password);

            const response = await axios.post('https://web.bharattaxi.com/api/usercurrentlocation', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': basicAuth,
                    // Add any additional headers here if needed
                },
            });

            // console.log('response', response?.data)
            // setLocaltrip_data(response?.data?.city_name)

            // set_show_search_input(true)

        } catch (error) {
            console.error('Error:', error);

        }
    };
    // cityRedux
    const getSuggestions = useCallback(async q => {
        const filterToken = q.toLowerCase()
        console.log('getSuggestions', q)
        if (typeof q !== 'string' || q.length < 3) {
            setSuggestionsList(null)
            return
        }
        setLoading(true)
        // const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const items = await cityRedux
        const suggestions = items
            .filter(item => item.title.toLowerCase().includes(filterToken))
            .map(item => ({
                id: item.city_id,
                title: item.city_name,
            }))
        setSuggestionsList(suggestions)
        setLoading(false)
    }, [])

    const onClearPress = useCallback(() => {
        setSuggestionsList(null)
    }, [])

    const [query, setQuery] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);

    const filterCities = (text) => {
        setQuery(text);
        if (text) {
            const filtered = cityRedux.filter(city =>
                city.city_name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredCities(filtered);
        } else {
            setFilteredCities([]);
        }
    };

    const handleItemPress = (cityName) => {
        setQuery(cityName);
        setFilteredCities([]);
    };
    console.log('_roundtripname===>>>', _roundtripname)
    console.log('suggestion', suggestionsList)
    const onOpenSuggestionsList = useCallback(isOpened => { }, [])
    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const handleAddDestination = () => {
        setDestinationCities([...destinationCities, '']);
    };

    const handleRemoveDestination = (index) => {
        const newDestinations = destinationCities.filter((_, i) => i !== index);
        setDestinationCities(newDestinations);
    };

    const handleDestinationChange = (text, index) => {
        const newDestinations = [...destinationCities];
        newDestinations[index] = text;
        setDestinationCities(newDestinations);
    };

    console.log('destination_round_data', destination_round_data)
    const onChange = (event, selectedDateTime) => {
        const currentDateTime = selectedDateTime || dateTime;
        const dateObject = new Date(selectedDateTime);
        const date = dateObject.toISOString().split('T')[0];

        if (Platform.OS === 'android') {
            setShowPicker(false); // Dismiss the picker on Android
        } else {
            setShowPicker(false); // For iOS, this line might not be necessary, but you can keep it for consistency
        }
        setDateTime(currentDateTime);
    };


    useEffect(() => {
        // Check if _get_packages is defined and has exactly 2 items
        if (_get_packages && _get_packages.length === 2) {
            setSelectedPackage(_get_packages[0]?.id); // Select the id of the first item
        }
    }, [_get_packages]);
    const ondropchange = (event, selectedDateTime) => {
        const currentDateTime = selectedDateTime || dateTime;
        const dateObject = new Date(selectedDateTime);
        const date = dateObject.toISOString().split('T')[0];

        if (Platform.OS === 'android') {
            setRoundDropdate(false); // Dismiss the picker on Android
        } else {
            setRoundDropdate(false); // For iOS, this line might not be necessary, but you can keep it for consistency
        }
        setDropdate(currentDateTime);
        setDroppicker(true)
    };


    const showDateTimePicker = () => {
        setShowPicker(true);
    };


    const showrounddropdate = () => {
        setRoundDropdate(true);
    };

    const formattime = (dateTime) => {
        if (!dateTime) return "Date and time";

        // Extract time from DateTime object
        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();

        // Format the time into 12-hour format
        let formattedTime = hours % 12 || 12; // Convert to 12-hour format
        formattedTime += ":" + (minutes < 10 ? "0" : "") + minutes; // Add leading zero if necessary
        formattedTime += hours >= 12 ? " PM" : " AM"; // Add AM/PM indicator

        return formattedTime;
    };

    console.log('selectedPackage', selectedPackage)
    const onChangeTime = (event, selectedTime) => {
        const selectedDate = selectedTime || date;
        setShowTimePicker(Platform.OS === 'ios');
        setDate(selectedDate);
    };

    const onDropChangeTime = (event, selectedTime) => {
        const selectedDate = selectedTime || date;
        setDroppicker(Platform.OS === 'ios');
        setDroptime(selectedDate);
    };

    const timeonChange = (event, selectedDateTime) => {
        const currentDateTime = selectedDateTime || dateTime;
        const dateObject = new Date(selectedDateTime);
        const date = dateObject.toISOString().split('T')[0];

        if (Platform.OS === 'android') {
            setShowPicker(false); // Dismiss the picker on Android
        } else {
            setShowPicker(false); // For iOS, this line might not be necessary, but you can keep it for consistency
        }
        setDateTime(currentDateTime);
        setShowTimePicker(true);
    };


    const Dropchnagetime = (event, selectedDateTime) => {
        const currentDateTime = selectedDateTime || dateTime;
        const dateObject = new Date(selectedDateTime);
        const date = dateObject.toISOString().split('T')[0];

        if (Platform.OS === 'android') {
            setShowPicker(false); // Dismiss the picker on Android
        } else {
            setShowPicker(false); // For iOS, this line might not be necessary, but you can keep it for consistency
        }
        setDateTime(currentDateTime);
        setDroppicker(true);
    };
    useEffect(() => {
        set_search_location(name ? name : '');

    }, [name]);
    // console.log('_search_location', _search_location)
    useEffect(() => {
        set_oneway_search(_onewayname ? _onewayname : '');
    }, [_onewayname]);

    useEffect(() => {
        set_oneway_destination(_destination_name ? _destination_name : '');
    }, [_destination_name]);

    useEffect(() => {
        setRoadtrip(_roadtrip_name ? _roadtrip_name : '');
    }, [_roadtrip_name]);

    useEffect(() => {
        _Set_Round_city(_roundtripname ? _roundtripname : '');
    }, [_roundtripname]);

    useEffect(() => {
        setDroplocation(localdropname ? localdropname : '');
    }, [localdropname]);

    useEffect(() => {
        setLocaltrip(localname ? localname : '');
    }, [localname])

    useEffect(() => {
        setDestination_roundtrip(_rounddestinationname ? _rounddestinationname : '');
    }, [_rounddestinationname]);


    const showDateTimePicker1 = () => {
        setShowPicker(true);

    };
    function formatDate22(date) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const year = date.getFullYear().toString().slice(2);
        const month = months[date.getMonth()];
        const day = date.getDate();
        return `${day} ${month}'${year}`;
    }

    // console.log('formadayutguwoiagd',formatDate22(dateTime))
    function formatDate(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    }
    const hanldehomeSearch = (text) => {
        setHomeSearch(text);
        if (text.length >= 2) {
            const filteredCities = _search_location_data.filter(city => {
                return city.description.toLowerCase().includes(text.toLowerCase());
            });
            setFilteredCitiess(filteredCities);
        } else {
            setFilteredCitiess([]);
        }
    };

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
    const [location, setLocation] = useState(null);
    const getLocationName = (latitude, longitude) => {
        return new Promise((resolve, reject) => {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${_google_api_key}`)
                .then(response => response.json())
                .then(data => {
                    if (data.results && data.results.length > 0) {
                        const locationName = data.results[0].formatted_address.slice(0, 40);
                        setLocation_name(locationName)
                        // console.log('location anme', locationName)
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
    const [isFocused, setIsFocused] = useState(false);

    const [filteredSearchData, setFilteredSearchData] = useState([])
    const _search_for_location = async () => {
        try {
            const formData = new FormData();
            if (selectedButton === "Rentals") {
                formData.append('source_city', _search_location);
            } else if (selectedButton === "One way") {
                formData.append('source_city', _Oneway_search);
            } else if (selectedButton === "Round trip") {
                formData.append('source_city', __roundtrip_city);
            } else if (selectedButton === "Road trip") {
                formData.append('source_city', _roadtrip);
            } else if (selectedButton === "Local") {
                formData.append('source_city', _localtrip);
            }
            console.log('payload', formData)
            const username = 'btcal';
            const password = '123@cal';
            const basicAuth = 'Basic ' + btoa(username + ':' + password);
            // console.log('payload', formData)
            const response = await axios.post(`${BASE_URL}sourcecity`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': basicAuth,
                    // Add any additional headers here if needed
                },
            });

            // console.log('city searcch', response?.data);
            if (selectedButton === "Rentals") {
                setFilteredCitiess(response?.data?.city_name)
                // console.log('rental happen==>>>>++++>>>>>', _rental)
                setFilteredSearchData()
            } else if (selectedButton === "One way") {
                setOneway_data(response?.data?.city_name)
            } else if (selectedButton === "Round trip") {
                set_Roundtrip_Data(response?.data?.city_name)
            } else if (selectedButton === "Road trip") {
                console.log('roadtrip', response?.data)
                set_Roadtrip_data(response?.data?.city_name)
            }
            set_show_search_input(true)

        } catch (error) {
            console.error('Error:', error);

        }
    };

    const _search_for_location_Local = async () => {
        try {
            const formData = new FormData();

            formData.append('source_city', _localtrip);

            console.log('payload', formData)
            const username = 'btcal';
            const password = '123@cal';
            const basicAuth = 'Basic ' + btoa(username + ':' + password);
            console.log('payload', formData)
            const response = await axios.post(`${BASE_URL}airportSourceCity`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': basicAuth,
                    // Add any additional headers here if needed
                },
            });


            setLocaltrip_data(response?.data?.city_name)

            // set_show_search_input(true)

        } catch (error) {
            console.error('Error:', error);

        }
    };

    const _Destination_city = async () => {
        try {
            const formData = new FormData();

            formData.append('source_city', _onewayname);

            formData.append('destination_city', _oneway_destination);






            const username = 'btcal';
            const password = '123@cal';
            const basicAuth = 'Basic ' + btoa(username + ':' + password);
            // console.log('payload', formData)
            const response = await axios.post(`${BASE_URL}destinationcity`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': basicAuth,
                    // Add any additional headers here if needed
                },
            });

            // console.log('Oneway destination', response?.data);

            set_Destination_city(response?.data?.desti_city)
            setOneway(true)







        } catch (error) {
            console.error('Error:', error);

        }
    };


    const [inputFields, setInputFields] = useState([{ value: '', cities: [] }]);
    const [selectedCities, setSelectedCities] = useState({}); // Changed to object for easier management
    const [activeInputIndex, setActiveInputIndex] = useState(null);

    console.log('selectedCitiesselectedCitiesselectedCities', setActiveInputIndex);

    const addInputField = () => {
        setInputFields((prevFields) => [...prevFields, { value: '', cities: [] }]);
    };
    const convertedList = Object.values(selectedCities).flat();
    const deleteInputField = (index) => {
        setInputFields((prevFields) => prevFields.filter((_, i) => i !== index));
        setSelectedCities((prevCities) => {
            const newCities = { ...prevCities };
            delete newCities[index];
            return newCities;
        });
    };
    const [cityh, setcityh] = useState('')

    const handleCitySelect = (city, index) => {
        setcityh(city)
        setSelectedCities((prevCities) => ({
            ...prevCities,
            [index]: (prevCities[index] || []).concat(city),
        }));
        setActiveInputIndex(null);

        setInputFields((prevFields) => {
            const newFields = [...prevFields];
            newFields[index].value = city;
            return newFields;
        });
    };

    const handleInputChange = (text, index) => {
        setInputFields((prevFields) => {
            const newFields = [...prevFields];
            newFields[index].value = text;
            return newFields;
        });
        debouncedFetchCities(text, index);
    };

    const fetchCities = async (text, index) => {
        try {
            const formData = new FormData();
            formData.append('source_city', 'Abu Road, Rajasthan');
            formData.append('destination_city', text);

            const username = 'btcal';
            const password = '123@cal';
            const basicAuth = 'Basic ' + btoa(username + ':' + password);
            console.log('payload', formData)
            const response = await axios.post(`${BASE_URL}destinationcity`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': basicAuth,
                },
            });

            setInputFields((prevFields) => {
                const newFields = [...prevFields];
                newFields[index].cities = response?.data?.desti_city || [];
                return newFields;
            });
            setActiveInputIndex(index);
        } catch (error) {
            console.error('Error:', error);
            setInputFields((prevFields) => {
                const newFields = [...prevFields];
                newFields[index].cities = [];
                return newFields;
            });
        }
    };

    const debouncedFetchCities = useCallback(debounce(fetchCities, 300), []);

    const _Drop_location = async () => {
        try {
            const formData = new FormData();


            formData.append('city_name', localname);
            formData.append('drop_location', _droplocation);








            const username = 'btcal';
            const password = '123@cal';
            const basicAuth = 'Basic ' + btoa(username + ':' + password);
            console.log('payload', formData)
            const response = await axios.post(`${BASE_URL}getlocalities`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': basicAuth,
                    // Add any additional headers here if needed
                },
            });

            console.log('Drop location', response?.data);
            // set_droploction_data

            set_localdroploction_data(response?.data)








        } catch (error) {
            console.error('Error:', error);

        }
    };

    // useEffect(() => {
    //     _Destination_Roundcity();
    // }, [destinationRoundTrip]);
    // useEffect(() => {
    //     _Drop_location();
    // }, [_droplocation]);




    const _Get_packgae = async () => {
        // console.log('item===>>', name)
        try {
            const formData = new FormData();
            // if (selectedButton === "Rentals") {
            formData.append('city_name', name);
            // } else if (selectedButton === "One way") {
            //     formData.append('city_name', _Oneway_search);
            // }





            const username = 'btcal';
            const password = '123@cal';
            const basicAuth = 'Basic ' + btoa(username + ':' + password);
            // console.log('payload', formData)
            const response = await axios.post(`${BASE_URL}getPackage`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': basicAuth,
                    // Add any additional headers here if needed
                },
            });
            const packageNames = response?.data?.map(item => item.package_name);
            // console.log('packgaes===>>>', response?.data);
            set_Get_package(response?.data)
            setSelectedPackage(response?.data[0]?.id)
            setPackagename(response?.data[0]?.package_name)


            // if (selectedButton === "Rentals") {
            //     setFilteredCitiess(response?.data?.city_name)
            // } else if (selectedButton === "One way") {
            //     setOneway_data(response?.data?.city_name)
            // }
            // set_show_search_input(true)





        } catch (error) {
            console.error('Error:', error);

        }
    };

    useEffect(() => {
        if (name) {
            _Get_packgae();
        }

    }, [name])
    const formattedDate = formatDate22(dateTime);
    const formattedTime = formattime(date);
    const finalDate = ` ${formattedDate} - ${formattedTime}`

    const formattedDate1 = formatDate22(dropdate);
    const formattedTime1 = formattime(droptime);
    const finaldrop = ` ${formattedDate1} - ${formattedTime1}`
    const [error, setError] = useState(false);
    const _Local_search = async () => {
        if (!name || !selectedPackage || !finalDate) {
            setError(true)
        } else {
            setIsLoading(true);
            try {



                const formData = new FormData();
                formData.append('btn_rental', 'search');
                formData.append('source_city', name);

                formData.append('package_type', selectedPackage);
                formData.append('pickup_date', finalDate);






                const username = 'btcal';
                const password = '123@cal';
                const basicAuth = 'Basic ' + btoa(username + ':' + password);
                console.log('payload', formData)
                const response = await axios.post(`${BASE_URL}searchResult`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': basicAuth,
                        // Add any additional headers here if needed
                    },
                });

                console.log('local search===>>>>>>>>', response?.data);
                dispatch(setUserData(response?.data?.dataResult))
                dispatch(setActiveBookings(response?.data?.search_data))
                navigation.navigate('CarsPriceDetail', {booking: 'rentals'})

            } catch (error) {
                console.error('Error:', error);
                if (selectedPackage === undefined) {
                    ToastAndroid.show('select package', ToastAndroid.SHORT);
                }


            } finally {
                setIsLoading(false); // Set loading state to false when API call completes (success or error)
            }
        }


    };

    const _One_Way_Search = async () => {
        if (!_oneway || !_destination_name || !finalDate) {
            setError(true)

        } else {
            setIsLoading(true);
            try {
                const formData = new FormData();
                formData.append('btn_oneway', 'search');
                formData.append('source_city', _onewayname);

                formData.append('destination_city', _destination_name);
                formData.append('pickup_date', finalDate);






                const username = 'btcal';
                const password = '123@cal';
                const basicAuth = 'Basic ' + btoa(username + ':' + password);
                // console.log('payload', formData)
                const response = await axios.post(`${BASE_URL}searchResult`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': basicAuth,
                        // Add any additional headers here if needed
                    },
                });

                console.log('local search===>>>>>>>>', response?.data);
                dispatch(setUserData(response?.data?.dataResult))
                dispatch(setActiveBookings(response?.data?.search_data))
                navigation.navigate('CarsPriceDetail',{booking: 'oneway'})

            } catch (error) {
                console.error('Error:', error);

            } finally {
                setIsLoading(false); // Set loading state to false when API call completes (success or error)
            }
        }
    };

    const _Round_trip_search = async () => {
        if (!__roundtrip_city) {
            setError(true)
        } else {
            setIsLoading(true);
            try {
                const formData = new FormData();
                formData.append('btn_outstation', 'search');
                formData.append('source_city', _roundtripname);

                convertedList.forEach((city, index) => {
                    formData.append(`destination_city[${index}]`, city);
                });
                formData.append('pickup_date', finalDate);
                formData.append('drop_date', finaldrop);






                const username = 'btcal';
                const password = '123@cal';
                const basicAuth = 'Basic ' + btoa(username + ':' + password);
                console.log('payload', formData)
                const response = await axios.post(`${BASE_URL}searchResult`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': basicAuth,
                        // Add any additional headers here if needed
                    },
                });

                // console.log('local search===>>>>>>>>', response?.data);
                dispatch(setUserData(response?.data?.dataResult))
                dispatch(setActiveBookings(response?.data?.search_data))
                navigation.navigate('CarsPriceDetail', {booking: 'Round'})

            } catch (error) {
                console.error('Error:', error);

            } finally {
                setIsLoading(false); // Set loading state to false when API call completes (success or error)
            }
        }
    };

    const _Road_trip_search = async () => {
        if (!_roadtrip_name || !numberdays || !finalDate) {
            setError(true)
        } else {
            setIsLoading(true);
            try {
                const formData = new FormData();
                // formData.append('btn_roadtrip', 'search');
                formData.append('source_city', _roadtrip_name);

                formData.append('no_of_days', numberdays);
                formData.append('pickup_date', finalDate);






                const username = 'btcal';
                const password = '123@cal';
                const basicAuth = 'Basic ' + btoa(username + ':' + password);
                console.log('payload', formData)
                const response = await axios.post(`${BASE_URL}roadtrip`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': basicAuth,
                        // Add any additional headers here if needed
                    },
                });

                console.log('local search===>>>>>>>>', response?.data);
                dispatch(setUserData(response?.data?.packages))
                dispatch(setActiveBookings(response?.data?.search_result))
                // dispatch(setRoadPackage(response?.data?.package))
                navigation.navigate('CarsPriceDetail', {booking: 'Road'})

            } catch (error) {
                console.error('Error:', error);

            } finally {
                setIsLoading(false); // Set loading state to false when API call completes (success or error)
            }
        }
    };

    const _Local_Trip_search = async () => {
        if (!_localtrip || !selectPackagetype || !localdropname || !finalDate) {
            setError(true)
        } else {
            setIsLoading(true);
            try {
                const formData = new FormData();
                formData.append('btn_transfer', 'search');
                formData.append('source_city', _localtrip);
                formData.append('transfer_type', selectPackagetype);

                formData.append('drop_location', localdropname);
                formData.append('pickup_date', finalDate);






                const username = 'btcal';
                const password = '123@cal';
                const basicAuth = 'Basic ' + btoa(username + ':' + password);
                console.log('payload', formData)
                const response = await axios.post(`${BASE_URL}searchResult`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': basicAuth,
                        // Add any additional headers here if needed
                    },
                });

                console.log('local search===>>>>>>>>', response?.data);
                dispatch(setUserData(response?.data?.dataResult))
                dispatch(setActiveBookings(response?.data?.search_data))
                navigation.navigate('CarsPriceDetail', {booking: 'local'})

            } catch (error) {
                console.error('Error:', error);

            } finally {
                setIsLoading(false); // Set loading state to false when API call completes (success or error)
            }
        }
    };

    const CarSelectScreenStyles = useMemo(() => CarSelectScreenStyle(Colors), [Colors]);
    const [select, setSelect] = useState(0);
    const arrayList = {
        locationSearch: ''
    }
    const [change, setOnChange] = useState(arrayList);
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };


    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isCarDetails, setIsCarDetails] = useState(false);

    const openBottomSheet = () => {
        setIsBottomSheetOpen(true);
    };

    const closeBottomSheet = () => {
        setIsBottomSheetOpen(false);
    };

    const [packagetype, setPackagetype] = useState('')
    // console.log('selectedPackage', selectedPackage)
    const selectItem = (item) => {

        setName(item)
        setRental(false)

    }
    console.log('_roadtrip_data', _roadtrip_data)

    // _get_packages?.map((item, index) => (
    // console.log('packageitemmmmmm', item?.package_name)
    // ))

    const [modalVisible1, setModalVisible1] = useState(false);
    const [packagename, setPackagename] = useState('')

    const data = [
        {


            title: (
                <View style={{height:responsiveScreenHeight(12)}}>
                    <Text style={HomeTabStyless.WhereAreYouTitle}>{t("Where_Are_You_Place")}</Text>

                    <AutocompleteDropdown
                        ref={searchRef}
                        controller={controller => {
                            dropdownController.current = controller;
                        }}
                        direction={'down'}
                        dataSet={filteredCityData} // Use filtered data
                        onChangeText={handleTextChange} // Use the new handler
                        onSelectItem={item => {
                            item && setName(item?.title);
                            set_search_location()
                            setFilteredCitiess([]);
                        }}
                        debounce={600}
                        suggestionsListMaxHeight={200}
                        onClear={onClearPress}
                        onOpenSuggestionsList={_search_location && onOpenSuggestionsList}
                        loading={loading}
                        useFilter={false}
                        textInputProps={{
                            placeholder: 'Source city name ..',
                            placeholderTextColor: '#000',
                            placeholderStyle:{alignSelf:'center', textAlign:'center', fontSize:12},
                            autoCorrect: false,
                            autoCapitalize: 'none',
                            style: {
                                backgroundColor: '#fff',
                                color: '#000',
                                width: SW(240),
                                borderRadius: 10
                            },
                        }}
                        rightButtonsContainerStyle={{
                            right: 8,
                            height: 30,
                            alignSelf: 'center',
                        }}
                        inputContainerStyle={{
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderColor: error === true ? 'red' : '#B6B6B6',
                            borderRadius: 10
                        }}
                        suggestionsListContainerStyle={{
                            backgroundColor: '#fff',
                        }}
                        containerStyle={{ flexGrow: 1, flexShrink: 1, right: responsiveScreenWidth(0.5) }}
                        renderItem={(item, text) => <Text style={{ color: '#000', padding: 15 }}>{item?.title}</Text>}
                        inputHeight={40}
                        inputWidth={225}
                        showChevron={false}
                        closeOnBlur={false}
                    />

                    {/* <Autocomplete
                        data={filteredCities}
                        value={query}
                        onChangeText={text => filterCities(text)}
                        placeholder="Enter city name"
                        style={HomeTabStyless.SearchPlaceStyle}
                        flatListProps={{
                            keyExtractor: (item) => item.city_id,
                            renderItem: ({ item }) => (
                                <TouchableOpacity onPress={() => handleItemPress(item.city_name)} style={{he}}>
                                    <Text style={{color:"black"}}>{item.city_name}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    /> */}

                </View>
            ),
            icon: <PickupIcon />
            // icon: <PickupIcon/>
        },
        {
            title: (
                <View style={{height:responsiveScreenHeight(12)}}>
                    <Text style={HomeTabStyless.WhereAreYouTitle}>Package type</Text>
                    {/* <View style={[{ borderColor: error === true ? 'red' : 'black' }, HomeTabStyless.SearchPlaceStyle1]}>

                        <Picker
                            selectedValue={selectedPackage}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedPackage(itemValue)
                            }
                            style={{ height: 60, width: 235 }}>
                            {_get_packages?.map((item, index) => (
                                <Picker.Item key={index} label={item?.package_name} value={item?.id} color='#000' />
                            ))}
                        </Picker>
                    </View> */}

                    <TouchableOpacity style={HomeTabStyless.SearchPlaceStyle} onPress={() => setModalVisible1(true)}>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                packagename ?
                                    <Text style={{ color: "black" }}>{packagename}</Text>
                                    :
                                    <Text style={{ color: "black" }}>No package</Text>
                            }

                            <View style={{ flexGrow: 1, alignItems: "flex-end", justifyContent: "center", }}>
                                <AntDesign name="caretdown" size={14} color={'black'} />
                            </View>
                        </View>


                    </TouchableOpacity>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible1}
                        onRequestClose={() => {

                            setModalVisible1(!modalVisible1);
                        }}>
                        <Pressable style={styles.centeredView}
                            onPress={() => setModalVisible1(!modalVisible1)}>
                            <View style={styles.modalView}>


                                {_get_packages?.map((item, index) => (

                                    <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#bbb', padding: 10 }} onPress={() => {
                                        setSelectedPackage(item?.id);
                                        setPackagename(item?.package_name); setModalVisible1(!modalVisible1)

                                    }} >
                                        <Text style={{ color: 'black', textAlign: 'center' }}>{item?.package_name}</Text>
                                    </TouchableOpacity>
                                    // <Picker.Item key={index} label={item?.package_name} value={item?.id} color='black' />
                                ))}


                                {/* <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible1(!modalVisible1)}>
                                    <Text style={styles.textStyle}>Hide Modal</Text>
                                </Pressable> */}
                            </View>
                        </Pressable>
                    </Modal>

                </View>
            ),
            icon: <Caricon />
            // icon: <Image source={require('../../../images/Vector.png')} resizeMode="contain" style={HomeTabStyless.DestinationIcon} />
        },
        {
            title: (
                <View style={{height:responsiveScreenHeight(12)}}>
                    <Text style={HomeTabStyless.WhereAreYouTitle}>Pickup date</Text>

                    {
                        dateTime ?
                            <TouchableOpacity onPress={showDateTimePicker} style={HomeTabStyless.SearchPlaceStyle} >
                                <Text style={{ color: "black" }}>{formatDate(dateTime)} -  {formattime(date)} </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={showDateTimePicker} style={HomeTabStyless.SearchPlaceStyle} >
                                <Text style={{ color: "gray" }}>Date and time</Text>
                            </TouchableOpacity>
                    }

                    {showPicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={dateTime}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={timeonChange}
                        />
                    )}

                    {showTimePicker && (
                        <DateTimePicker
                            testID="timePicker"
                            value={date}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={onChangeTime}
                        />
                    )}


                </View>
            ),
            icon: <DatePickerIcon />
        },





    ];

    const Oneway = [
        {
            title: (
                <View style={{height:responsiveScreenHeight(12)}}>
                    <Text style={HomeTabStyless.WhereAreYouTitle}>{t("Where_Are_You_Place")}</Text>


                    <AutocompleteDropdown
                        ref={searchRef1}
                        controller={controller => {
                            dropdownController.current = controller;
                        }}
                        direction={'down'}
                        dataSet={filteredCityData} // Use filtered data
                        onChangeText={handleTextChange} // Use the new handler
                        onSelectItem={item => {
                            item && setOnewayname(item?.title)
                            setOneway_data([])

                        }}
                        debounce={600}
                        suggestionsListMaxHeight={200}
                        onClear={onClearPress}
                        onOpenSuggestionsList={_search_location && onOpenSuggestionsList}
                        loading={loading}
                        useFilter={false}
                        textInputProps={{
                            placeholder: 'Source city name ..',
                            placeholderTextColor: '#000',
                            autoCorrect: false,
                            autoCapitalize: 'none',
                            style: {
                                backgroundColor: '#fff',
                                color: '#000',
                                width: SW(240),
                                borderRadius: 10
                            },
                        }}
                        rightButtonsContainerStyle={{
                            right: 8,
                            height: 30,
                            alignSelf: 'center',
                        }}
                        inputContainerStyle={{
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderColor: error === true ? 'red' : '#B6B6B6',
                            borderRadius: 10
                        }}
                        suggestionsListContainerStyle={{
                            backgroundColor: '#fff',
                        }}
                        containerStyle={{ flexGrow: 1, flexShrink: 1, right: responsiveScreenWidth(0.5) }}
                        renderItem={(item, text) => <Text style={{ color: '#000', padding: 15 }}>{item?.title}</Text>}
                        inputHeight={40}
                        inputWidth={225}
                        showChevron={false}
                        closeOnBlur={false}
                    />


                </View>
            ),
            icon: <PickupIcon />
        },
        {
            title: (
                <View style={{height:responsiveScreenHeight(12)}}>
                    <Text style={HomeTabStyless.WhereAreYouTitle}>Destination city</Text>

                    <AutocompleteDropdown
                        ref={searchRef2}
                        controller={controller => {
                            dropdownController.current = controller;
                        }}
                        direction={'down'}
                        dataSet={filteredCityData} // Use filtered data
                        onChangeText={handleTextChange} // Use the new handler
                        onSelectItem={item => {
                            item && setDestination_name(item?.title);
                            set_Destination_city([])

                        }}
                        debounce={600}
                        suggestionsListMaxHeight={200}
                        onClear={onClearPress}
                        onOpenSuggestionsList={_search_location && onOpenSuggestionsList}
                        loading={loading}
                        useFilter={false}
                        textInputProps={{
                            placeholder: 'Destination city name ..',
                            placeholderTextColor: '#000',
                            autoCorrect: false,
                            autoCapitalize: 'none',
                            style: {
                                backgroundColor: '#fff',
                                color: '#000',
                                width: SW(240),
                                borderRadius: 10
                            },
                        }}
                        rightButtonsContainerStyle={{
                            right: 8,
                            height: 30,
                            alignSelf: 'center',
                        }}
                        inputContainerStyle={{
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderColor: error === true ? 'red' : '#B6B6B6',
                            borderRadius: 10
                        }}
                        suggestionsListContainerStyle={{
                            backgroundColor: '#fff',
                        }}
                        containerStyle={{ flexGrow: 1, flexShrink: 1, right: responsiveScreenWidth(0.5) }}
                        renderItem={(item, text) => <Text style={{ color: '#000', padding: 15 }}>{item?.title}</Text>}
                        inputHeight={40}
                        inputWidth={225}
                        showChevron={false}
                        closeOnBlur={false}
                    />




                </View>
            ),
            icon: <DesitnationPointicon />
            // icon: <DesitnationPointicon/>
        },
        {
            title: (
                <View style={{height:responsiveScreenHeight(12)}}>
                    <Text style={HomeTabStyless.WhereAreYouTitle}>Pickup date</Text>
                    {
                        dateTime ?
                            <TouchableOpacity onPress={showDateTimePicker} style={HomeTabStyless.SearchPlaceStyle} >
                                <Text style={{ color: "black" }}>{formatDate(dateTime)} - {formattime(date)}</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={showDateTimePicker} style={HomeTabStyless.SearchPlaceStyle} >
                                <Text style={{ color: "gray" }}>Date and time</Text>
                            </TouchableOpacity>
                    }

                    {showPicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={dateTime}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                    {showTimePicker && (
                        <DateTimePicker
                            testID="timePicker"
                            value={date}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={onChangeTime}
                        />
                    )}

                </View>
            ),
            icon: <DatePickerIcon />
        },





    ];

    const Roundtrip = [
        {
            title: (
                <View style={{height:responsiveScreenHeight(12)}}>
                    <Text style={HomeTabStyless.WhereAreYouTitle}>{t("Where_Are_You_Place")}</Text>

                    <AutocompleteDropdown
                        ref={searchRef3}
                        controller={controller => {
                            dropdownController.current = controller;
                        }}
                        direction={'down'}
                        dataSet={filteredCityData} // Use filtered data
                        onChangeText={handleTextChange} // Use the new handler
                        onSelectItem={item => {
                            item && setRoundtripname(item?.title);
                            set_Roundtrip_Data([])

                        }}
                        debounce={600}
                        suggestionsListMaxHeight={200}
                        onClear={onClearPress}
                        onOpenSuggestionsList={_search_location && onOpenSuggestionsList}
                        loading={loading}
                        useFilter={false}
                        textInputProps={{
                            placeholder: 'Source city name ..',
                            placeholderTextColor: '#000',
                            autoCorrect: false,
                            autoCapitalize: 'none',
                            style: {
                                backgroundColor: '#fff',
                                color: '#000',
                                width: SW(240),
                                borderRadius: 10
                            },
                        }}
                        rightButtonsContainerStyle={{
                            right: 8,
                            height: 30,
                            alignSelf: 'center',
                        }}
                        inputContainerStyle={{
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderColor: error === true ? 'red' : '#B6B6B6',
                            borderRadius: 10
                        }}
                        suggestionsListContainerStyle={{
                            backgroundColor: '#fff',
                        }}
                        containerStyle={{ flexGrow: 1, flexShrink: 1, right: responsiveScreenWidth(0.5) }}
                        renderItem={(item, text) => <Text style={{ color: '#000', padding: 15 }}>{item?.title}</Text>}
                        inputHeight={40}
                        inputWidth={225}
                        showChevron={false}
                        closeOnBlur={false}
                    />




                </View>
            ),
            icon: <PickupIcon />
        },
        {
            title: (
                <View style={{height:responsiveScreenHeight(12)}}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={HomeTabStyless.WhereAreYouTitle}>Destination city</Text>
                        <View style={{ flexGrow: 1, alignItems: 'flex-end', marginHorizontal: 10 }}>
                            <TouchableOpacity onPress={addInputField}>
                                <Image source={require('../../../images/plus.png')} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {inputFields.map((inputField, index) => (
                        <View key={index}>
                            <View style={{
                                flexDirection: 'row',
                                borderWidth: 1, alignItems: "center", paddingHorizontal: 5, paddingVertical: 5, borderRadius: 10, height: 40, marginVertical: 5, borderColor: error === true ? 'red' : '#bbb'
                            }}>

                                {/* <TextInput
                                    style={{ width: 190, color:'#00e' }}
                                    value={inputField.value}
                                    onChangeText={(text) => handleInputChange(text, index)}
                                    placeholder={Destination city ${index + 1}}
                                    placeholderTextColor={'#000'}
                                /> */}



                                <AutocompleteDropdown
                                    ref={searchRef3}
                                    controller={controller => {
                                        dropdownController3.current = controller
                                    }}
                                    // initialValue={'1'}
                                    direction={'down'}
                                    dataSet={inputField.cities}
                                    onChangeText={(text) => handleInputChange(text, index)}
                                    onSelectItem={item => {
                                        item && handleCitySelect(item, index)
                                    }}
                                    debounce={600}
                                    suggestionsListMaxHeight={200}
                                    onClear={onClearPress}
                                    //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
                                    onOpenSuggestionsList={activeInputIndex === index && inputField.cities.length > 0 && onOpenSuggestionsList}
                                    loading={loading}
                                    useFilter={false} // set false to prevent rerender twice
                                    textInputProps={{
                                        placeholder: inputField.value ? inputField.value : 'Destination city name ..', top: 2,
                                        placeholderTextColor: '#000',
                                        placeholderStyle: { height: 42, right: 10 },
                                        justifyContent: 'center',
                                        autoCorrect: false,
                                        autoCapitalize: 'none',
                                        style: {
                                            //   borderRadius: 25,
                                            width: SW(210),
                                            //                                  color:'#000', 
                                            color: '#000',
                                            //   textAlign:'left',
                                            //   paddingLeft: 18,
                                            //   borderLeftWidth:1,
                                            //   borderBottomWidth:1,
                                            //   borderTopWidth:1
                                            //   borderWidth:0.5

                                        },
                                    }}
                                    rightButtonsContainerStyle={{
                                        right: 8,
                                        // height: 38,

                                        alignSelf: 'center',
                                    }}
                                    inputContainerStyle={{
                                        backgroundColor: '#fff',

                                        // borderRadius: 25,
                                        // borderWidth: 1,
                                        borderColor: error === true ? 'red' : '#bbb',
                                        borderRadius: 10

                                    }}
                                    suggestionsListContainerStyle={{
                                        backgroundColor: '#fff',
                                    }}
                                    containerStyle={{ flexGrow: 1, flexShrink: 1 }}
                                    renderItem={(item, text) => <Text style={{ color: '#000', padding: 15 }}>{item}</Text>}
                                    //   ChevronIconComponent={<Feather name="chevron-down" size={20} color="#fff" />}
                                    //   ClearIconComponent={<Feather name="x-circle" size={18} color="#fff" />}
                                    inputHeight={38}
                                    inputWidth={225}

                                    showChevron={false}
                                    closeOnBlur={false}
                                //  showClear={false}
                                />
                                <TouchableOpacity onPress={() => deleteInputField(index)}>
                                    <Image source={require('../../../images/minus.png')} style={{ height: 20, width: 20, resizeMode: 'contain', right: responsiveScreenWidth(1.5) }} />
                                </TouchableOpacity>
                            </View>
                            {/* {activeInputIndex === index && inputField.cities.length > 0 && (
                                <ScrollView style={{ height: 60 }}>
                                    <View>
                                        <FlatList
                                            data={inputField.cities}
                                            keyExtractor={(item, idx) => idx.toString()}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity
                                                    onPress={() => handleCitySelect(item, index)}
                                                    style={{
                                                        paddingVertical: 15,
                                                        paddingHorizontal: 15,
                                                        borderBottomWidth: 0.5,
                                                        borderBottomColor: 'gray',
                                                        width: '100%',
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 16,
                                                            fontWeight: '500',
                                                            color: 'black',
                                                        }}
                                                    >
                                                        {item}
                                                    </Text>
                                                </TouchableOpacity>
                                            )}
                                        />
                                    </View>
                                </ScrollView>
                            )} */}
                        </View>
                    ))}
                </View>
            ),
            icon: <DesitnationPointicon />
        },
        {
            title: (
                <View style={{height:responsiveScreenHeight(12)}}>
                    <Text style={HomeTabStyless.WhereAreYouTitle}>Pickup date</Text>

                    {
                        dateTime ?
                            <TouchableOpacity onPress={showDateTimePicker} style={HomeTabStyless.SearchPlaceStyle} >
                                <Text style={{ color: "black" }}>{formatDate(dateTime)} - {formattime(date)}</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={showDateTimePicker} style={HomeTabStyless.SearchPlaceStyle} >
                                <Text style={{ color: "gray" }}>Date and time</Text>
                            </TouchableOpacity>
                    }

                    {showPicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={dateTime}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}

                    {showTimePicker && (
                        <DateTimePicker
                            testID="timePicker"
                            value={date}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={onChangeTime}
                        />
                    )}

                </View>
            ),
            icon: <DatePickerIcon />
        },
        {
            title: (
                <View style={{height:responsiveScreenHeight(12)}}>
                    <Text style={HomeTabStyless.WhereAreYouTitle}>Drop date</Text>

                    {
                        dropdate ?
                            <TouchableOpacity onPress={showrounddropdate} style={HomeTabStyless.SearchPlaceStyle} >
                                <Text style={{ color: "black" }}>{formatDate(dropdate)} - {formattime(droptime)}</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={showrounddropdate} style={HomeTabStyless.SearchPlaceStyle} >
                                <Text style={{ color: "gray" }}>Date and time</Text>
                            </TouchableOpacity>
                    }

                    {rounddropdate && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={dropdate}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={ondropchange}
                        />
                    )}

                    {droppicker && (
                        <DateTimePicker
                            testID="timePicker"
                            value={date}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={onDropChangeTime}
                        />
                    )}


                </View>
            ),
            icon: <DatePickerIcon />
        },


    ];


    const Roadtrip = [
        {
            title: (
                <View style={{height:responsiveScreenHeight(12)}}>
                    <Text style={HomeTabStyless.WhereAreYouTitle}>{t("Where_Are_You_Place")}</Text>
                    <AutocompleteDropdown
                        ref={searchRef4}
                        controller={controller => {
                            dropdownController.current = controller;
                        }}
                        direction={'down'}
                        dataSet={filteredCityData} // Use filtered data
                        onChangeText={handleTextChange} // Use the new handler
                        onSelectItem={item => {
                            item && setRoadtripname(item?.title);
                            set_Roadtrip_data([])

                        }}
                        debounce={600}
                        suggestionsListMaxHeight={200}
                        onClear={onClearPress}
                        onOpenSuggestionsList={_search_location && onOpenSuggestionsList}
                        loading={loading}
                        useFilter={false}
                        textInputProps={{
                            placeholder: 'Source city name ..',
                            placeholderTextColor: '#000',
                            autoCorrect: false,
                            autoCapitalize: 'none',
                            style: {
                                backgroundColor: '#fff',
                                color: '#000',
                                width: SW(240),
                                borderRadius: 10
                            },
                        }}
                        rightButtonsContainerStyle={{
                            right: 8,
                            height: 30,
                            alignSelf: 'center',
                        }}
                        inputContainerStyle={{
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderColor: error === true ? 'red' : '#B6B6B6',
                            borderRadius: 10
                        }}
                        suggestionsListContainerStyle={{
                            backgroundColor: '#fff',
                        }}
                        containerStyle={{ flexGrow: 1, flexShrink: 1, right: responsiveScreenWidth(0.5) }}
                        renderItem={(item, text) => <Text style={{ color: '#000', padding: 15 }}>{item?.title}</Text>}
                        inputHeight={40}
                        inputWidth={225}
                        showChevron={false}
                        closeOnBlur={false}
                    />
                    {/* <AutocompleteDropdown
                        ref={searchRef4}
                        controller={controller => {
                            dropdownController4.current = controller
                        }}
                        // initialValue={'1'}
                        direction={'down'}
                        dataSet={_roadtrip_data}
                        onChangeText={(text) => { setRoadtrip(text); _search_for_location() }}
                       
                        debounce={600}
                        suggestionsListMaxHeight={200}
                        onClear={onClearPress}
                        //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
                        onOpenSuggestionsList={_roadtrip && onOpenSuggestionsList}
                        loading={loading}
                        useFilter={false} // set false to prevent rerender twice
                        textInputProps={{
                            placeholder: _roadtrip ? _roadtrip : 'Source city name ..',
                            placeholderTextColor: '#000',
                            autoCorrect: false,
                            autoCapitalize: 'none',
                            style: {
                                //   borderRadius: 25,
                                backgroundColor: '#fff',
                                color: '#000',
                                width: SW(240),
                                borderRadius: 10
                                //   textAlign:'left',
                                //   paddingLeft: 18,
                                //   borderLeftWidth:1,
                                //   borderBottomWidth:1,
                                //   borderTopWidth:1
                                //   borderWidth:0.5
                            },
                        }}
                        rightButtonsContainerStyle={{
                            right: 8,
                            height: 30,

                            alignSelf: 'center',
                        }}
                        inputContainerStyle={{
                            backgroundColor: '#fff',
                            // borderRadius: 25,
                            borderWidth: 1,
                           borderColor: error === true ? 'red' : '#B6B6B6',

                        }}
                        suggestionsListContainerStyle={{
                            backgroundColor: '#fff',
                        }}
                        containerStyle={{ flexGrow: 1, flexShrink: 1, right: responsiveScreenWidth(0.5) }}
                        renderItem={(item, text) => <Text style={{ color: '#000', padding: 15 }}>{item}</Text>}
                        //   ChevronIconComponent={<Feather name="chevron-down" size={20} color="#fff" />}
                        //   ClearIconComponent={<Feather name="x-circle" size={18} color="#fff" />}
                        inputHeight={40}
                        inputWidth={225}

                        showChevron={false}
                        closeOnBlur={false}
                    //  showClear={false}
                    /> */}


                </View>
            ),
            icon: <PickupIcon />
        },
        {
            title: (
                <View style={{height:responsiveScreenHeight(12)}}>
                    <Text style={HomeTabStyless.WhereAreYouTitle}>Number of days</Text>

                    <TextInput



                        placeholder={"Number of days"}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        style={HomeTabStyless.SearchPlaceStyle}
                        placeholderTextColor={"black"}
                        onChangeText={(text) => setNumberdays(text)}
                        keyboardType='numeric'

                    />

                </View>
            ),
            icon: <DesitnationPointicon />
        },
        {
            title: (
                <View style={{height:responsiveScreenHeight(12)}}>
                    <Text style={HomeTabStyless.WhereAreYouTitle}>Pickup date</Text>

                    {
                        dateTime ?
                            <TouchableOpacity onPress={showDateTimePicker} style={HomeTabStyless.SearchPlaceStyle} >
                                <Text style={{ color: "black" }}>{formatDate(dateTime)} - {formattime(date)}</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={showDateTimePicker} style={HomeTabStyless.SearchPlaceStyle} >
                                <Text style={{ color: "gray" }}>Date and time</Text>
                            </TouchableOpacity>
                    }

                    {showPicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={dateTime}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}

                    {showTimePicker && (
                        <DateTimePicker
                            testID="timePicker"
                            value={date}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={onChangeTime}
                        />
                    )}


                </View>
            ),
            icon: <DatePickerIcon />
        },





    ];

    console.log('localtrrrr', _localtrip);
    const Localtrip = [
        {
            title: (
                <View style={{height:responsiveScreenHeight(12)}}>
                    <Text style={HomeTabStyless.WhereAreYouTitle}>{t("Where_Are_You_Place")}</Text>


                    <AutocompleteDropdown
                        ref={searchRef5}
                        controller={controller => {
                            dropdownController.current = controller;
                        }}
                        direction={'down'}
                        dataSet={filteredair} // Use filtered data
                        onChangeText={handleTextChangeair} // Use the new handler
                        onSelectItem={item => {
                            item && setLocalname(item?.title);
                            // _Get_Localities();
                            setLocaltrip_data([])

                        }}
                        debounce={600}
                        suggestionsListMaxHeight={200}
                        onClear={onClearPress}
                        onOpenSuggestionsList={_search_location && onOpenSuggestionsList}
                        loading={loading}
                        useFilter={false}
                        textInputProps={{
                            placeholder: 'Source city name ..',
                            placeholderTextColor: '#000',
                            autoCorrect: false,
                            autoCapitalize: 'none',
                            style: {
                                backgroundColor: '#fff',
                                color: '#000',
                                width: SW(240),
                                borderRadius: 10
                            },
                        }}
                        rightButtonsContainerStyle={{
                            right: 8,
                            height: 30,
                            alignSelf: 'center',
                        }}
                        inputContainerStyle={{
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderColor: error === true ? 'red' : '#B6B6B6',
                            borderRadius: 10
                        }}
                        suggestionsListContainerStyle={{
                            backgroundColor: '#fff',
                        }}
                        containerStyle={{ flexGrow: 1, flexShrink: 1, right: responsiveScreenWidth(0.5) }}
                        renderItem={(item, text) => <Text style={{ color: '#000', padding: 15 }}>{item?.title}</Text>}
                        inputHeight={40}
                        inputWidth={225}
                        showChevron={false}
                        closeOnBlur={false}
                    />


                </View>
            ),
            icon: <PickupIcon />
        },
        {
            title: (
                <View style={{height:responsiveScreenHeight(12)}}>
                    <Text style={HomeTabStyless.WhereAreYouTitle}>Trip type</Text>

                    <View style={HomeTabStyless.SearchPlaceStyle1}>
                        <Picker
                            selectedValue={selectPackagetype}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectPakcagetype(itemValue)
                            }
                            style={{ height: 60, width: 240 }}>
                            <Picker.Item label="From the Airport" value={1} color='black' />
                            <Picker.Item label="To the Airport" value={2} color='black' />
                        </Picker>
                    </View>

                </View>
            ),
            icon: <DesitnationPointicon />
        },
        {
            title: (
                <View style={{height:responsiveScreenHeight(12)}}>
                    <Text style={HomeTabStyless.WhereAreYouTitle}>Drop location</Text>



                    <AutocompleteDropdown
                        ref={searchRef6}
                        controller={controller => {
                            dropdownController.current = controller;
                        }}
                        direction={'down'}
                        dataSet={filteredlocal} // Use filtered data
                        onChangeText={handleTextChangelocal} // Use the new handler
                        onSelectItem={item => {
                            item && setLocaldropname(item?.title);
                            set_localdroploction_data([])
                        }}
                        debounce={600}
                        suggestionsListMaxHeight={200}
                        onClear={onClearPress}
                        onOpenSuggestionsList={_search_location && onOpenSuggestionsList}
                        loading={loading}
                        useFilter={false}
                        textInputProps={{
                            placeholder: 'Drop location ..',
                            placeholderTextColor: '#000',
                            autoCorrect: false,
                            autoCapitalize: 'none',
                            style: {
                                backgroundColor: '#fff',
                                color: '#000',
                                width: SW(240),
                                borderRadius: 10
                            },
                        }}
                        rightButtonsContainerStyle={{
                            right: 8,
                            height: 30,
                            alignSelf: 'center',
                        }}
                        inputContainerStyle={{
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderColor: error === true ? 'red' : '#B6B6B6',
                            borderRadius: 10
                        }}
                        suggestionsListContainerStyle={{
                            backgroundColor: '#fff',
                        }}
                        containerStyle={{ flexGrow: 1, flexShrink: 1, right: responsiveScreenWidth(0.5) }}
                        renderItem={(item, text) => <Text style={{ color: '#000', padding: 15 }}>{item?.title}</Text>}
                        inputHeight={40}
                        inputWidth={225}
                        showChevron={false}
                        closeOnBlur={false}
                    />



                </View>
            ),
            icon: <DesitnationPointicon />
        },
        {
            title: (
                <View style={{height:responsiveScreenHeight(12)}}>
                    <Text style={HomeTabStyless.WhereAreYouTitle}>Date & Time</Text>
                    {
                        dateTime ?
                            <TouchableOpacity onPress={showDateTimePicker1} style={HomeTabStyless.SearchPlaceStyle} >
                                <Text style={{ color: "black" }}>{formatDate(dateTime)}  -  {formattime(date)}</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={showDateTimePicker1} style={HomeTabStyless.SearchPlaceStyle} >
                                <Text style={{ color: "gray" }}>Date and time</Text>
                            </TouchableOpacity>
                    }

                    {showPicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={dateTime}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={timeonChange}
                        />
                    )}

                    {showTimePicker && (
                        <DateTimePicker
                            testID="timePicker"
                            value={date}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={onChangeTime}
                        />
                    )}

                </View>
            ),
            icon: <DatePickerIcon />
        },






    ];


    return (
        <Container>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.bgWhite} />
            <View style={{ flex: 1 }}>


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
                                latitude: position ? position.latitude + 0.001 : 22.2990017,
                                longitude: position ? position.longitude + 0.002 : 70.7945285,
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
                                latitude: position ? position.latitude + 0.002 : 22.2990017,
                                longitude: position ? position.longitude - 0.003 : 70.7945285,
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

                {
                    isCarDetails || isBottomSheetOpen ? null :
                        <View style={HomeTabStyless.ProfileViewWrap}>
                            {/* <TouchableOpacity style={HomeTabStyless.ProfileView}>
                            <Image source={images.HomeProfileImg} style={HomeTabStyless.ProfileImage} />
                        </TouchableOpacity> */}
                            <View style={HomeTabStyless.AutoCompleteWrap}>

                                {/* <TextInput
                            editable={false}
                                placeholder={'Where to go...'}

                                style={{ backgroundColor: "#fff", height: 45, paddingLeft: 10, borderRadius: 5, color: 'black' }}
                                placeholderTextColor="black"

                                onChangeText={text => handleSearch(text)}
                                value={searchTerm}
                            /> */}

                            </View>
                        </View>
                }

                {isBottomSheetOpen === false && isCarDetails === false && (
                    <View style={HomeTabStyless.WhereAreYouBoxWrap}>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", width: responsiveScreenWidth(90), height: responsiveScreenHeight(8.5) }}>
                            <TouchableOpacity style={{
                                backgroundColor: selectedButton === 'Rentals' ? '#007BFF' : 'white', borderRadius: 5
                                , justifyContent: 'center', alignItems: 'center', width: responsiveScreenWidth(17.5),
                            }}
                                onPress={() => setSelectedButton('Rentals') || setError(false)}
                            >
                                {selectedButton === 'Rentals' ?
                                    //  <Image source={require('../../../images/rental-icon-active.png')} style={{height:30, width:30}}  />
                                    <RentalActive />

                                    :
                                    <Rentcars />
                                }
                                <Text style={{ fontSize: 12, color: selectedButton === 'Rentals' ? 'white' : 'black', fontFamily: Fonts.Poppins_Regular, fontWeight: '800', }}>Rentals</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                backgroundColor: selectedButton === 'One way' ? '#007BFF' : 'white', borderRadius: 5
                                , justifyContent: 'center', alignItems: 'center', width: responsiveScreenWidth(17.5),
                            }}
                                onPress={() => setSelectedButton('One way') || setError(false)}
                            >
                                {selectedButton === 'One way' ?

                                    <OneWi />

                                    :
                                    <OnewayActive />
                                    // <Image source={require('../../../images/oneway-icon.png')} style={{height:30, width:30}}  />
                                }
                                <Text style={{ fontSize: 12, color: selectedButton === 'One way' ? 'white' : 'black', fontFamily: Fonts.Poppins_Regular, fontWeight: '800' }}>One way</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                backgroundColor: selectedButton === 'Round trip' ? '#007BFF' : 'white', borderRadius: 5
                                , justifyContent: 'center', alignItems: 'center', width: responsiveScreenWidth(17.5),
                            }}
                                onPress={() => setSelectedButton('Round trip') || setError(false)}
                            >
                                {selectedButton === 'Round trip' ?
                                    <RoundtActive />
                                    // <Image source={require('../../../images/round-trip-icon-active.png')} style={{height:30, width:30}} />
                                    :
                                    // <Roundtrip/>
                                    <Roundt />
                                    // <Image source={require('../../../images/round-trip-icon.png')} style={{height:30, width:30}}  />
                                }
                                <Text style={{ fontSize: 12, color: selectedButton === 'Round trip' ? 'white' : 'black', fontFamily: Fonts.Poppins_Regular, fontWeight: '800' }}>Round trip</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                backgroundColor: selectedButton === 'Road trip' ? '#007BFF' : 'white', borderRadius: 5
                                , justifyContent: 'center', alignItems: 'center', width: responsiveScreenWidth(17.5),
                            }}
                                onPress={() => setSelectedButton('Road trip') || setError(false)}
                            >
                                {selectedButton === 'Road trip' ?
                                    <RoadtActive />
                                    // <Image source={require('../../../images/road-trip-icon-active.png')} style={{height:30, width:30}} />
                                    :
                                    <Roadt />
                                    // <Image source={require('../../../images/road-trip-icon.png')} style={{height:30, width:30}}  />
                                }
                                <Text style={{ fontSize: 12, color: selectedButton === 'Road trip' ? 'white' : 'black', fontFamily: Fonts.Poppins_Regular, fontWeight: '800' }}>Road trip</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                backgroundColor: selectedButton === 'Local' ? '#007BFF' : 'white', padding: 5, borderRadius: 5
                                , justifyContent: 'center', alignItems: 'center', width: responsiveScreenWidth(17.5),
                            }}
                                onPress={() => setSelectedButton('Local') || setError(false)}
                            >
                                {selectedButton === 'Local' ?
                                    <LocaltActive />
                                    // <Image source={require('../../../images/local-transfer-icon-active.png')} style={{height:30, width:30}} />
                                    :
                                    <Localt />
                                    // <Image source={require('../../../images/local-transfer-icon.png')} style={{height:30, width:30}}  />
                                }
                                <Text style={{ fontSize: 12, color: selectedButton === 'Local' ? 'white' : 'black', top: responsiveScreenHeight(0.5), fontFamily: Fonts.Poppins_Regular, fontWeight: '800' }}>Local </Text>
                                <Text style={{ fontSize: 12, color: selectedButton === 'Local' ? 'white' : 'black', fontFamily: Fonts.Poppins_Regular, fontWeight: '800' }}>transfer</Text>
                            </TouchableOpacity>


                        </View>
                        <View style={HomeTabStyless.WhereAreYouBox}>
                            <ScrollView>
                                <View >
                                    {
                                        selectedButton === 'Rentals' &&
                                        <Timeline
                                            data={data}
                                            circleSize={20}
                                            circleColor='#fff'
                                            lineColor={'#FFC851'}
                                            // options={{
                                            //     style: { paddingTop: 10, }
                                            // }}
                                            isUsingFlatlist={true}
                                            innerCircle={'icon'}
                                            showTime={false}
                                            titleStyle={HomeTabStyless.Title}
                                            descriptionStyle={HomeTabStyless.DescriptionStyle}
                                            // lineStyle={{height:300}}
                                            // style={{marginTop:20}}
                                        />
                                    }
                                </View>

                            </ScrollView>
                            {
                                selectedButton === 'One way' &&
                                <Timeline
                                    data={Oneway}
                                    circleSize={20}
                                    circleColor='#fff'
                                    lineColor={'#FFC851'}
                                    // options={{
                                    //     style: { paddingTop: 10, }
                                    // }}
                                    isUsingFlatlist={true}
                                    innerCircle={'icon'}
                                    showTime={false}
                                    titleStyle={HomeTabStyless.Title}
                                    descriptionStyle={HomeTabStyless.DescriptionStyle}
                                />
                            }
                            {
                                selectedButton === 'Round trip' &&
                                <Timeline
                                    data={Roundtrip}
                                    circleSize={20}
                                    circleColor='#fff'
                                    lineColor={'#FFC851'}
                                    // options={{
                                    //     style: { paddingTop: 10, }
                                    // }}
                                    isUsingFlatlist={true}
                                    innerCircle={'icon'}
                                    showTime={false}
                                    titleStyle={HomeTabStyless.Title}
                                    descriptionStyle={HomeTabStyless.DescriptionStyle}
                                />
                            }

                            {

                                selectedButton === 'Road trip' &&
                                <>
                                    <Timeline
                                        data={Roadtrip}
                                        circleSize={20}
                                        circleColor='#fff'
                                        lineColor={'#FFC851'}
                                        // options={{
                                        //     style: { paddingTop: 10, }
                                        // }}
                                        isUsingFlatlist={true}
                                        innerCircle={'icon'}
                                        showTime={false}
                                        titleStyle={HomeTabStyless.Title}
                                        descriptionStyle={HomeTabStyless.DescriptionStyle}
                                    />
                                    {/* <View style={{ paddingHorizontal: 20 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <VectorIcon icon="FontAwesome" name='bookmark' color={Colors.theme_background_topaz} size={SF(20)} />
                                        <Text style={{ marginLeft: 10 }}>{t("Saved_Placed_Label")}</Text>
                                    </View>

                                    <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
                                        <VectorIcon icon="Feather" name='clock' color={'black'} size={SF(20)} />
                                        <Text style={{  color: 'gray' }}>Saved places 1</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
                                        <VectorIcon icon="Feather" name='clock' color={'black'} size={SF(20)} />
                                        <Text style={{  color: 'gray' }}>Saved places 1</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginTop: 10 }}>
                                        <VectorIcon icon="Feather" name='clock' color={'black'} size={SF(20)} />
                                        <Text style={{ marginLeft: 5, color: 'gray' }}>Saved places 1</Text>
                                    </View>

                                </View> */}
                                </>
                            }

                            {

                                selectedButton === 'Local' &&
                                <>
                                    <Timeline
                                        data={Localtrip}
                                        circleSize={20}
                                        circleColor='#fff'
                                        lineColor={'#FFC851'}
                                        // options={{
                                        //     style: { paddingTop: 10, }
                                        // }}
                                        isUsingFlatlist={true}
                                        innerCircle={'icon'}
                                        showTime={false}
                                        titleStyle={HomeTabStyless.Title}
                                        descriptionStyle={HomeTabStyless.DescriptionStyle}
                                    />

                                </>
                            }

                            <View style={{
                                marginTop: 10, width: responsiveScreenWidth(66), alignSelf: 'center', right: responsiveScreenWidth(0.5)
                            }}>
                                {error === true && <Text style={{ textAlign: 'center', fontWeight: 700, color: 'red' }}>Please fill empty fields</Text>}
                                {
                                    selectedButton === 'Rentals' &&
                                    <Button title={t("Search")} onPress={() => _Local_search()} />
                                }

                                {
                                    selectedButton === 'One way' &&
                                    <Button title={t("Search")} onPress={() => _One_Way_Search()} />
                                }
                                {
                                    selectedButton === 'Round trip' &&
                                    <Button title={t("Search")} onPress={() => _Round_trip_search()} />
                                }
                                {
                                    selectedButton === 'Road trip' &&
                                    <Button title={t("Search")} onPress={() => _Road_trip_search()} />
                                }
                                {
                                    selectedButton === 'Local' &&
                                    <Button title={t("Search")} onPress={() => _Local_Trip_search()} />
                                }
                            </View>


                        </View>


                    </View>
                )}




            </View>
            {isBottomSheetOpen && (
                <View style={{ height: "100%", }}>
                    <CarsPriceDetail />
                </View>
            )}





            <View style={{ flex: 1, position: "absolute", marginTop: 50, width: '100%' }}>
                {searchTerm && (
                    <ScrollView
                        keyboardShouldPersistTaps={'always'}
                        style={{ flex: 1, marginHorizontal: 20, backgroundColor: '#F4F6F6' }}>
                        {filteredCities?.map((item, index) => {
                            return (
                                <Pressable
                                    onPress={() => {
                                        set_currant_location_name(item.description);

                                        // set_search_location('');
                                        setSearchTerm('')
                                        // set_search_location_data([]);
                                        set_show_search_input(false);
                                    }}
                                    key={index}
                                    style={{
                                        paddingVertical: 15,
                                        paddingHorizontal: 15,
                                        borderBottomWidth: 0.5,
                                        borderBottomColor: 'gray',
                                        width: '100%',
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: '500',
                                            color: 'black',
                                        }}>
                                        {item.description}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </ScrollView>
                )
                }
            </View>
            {isLoading &&
                <View style={{
                    flex: 1, justifyContent: 'center', alignItems
                        : 'center', position: 'absolute', height: '100%', width: '100%', backgroundColor: '#B2BABB'
                }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            }
        </Container>
    );
};
export default HomeTab;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        // width:'90%'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "90%"
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

    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: 240
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        left: 10
    },
    selectedTextStyle: {
        fontSize: 16,
        left: 10
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        // position:'absolute',
        height: 40,
        fontSize: 16,
    },
})
