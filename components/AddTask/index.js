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
export default AddTask = (props) =>{
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
        fetchUser()
    },[])

    const fetchUser = async () => {
        setLoading(true)
        console.log("loader")
        let userId = await getData()
        console.log(userId)//Fanger userId, gemt i LoginForm
        setSpecificUserId(userId) //Egentlig overflødig, beholdes for nu
        setLoading(false)
        setSpecificUserRef(firebase.database().ref(`user/${userId.replace(/['"]+/g, '')}/liste`)) //Sætter en global userRef til den bruger der er logget ind

    }

    //Her defineres brugeroprettelsesknappen, som aktiverer handleSubmit igennem onPress
    const renderButton = () => {
        return <Button onPress={() => handleAddTask()} title="Tilføj pligt" />;
    };

    const handleConfirm = (date) => {
        setChosenDate(JSON.stringify(new Date(date.setHours(date.getHours()+1)).getTime()))
        setDatePickerVisible(false)
        let dummyDate = new Date()
        dummyDate.setHours(dummyDate.getHours()+1)
        let tidIndtil = chosenDate - dummyDate.getTime()
        console.log("chosenDate " + chosenDate)
        console.log("tidIndtil" + tidIndtil)
        console.log(new Date())


    }

    const handleAddTask = () => {
        console.log(specificUserRef)
        specificUserRef.child(`${titel}`).set({
                'titel': titel,
                'beskrivelse': beskrivelse,
                'tidspunkt': chosenDate
            }
        )
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
