import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, FlatList, Alert } from 'react-native';
import axios from 'axios';

const formatDate = (isoDateStr) => {
  const date = new Date(isoDateStr);  
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const today = new Date(now);
  const tomorrow = new Date(now);
  tomorrow.setDate(today.getDate() + 1);

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', minute: 'numeric', hour12: true
  });

  if (date.toDateString() === today.toDateString()) {
    return `Today, ${timeFormatter.format(date)}`;
  } else {
    const dayOfWeek = daysOfWeek[date.getDay()];
    return `${dayOfWeek}, ${timeFormatter.format(date)}`;
  }
};



const ForecastDaily = () => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchForecast = async () => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=7.3016&longitude=80.733&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
      try {
        const response = await axios.get(url);
       
        const data = response.data.daily.time.map((time, index) => ({
          time,  
          max: response.data.daily.temperature_2m_max[index],
          min: response.data.daily.temperature_2m_min[index]
        }));
        
        setForecast(data);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch the forecast data.");
      }
    };

    fetchForecast();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Weather Forecast</Text>
      <FlatList
        data={forecast}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.forecastItem}>
            <Text style={styles.date}>{formatDate(item.time)}</Text>
            <View style={styles.tempcontainer}>
              <Text style={styles.temp}>{item.min}/{item.max} °C</Text>
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
    margin: 20,
    height:350,
    width: 335,
    alignContent:'center'
  },
  header: {
    paddingBottom: 8,
    fontSize: 20,
    textAlign: 'left',
    fontFamily:'Montserrat-SemiBold',
    color:'#fff'
  },
  forecastItem: {
    height:60,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 10,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#ffff',
    borderRadius: 10,
    backgroundColor: '#ffff',
    shadowColor: "#f4f6f5",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    alignItems:'center'
  },
  date: {
    color: '#000',
    fontSize: 16,
    textAlign:'left',
    fontFamily:'Montserrat-SemiBold'
  },
  temp: {
    color: '#000',
    fontSize: 16,
    fontFamily:'Montserrat-SemiBold'
  },
  tempcontainer: {
    alignItems:'flex-start',
  }
});

export default ForecastDaily;
