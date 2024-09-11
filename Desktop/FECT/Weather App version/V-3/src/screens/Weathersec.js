import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, Alert, View, Image } from 'react-native';
import axios from 'axios';
import ForecastDaily from '../componentstest/ForecastDaily';
import Dashboard from '../componentstest/Dashboard';
import humidityIcon2 from '../icons/humidity.png';
import windIcon from '../icons/wind.png';
import pressureIcon from '../icons/pressure.png';
import locationIcon from '../icons/location.png';
import { useFonts } from 'expo-font';

export default function Weathersec() {
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    /*const lat = 7.365;
    const lon = 80.617222;
    const apiKey = 'dd0a3c6405496aaa85086a437c31e73f';*/
    const url = `https://api.open-meteo.com/v1/forecast?latitude=7.3016&longitude=80.733&current=temperature_2m,is_day,relative_humidity_2m,rain,pressure_msl,wind_speed_10m&timezone=auto`;

    try {
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch the weather data.");
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {weather ? (
        <View style={styles.contentContainer}>
          <View style={styles.locationcontainer}>
            <Image source={locationIcon} style={styles.locationicon} />
            <Text style={styles.textlocation}>Digana, Sri Lanka</Text>
          </View>
          <View style={styles.weatherContainer}>
            <Text style={styles.texttemp}>{weather.current.temperature_2m}° C</Text>
            <View style={styles.hwpcontainer}>
              <View style={styles.humidity}>
                <Image source={humidityIcon2} style={styles.humeicon} />
                <Text style={styles.humetext}>Humidity</Text>
                <Text style={styles.humetext}>{weather.current.relative_humidity_2m}%</Text>
              </View>
              <View style={styles.wind}>
                <Image source={windIcon} style={styles.windicon} />
                <Text style={styles.windtext}>Wind</Text>
                <Text style={styles.windtext}>{weather.current.wind_speed_10m} km/h</Text>
              </View>
              <View style={styles.pressure}>
                <Image source={pressureIcon} style={styles.pressureicon} />
                <Text style={styles.pressuretext}>Pressure</Text>
                <Text style={styles.pressuretext}>{weather.current.pressure_msl} hPa</Text>
              </View>
            </View>
          </View>
          <ForecastDaily style={styles.forecast} />
          <Dashboard style={styles.dashboard} />
        </View>
      ) : (
        <Text style={styles.text}>Loading...</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    backgroundColor: '#052035',
  },
  contentContainer:{
    alignItems:'center',
    alignItems:'center'
  },
  locationcontainer:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    alignContent:'center',
    paddingLeft:20,
    paddingTop:25
  },
  locationicon:{
    width: 20,
    height: 20,
    marginBottom: 10,
  },
  textlocation: {
    textAlign: 'left',
    fontSize: 24,
    marginBottom: 10,
    fontFamily: 'Montserrat-SemiBold',
    width: 335,
    paddingLeft:5,
    color:'#ffff'
  },
  weatherContainer: {
    width:335,
    paddingTop: 20,
    paddingBottom: 20,
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffff',
    borderRadius: 10,
    backgroundColor: '#ffff',
    shadowColor: "#f4f6f5",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  texttemp: {
    textAlign: 'center',
    fontSize: 70,
   fontFamily:'Montserrat-SemiBold'
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
  humetext:{
    fontFamily:'Montserrat-Regular'
  },
  wind: {
    alignItems: 'center',
    padding: 10
  },
  windicon: {
    width: 25,
    height: 25,
  },
  windtext:{
    fontFamily:'Montserrat-Regular'
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
  pressuretext:{
    fontFamily:'Montserrat-Regular'
  },
  forecast: {
    paddingTop: 50,
  },
  dashboard: {
    margin: 20, // Ensure there's spacing above the dashboard
  },
});
