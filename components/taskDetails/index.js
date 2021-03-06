
import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert, ImageBackground } from 'react-native';
import firebase from 'firebase/compat/app';
import {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles'
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

    const [task,setTask] = useState({});

    useEffect(() => {
        /*Henter car values og sætter dem*/
        setTask(route.params.ItemName);
    });

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

    // Vi sletter den aktuelle opgave
    const  handleDelete = () => {
        const id = route.params.ItemName["titel"];
        console.log("test")
       console.log(id)

        try {
            firebase.database().ref(`user/${route.params.specificUserId}`).child(`liste/${id}`).remove()

            // Og går tilbage når det er udført
            navigation.goBack();
        } catch (error) {
            Alert.alert(error.message);
        }
    };


    if (!task) {
        return <Text>No data</Text>;
    }

    //all content
    return (

            <View style={styles.container}>
                <ImageBackground
                    source={require('../../assets/images/good.jpg')}
                    style={styles.image}
                    resizeMode="cover"
                />

                {route.params.parent && (<Button title={"Tryk her for at slette opgaven"} color="003b4f" onPress={() => confirmDelete()} />)}
            {
                Object.entries(task).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            {}
                            <Text style={styles.label}>{item[0]} </Text>
                            {}
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

export default CarDetails;

