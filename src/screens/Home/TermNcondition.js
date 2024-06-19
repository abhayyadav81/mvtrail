// DetailScreen.js
import React from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';

const TermNcondition = ({ navigation }) => {

  const termsText = `
  Welcome to the Bharat Taxi Customer App. These Terms and Conditions (&quot;Terms&quot;) govern
your access to and use of our mobile application and related services (collectively, the
&quot;Service&quot;) provided by Bharat Taxi (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By accessing or using
the Service, you agree to be bound by these Terms and all applicable laws and regulations.
`;
const termtext2 =`Bharat Taxi provides an online taxi booking platform that enables users to request taxi
services based on their current location. The Service includes features that allow users to
view and manage bookings, access taxi availability in real-time, and make payments directly
through the mobile application.`

const termtext3 =` Registration: To access and use certain features of the Service, you must register for
an account by providing your email address, mobile number, and creating a secure
password.
 Account Responsibility: You are responsible for maintaining the confidentiality of
your account login information and are fully responsible for all activities that occur
under your account.`

  return (
    // <SafeAreaView>
    //   {/* <Text>Detail Screen</Text>
    //   <Button
    //     title="Go Back"
    //     onPress={() => navigation.goBack()}
    //   /> */}
    // </SafeAreaView>
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.header}>
    
      <Text style={styles.headerText}>Term's & condition</Text>
    </View>

    <ScrollView style={styles.container}>
    <Text style={[styles.headerText, {textAlign:'center'}]}>Terms and Conditions for Bharat Taxi Customer App</Text>
    <Text style={[styles.headerText, {top:5}]}>Last Updated: 14-06-2024</Text>

      <Text style={styles.text}>{termsText}</Text>
    <Text style={[styles.headerText, {top:5}]}>1. Service Description</Text>
    <Text style={[styles.text, {top:10}]}>{termtext2}</Text>
    <Text style={styles.text}>{termsText}</Text>
    <Text style={[styles.headerText, {top:5}]}>2. User Accounts</Text>
    <Text style={[styles.text, {top:10}]}>{termtext3}</Text>

    </ScrollView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex:1,
    backgroundColor: '#fff',
    
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection:'row'
  },
  headerText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
 paddingHorizontal:20,
    // padding: 20,
    backgroundColor: '#D3D3D3',
  },
  text: {
    fontSize: 12,
    color: '#333',
    lineHeight: 24,
    textAlign:'center'
  },
});

export default TermNcondition;
