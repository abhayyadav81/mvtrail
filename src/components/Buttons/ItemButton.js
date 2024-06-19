import { TouchableOpacity, Text, View, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import itemButtonStyl from './itemButtonStyl'
import AntDesign from 'react-native-vector-icons/AntDesign';


const ItemButton = (props) => {

    // console.log('propsss',props.status);
  const seleStyle = () => {
    if(props.type){
        if(props.status === 'Cancelled'){
            return itemButtonStyl.OutlineBtn42
        }
    }else{
        return itemButtonStyl.IdvBtn42
    }
}
const textStyle = () => {
    if(props.type){
        if(props.type === 'outline'){
            return itemButtonStyl.OutlineText
        }
    }else{
        return itemButtonStyl.IdvBtnText
    }
}  

  return (
    <View>
   { props.status === 'Cancelled' ?
 <TouchableOpacity disabled={true} style={[seleStyle(), props.style,{ backgroundColor: 'grey',}]} onPress={props.onPress1}>
 <View style={{flexDirection:'row', }}>
{props.title === 'Rebook' &&

    <AntDesign name="reload1" size={20}  paddingRight={10} color={ '#ffff'} />
}
<Text style={[textStyle()]}>{props.title}</Text>
</View>
</TouchableOpacity>
:
    
    <TouchableOpacity style={[seleStyle(), props.style,  {backgroundColor: '#007BFF',}]} onPress={props.onPress1}>
         <View style={{flexDirection:'row', }}>
        {props.title === 'Rebook' &&
       
            <AntDesign name="reload1" size={20}  paddingRight={10} color={ '#ffff'} />
  }
      <Text style={[textStyle()]}>{props.title}</Text>
      </View>
  </TouchableOpacity>
}
  </View>
 
  )
}

export default ItemButton