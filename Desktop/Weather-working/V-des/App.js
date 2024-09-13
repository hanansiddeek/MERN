import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your screens
import AkuWeathersec from './src/screens/AkuWeathersec';
import DigWeathersec from './src/screens/DigWeathersec';
import NorochWeathersec from './src/screens/NorochWeathersec';
import NachchaduwaWeathersec from './src/screens/NachchaduwaWeathersec';
import NawaWeathersec from './src/screens/NawaWeathersec';
import AlaWeathersec from './src/screens/AlaWeathersec';
import Aboutus from './src/screens/Aboutus';
import Contactus from './src/screens/Contactus';
import Frontpage from './src/screens/Frontpage';
import ErrorBoundary from './src/components/ErrorBoundary';

// Create the Drawer and Stack Navigators
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator for Weather and Frontpage screens
function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Frontpage"
        component={Frontpage}
        options={{ headerShown: false  }}
      />
      <Stack.Screen
        name="Akurana Weather Station"
        component={AkuWeathersec}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Alawathugoda Weather Station"
        component={AlaWeathersec}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Digana Weather Station"
        component={DigWeathersec}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Nachchaduwa Weather Section"
        component={NachchaduwaWeathersec}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Nawalapitiya Weather Station"
        component={NawaWeathersec}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Nuraicholai Weather Station"
        component={NorochWeathersec}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}

// Drawer Navigator for About Us and Contact Us
function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="About Us">
      <Drawer.Screen
        name="About Us"
        component={Aboutus}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name="Contact Us"
        component={Contactus}
        options={{ headerShown: true }}
      />
    </Drawer.Navigator>
  );
}

// function MyTabs() {
//   return (
//     <Tab.Navigator initialRouteName="">
//       <Tab.Screen name="About Us" component={Aboutus} />
//       <Tab.Screen name="Contact Us" component={Contactus} />
//     </Tab.Navigator>
//   );
// }

// Main App Component
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
        {/* Main Structure: StackNavigator is inside the Drawer */}
        <Drawer.Navigator initialRouteName="Weather">
          <Drawer.Screen
            name="Weather"
            component={StackNavigator}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="About Us"
            component={Aboutus}
          />
          <Drawer.Screen
            name="Contact Us"
            component={Contactus}
          />
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
