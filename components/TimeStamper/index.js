import * as React from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import firebase from 'firebase/compat/app';
import database from 'firebase/compat/database'
import {useEffect, useState} from 'react';

export default TimeStamper = (props) => {

    //Sætter en default ref i countdown
    //Senere forestiller jeg mig, at referencen er brugerens egne notes/pligter, så det ikke er en stor liste, men baseret på brugeren
    //Dette vil muliggøre brugen af ref.on("value", callback()) Så man kan håndtere den timer der sættes.
    const countdownRef = firebase.database().ref("countdown");

    const handlePress = (e) => {
        
        //Skubber en ny timer op i firebase databasen.
        countdownRef.push({
            startAt: firebase.database.ServerValue.TIMESTAMP,
            seconds: 20,
        });
        console.log("countdown")

    }
    
    return (
        <View>
            <Button title="Save Time" onPress={handlePress}/>
        </View>
    )
}
