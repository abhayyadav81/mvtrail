import React, { useMemo } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { ChatStyles } from '../../styles';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import images from "../../images";
import { Fonts } from "../../utils";

function RidesView(props) {
  console.log('logggg', props);
  const { onPress, item } = props;
  const { Colors } = useTheme();
  const ChatStyless = useMemo(() => ChatStyles(Colors), [Colors]);
  const { t } = useTranslation();

  return (
    <View
      style={{
        flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingHorizontal: 25,
        // marginTop: dimensions.hp('2'),
        marginTop: 10
      }}>
      <Text style={{
        fontSize: 14,
        fontWeight: '500',
        // paddingBottom:0,
        color: '#000',
        width: 120, fontFamily: Fonts.Poppins_Regular
      }}>{props.lable}</Text>


      <View
        style={{
          height: 20,
          justifyContent: 'center',
          // borderWidth: 0.3,
          borderRadius: 5,
          paddingLeft: 40,
          width: "60%",
          // borderColor: 'green',
          //  paddingRight: 10,
          // paddingTop:5,
          // paddingBottom:5,
          // bottom:5,
          color: '#000',
        }}>
        {props.lable === 'Fare' ?
          <Text style={{
            fontSize: 14,
            fontWeight: '700',
            color: '#5A5A5A', fontFamily: Fonts.Poppins_Regular
          }}>₹{props.value}</Text>
          :
          <Text style={{
            fontSize: 14,
            fontWeight: '500',
            color: 'gray', alignText: 'flex-end', fontFamily: Fonts.Poppins_Regular
          }}>{props.value}</Text>
        }
      </View>


    </View>
  );
};
export default RidesView;