//Der importeres de nøvendige moduler
import React, {useEffect, useRef} from 'react';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import * as Notifications from 'expo-notifications';
import firebase from 'firebase/compat/app';
import database from 'firebase/compat/database'
import registerForPushNotification from "./modules/registerForPushNotification";
import AsyncStorage from '@react-native-async-storage/async-storage';

//Importerer komponenter til navigation
import HomeScreen from './components/HomeScreen'
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import ToDoList from './components/ToDoList';
import AppScreen from './components/AppScreen';
import ChildLogin from './components/ChildLogin';
import taskDetails from "./components/taskDetails";
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


export default function App() {
  const Stack = createNativeStackNavigator();
  const responseListener = useRef();

  useEffect(() =>  {
    registerForPushNotification().then(token => console.log(`Token i effekt ${token}`)).
    catch(err => console.log(`Der skete en fejl: ${err}`))

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(`Expo token: ${response}`);
    })
  }, [])
  //NOTE OM NAVIGATION.
  //INDTIL VIDERE KAN VI NAVIGERE DIREKTE TIL TODOLIST. NÅR TESTING ER FÆRDIGT MED DENNE FORESLÅR JEG, AT DER I STEDET
  //LAVES EN STACK.SCREEN DER LEDER EN VIDERE TIL EN KOMPONENT APPCONTENT, DER SÅ INDEHOLDER EN TAB.NAVIGATOR HVORI TODOLIST LIGGER.
  //ToDoList KAN SAGTENS VÆRE INITIAL ROUTE
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
      >
        <Stack.Screen name="taskDetails" component={taskDetails}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="SignUpForm" component={SignUpForm}/>
        <Stack.Screen name="ChildLogin" component={ChildLogin}/>
        <Stack.Screen name="LoginForm" component={LoginForm}/>
        <Stack.Screen name="AppScreen" component={AppScreen}/>
        <Stack.Screen name="ToDoList" component={ToDoList}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
