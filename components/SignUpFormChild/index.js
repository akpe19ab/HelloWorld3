import  React, { useEffect, useState } from 'react'
import { View, Text, Pressable, TextInput, Button, Alert } from 'react-native'
import styles from './styles'

import firebase from 'firebase/compat/app'
import auth from 'firebase/compat/auth'


export default SignUpFormChild = (props) =>{

    const child = props.child

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false) //Note, ved ikke hvad den her skal bruges til. (Hentet fra øvelse 4)
    const [errorMessage, setErrorMessage] = useState(null)

    //Her defineres brugeroprettelsesknappen, som aktiverer handleSubmit igennem onPress
    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Opret børn" />;
    };

    //Sætter en userRef, da vi gerne vil have en liste over vores brugere, hvor der også kan tilføjes attributter såsom om de er forældre eller børn.
    const childRef = firebase.database().ref("child")


    const handleSubmit = async () => {

        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password).then(async data => {
                await childRef.push({
                    uid: data.child.uid,
                    actor: child
                }).then(ref => console.log(`RT_DB reference: ${JSON.stringify(ref).slice(75)}`)) //Virker ikke helt endnu, men i princippet kan man arbejde med brugerens reference i RT_databasen
                Alert.alert("Oprettet")
            })
        } catch(error) {
            setErrorMessage(error.message)
        }
    }

    return (
        <View>
            <Text>Opret dig som {child ? "barn" : "forældre"}</Text>
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
