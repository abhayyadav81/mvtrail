
import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { SwiperStyle } from '../../styles';
import { Button, Spacing, Lottie } from '../../components';
import { RouteName } from '../../routes';
import { SH } from '../../utils';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import images from '../../index';
import { ScrollView } from 'react-native-virtualized-view';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const App = ({ navigation }) => {
  const { t } = useTranslation();
  const { Colors } = useTheme();
  const SwiperStyles = useMemo(() => SwiperStyle(Colors), [Colors]);

  const Swiperdata = [
    {
      key: 's1',
      text: 'Swiperfirst',
      title: "Swipertitle",
      animation: <Lottie
        source={images.First_Swiper}
      />,

    },
    {
      key: 's2',
      text: 'SwiperFirstTwo',
      title: 'SwiperTitleTwo',
      animation: <Lottie
        source={images.Two_Swiper}
      />,
    },
    {
      key: 's3',
      text: 'SwiperFirstThree',
      title: 'Swipertitlethree',
      animation: <Lottie
        source={images.Three_Swiper}
      />,
      backgroundColor: 'transparent',
    },

  ]

  const RenderItem = ({ item }) => {
    console.log('keyyy',item.key);
    return (
      <View>
        <ScrollView nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={SwiperStyles.ScrollViewStyle}>
          <View>
          {item.key === 's1' ?
          
              <Text style={{justifyContent:'center',textAlign:'center', fontSize:30,
              color: 'black',
              fontWeight: 'bold',fontStyle: 'italic' , shadowColor:'#000',shadowOpacity:0.5}}>Fast Reliable Affordable</Text>
              :
            <View style={SwiperStyles.AnimationViewStyle}>
           
              {item.animation}
 
            </View>
             }
          </View>
        </ScrollView>
        <View style={SwiperStyles.TitleStyles}>
          <Image source={require('../../../src/images/logo-blue.png')} style={{ height: 100, width: 300, resizeMode: 'contain' }} />
        </View>

        {/* <Text >
          {t(item.title)}
        </Text> */}
   
        <Text style={[{ bottom: item.key === 's3' ? SH(90) : SH(120)} ,SwiperStyles.Textstyle]}>
          {t(item.text)}
        </Text>
      </View>
    );
  };
  const _renderDoneButton = () => {
    return (
      <View style={SwiperStyles.BgButtonView}>
        <View style={SwiperStyles.ButtonCircle}>
          {/* <Button
          buttonStyle={SwiperStyles.buttonStyle}
            title={t("Get_Started")}
            onPress={
              () => navigation.navigate(RouteName.LOGIN_SCREEN)
            }
          /> */}
          <Button  title={t("Get_Started")} buttonStyle={SwiperStyles.buttonStyle}  onPress={
              () => navigation.navigate(RouteName.LOGIN_SCREEN)
            }/>
        </View>
      </View>
    );
  };
  const _renderNextButton = () => {
    return (
      <View style={SwiperStyles.BgButtonView}>
        <Spacing space={SH(12)} />
        <Text style={SwiperStyles.SkipTextStyle}>{t("Next_Text")}</Text>
      </View>
    );
  };
  const _renderSkipButton = () => {
    return (
      <View style={SwiperStyles.BgButtonView}>
        <TouchableOpacity onPress={() => navigation.navigate(RouteName.LOGIN_SCREEN)}>
          <Spacing space={SH(12)} />
          <Text style={SwiperStyles.SkipTextStyle}>{t("Skip_Text")}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      <AppIntroSlider
        data={Swiperdata}
        renderItem={RenderItem}
        renderNextButton={_renderNextButton}
        renderSkipButton={_renderSkipButton}
        renderDoneButton={_renderDoneButton}
        showSkipButton={true}
        activeDotStyle={SwiperStyles.ActiveDotStyles}
        dotStyle={SwiperStyles.DotSwiperStyle}
      />
    </>
  );
};
export default App;

