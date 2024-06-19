import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useGlobalState } from '../../../User-Context/Context';

const RidesTab = (props) => {
  const [count, setCount] = useState(0);
  const {state, dispatch} = useGlobalState();

  

  return (
    <View style={styles.container}>
     <TouchableOpacity onPress={() =>  dispatch({Tab: 'Upcoming'})} style={[styles.button, {borderWidth: state.Tab === "Upcoming" ? 2 : null} ]}>
<Text style={{
    fontSize: 14,
    fontWeight: '700',
    paddingBottom:0,
    color: '#000',
    
}}>Upcoming</Text>
     </TouchableOpacity >
     <TouchableOpacity onPress={() =>  dispatch({Tab: 'Running'})} style={[styles.button, {borderWidth: state.Tab === "Running" ? 2 : null} ]}>
<Text style={{
    fontSize: 14,
    fontWeight: '700',
    paddingBottom:0,
    color: '#000',
    
}}>Running</Text>
     </TouchableOpacity>
     <TouchableOpacity onPress={() => dispatch({Tab: 'Ride over'})} style={[styles.button, {borderWidth: state.Tab === "Ride over" ? 2 : null} ]} >
<Text style={{
    fontSize: 14,
    fontWeight: '700',
    paddingBottom:0,
    color: '#000',
    
}}>Ride over</Text>
     </TouchableOpacity>
     <TouchableOpacity onPress={() =>  dispatch({Tab: 'Cancelled'})} style={[styles.button, {borderWidth: state.Tab === "Cancelled" ? 2 : null} ]}>
<Text style={{
    fontSize: 14,
    fontWeight: '700',
    paddingBottom:0,
    color: '#000',
    
}}>Cancelled</Text>
     </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    flexDirection:'row',
    // padding:10,
    justifyContent:'space-between',
    paddingHorizontal:20,
    paddingTop:10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FFFFF',
    padding: 10,
    borderWidth:2,
    borderRadius:20,
    borderColor:'#0066FF'
  },
 
});

export default RidesTab;