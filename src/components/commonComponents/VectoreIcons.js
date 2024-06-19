import React from "react";
import IconF from 'react-native-vector-icons/Feather';
import IconA from 'react-native-vector-icons/AntDesign';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconL from 'react-native-vector-icons/MaterialIcons';
import IconT from 'react-native-vector-icons/FontAwesome';
import IconE from 'react-native-vector-icons/EvilIcons';
import IconJ from 'react-native-vector-icons/Entypo';
import IconG from 'react-native-vector-icons/Ionicons';
import IconP from 'react-native-vector-icons/Octicons';
import IconW from 'react-native-vector-icons/FontAwesome5';
import IconV from 'react-native-vector-icons/Fontisto';

const VectorIcon = (props) => {
    const { icon = "", name, color, size, style } = props
    return (
        icon == "Feather" ?
            <IconF name={name} color={color} style={style} size={size} top={2.5}/>
            :
            icon == "AntDesign" ?
                <IconA name={name} color={color} style={style} size={size} top={2.5}/>
                :
                icon == "Fontisto" ?
                    <IconV name={name} color={color} style={style} size={size} top={2.5}/>
                    :
                    icon == "MaterialCommunityIcons" ?
                        <IconM name={name} color={color} size={size} top={2.5}/>
                        :
                        icon == "FontAwesome" ?
                            <IconT name={name} color={color} style={style} size={size} top={2.5}/>
                            :
                            icon == "EvilIcons" ?
                                <IconE name={name} color={color} style={style} size={size} top={2.5}/>
                                :
                                icon == "Entypo" ?
                                    <IconJ name={name} color={color} style={style} size={size} top={2.5}/>
                                    :
                                    icon == "Ionicons" ?
                                        <IconG name={name} color={color} style={style} size={size} top={2.5}/>
                                        :
                                        icon == "Octicons" ?
                                            <IconP name={name} color={color} style={style} size={size} top={2.5}/>
                                            :
                                            icon == "FontAwesome5" ?
                                                <IconW name={name} color={color} style={style} size={size} top={2.5}/>
                                                :
                                                icon == "MaterialIcons" ?
                                                    <IconL name={name} color={color} style={style} size={size} top={2.5}/>
                                                    : null
    )
}
export default VectorIcon;