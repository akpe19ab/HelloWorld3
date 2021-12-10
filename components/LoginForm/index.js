import  React, {useState } from 'react'
import { View, Text, TextInput, Button, Alert } from 'react-native'
import styles from './styles'
import firebase from 'firebase/compat/app'
import AsyncStorage from '@react-native-async-storage/async-storage';
const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('@uid', value)
        console.log(getData())
        console.log(value)

    } catch (e) {
        // saving error
    }
}

const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@uid')
        if(value !== null) {
           console.log(value)
        }
    } catch(e) {
        // error reading value
    }
}

export default SignUpForm = (props) =>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false) //Note, ved ikke hvad den her skal bruges til. (Hentet fra øvelse 4)
    const [errorMessage, setErrorMessage] = useState(null)

    //Her defineres brugeroprettelsesknappen, som aktiverer handleSubmit igennem onPress
    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Log in" />;
    };

    //Sætter en userRef, da vi gerne vil have en liste over vores brugere, hvor der også kan tilføjes attributter såsom om de er forældre eller børn.
    const userRef = firebase.database().ref("user")

    const handleSubmit = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password).then(data => {storeData(JSON.stringify(data.user.uid))})
        } catch(error) {
            setErrorMessage(error.message)
        } 
    }

    return (
        <View>
            <Text>Login</Text>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={email => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="Kodeord"
                value={password}
                onChangeText={pw => setPassword(pw)}
                secureTextEntry
                style={styles.inputField}
            />
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {renderButton()}
        </View>
    );
};
