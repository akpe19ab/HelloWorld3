import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useRef} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Alert, LogBox, ScrollView, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import * as Notifications from 'expo-notifications';
import firebase from 'firebase/compat/app';
import database from 'firebase/compat/database'

//Tillader appen at vise push-notifikationer mens den kører
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


//Importerer komponenter
import TimeStamper from './components/TimeStamper';
import CarItem from './components/CarItem';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';

//Ignoring warnings
LogBox.ignoreLogs(['Setting a timer'])

const firebaseConfig = {
  apiKey: "AIzaSyBrjHmQpi_Lu44JprUakJ5fttJ9P3c5NCo",
  authDomain: "opgave3-80853.firebaseapp.com",
  databaseURL: "https://opgave3-80853-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "opgave3-80853",
  storageBucket: "opgave3-80853.appspot.com",
  messagingSenderId: "850548815144",
  appId: "1:850548815144:web:e3b3c9ccf09997e7424c1d"
};
function HomeScreen({navigation}) {
  return (
      <View>
        <ScrollView>
          <CarItem name={"Børnenes huskeliste"}
                   tagline={"Opret en konto"}
                   image={require("./assets/images/child2.jpeg")}
                   taglineCta={"nu"}/>
                   <Button title="Go to Details" onPress={() => navigation.navigate('Details')}></Button>
          <TimeStamper/>
          <StatusBar style="auto" />
          <SignUpForm parent={true}/>
          <LoginForm/>
        </ScrollView>
      </View>
  );
}
function DetailsScreen() {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
  );
}
const Stack = createNativeStackNavigator();
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}



export default function App() {
  const responseListener = useRef();

  useEffect(() =>  {
    registerForPushNotification().then(token => console.log(`Token i effekt ${token}`)).
    catch(err => console.log(`Der skete en fejl: ${err}`))

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(`Expo token: ${response}`);
    })
  }, [])

  async function registerForPushNotification() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(`token i funktion ${token}`);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }


  return (
      <NavigationContainer>{
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>

      }</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
