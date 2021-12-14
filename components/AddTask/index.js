import React,{useState, useEffect} from "react"
import styles from './styles'
import firebase from 'firebase/compat/app'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default AddTask = ({route, navigation}) =>{
    const [titel, setTitel] = useState('')
    const [beskrivelse, setBeskrivelse] = useState('')
    const [isCompleted, setCompleted] = useState(false) //Note, ved ikke hvad den her skal bruges til. (Hentet fra øvelse 4)
    const [errorMessage, setErrorMessage] = useState(null)
    const [opdaterer, setOpdaterer] = useState(false)
    const [specificUserId, setSpecificUserId] = useState("")
    const [specificUserRef, setSpecificUserRef] = useState("")
    const [isDatePickerVisisble, setDatePickerVisible] = useState(false)
    const [chosenDate, setChosenDate] = useState()

    //Her defineres brugeroprettelsesknappen, som aktiverer handleSubmit igennem onPress
    const renderButton = () => {
        return <Button onPress={() => handleAddTask()} title="Tilføj pligt" />;
    };

    useEffect(() => {
        if(chosenDate) {
            Alert.alert("DATO VALGT")
            console.log("ADDTASK CHOSENDATE USEEFFECT GETTIME")
            console.log(chosenDate.getTime() - new Date().getTime())
        }
        
    }, [chosenDate])


    const handleConfirm = (date) => { //Skal arbejdes med¨
        setChosenDate(new Date(date.setHours(date.getHours()+1)))
        setDatePickerVisible(false)

        let dummyDate = new Date()
        dummyDate.setHours(dummyDate.getHours()+1)

    }

    const handleAddTask = async () => { //Her tilføjes et fetch-kald til ekstern server, der holder timersne
        let task = {
            'titel': titel,
            'beskrivelse:': beskrivelse,
            'tidspunkt': JSON.stringify(chosenDate)
        }
        const uid = route.params.uid
        console.log("ADDTASK HANDLEADDTASK DATE")
        console.log(chosenDate)
        await firebase.database().ref(`user/${uid}`).child(`liste/${titel}`).set(task).then(async () => {
            await fetch('https://clever-swan-79.loca.lt/postTimer', {
                method: "POST",
                header: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid: uid,
                    task: task,
                    tidIndtil: chosenDate.getTime() - new Date().getTime()
                })
            }).then((response) => {
                navigation.goBack();
            })
        })
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
