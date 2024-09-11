import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import axios from 'axios';
import precipitationIcon from '../icons/precipitation.png'
import humidityIcon from '../icons/humidity.png'
import windIcon from '../icons/wind.png'
import pressureIcon from '../icons/pressure.png'
import sunriseIcon from '../icons/sunrise.png'
import sunsetIcon from '../icons/sunset.png'
import temperatureIcon from '../icons/temperature.png'
import io from 'socket.io-client';
import { useNavigation } from '@react-navigation/native';


const Aboutus = () => {
    const navigation = useNavigation();
    return (
        <ScrollView>
            <View style={styles.container}>
                
                <Text style={styles.h1}>We’re FECT, a non-profit organization with a rich history</Text>
                <View style={styles.pcontainer}>
                    {/*<Text style={styles.p}>
                        The Federation for Environment, Climate, and Technology (FECT)
                        is dedicated to developing usable social scientific, and technological
                        data for societal well-being and environmental preservation.  FECT brings
                        together 20 scientists whose activities cover some of the Indian Ocean Islands
                        and its littoral. We began researching and developing of climate and environmental
                        analysis, computation, monitoring, and prediction technologies in Sri Lanka.
                    </Text>
                    <Text style={styles.p}>
                        Our work in Sri Lanka has been going on without a break for a quarter-century.
                        FECT’s contributions to sustainable development and climate change adaptation are
                        underpinned by our expertise in climate, hydrology, adaptability, information technology,
                        social sciences, and engineering. Our efforts focus on developing practical scientific and
                        technological knowledge for risk management in areas such as water resources, disasters,
                        agriculture, energy, the environment, and public health. Our charter mandates that we develop
                        local capabilities for the greater societal and environmental good rather than for private profit.
                        We have partnered with 40 government organizations, research institutes, colleges, and universities.
                        We work with the private sector, civil society, and vulnerable communities.
                    </Text>
                    <Text style={styles.p}>
                        Since 2008, FECT has been working in the Maldives and FECT-Maldives was established.
                        We have started operations or analytical work in other Indian Ocean Islands namely Comoros,
                        Chagos, and Zanzibar. We also undertook specific work in countries bordering the Indian Ocean
                        such as India, Tanzania, Thailand, and Botswana. We have undertaken over 30 projects which were
                        externally funded by International Science and Development organizations.  100+ emerging scientists,
                        IT, and administrative personnel have got exposure and training at FECT which they have valued.
                    </Text> */}
                    {/* <Text style={styles.p}>
                    <Text style={styles.p1}>Project Work:</Text> We have demonstrated the use of hydro-climatic information with projects for water
                    resources management, human-elephant conflict, plantation and food crop agriculture, malaria and
                    dengue risk assessment and disaster risk management.
                </Text>
                <Text style={styles.p}>
                    <Text style={styles.p1}>Climate, Hydrological and Environmental Research and Application:</Text> We have undertaken climatic
                    diagnostics, climate prediction, hydro-climatic analysis, modeling, prediction, and climate change assessments.
                    We continue to build a state-of-the-art hydrometeorological monitoring and prediction system.
                </Text>
                <Text style={styles.p}>
                    <Text style={styles.p1}>Climate, Hydrological and Environmental Research and Application:</Text> We have undertaken climatic
                    diagnostics, climate prediction, hydro-climatic analysis, modeling, prediction, and climate change assessments.
                    We continue to build a state-of-the-art hydrometeorological monitoring and prediction system.
                </Text>
                <Text style={styles.p}>
                    <Text style={styles.p1}>Societal and Legal Research:</Text> Our staff have undertaken research on impacts related to vulnerabilities
                    of communities and societies, on valuation of climate impacts on sectors, and its role in the economy and local regions.
                    They have undertaken legal research on environmental and on non-profit sector regulations and laws.
                </Text>

                <Text style={styles.p}>
                    <Text style={styles.p1}>Information Technology:</Text> We have undertaken IT infrastructure development, website development,
                    interactive map servers and software development for scientific computation. We are developing high-performance
                    computing and web services.
                </Text>

                <Text style={styles.p}>
                    <Text style={styles.p1}>In-Service Training:</Text> Our staff has obtained on the job training. Sixty persons have been employed
                    full-time and part-time over the last two decades. They have been engaged in Research, IT, administrative services,
                    publishing, communication and advocacy. Twelve of them have obtained post-graduate degrees and five have obtained
                    undergraduate degrees. They’ve also attended training programs all over the world and obtained training at local and
                    international forums. Twelve are currently pursuing higher education after leaving FECT.
                </Text >

                <Text style={styles.p}>
                    <Text style={styles.p1}>Education:</Text> We partnered with the University of Peradeniya to launch a Masters in Sustainable
                    Development Practice. We partnered formally with Maldivian Zonal Education authorities on implementing a program
                    to use our work in Secondary school education. Informally, we contribute to various school programs.
                </Text>

                <Text style={styles.p}>
                    <Text style={styles.p1}>Publishing:</Text> We have published in newspapers, scientific journals, magazines, Internet, posters, newsletters and books.
                </Text> */}

                </View>
                <View style={styles.vm}>
                    <Text style={styles.vmTitle}>Mission</Text>
                    <Text style={styles.vmContent}>To sustain a think tank and center of excellence in climate, environment
                        and information technologies with quality research to address societal concerns and ecological protection</Text>
                    <Text style={styles.vmTitle}>Vision</Text>
                    <Text style={styles.vmContent}>Our vision is to sustain FECT as a center of excellence in climate, environmental,
                        information technologies and related areas where state of the art research is pursued; technological capability is
                        advanced and disseminated and where all of this is combined to execute socially valued projects</Text>
                    <Text style={styles.vmTitle}>Values</Text>
                    <Text style={styles.vmContent}>Support societal welfare and prioritize the vulnerable, maintain credibility of
                        research, maintain institutional technological capabilities, free dissemination of knowledge, maintain a culture
                        of valuing, non-discriminatory treatment,  proactively engage with the most-motivated and most-giving, supporting
                        and engaging with staff for developing competencies, team-work and reaching their potential</Text>
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
        width: '94%',
        marginBottom: 80,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:10
        
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

});

export default Aboutus;
