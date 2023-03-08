import {
  View,
  Text,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const HomeScreen = () => {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState('');
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationServiceEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationServiceEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        'Location service disabled',
        'Please enable location service to use this app',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
    }
    setLocationServiceEnabled(enabled);
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission denied',
        'Please grant location permission to use this app',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
      return;
    }
    let { coords } = await Location.getCurrentPositionAsync({});
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      // setDisplayCurrentAddress(address[0].name);
      for (let item of response) {
        let address = `${item.name}, ${item.city}, ${item.postalCode}`;
        setDisplayCurrentAddress(address);
      }
    }
  };
  return (
    <SafeAreaView>
      {/* Location */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
        }}
      >
        <MaterialIcons name="location-on" size={30} color="#fd5c63" />
        <View
          style={{
            marginHorizontal: 10,
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#fd5c63',
            }}
          >
            Home
          </Text>
          <Text>
            {locationServiceEnabled
              ? displayCurrentAddress
              : 'Please enable location service to use this app'}
          </Text>
        </View>
        <TouchableOpacity>
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
            }}
            source={{
              uri: 'https://avatars.githubusercontent.com/u/39174475?v=4',
            }}
          />
        </TouchableOpacity>
      </View>
      {/* SearchBar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          backgroundColor: '#fff',
          marginHorizontal: 10,
          marginVertical: 5,
          borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
        }}
      >
        <TextInput
          placeholder="Search..."
          style={{
            placeholderTextColor: '#fd5c63',
            flex: 1,
            paddingHorizontal: 10,
          }}
          autoCapitalize="none"


        />
        <MaterialIcons name="search" size={20} color="#fd5c63" />
      </View>
      {/* Carousel */}

    </SafeAreaView>
  );
};

export default HomeScreen;
