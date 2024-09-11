import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';
import precipitationIcon from '../icons/precipitation.png'
import humidityIcon from '../icons/humidity.png'
import windIcon from '../icons/wind.png'
import pressureIcon from '../icons/pressure.png'
import sunriseIcon from '../icons/sunrise.png'
import sunsetIcon from '../icons/sunset.png'
import temperatureIcon from '../icons/temperature.png'
import io from 'socket.io-client';

function fahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5 / 9).toFixed(2);  // .toFixed(2) limits the result to 2 decimal places
}

const NawaDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [sunriseSunset, setSunriseSunset] = useState({ sunrise: null, sunset: null });

  const applicationKey = "8aa7d1f98bca4d48b1cd6790f1f2670aa55755a93c9b45f2b6832171aea6e1a1";
  const apiKey = "e634d3c5c7e24b31a9797a678193e983e1ee8a07d6df4584b602969b897a901f";
  const socketUrl = `https://rt2.ambientweather.net/?api=1&applicationKey=${applicationKey}`;

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
      if (data.macAddress === "80:7D:3A:7C:4D:FA") {
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
    <View style={styles.container}>
      {weatherData ? (
        <View style={styles.weatherSec}>
          <View style={styles.condition}>
            <View style={styles.conditioncontainer}>
              <Text style={styles.conditionv}>{weatherData.humidityin}%</Text>
              <Text style={styles.conditiontext}>Humidity</Text>
            </View>
            <Image source={humidityIcon} style={styles.conditionicon} />

          </View>
          <View style={styles.condition}>
            <View style={styles.conditioncontainer}>
              <Text style={styles.conditionv}>{weatherData.hourlyrainin}mm</Text>
              <Text style={styles.conditiontext}>Hourly Rain</Text>
            </View>
            <Image source={precipitationIcon} style={styles.conditionicon} />

          </View>
          <View style={styles.condition}>
            <View style={styles.conditioncontainer}>
              <Text style={styles.conditionv}>{fahrenheitToCelsius(weatherData.feelsLikein)}° C</Text>
              <Text style={styles.conditiontext}>Feels Like</Text>
            </View>
            <Image source={temperatureIcon} style={styles.conditionicon} />
          </View>
          <View style={styles.condition}>
            <View style={styles.conditioncontainer}>
              <Text style={styles.conditionv}>{weatherData.baromabsin} inHg</Text>
              <Text style={styles.conditiontext}>Pressure</Text>
            </View>
            <Image source={pressureIcon} style={styles.conditionicon} />
          </View>

        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 50,
    width: 335,
  },
  weatherSec: {
    alignItems: 'center'
  },
  condition: {
    width: 335,
    height: 80,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
  },
  conditioncontainer: {

  },
  conditiontext: {
    textAlign: 'left',
    fontWeight: '700',
    color: '#052035',
    fontSize: 20,
  },
  conditionicon: {
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  conditionv: {
    textAlign: 'left',
    fontSize: 28,
    color: '#052035',
    fontWeight: '800'
  },
});

export default NawaDashboard;
