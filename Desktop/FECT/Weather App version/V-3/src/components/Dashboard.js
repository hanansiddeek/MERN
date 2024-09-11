import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';
import precipitationIcon from '../icons/precipitation.png'
import humidityIcon from '../icons/humidity.png'
import windIcon from '../icons/wind.png'
import pressureIcon from '../icons/pressure.png'
import sunriseIcon from '../icons/sunrise.png'
import sunsetIcon from '../icons/sunset.png'

function fahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5 / 9).toFixed(2);  // .toFixed(2) limits the result to 2 decimal places
}

const Dashboard = () => {
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [sunriseSunset, setSunriseSunset] = useState({ sunrise: null, sunset: null });

  useEffect(() => {
    const fetchWeatherDetails = async () => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=7.3016&longitude=80.733&current=relative_humidity_2m,precipitation,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m&daily=sunrise,sunset&timezone=auto`;
      try {
        const response = await axios.get(url);
        if (response.data) {
          setWeatherDetails(response.data);
          const todayDate = new Date().toISOString().split('T')[0]; // Gets today's date in YYYY-MM-DD format
          const index = response.data.daily.time.indexOf(todayDate);
          if (index !== -1) {
            setSunriseSunset({
              sunrise: response.data.daily.sunrise[index],
              sunset: response.data.daily.sunset[index]
            });
          }
        } else {
          Alert.alert("Error", "No weather data available.");
        }
      } catch (error) {
        console.error("Fetching failed:", error);
        Alert.alert("Error", "Failed to get weather details.");
      }
    };

    fetchWeatherDetails();
  }, []);

  return (
    <View style={styles.container}>
      {weatherDetails ? (
        <View style={styles.weatherSec}>
          <View style = {styles.humews}>
            <View style={styles.humidity}>
              <Text style={styles.humiditytext}>Humidity</Text>
              <Image source={humidityIcon} style={styles.humeicon} />
              <Text style={styles.humidityv}>{weatherDetails.current?.relative_humidity_2m || 'N/A'}%</Text>
            </View>
            <View style={styles.ws}>
              <Text style={styles.wstext}>Wind Speed</Text>
              <Image source={windIcon} style={styles.wsicon} />
              <Text style={styles.wsv}>{weatherDetails.current?.wind_speed_10m || 'N/A'} km/h</Text>
            </View>
          </View>
          <View style={styles.presp}>
            <View style={styles.precipitation}>
              <Text style={styles.precipitationtext}>Precipitation</Text>
              <Image source={precipitationIcon} style={styles.preicon} />
              <Text style={styles.precipitationv}>{weatherDetails.current?.precipitation}mm</Text>
            </View>
            <View style={styles.sp}>
              <Text style={styles.sptext}>Surface Pressure</Text>
              <Image source={pressureIcon} style={styles.spicon} />
              <Text style={styles.spv}>{weatherDetails.current.surface_pressure} hPa</Text>
            </View>
          </View>
          <View style={styles.sunriseset}>
            <View style={styles.sunrise}>
              <Text style={styles.sunrisetext}>Sunrise</Text>
              <Image source={sunriseIcon} style={styles.sunrisecon} />
              <Text style={styles.sunrisev}>{sunriseSunset.sunrise}</Text>
            </View>
            <View style={styles.sunset}>
              <Text style={styles.sunsettext}>Sunset</Text>
              <Image source={sunsetIcon} style={styles.sunseticon} />
              <Text style={styles.sunsetv}>{sunriseSunset.sunset}</Text>
            </View>
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
    width:335,
  },
  weatherSec: {
    justifyContent: 'space-between',
    
  },
  humews: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
  },
  presp: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    marginTop:10,
  },
  sunriseset: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    marginTop:10,
  },
  humidity: {
    alignContent: 'center',
    width: 150,
    height: 150,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: "#f4f6f5",
    shadowOffset: {
      width: 0,
      height: 1, // Sets the vertical offset of the shadow
    },
    shadowOpacity: 0.2, // Sets the transparency of the shadow
    shadowRadius: 5, // Sets the blur radius of the shadow
    elevation: 3,
    justifyContent: 'center',  
    alignItems: 'center',
  },
  humiditytext: {
    textAlign: 'center',
    marginTop: -40,
    color: '#000',
    fontSize:18,
  },
  humeicon: {
    alignItems: 'center',
    width: 50,
    height: 50,

  },
  humidityv: {
    textAlign: 'center',
    color: '#ffff',
    fontSize: 20,
    color: '#000'
  },
  ws: {
    alignContent: 'center',
    width: 150,
    height: 150,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: "#f4f6f5",
    shadowOffset: {
      width: 0,
      height: 1, // Sets the vertical offset of the shadow
    },
    shadowOpacity: 0.2, // Sets the transparency of the shadow
    shadowRadius: 5, // Sets the blur radius of the shadow
    elevation: 3,
    justifyContent: 'center',  
    alignItems: 'center',
  },
  wstext: {
    textAlign: 'center',
    marginTop: -40,
    color: '#000',
    fontSize: 18,
  },
  wsicon: {
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  wsv: {
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
  },
  precipitation: {
    alignContent: 'center',
    width: 150,
    height: 150,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: "#f4f6f5",
    shadowOffset: {
      width: 0,
      height: 1, // Sets the vertical offset of the shadow
    },
    shadowOpacity: 0.2, // Sets the transparency of the shadow
    shadowRadius: 5, // Sets the blur radius of the shadow
    elevation: 3,
    justifyContent: 'center',  
    alignItems: 'center',
  },
  precipitationtext: {
    textAlign: 'center',
    marginTop: -40,
    color: '#000',
    fontSize: 18,
  },
  preicon: {
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  precipitationv: {
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
  },
  sp: {
    alignContent: 'center',
    width: 150,
    height: 150,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: "#f4f6f5",
    shadowOffset: {
      width: 0,
      height: 1, // Sets the vertical offset of the shadow
    },
    shadowOpacity: 0.2, // Sets the transparency of the shadow
    shadowRadius: 5, // Sets the blur radius of the shadow
    elevation: 3,
    justifyContent: 'center',  
    alignItems: 'center',
  },
  sptext: {
    textAlign: 'center',
    marginTop: -25,
    color: '#000',
    fontSize: 18,
  },
  spicon: {
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  spv: {
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
  },
  sunrise: {
    alignContent: 'center',
    width: 150,
    height: 150,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: "#f4f6f5",
    shadowOffset: {
      width: 0,
      height: 1, // Sets the vertical offset of the shadow
    },
    shadowOpacity: 0.2, // Sets the transparency of the shadow
    shadowRadius: 5, // Sets the blur radius of the shadow
    elevation: 3,
    justifyContent: 'center',  
    alignItems: 'center',
  },
  sunrisetext: {
    textAlign: 'center',
    marginTop: -20,
    color: '#000',
    fontSize: 18,
  },
  sunriseicon: {
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  sunrisev: {
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
  },
  sunset: {
    alignItems:'center',
    alignContent: 'center',
    width: 150,
    height: 150,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: "#f4f6f5",
    shadowOffset: {
      width: 0,
      height: 1, // Sets the vertical offset of the shadow
    },
    shadowOpacity: 0.2, // Sets the transparency of the shadow
    shadowRadius: 5, // Sets the blur radius of the shadow
    elevation: 3,
  },
  sunsettext: {
    textAlign: 'center',
    marginTop: -10,
    color: '#000',
    fontSize: 16,
  },
  sunseticon: {
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  sunsetv: {
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
  },
});


export default Dashboard;
