import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Colors, SF } from '../../utils';
import { VectorIcon } from '../../components';

function HeaderLeftMenuIcon(props) {
    const { onPress } = props;
    return (
        <TouchableOpacity style={{backgroundColor:'#FFF1B1', width: SF(34), height: SF(34), borderRadius:4, left:5 }} onPress={() => onPress()}>
            <VectorIcon
                color={'#000'}
                name="navicon"
                icon="EvilIcons"
                size={SF(35)}
                
               
                
            />
        </TouchableOpacity>
    );
};

export default HeaderLeftMenuIcon;