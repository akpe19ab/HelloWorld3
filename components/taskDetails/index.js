
import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
import firebase from 'firebase/compat/app';
import {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
const getData = async () => {
    try {
        const value = AsyncStorage.getItem('@uid')
        if(value !== null) {
            return value
        }
    } catch(e) {
        // error reading value
    }
}


const CarDetails = ({route,navigation}) => {

    const [loading, setLoading]= useState(true)
    const [specificUserId, setSpecificUserId] = useState()
    const [specificUserRef, setSpecificUserRef] = useState()

    const [car,setCar] = useState({});
    useEffect(() => {//Funktion der henter den nuværende bruger
            fetchUser();
        },[]
    )
    useEffect(() => {
        /*Henter car values og sætter dem*/
        setCar(route.params.ItemName);

        /*Når vi forlader screen, tøm object*/
        return () => {
            setCar({})
        }
    });
    const fetchUser = async () => {
        setLoading(true)
        console.log("Task Details loader")
        let userId = await getData() //Fanger userId, gemt i LoginForm
        console.log("Task Details " + userId)
        setSpecificUserId(userId) //Egentlig overflødig, beholdes for nu
        setLoading(false)
        setSpecificUserRef(firebase.database().ref(`user/${userId.replace(/['"]+/g, '')}`))
    }
    const handleEdit = () => {
        // Vi navigerer videre til EditCar skærmen og sender bilen videre med
        const car = route.params.car
        navigation.navigate('Edit Car', { car });
    };

    // Vi spørger brugeren om han er sikker
    const confirmDelete = () => {
        /*Er det mobile?*/
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Are you sure?', 'Do you want to delete the car?', [
                { text: 'Cancel', style: 'cancel' },
                // Vi bruger this.handleDelete som eventHandler til onPress
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };

    // Vi sletter den aktuelle bil
    const  handleDelete = () => {
        const id = route.params.ItemName["titel"];
        console.log("test")
       console.log(id)

        try {
            specificUserRef.child(`liste/${id}`).remove()

            // Og går tilbage når det er udført
            navigation.goBack();
        } catch (error) {
            Alert.alert(error.message);
        }
    };


    if (!car) {
        return <Text>No data</Text>;
    }

    //all content
    return (

        <View style={styles.container}>
            <Button title="Edit" onPress={ () => handleEdit()} />
            <Button title="Delete" onPress={() => confirmDelete()} />
            {
                Object.entries(car).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            {/*Vores car keys navn*/}
                            <Text style={styles.label}>{item[0]} </Text>
                            {/*Vores car values navne */}
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

export default CarDetails;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
});