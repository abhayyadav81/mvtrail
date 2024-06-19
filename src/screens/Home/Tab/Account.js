
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, KeyboardAvoidingView } from 'react-native';
import CardLayout from '../../../components/commonComponents/CardLayout';
import Dimensions from '../../../utils/Dimension';
import axios from 'axios';
import { BASE_URL } from '../../../utils/Api';
import { ScrollView } from 'react-native-virtualized-view';
import { Fonts } from '../../../utils';

const Items = ({ lable, value, lablesty, valuesty }) => {
  return (
    <KeyboardAvoidingView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={lablesty}>{lable}</Text>
        <Text style={valuesty}>{value}</Text>

      </View>
    </KeyboardAvoidingView>
  );
};

const AccountTab = () => {

  const [tabindex, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [Transactiondata, setTransacttion] = useState(false);
  const [walletData, setWalletdata] = useState(false);



  const data = [
    { key: '1', text: 'Item 1', ammount: '₹ 2625', Tid: 'BT160030', date: 'O7 Jun 2024' },
    { key: '2', text: 'Item 2', ammount: '₹ 2625', Tid: 'BT160030', date: 'O7 Jun 2024' },
    { key: '3', text: 'Item 3', ammount: '₹ 2625', Tid: 'BT160030', date: 'O7 Jun 2024' },
    { key: '4', text: 'Item 4', ammount: '₹ 2625', Tid: 'BT160030', date: 'O7 Jun 2024' },
    { key: '5', text: 'Item 5', ammount: '₹ 2625', Tid: 'BT160030', date: 'O7 Jun 2024' },
    {},
    { },




    // add more items as needed
  ];

  useEffect(() => {
    fetchApi()
  }, []);

  const fetchApi = async () => {
    // setIsLoading(true)
    try {


      const username = 'btcal';
      const password = '123@cal';
      const basicAuth = 'Basic ' + btoa(username + ':' + password);

      const response = await axios.get(`${BASE_URL}walletDetails`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': basicAuth,
        },
      });

      console.log('ress----', response.data);
      if (response.data) {
        setTransacttion(response.data.transaction)
        setWalletdata(response.data.wallet)

        // Set state or handle accordingly to show "No Ride" message
        // setRunning([status = 0]);
      } else {

      }

    } catch (error) {
      console.error('Error:', error);

    }
  };

  console.log('ress----1111', walletData);

  const renderItem = ({ item, index }) => (

    <View style={[style.item, index % 2 === 0 ? style.itemEven : style.itemOdd]}>
      <View style={{ height: Dimensions.hp(4) }}>
        <Items lable={item.text} lablesty={{
          fontFamily: 'Poppins',
          fontWeight: '400',
          fontsize: 12,

          lineheight: 16,
          color: '#9C9C9C'
        }} value={item.ammount} valuesty={{
          fontfamily: 'Poppins',
          fontsize: 14,
          fontweight: '600',
          lineheight: 20,
          color: '#EF5944'
        }} />

      </View>
      <View>
        <Items lable={item.Tid} lablesty={{
          fontFamily: 'Poppins',
          fontWeight: '600',
          fontsize: 14,

          lineheight: 20,
          color: '#5A5A5A'
        }} value={item.date} valuesty={{
          fontfamily: 'Poppins',
          fontsize: 12,
          fontweight: '400',
          lineheight: 16,
          color: '#000'
        }} />

      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <CardLayout
        style={{
          backgroundColor: '#12304C',
          height: Dimensions.hp('20'),
          padding: Dimensions.hp('5'),
        }}>
        <View style={style.cardView}>
          <Text style={style.cardAmountTxt}>{walletData.amount}</Text>
          <Text style={style.cardbodyTxt}>Account Balance</Text>
        </View>
      </CardLayout>
      <View
        style={style.TransactionView}>
        <Text style={style.subTitle}>Transaction</Text>
        <View style={style.horizontalLine}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: Dimensions.wp(4) }}>
          <TouchableOpacity style={[style.TopTabs, { backgroundColor: tabindex === 0 ? "#2970B1" : null }]} onPress={() => setIndex(0)}>
            <Text style={[style.TabTxt, { color: tabindex === 0 ? 'white' : "#2970B1" }]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[style.TopTabs, { backgroundColor: tabindex === 1 ? "#2970B1" : null }]} onPress={() => setIndex(1)}>
            <Text style={[style.TabTxt, { color: tabindex === 1 ? 'white' : "#2970B1" }]}>Credit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[style.TopTabs, { backgroundColor: tabindex === 2 ? "#2970B1" : null }]} onPress={() => setIndex(2)}>
            <Text style={[style.TabTxt, { color: tabindex === 2 ? 'white' : "#2970B1" }]}>Debit</Text>
          </TouchableOpacity>
        </View>
        <View style={{  paddingTop: Dimensions.hp(2) }}>
          {tabindex === 0 &&
          <View>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.key}
              showsVerticalScrollIndicator={false}
            />
            </View>
          }
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  cardView: {
    alignSelf: 'center',
    // paddingTop: 20,
  },
  cardAmountTxt: {
    color: 'white',
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 34,
    lineHeight: 44,
    textAlign: 'center',
  },
  cardbodyTxt: {
    color: 'white',
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: Dimensions.hp(1),
  },
  subTitle: {
    fontfamily: 'Poppins',
    fontsize: 18,
    fontweight: '600',
    lineheight: 30,
    textalign: 'left',
    color: '#000000',
  },
  TransactionView: {
    justifyContent: 'center',
    paddingHorizontal: Dimensions.wp(4),
    paddingTop: Dimensions.hp(10),
  },
  horizontalLine: {
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop: Dimensions.hp(2),
  },
  TopTabs: {

    padding: Dimensions.wp(3),
    borderRadius: 25,
    width: Dimensions.wp(25)
  },
  TabTxt: {
    textAlign: 'center',
    color: '#fff'
    ,fontFamily: Fonts.Poppins_Regular
  },
  item: {
    padding: 20,
    marginVertical: 8,
    borderRadius: 12,
    justifyContent: 'space-between'


    // marginHorizontal: 16,
  },
  itemEven: {
    backgroundColor: '#FEF7F6',
    borderWidth: 1,
    borderColor: '#EF5944'
  },
  itemOdd: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#22C55E'

  },
  text: {
    fontSize: 16
    ,fontFamily: Fonts.Poppins_Regular
  },

});

export default AccountTab;
