import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthorized: false,
    isLoggedIn: false,
    onboardingShown: false,
    userId: '',
    accessTokens: '',
    userData: {},
    latitude: '',
    longitude: '',
    cityRedux: [],
    countryRedux: [],
    name: '',
    region: '',
    locality: '',
    houseRedux: '',
    streetNumber: '',
    pincodeRedux: '',
    profileImageUrl: '',
    allServices: [],
    userNumber: '',
    currentAddress: '',
    activeBookings: {},
    completedBookings: {},
    userContacts: [],
    userDocuments: [],
    MessageId:'',
    Email:'',
    AlternateMobile:'',
    Housenumber:"",
    Locality:[],
    City:"",
    State:'',
    carDetail:"",
    dataUser:"",
    bookingDetail:"",
    roadPackage:"",
    


  },
  reducers: {
    login: (state, action) => {
      state.isAuthorized = true;
    //   state.accessToken = action.payload;
    },
    setIsAuthorized: (state) => {
      state.isAuthorized = true;
    },
    setUserData: (state, action) => {
        state.userData = action.payload;
      },
      setEmails: (state, action) => {
        state.Email = action.payload;
      },
      setAlternatenumber: (state, action) => {
        state.AlternateMobile = action.payload;
      },
      setHousenumber: (state, action) => {
        state.Housenumber = action.payload;
      },
      setLocalitys: (state, action) => {
        state.Locality = action.payload;
      },
      setCitys: (state, action) => {
        state.City = action.payload;
      },
    setStates: (state, action) => {
      state.State = action.payload;
    },
    setMessageId: (state, action) => {
        state.MessageId = action.payload;
      },
      setBookingDetail: (state, action) => {
        state.bookingDetail = action.payload;
      },
    setAccessToken: (state, action) => {
      state.accessTokens = action.payload;
    },
    setProfileImageUrl: (state, action) => {
      state.profileImageUrl = action.payload;
    },
    logout: state => {
      state.isAuthorized = false;
      state.isLoggedIn = false;
      state.accessTokens = '';
      state.userData = {};
      state.profileImageUrl = '';
      state.userId = '';
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setAllServices: (state, action) => {
      state.allServices = action.payload;
    },
    updateLatitude: (state, action) => {
      state.latitude = action.payload;
    },
    setDataUser: (state, action) => {
      state.dataUser = action.payload;
    },
    updateLongitude: (state, action) => {
      state.longitude = action.payload;
    },
    setCityRedux: (state, action) => {
      state.cityRedux = action.payload;
    },
    setCountryRedux: (state, action) => {
      state.countryRedux = action.payload;
    },
    setLocalityRedux: (state, action) => {
      state.locality = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    setcarDetail: (state, action) => {
      state.carDetail = action.payload;
    },
    setHouseRedux: (state, action) => {
      state.houseRedux = action.payload;
    },
    setStreetNumber: (state, action) => {
      state.streetNumber = action.payload;
    },
    setPincodeRedux: (state, action) => {
      state.pincodeRedux = action.payload;
    },
    setUserNumber: (state, action) => {
      state.userNumber = action.payload;
    },
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
    setActiveBookings: (state, action) => {
      state.activeBookings = action.payload;
    },
    setCompletedBookings: (state, action) => {
      state.completedBookings = action.payload;
    },
    setUserContacts: (state, action) => {
      state.userContacts = action.payload;
    },
    setUserDocuments: (state, action) => {
      state.userDocuments = action.payload;
    },
    setRoadPackage: (state, action) => {
      state.roadPackage = action.payload;
    },
    
  },
});

export const {
  login,
  setDataUser,
  setActiveBookings,
  setCompletedBookings,
  setUserContacts,
  setUserDocuments,
  setIsAuthorized,
  setUserData,
  setEmails,
  setAlternatenumber,
  setHousenumber,
  setLocalitys,
  setCitys,
  setStates,
  updateLatitude,
  updateLongitude,
  setCityRedux,
  setCountryRedux,
  setLocalityRedux,
  setName,
  setRegion,
  setBookingDetail,
  setHouseRedux,
  setRoadPackage,
  setStreetNumber,
  setPincodeRedux,
  logout,
  setAccessToken,
  setProfileImageUrl,
  setcarDetail,
  setUserId,
  setAllServices,
  setUserNumber,
  setCurrentAddress
} = authSlice.actions;

export default authSlice.reducer;
