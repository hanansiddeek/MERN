import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, Alert, View, Image } from 'react-native';
import axios from 'axios';
import ForecastDaily from '../componentstest/ForecastDaily';
import NorochDashboard from '../componentstest/NorochDashboard';
import humidityIcon2 from '../icons/humidity.png';
import windIcon from '../icons/wind.png';
import pressureIcon from '../icons/pressure.png';
import locationIcon from '../icons/location.png';
import { useFonts } from 'expo-font';
import io from 'socket.io-client';

function fahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5 / 9).toFixed(1);  
}
function getFormattedDate() {
  const date = new Date();
  return new Intl.DateTimeFormat('en-US', { weekday: 'long', day: 'numeric', month: 'long' }).format(date);
}
export default function NorochWeathersec() {
  const [weatherData, setWeatherData] = useState(null);
  const [todayDate, setTodayDate] = useState(getFormattedDate());

  const applicationKey = "8aa7d1f98bca4d48b1cd6790f1f2670aa55755a93c9b45f2b6832171aea6e1a1";
  const apiKey = "e634d3c5c7e24b31a9797a678193e983e1ee8a07d6df4584b602969b897a901f";
  const socketUrl = `https://rt2.ambientweather.net/?api=1&applicationKey=${applicationKey}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setTodayDate(getFormattedDate()); // Updates the date at midnight
    }, (24 * 60 * 60 * 1000) - (Date.now() % (24 * 60 * 60 * 1000))); // Calculates milliseconds until next midnight

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    
    const socket = io(socketUrl, {
      reconnection: true,
      transports: ['websocket']
    });

    socket.on('connect', () => {
      console.log('Connected to Ambient Weather Realtime API');
      socket.emit('subscribe', { apiKeys: [apiKey] });
    });

    socket.on('data', (data) => {
      //console.log('Data received:', data);
      if (data.macAddress === "E8:DB:84:E4:70:89") {
          console.log('Data for state:', data);
          setWeatherData(data);
      }
  });
  

    socket.on('subscribed', (response) => {
      console.log('Subscribed to:', response);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Ambient Weather Realtime API');
    });

    return () => {
      socket.emit('unsubscribe', { apiKeys: [apiKey] });
      socket.close();
    };
  }, [apiKey, socketUrl]);



  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {weatherData ? (
        <View style={styles.contentContainer}>
          <View style={styles.locationcontainer}>
            <Image source={locationIcon} style={styles.locationicon} />
            <View style={styles.location}>
            <Text style={styles.textlocation1}>Norochcholai,</Text>
            <Text style={styles.textlocation}>Sri Lanka</Text>
            </View>
          </View>
          {/*<View style={styles.datecontainer}>
          <Text style={{ fontSize: 14, textAlign:'left' }}>{todayDate}</Text>
        </View> */}
          <View style={styles.weatherContainer}>
            <Text style={styles.texttemp}>{fahrenheitToCelsius(weatherData.tempinf)}°C</Text>
            <View style={styles.datecontainer}>
          <Text style={{ fontSize: 14, textAlign:'left' }}>{todayDate}</Text>
        </View>
            {/*
            <View style={styles.hwpcontainer}>
              <View style={styles.humidity}>
                <Image source={humidityIcon2} style={styles.humeicon} />
                <Text style={styles.humetext}>Humidity</Text>
                <Text style={styles.humetext}>{weatherData.humidityin} % </Text>
              </View>
              <View style={styles.pressure}>
                <Image source={pressureIcon} style={styles.pressureicon} />
                <Text style={styles.pressuretext}>Pressure</Text>
                <Text style={styles.pressuretext}>{weatherData.baromabsin} inHg</Text>
              </View>
        </View> */}
          </View>
          <NorochDashboard style={styles.dashboard} />
        </View>
        ) : (
            <Text style={styles.text}>Loading data, please wait...</Text>
        )}
    </ScrollView>
  );

}


const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'center',
    alignItems: 'center'
  },
  locationcontainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  location: {
    marginBottom: 10,
  },
  locationicon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  textlocation1: {
    fontSize: 18,
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold',
    width: 335,
    paddingLeft: 5,
    color: '#052035',
    marginVertical:5
  },
  textlocation: {
    textAlign: 'left',
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    width: 335,
    paddingLeft: 5,
    color: '#052035',
  },
  datecontainer: {
    alignItems: 'flex-start',
  },
  date: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: 'left',
  },
  weatherContainer: {
    width: 335,
    paddingTop: 20,
    paddingBottom: 20,
    alignContent: 'center',
    alignItems: 'center',
    //borderWidth: 2,
    //borderColor: '#ffff',
    //borderRadius: 10,
    //backgroundColor: '#ffff',
    shadowColor: "#f4f6f5",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  texttemp: {
    textAlign: 'center',
    fontSize: 70,
    fontFamily: 'Montserrat-SemiBold',
    color: '#052035',
  },
  hwpcontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  humidity: {
    alignItems: 'center',
    marginLeft: 60,
    padding: 10
  },
  humeicon: {
    width: 25,
    height: 25,
  },
  humetext: {
    fontFamily: 'Montserrat-Regular'
  },
  wind: {
    alignItems: 'center',
    padding: 10
  },
  windicon: {
    width: 25,
    height: 25,
  },
  windtext: {
    fontFamily: 'Montserrat-Regular'
  },
  pressure: {
    alignItems: 'center',
    marginRight: 60,
    padding: 10
  },
  pressureicon: {
    width: 25,
    height: 25,
  },
  pressuretext: {
    fontFamily: 'Montserrat-Regular'
  },
  forecast: {
    paddingTop: 50,
  },
  dashboard: {
    margin: 20, // Ensure there's spacing above the dashboard
  },
});