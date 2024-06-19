import React, { useState, useMemo, useEffect } from "react";
import { View, Text, KeyboardAvoidingView, Switch, PermissionsAndroid, StyleSheet } from "react-native";
import IconF from 'react-native-vector-icons/AntDesign';
import { SettingStyle, Style, LanguageStyles } from '../../styles';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Spacing } from '../../components';
import { SH, SF } from '../../utils';
import { ScrollView } from 'react-native-virtualized-view';
import Geolocation from '@react-native-community/geolocation';
import { Dropdown } from 'react-native-element-dropdown';
import { Picker } from '@react-native-picker/picker';


const SettingStylesScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch1 = () => setIsEnabled(previousState => !previousState);
  const { Colors } = useTheme();
  const SettingStyles = useMemo(() => SettingStyle(Colors), [Colors]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isPickerVisible, setPickerVisible] = useState(false);

  const togglePicker = () => {
      setPickerVisible(!isPickerVisible);
  };

  // Dummy language data
  const languageData = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
  ];
  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
    {
      setValue(value);
      setIsFocus(false);
    }
  };
  const DataofDropdown = [
    { label: 'English', value: 'en' },
    { label: 'Arabic', value: 'ara' },
    { label: 'Spanish', value: 'Spa' },
    { label: 'French', value: 'Fr' },
  ];
  const { t, i18n } = useTranslation();
  const [Language, setLanguage] = useState('en');
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState('en');


  const [selectedValue, setSelectedValue] = useState("English");
  const [watchId, setWatchId] = useState(null);

  useEffect(() => {
    if (isEnabled) {
      startLocationService();
    } else {
      stopLocationService();
    }
  }, [isEnabled]);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  const startLocationService = async () => {
    const granted = await requestLocationPermission();
    if (granted) {
      Geolocation.setRNConfiguration({ authorizationLevel: 'whenInUse' });
      const id = Geolocation.watchPosition(
        position => {
          console.log(position.coords.latitude, position.coords.longitude);
        },
        error => {
          console.log(error);
        },
        { enableHighAccuracy: true }
      );
      setWatchId(id);
    }
  };

  const stopLocationService = () => {
    if (watchId !== null) {
      console.log('closed')
      Geolocation.clearWatch(watchId);
      setWatchId(null);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  return (
    <>
      <View style={[Style.MinViewScreen]}>
        <ScrollView nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Style.contentContainerStyle}>
          <KeyboardAvoidingView enabled>
            <View style={SettingStyles.KeyBordTopViewStyle}>
              <View style={SettingStyles.MinFlexView}>
                {/* <View style={SettingStyles.Togglrswitchflex}>
                  <View>
                    <Spacing space={SH(15)} />
                    <Text style={SettingStyles.CellularDataText}>{t("Location_Track")}</Text>
                  </View>
                </View> */}
                {/* <View style={SettingStyles.TogglesWotchview}>
                  <Text style={SettingStyles.DownlodToggleswitchText}>
                    {t("Enalble_Location")}
                  </Text>
                  <View>
                    <Switch
                      trackColor={{ false: 'gray', true: '#007BFF' }}
                      thumbColor={isEnabled ? Colors.light_gray_text_color : Colors.argent_color}
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>
                </View> */}
                {/* <Spacing space={SH(10)} /> */}
                {/* <Text style={SettingStyles.CellularDataText}>{t("Location_text")}</Text> */}
                <View style={SettingStyles.RightiConMinview}>
                  <View>
                    <Text style={SettingStyles.StandardRecommeDtext}>{t("Location_Tracking")}</Text>
                    <Text style={SettingStyles.DownloadFasterText}>{t("Enables_Recommended")}</Text>
                  </View>
                  <View>
                    <IconF
                      size={SF(30)}
                      name="check"
                      style={SettingStyles.ChekIconStyle}
                    />
                  </View>
                </View>
                <View style={SettingStyles.RightiConMinview}>
                  <View>
                    <Spacing space={SH(0)} />
                    <Text style={SettingStyles.StandardRecommeDtext}>{t("Location_Features")}</Text>
                    <Text style={SettingStyles.DownloadFasterText}>{t("Hours_Years")}</Text>
                  </View>
                </View>
                {/* <Text style={LanguageStyles.Settingtext}>{t("Select_Your_Language")}</Text> */}
                <View style={isFocus ? LanguageStyles.LeadsDropdownbox : LanguageStyles.LeadsDropdownboxOpen}>
                  {/* <DropDown
                    data={DataofDropdown}
                    dropdownStyle={LanguageStyles.LeadDropdown}
                    onChange={item => {
                      changeLanguage(item.value)
                    }}
                    search
                    searchPlaceholder="Search bar"
                    label={{color:'red'}}
                    selectedTextStyle={LanguageStyles.selectedTextStyleLead}
                    IconStyle={LanguageStyles.IconStyle}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    redcolor={{color:"red"}}
                    labelField="label"
                    valueField="value"
                    renderLeftIcon={() => (
                      <Icon color="black" name={isFocus ? 'arrowup' : 'arrowdown'} size={SF(20)} />
                    )}
                  /> */}

                  {/* <Dropdown
                    style={{borderWidth:1,borderRadius:5,paddingHorizontal:5,height:40}}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={LanguageStyles.LeadDropdown}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={DataofDropdown}
                    search
                    maxHeight={300}
                    labelStyle=""
                    labelField="label"
                    valueField="value"
                    placeholder="Select item"
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={item => {
                      setValue(item.value);
                    }}
                    
                  /> */}

                  
                  {/* <View style={{ borderWidth: 1, borderRadius: 5, height: 40, justifyContent: "center" }}>
                    <Picker
                      selectedValue={selectedValue}
                      style={{ borderWidth: 1 }}
                      onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                      itemStyle={{  backgroundColor: 'white', // Picker item background color
                        color: 'black',}}
                    >
                      <Picker.Item label="English" value="English" color="black" />
                      <Picker.Item label="Hindi" value="Hindi" color="black" />
                      <Picker.Item label="Arabic" value="Arabic" color="black" />
                      <Picker.Item label="France" value="France" color="black" />
                    </Picker>
                  </View> */}



                  {/* <Dropdown
                    label='Select Language'
                    data={languageData}
                    value={selectedLanguage}
                    onChangeText={(value) => setSelectedLanguage(value)}
                    containerStyle={styles.dropdownContainer}
                    pickerStyle={styles.dropdownPicker}
                    labelStyle={styles.label}
                    inputContainerStyle={styles.inputContainer}
                  /> */}
                </View>
                <Spacing space={SH(25)} />
                {/* <View style={SettingStyles.RightiConMinview}>
                  <View style={SettingStyles.BodyTextWidth}>
                    <Text style={SettingStyles.StandardRecommeDtext}>{t("Synce_Changes")}</Text>
                  </View>
                  <View>
                    <IconF
                      size={SF(30)}
                      name="check"
                      style={SettingStyles.ChekIconStyle}
                    />
                  </View>
                </View> */}
                {/* <Spacing space={SH(15)} />
                <Text style={SettingStyles.CellularDataText}>{t("Video_Qualitytext")}</Text>
                <View style={SettingStyles.RightiConMinviewtwo}>
                  <View>
                    <Text style={SettingStyles.StandardRecommeDtext}>{t("Standard_Qualitytext")}</Text>
                    <Text style={SettingStyles.DownloadFasterText}>{t("Downnloads_Qualitytext")}</Text>
                  </View>
                </View> */}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </>
  );
};
export default SettingStylesScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    width: 200,
  },
  dropdownPicker: {
    backgroundColor: 'white',
  },
  label: {
    color: 'black', // Text color for selected item
  },
  inputContainer: {
    borderBottomColor: 'black', // Bottom border color
  },
})