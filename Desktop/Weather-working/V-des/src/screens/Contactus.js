import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import axios from 'axios';
import locationIcon from '../icons/location-b.png';
import phoneIcon from '../icons/phone.png'
import emailIcon from '../icons/email.png'
import facebookIcon from '../icons/facebook.png'
import instagramIcon from '../icons/instagram.png'
import linkedinIcon from '../icons/linkedin.png'
import twitterIcon from '../icons/twitter.png'
import io from 'socket.io-client';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';


const Contactus = () => {
    const navigation = useNavigation();
    const openAkuranaMapsLink = () => {
        Linking.openURL('https://maps.app.goo.gl/Y8YKunyMX9ZxH6gt7');
    };
    const openDiganaMapsLink = () => {
        Linking.openURL('https://maps.app.goo.gl/wWfKHNMSnyXymSBJ9');
    };
    const openFacebookLink = () => {
        Linking.openURL('https://www.facebook.com/fectlk');
    };
    const openInstagramLink = () => {
        Linking.openURL('https://www.instagram.com/fect.lk/');
    };
    const openLinkedinLink = () => {
        Linking.openURL('https://www.linkedin.com/company/fectlk/');
    };
    const openTwitterLink = () => {
        Linking.openURL('https://twitter.com/fectlk');
    };
    const openEmail1Link = () => {
        Linking.openURL('mailto:info@fect.lk');
    };
    const openEmail2Link = () => {
        Linking.openURL('mailto:info@fect.lk');
    };
    const openPhone1Link = () => {
        Linking.openURL('tel:+94812300415');
    };

    const openPhone2Link = () => {
        Linking.openURL('tel:+94812376746');
    };
    return (
        <ScrollView  contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>
                
                <View>
                    <Text style={styles.title}>Details of Office</Text>
                    <Text style={styles.officetitle}>Akurana Office</Text>
                    <View style={styles.mapContainer}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: 7.36629,
                                longitude: 80.617641,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                        >
                            <Marker
                                coordinate={{ latitude: 7.36629, longitude: 80.617641 }}
                                title={"FECT Akurana"}
                                description={"76/2 Matale Road, Akurana, KY 20850, Sri Lanka"}
                            />
                        </MapView>
                    </View>

                    <View style={styles.mapBv}> 
                    <TouchableOpacity onPress={openAkuranaMapsLink} style={styles.mapButton}>
                        <Text style={styles.mapButtonText}>Open in Google Maps</Text>
                    </TouchableOpacity>
                    <View style={styles.address}>
                        <Image source={locationIcon} style={styles.locationicon} />
                        <View >
                            <Text style={styles.add}>FECT, 76/2 Matale Road,</Text>
                            <Text style={styles.add}>Akurana, KY 20850,</Text>
                            <Text style={styles.add}>Sri Lanka.</Text>
                        </View>
                    </View>
                    </View>
                    <Text style={[styles.officetitle,{ marginTop: 30 }]}>Digana Office</Text>
                    <View style={styles.mapContainer}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: 7.295739,
                                longitude: 80.7303169,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                        >
                            <Marker
                                coordinate={{ latitude: 7.295739, longitude: 80.7303169 }}
                                title={"FECT Digana"}
                                description={"Digana Village,, Digana, Sri Lanka"}
                            />
                        </MapView>
                    </View>
                <View style={styles.mapBv}> 
                    <TouchableOpacity onPress={openDiganaMapsLink} style={styles.mapButton}>
                        <Text style={styles.mapButtonText}>Open in Google Maps</Text>
                    </TouchableOpacity>
                


                    <View style={styles.address}>
                        <Image source={locationIcon} style={styles.locationicon} />
                        <View >
                            <Text style={styles.add}>FECT, Digana Village,</Text>
                            <Text style={styles.add}>Digana,</Text>
                            <Text style={styles.add}>Sri Lanka.</Text>
                        </View>
                    </View>
                

                    <Text style={[styles.contactus,{ marginTop: 30, marginBottom: 10 }]}>Email Us</Text>
                    <View style={styles.email}>
                        <Image source={emailIcon} style={styles.emailicon} />
                        <View >
                        <TouchableOpacity onPress={openEmail1Link}>
                            <Text style={[styles.ema,{ marginBottom: 5 }]}>info@fect.lk</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openEmail2Link}>
                            <Text style={styles.ema}>fectsl@gmail.com</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                


                <View style={styles.socialmedia}>
                    <Text style={[styles.socialtext,{marginTop:10}]}>Follow us on social media</Text>
                    <View style={styles.socialicons}>
                        <TouchableOpacity onPress={openFacebookLink}>
                            <Image source={facebookIcon} style={styles.socialicon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openInstagramLink}>
                            <Image source={instagramIcon} style={styles.socialicon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openLinkedinLink}>
                            <Image source={linkedinIcon} style={styles.socialicon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openTwitterLink}>
                            <Image source={twitterIcon} style={styles.socialicon} />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Button to navigate to Frontpage */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Frontpage')}
                >
                    <Text style={styles.buttonText}>Go to Frontpage</Text>
                </TouchableOpacity>
            </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        paddingBottom: 50,
        width: '100%',
        marginBottom: 80,
        marginLeft:5
    },
    title: {
        fontFamily: 'Montserrat-SemiBoldItalic',
        fontSize: 25,
        paddingTop: 3,
        marginBottom:10,
        marginTop:15
    },
    officetitle:{
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        paddingTop: 3
    },
    address: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 5,
        // alignItems: 'center',
        // alignContent: 'center',
        // marginLeft: 15,
        // alignContent: 'flex-start',
        lineHeight: 24,
    },
    
    locationicon: {
        width: 40,
        height: 40,
        
    },
    add: {
        fontSize: 18,
        lineHeight:24,
        // marginRight: 20,
       
    },
    contactus:{
        fontSize: 20,
        paddingTop: 5,
        fontFamily: 'Montserrat-SemiBold',
    },
    phone: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 2,
        alignItems: 'center',
        marginLeft: 15,
        alignContent: 'flex-start'
    },
    phoneicon: {
        width: 40,
        height: 40,
        marginBottom: 10,
        alignItems: 'center',
    },
    pho: {
        fontSize: 18,
        marginLeft: 10
    },
    email: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 2,
        alignItems: 'center',
        marginLeft: 15,
        alignContent: 'flex-start'
    },
    emailicon: {
        width: 40,
        height: 40,
        marginBottom: 10,
        alignItems: 'center',
        paddingTop: 2,
    },
    ema: {
        fontSize: 20,
        marginLeft: 10,
        
    },
    socialmedia: {
        paddingTop: 5,
        alignItems: 'center'

    },
    socialtext: {
        fontFamily: 'Montserrat-SemiBoldItalic',
        fontSize: 20,
    },
    socialicons: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 15,
    },
    socialicon: {
        marginTop: 10,  	
        width: 40,
        height: 40,
        justifyContent: 'center',
        marginRight: 15,

    },
    mapContainer: {
        marginTop: 20,
        height: 200,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    mapButton: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#052035',
        alignContent: 'center',
        borderRadius: 5,
        width: '50%',
        marginBottom:20,
    },
    mapBv: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', 
        
    },
    mapButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#01aac1',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
        width: '80%',
        justifyContent: 'center',
        alignSelf: 'center', // Added to center the button
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center'
    }
   
    
});

export default Contactus;
