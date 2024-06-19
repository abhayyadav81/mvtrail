import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

const BookingCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Package</Text>
        <Text style={styles.value}>12Hrs/120Kms</Text>
        <Text style={styles.label}>Booking ID</Text>
        <Text style={styles.value}>BT283237</Text>
        <Text style={styles.label}>Booking date</Text>
        <Text style={styles.value}>30-05-24 @ 11:49 am</Text>
        <Text style={styles.label}>Pickup location</Text>
        <Text style={styles.value}>Charbagh</Text>
        <Text style={styles.label}>Fare</Text>
        <Text style={styles.value}>₹ 5261</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.detailButton}>
          <Text style={styles.buttonText}>Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rebookButton} disabled={true}>
          <Text style={styles.rebookButtonText}>Rebook</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cancelledBanner}>
        <Svg height="96" width="96">
          <Polygon points="0,0 96,0 96,96" fill="red" />
          <Text style={styles.cancelledText}>CANCELLED</Text>
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#fff',
    margin: 10
  },
  detailsContainer: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000'
  },
  value: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  actionsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  detailButton: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 3,
    marginBottom: 5,
  },
  rebookButton: {
    backgroundColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  rebookButtonText: {
    color: '#aaa',
    fontSize: 14,
  },
  cancelledBanner: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 96,
    height: 96,
    overflow: 'hidden',
  },
  cancelledText: {
    position: 'absolute',
    top: 20,
    right: -35,
    transform: [{ rotate: '45deg' }],
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default BookingCard;
