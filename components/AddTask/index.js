import React,{useState, useEffect} from "react"
import styles from './styles'
import firebase from 'firebase/compat/app'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

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
export default AddTask = ({route, navigation}) =>{
    const nav = useNavigation()
    const [titel, setTitel] = useState('')
    const [beskrivelse, setBeskrivelse] = useState('')
    const [isCompleted, setCompleted] = useState(false) //Note, ved ikke hvad den her skal bruges til. (Hentet fra øvelse 4)
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(true)
    const [specificUserId, setSpecificUserId] = useState("")
    const [specificUserRef, setSpecificUserRef] = useState("")
    const [isDatePickerVisisble, setDatePickerVisible] = useState(false)
    const [chosenDate, setChosenDate] = useState()

    useEffect(()=>{
        return () => {
            setChosenDate({})
        }
    },[])

    //Her defineres brugeroprettelsesknappen, som aktiverer handleSubmit igennem onPress
    const renderButton = () => {
        return <Button onPress={() => handleAddTask()} title="Tilføj pligt" />;
    };
    const dateSetter = (date) => {
        setChosenDate(JSON.stringify(new Date(date.setHours(date.getHours()+1))))
    }

    const handleConfirm = async (date) => { //Skal arbejdes med
        await dateSetter(date)
        console.log(chosenDate)
        setDatePickerVisible(false)
        Alert.alert("Dato sat")
        let dummyDate = new Date()
        dummyDate.setHours(dummyDate.getHours()+1)
        console.log(chosenDate)



    }

    const handleAddTask = async () => { //Her tilføjes et fetch-kald til ekstern server, der holder timersne
        const uid = route.params.uid
        await firebase.database().ref(`user/${uid}`).child(`liste/${titel}`).set({
            'titel': titel,
            'beskrivelse': beskrivelse,
            'tidspunkt': chosenDate
        }).then(nav.goBack())
    }

    return (
        <View>
            <Text>Titel</Text>
            <TextInput
                placeholder="titel"
                value={titel}
                onChangeText={titel => setTitel(titel)}
                style={styles.inputField}
                mode={'datetime'}
                is24Hour={true}
            />
            <Text>Beskrivelse</Text>
            <TextInput
                placeholder="Beskrivelse"
                value={beskrivelse}
                onChangeText={beskrivelse => setBeskrivelse(beskrivelse)}
                style={styles.inputField}
            />
            {chosenDate && (
                <View>
                    <Text>Den valgte dato er:</Text>
                    <Text>{JSON.stringify(chosenDate)}</Text>
                </View>
                
            )}
            <Button title={"Vælg dato"} onPress={() => setDatePickerVisible(true)}/>
            <DateTimePickerModal
                isVisible={isDatePickerVisisble}
                timeZoneOffsetInMinutes={60}
                is24Hour={true}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisible(false)}
            />

            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {renderButton()}
        </View>
    );
}
