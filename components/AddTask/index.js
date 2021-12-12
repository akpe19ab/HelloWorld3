import React,{useState, useEffect} from "react"
import styles from './styles'
import firebase from 'firebase/compat/app'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import { View, Text, TextInput, Button, Alert } from 'react-native'

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
    const [speficicUserRef, setSpecificUserRef] = useState("")

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
        setSpecificUserRef(firebase.database().ref(`user/${userId.replace(/['"]+/g, '')}`)) //Sætter en global userRef til den bruger der er logget ind

    }



    //Her defineres brugeroprettelsesknappen, som aktiverer handleSubmit igennem onPress
    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Log in" />;
    };

    //Sætter en userRef, da vi gerne vil have en liste over vores brugere, hvor der også kan tilføjes attributter såsom om de er forældre eller børn.
    const userRef = firebase.database().ref("user")

    const handleSubmit = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password).then(async data => {await storeData(JSON.stringify(data.user.uid)).then(nav.navigate("AppScreen"))}) //Skal ske efter error er fanget, for at undgå at man bliver smidt videre uden at være logget ind
        } catch(error) {
            setErrorMessage(error.message)
        }
    }

    return (
        <View>
            <Text>Titel</Text>
            <TextInput
                placeholder="titel"
                value={titel}
                onChangeText={titel => setTitel(titel)}
                style={styles.inputField}
            />
            <Text>Beskrivelse</Text>
            <TextInput
                placeholder="Beskrivelse"
                value={beskrivelse}
                onChangeText={beskrivelse => setBeskrivelse(beskrivelse)}
                style={styles.inputField}
            />
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {renderButton()}
        </View>
    );
};
