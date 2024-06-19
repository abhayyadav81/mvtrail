import React,{useEffect,useState} from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import RootNavigator from './src/routes/RootNavigator';
import firebase from '@react-native-firebase/app';
import { GlobalStateProvider } from './src/User-Context/Context';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'

const App = () => {
  const [isFirebaseInitialized, setFirebaseInitialized] = useState(false)

  useEffect(() => {
    // Firebase configuration
    const firebaseConfig = {
        apiKey: 'AIzaSyBIrMRb2fhXzSUU00kLE9p6DGMJGtuXXHo',
        databaseURL: 'https://bharat-taxi-c9ca2-default-rtdb.firebaseio.com/',
        projectId: 'bharat-taxi-c9ca2',
        appId: '1:1081757191081:android:3daa33ca21009b0a1012b8',
        messagingSenderId: '1081757191081',
        storageBucket: ""

        // ... (other configuration values)
    };

    // Initialize Firebase
    const initializeFirebase = async () => {
        try {
            if (!firebase.apps.length) {
                await firebase.initializeApp(firebaseConfig);
                console.log('Firebase initialized successfully');
            }
            setFirebaseInitialized(true);
        } catch (error) {
            console.error('Firebase initialization error:', error);
        }
    };

    // Call the initialization function
    initializeFirebase();
}, []);
  return (
    <AutocompleteDropdownContextProvider>
    <GlobalStateProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
    </GlobalStateProvider>
    </AutocompleteDropdownContextProvider>
  );
};
export default App;