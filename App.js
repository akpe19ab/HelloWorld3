//Der importeres de nøvendige moduler
import React, {useEffect, useRef} from 'react';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import * as Notifications from 'expo-notifications';
import firebase from 'firebase/compat/app';
import registerForPushNotification from "./modules/registerForPushNotification";
import database from 'firebase/compat/database'

//Importerer componenter
import HomeScreen from "./components/HomeScreen";
import ToDoList from "./components/ToDoList";

//Tillader appen at vise push-notifikationer mens den kører
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

//Ignoring warnings
LogBox.ignoreLogs(['Setting a timer'])

//Firebase instillinger
const firebaseConfig = {
  apiKey: "AIzaSyBrjHmQpi_Lu44JprUakJ5fttJ9P3c5NCo",
  authDomain: "opgave3-80853.firebaseapp.com",
  databaseURL: "https://opgave3-80853-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "opgave3-80853",
  storageBucket: "opgave3-80853.appspot.com",
  messagingSenderId: "850548815144",
  appId: "1:850548815144:web:e3b3c9ccf09997e7424c1d"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
const Stack = createNativeStackNavigator();

export default function App() {
  const responseListener = useRef();

  useEffect(() =>  {
    registerForPushNotification().then(token => console.log(`Token i effekt ${token}`)).
    catch(err => console.log(`Der skete en fejl: ${err}`))

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(`Expo token: ${response}`);
    })
  }, [])

  return (
      <NavigationContainer>{
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ToDoList" component={ToDoList} />
        </Stack.Navigator>
      }</NavigationContainer>
  );
}
