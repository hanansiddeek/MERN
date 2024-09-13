import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Aboutus = () => {
    const navigation = useNavigation();

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.h1}>We’re FECT, a non-profit organization with a rich history</Text>

                <View style={styles.pcontainer}>
                    {/* Your existing content here */}
                </View>

                <View style={styles.vm}>
                    <Text style={styles.vmTitle}>Mission</Text>
                    <Text style={styles.vmContent}>To sustain a think tank and center of excellence in climate, environment
                        and information technologies with quality research to address societal concerns and ecological protection
                    </Text>

                    <Text style={styles.vmTitle}>Vision</Text>
                    <Text style={styles.vmContent}>Our vision is to sustain FECT as a center of excellence in climate, environmental,
                        information technologies and related areas where state of the art research is pursued; technological capability is
                        advanced and disseminated and where all of this is combined to execute socially valued projects
                    </Text>

                    <Text style={styles.vmTitle}>Values</Text>
                    <Text style={styles.vmContent}>Support societal welfare and prioritize the vulnerable, maintain credibility of
                        research, maintain institutional technological capabilities, free dissemination of knowledge, maintain a culture
                        of valuing, non-discriminatory treatment, proactively engage with the most-motivated and most-giving, supporting
                        and engaging with staff for developing competencies, team-work and reaching their potential
                    </Text>
                </View>

                {/* Button to navigate to Frontpage */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Frontpage')}
                >
                    <Text style={styles.buttonText}>Go to Frontpage</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        paddingBottom: 50,
        width: '94%',
        marginBottom: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    },
    h1: {
        fontSize: 28,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
        width: '100%',
        color: '#052035',
        paddingTop: 3,
        marginTop: 10
    },
    p: {
        fontFamily: 'Montserrat-Regular',
        textAlign: 'justify',
        paddingTop: 3,
        fontSize: 14
    },
    vm: {
        paddingTop: 3,
    },
    vmTitle: {
        fontFamily: 'Montserrat-Bold',
        textAlign: 'justify',
        paddingTop: 3,
        fontSize: 20,
        color: '#01aac1',
        marginBottom: 10
    },
    vmContent: {
        fontFamily: 'Montserrat-Regular',
        textAlign: 'justify',
        paddingTop: 2,
        fontSize: 16,
        marginBottom: 20
    },
    button: {
        backgroundColor: '#01aac1',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 30,
        alignItems: 'center',
        width: '80%'
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center'
    }
});

export default Aboutus;
