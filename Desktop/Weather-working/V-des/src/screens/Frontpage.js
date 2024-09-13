import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Mainweathersectest from '../componentstest/Mainweathersectest';
import logoIcon from '../icons/logo.png';
import { useNavigation } from '@react-navigation/native';


const Frontpage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.companyInfo}>
          <Image source={logoIcon} style={styles.logoIcon} />
          <Text style={styles.companyName}>
            Federation for Environment, {'\n'}Climate and Technology
          </Text>
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          A non-profit organization with a rich history
        </Text>
      </View>

      <Text style={styles.title}>Current Weather at FECT Stations.</Text>
      <View style={styles.weatherWidget}>
        <Mainweathersectest navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#01AAC11A',
    backgroundColor: '#ddebed',
    paddingHorizontal: 20,
    paddingLeft: 20,
    paddingTop: 20,
    width: '100%',  
    marginTop:30
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  companyInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  logoIcon: {
    width: 40,
    height: 55,
    marginRight: 20,
  },
  companyName: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#052035',
    fontFamily: 'Roboto_700Bold', 
  },
  descriptionContainer: {
    height: 40,
    marginBottom: 20,
    marginTop: 20,
  },
  descriptionText: {
    fontSize: 20,
    color: '#052035',
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-SemiBold',
    paddingLeft: 20,
    paddingRight: 10,
   
  },
  weatherWidget: {
    marginBottom: 10,
    alignSelf: 'center',
  },
});

export default Frontpage;
