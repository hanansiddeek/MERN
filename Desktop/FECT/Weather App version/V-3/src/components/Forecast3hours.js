import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import axios from 'axios';

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', minute: 'numeric', hour12: true
  });

  if (date.toDateString() === today.toDateString()) {
    return `Today - ${timeFormatter.format(date)}`;
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return `Tomorrow - ${timeFormatter.format(date)}`;
  } else {
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      month: 'numeric', day: 'numeric', year: 'numeric'
    });
    return `${dateFormatter.format(date)} - ${timeFormatter.format(date)}`;
  }
};

const Forecast3hours = () => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchForecast = async () => {
      const lat = 7.298703;
      const lon = 80.6962088;
      const cnt = 12; // Number of time points you want the forecast for
      const apiKey = 'dd0a3c6405496aaa85086a437c31e73f';
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${apiKey}&units=metric`;

      try {
        const response = await axios.get(url);
        setForecast(response.data.list);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch the forecast data.");
      }
    };

    fetchForecast();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>3 Hour Weather Forecast</Text>
      <FlatList
        data={forecast}
        keyExtractor={item => item.dt.toString()}
        renderItem={({ item }) => (
          <View style={styles.forecastItem}>
            <View>
              
              <Text style={styles.date}>{formatDate(item.dt)}</Text>
              <Text style={styles.weather}>{item.weather[0].main}</Text> 
            </View>
            <View style={styles.tempcontainer}>
              <Text style={styles.temp}>{item.main.temp}°C</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    height: 425,
    margin: 20,
    //paddingHorizontal: 0,
  },
  header: {
    paddingBottom: 8,
    fontSize: 20,
  },
  forecastItem: {
    justifyContent: 'space-between',
    display:'flex',
    paddingHorizontal: 160,
    paddingTop: 15,
    paddingBottom: 15,
    opacity: 50,
    marginBottom: 10,
    //padding: 10,
    borderColor: '#01aac1',
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#01aac1',
    shadowColor: "#000",
    opacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 1, // Sets the vertical offset of the shadow
  },
  shadowOpacity: 0.2, // Sets the transparency of the shadow
  shadowRadius: 5, // Sets the blur radius of the shadow
  elevation: 3, // Sets elevation for Android (shadow effect)
  },
  date:{
    textAlign:'left',
    marginLeft: -140,
    color:'#ffff',
    fontSize:16,
  },
  weather:{
    textAlign:'left',
    marginLeft: -140,
    color:'#ffff',
    fontSize:16,
  },
  temp:{
    textAlign:'left',
    marginLeft: 75,
    fontSize:16,
    color:'#ffff',
  },
  tempcontainer:{
    textAlign:'right',
    marginRight: -120,
    color:'#ffff',
  }
});

export default Forecast3hours;
