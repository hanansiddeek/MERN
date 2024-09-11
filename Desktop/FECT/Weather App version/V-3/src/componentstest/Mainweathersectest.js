import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';
import io from 'socket.io-client';
import locationIcon from '../icons/location.png';
import sun from '../icons/sun.png';
import moon from '../icons/moon.png';

function fahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5 / 9).toFixed(1);
}

function getFormattedDate() {
  const date = new Date();
  return new Intl.DateTimeFormat('en-US', { weekday: 'long', day: 'numeric', month: 'long' }).format(date);
}

const weatherStations = [
  { name: 'Akurana', macAddress: '80:7D:3A:7C:4F:08' },
  { name: 'Nachchaduwa', macAddress: '3C:71:BF:3E:A2:5A' },
  { name: 'Nawalapitiya', macAddress: '80:7D:3A:7C:4D:FA' },
  { name: 'Digana', macAddress: '80:7D:3A:7C:4A:7F' },
  { name: 'Alawatugoda', macAddress: '40:F5:20:3A:F5:AB' },
  { name: 'Norochcholai', macAddress: 'E8:DB:84:E4:70:89' }
];

export default function Mainweathersectest() {
  const [weatherData, setWeatherData] = useState({});
  const [todayDate, setTodayDate] = useState(getFormattedDate());
  const scrollViewRef = useRef(null);

  const applicationKey = "8aa7d1f98bca4d48b1cd6790f1f2670aa55755a93c9b45f2b6832171aea6e1a1";
  const apiKey = "e634d3c5c7e24b31a9797a678193e983e1ee8a07d6df4584b602969b897a901f";
  const socketUrl = `https://rt2.ambientweather.net/?api=1&applicationKey=${applicationKey}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setTodayDate(getFormattedDate());
    }, (24 * 60 * 60 * 1000) - (Date.now() % (24 * 60 * 60 * 1000)));

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
      console.log('Received data:', data);
      const station = weatherStations.find(station => station.macAddress === data.macAddress);
      if (station) {
        console.log(`Data for ${station.name}:`, data);
        setWeatherData(prevData => ({ ...prevData, [station.name]: data }));
      }
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Ambient Weather Realtime API');
    });

    return () => {
      socket.emit('unsubscribe', { apiKeys: [apiKey] });
      socket.close();
    };
  }, [apiKey, socketUrl]);

  const isDayTime = {
    Akurana: true,
    Digana: true,
    Nawalapitiya: true,
    Alawatugoda: true,
    Nachchaduwa: true,
    Norochcholai: true,
  };

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        contentContainerStyle={[styles.contentContainer, { alignItems: 'center', justifyContent: 'center' }]}
      >

      {/* Akurana */}
        <View style={styles.stationContainer}>
          <View style={styles.locationcontainer}>
            <Image source={locationIcon} style={styles.locationicon} />
            <View style={styles.location}>
              <Text style={styles.textlocation1}>Akurana, Sri Lanka</Text>
            </View>
          </View>
          <View style={styles.weatherContainer}>
            <View>
              <Text style={styles.texttemp}>Temperature: {fahrenheitToCelsius(weatherData['Akurana']?.tempinf)}°C</Text>
              {/* <Text style={{ fontSize: 14, textAlign: 'left' }}> Feels Like:{fahrenheitToCelsius(weatherData['Akurana']?.feelsLike)}°C</Text>  */}
              <Text style={styles.texttemp}>Humidity: {weatherData['Akurana']?.humidityin}%</Text>
              <Text style={styles.texttemp}>Hourly Rain: {weatherData['Akurana']?.hourlyrainin}mm</Text>
            </View>
            <View>
              <Image source={isDayTime['Akurana'] ? sun : moon} style={isDayTime['Akurana'] ? styles.sun : styles.moon} />
            </View>
          </View>
        </View>

      
      {/* Digana */}
        <View style={styles.stationContainer}>
          <View style={styles.locationcontainer}>
            <Image source={locationIcon} style={styles.locationicon} />
            <View style={styles.location}>
              <Text style={styles.textlocation1}>Digana, Sri Lanka</Text>
            </View>
          </View>
          <View style={styles.weatherContainer}>
            <View>
              <Text style={styles.texttemp}>Temperature: {fahrenheitToCelsius(weatherData['Digana']?.tempinf)}°C</Text>
              {/* <Text style={{ fontSize: 14, textAlign: 'left' }}>{fahrenheitToCelsius(weatherData['Digana']?.feelsLike)}°C</Text> */}
              <Text style={styles.texttemp}>Humidity: {weatherData['Digana']?.humidityin}%</Text>
              <Text style={styles.texttemp}>Hourly Rain: {weatherData['Digana']?.hourlyrainin}mm</Text>
            </View>
            <View>
              <Image source={isDayTime['Digana'] ? sun : moon} style={isDayTime['Digana'] ? styles.sun : styles.moon} />
            </View>
          </View>
        </View>

         {/* Alawathugoda */}
        <View style={styles.stationContainer}>
          <View style={styles.locationcontainer}>
            <Image source={locationIcon} style={styles.locationicon} />
            <View style={styles.location}>
              <Text style={styles.textlocation1}>Alawatugoda, Sri Lanka</Text>
            </View>
          </View>
          <View style={styles.weatherContainer}>
            <View>
              <Text style={styles.texttemp}>Temperature: {fahrenheitToCelsius(weatherData['Alawatugoda']?.tempinf)}°C</Text>
              {/* <Text style={{ fontSize: 14, textAlign: 'left' }}>{fahrenheitToCelsius(weatherData['Alawatugoda']?.feelsLike)}°C</Text> */}
              <Text style={styles.texttemp}>Humidity: {weatherData['Alawatugoda']?.humidityin}%</Text>
              <Text style={styles.texttemp}>Hourly Rain: {weatherData['Alawatugoda']?.hourlyrainin}mm</Text>
            </View>
            <View>
              <Image source={isDayTime['Alawatugoda'] ? sun : moon} style={isDayTime['Alawatugoda'] ? styles.sun : styles.moon} />
            </View>
          </View>
        </View>

        {/* Nachchaduwa */}
        <View style={styles.stationContainer}>
          <View style={styles.locationcontainer}>
            <Image source={locationIcon} style={styles.locationicon} />
            <View style={styles.location}>
              <Text style={styles.textlocation1}>Nachchaduwa, Sri Lanka</Text>
            </View>
          </View>
          <View style={styles.weatherContainer}>
            <View>
              <Text style={styles.texttemp}>Temperature: {fahrenheitToCelsius(weatherData['Nachchaduwa']?.tempinf)}°C</Text>
              {/* <Text style={{ fontSize: 14, textAlign: 'left' }}>{fahrenheitToCelsius(weatherData['Nachchaduwa']?.feelsLike)}°C</Text> */}
              <Text style={styles.texttemp}>Humidity: {weatherData['Nachchaduwa']?.humidityin}%</Text>
              <Text style={styles.texttemp}>Hourly Rain: {weatherData['Nachchaduwa']?.hourlyrainin}mm</Text>
            </View>
            <View>
              <Image source={isDayTime['Nachchaduwa'] ? sun : moon} style={isDayTime['Nachchaduwa'] ? styles.sun : styles.moon} />
            </View>
          </View>
        </View>

        {/* Nawalapitiya */}
        <View style={styles.stationContainer}>
          <View style={styles.locationcontainer}>
            <Image source={locationIcon} style={styles.locationicon} />
            <View style={styles.location}>
              <Text style={styles.textlocation1}>Nawalapitiya, Sri Lanka</Text>
            </View>
          </View>
          <View style={styles.weatherContainer}>
            <View>
              <Text style={styles.texttemp}>Temperature: {fahrenheitToCelsius(weatherData['Nawalapitiya']?.tempinf)}°C</Text>
              {/* <Text style={{ fontSize: 14, textAlign: 'left' }}>{fahrenheitToCelsius(weatherData['Nawalapitiya']?.feelsLike)}°C</Text> */}
              <Text style={styles.texttemp}>Humidity: {weatherData['Nawalapitiya']?.humidityin}%</Text>
              <Text style={styles.texttemp}>Hourly Rain: {weatherData['Nawalapitiya']?.hourlyrainin}mm</Text>
            </View>
            <View>
              <Image source={isDayTime['Nawalapitiya'] ? sun : moon} style={isDayTime['Nawalapitiya'] ? styles.sun : styles.moon} />
            </View>
          </View>
        </View>

        {/* Nuraich */}
        <View style={styles.stationContainer}>
          <View style={styles.locationcontainer}>
            <Image source={locationIcon} style={styles.locationicon} />
            <View style={styles.location}>
              <Text style={styles.textlocation1}>Norochcholai, Sri Lanka</Text>
            </View>
          </View>
          <View style={styles.weatherContainer}>
            <View>
              <Text style={styles.texttemp}>Temperature: {fahrenheitToCelsius(weatherData['Norochcholai']?.tempinf)}°C</Text>
              {/* <Text style={{ fontSize: 14, textAlign: 'left' }}>{fahrenheitToCelsius(weatherData['Norochcholai']?.feelsLike)}°C</Text> */}
              <Text style={styles.texttemp}>Humidity: {weatherData['']?.humidityin}%</Text>
              <Text style={styles.texttemp}>Hourly Rain: {weatherData['Norochcholai']?.hourlyrainin}mm</Text>
            </View>
            <View>
              <Image source={isDayTime['Norochcholai'] ? sun : moon} style={isDayTime['Norochcholai'] ? styles.sun : styles.moon} />
            </View>
          </View>
        </View>

        

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10,
    width: 335,
    marginBottom: 200,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  stationContainer: {
    marginBottom: 20,
    marginTop: 5,
  },
  locationcontainer: {
    width: '200%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    marginTop: 10,
  },
  location: {
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  locationicon: {
    width: 20,
    height: 25,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  textlocation1: {
    fontSize: 20,
    textAlign: 'left',
    justifyContent: 'center',
    alignContent: 'center',
    fontFamily: 'Montserrat-SemiBold',
    width: '100%',
    paddingLeft: 5,
    color: '#000',
    marginBottom:5,
  },
  weatherContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    height: 100, // Adjust the height as needed
    paddingTop: 10,
    paddingBottom: 5,
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffff',
    borderRadius: 10,
    backgroundColor: '#ffff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: 'relative',
    paddingLeft: 20,
    paddingRight: 20,
  },
  sun: {
    width: 60,
    height: 60,
  },
  moon: {
    width: 60,
    height: 60,
  },
  texttemp: {
    textAlign: 'left',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    marginVertical:2
  },
  datecontainer: {
    fontSize: 14,
    textAlign: 'left',
  }
});
