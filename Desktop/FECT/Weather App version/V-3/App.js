import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator, creatStackNavigator} from '@react-navigation/stack';

// Import your screens
import AkuWeathersec from './src/screens/AkuWeathersec';
import DigWeathersec from './src/screens/DigWeathersec';
import NorochWeathersec from './src/screens/NorochWeathersec';
import NachchaduwaWeathersec from './src/screens/NachchaduwaWeathersec';
import NawaWeathersec from './src/screens/NawaWeathersec';
import AlaWeathersec from './src/screens/AlaWeathersec';
import Aboutus from './src/screens/Aboutus';
import Contactus from './src/screens/Contactus';
import DigDashboard from './src/componentstest/DigDashboard';
import NachchaduwaDashboard from './src/componentstest/NachchaduwaDashboard';
import NawaDashboard from './src/componentstest/NawaDashboard';
import NorochDashboard from './src/componentstest/NorochDashboard';
import Frontpage from './src/screens/Frontpage';
import ErrorBoundary from './src/components/ErrorBoundary';

// Create the Drawer Navigator
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBoldItalic': require('./assets/fonts/Montserrat-SemiBoldItalic.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Optionally, show a loading indicator while fonts are loading
  }

  return (
    <NavigationContainer>
      <ErrorBoundary>
        <Drawer.Navigator initialRouteName="Frontpage">
          {/* Frontpage screen with hidden header */}
          <Drawer.Screen
            name="FECT Weather Application"
            component={Frontpage}
            options={{ headerShown: true }} // Home
          />
          <Drawer.Screen
            name="Akurana Weather Station"
            component={AkuWeathersec}
            options={{ headerShown: true }} //Akurane Station
          />
          <Drawer.Screen
            name="Alawathugoda  Weather Station"
            component={AlaWeathersec}
            options={{ headerShown: true }} 
          />
           <Drawer.Screen
            name="Digana Weather Station"
            component={DigWeathersec}
            options={{ headerShown: true }} 
          />
          <Drawer.Screen name="Nachchaduwa Weather Section" component={NachchaduwaWeathersec} />
          <Drawer.Screen
            name="Nawalapitiya Weather Station"
            component={NawaWeathersec}
            options={{ headerShown: true }} 
          />
          <Drawer.Screen
            name="Nuraicholai Weather Station"
            component={NorochWeathersec}
            options={{ headerShown: true }} 
          />
          
          <Drawer.Screen name="About Us" component={Aboutus} />
          <Drawer.Screen name="Contact Us" component={Contactus} />
        </Drawer.Navigator>
        
      </ErrorBoundary>
      <StatusBar style="auto" />
    </NavigationContainer>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01AAC11A',
    alignItems: 'center',
    justifyContent: 'center',
  
  },
});
