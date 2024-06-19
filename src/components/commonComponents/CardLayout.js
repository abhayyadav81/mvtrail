import { View, Text, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import {Card} from 'react-native-paper';

const CardLayout = (props) => {
  return (
    <KeyboardAvoidingView>
    <Card  style={[
          {
            borderRadius: 10,
            margin: 5,
            marginHorizontal: 10,
            padding: 10,
            position: 'relative',
            top: 10,
          },
          props.style,
        ]}>
      {props.children}
    </Card>
    </KeyboardAvoidingView>
  )
}

export default CardLayout