import  React, {useState } from 'react'
import { View, Text, TextInput, Button, Alert, ImageBackground , ScrollView, Pressable} from 'react-native'
import styles from './styles'
import firebase from 'firebase/compat/app'
import auth from 'firebase/compat/auth'
import StylesButton from "../StylesButton";
export default SignUpForm = (props) =>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false) //Note, ved ikke hvad den her skal bruges til. (Hentet fra øvelse 4)
    const [errorMessage, setErrorMessage] = useState(null)

    //Her defineres brugeroprettelsesknappen, som aktiverer handleSubmit igennem onPress
    const renderButton = () => {
        return <Pressable onPress={() => handleSubmit()}  style={[styles.button, {backgroundColor: "#FFF"}]} ><Text style={styles.text}> Opret din konto</Text></Pressable>;
    };

    //Sætter en userRef, da vi gerne vil have en liste over vores brugere, hvor der også kan tilføjes attributter såsom om de er forældre eller børn.
    const userRef = firebase.database().ref("user")

    const handleSubmit = async () => {
        try {

            await firebase.auth().createUserWithEmailAndPassword(email, password).then(async data => {
                const knumber = Math.floor(10000 + Math.random() * 900000)
                await userRef.child(`${data.user.uid}`).set({
                    uid: data.user.uid,
                    key: knumber
                }).then(
                    Alert.alert("Bruger oprettet.")
                )

            })
        } catch(error) {
            setErrorMessage(error.message)
        }
    }

    return (

        <View style={styles.container}>
                <ImageBackground
                    source={require('../../assets/images/good.jpg')}
                    style={styles.image}
                    resizeMode="cover"
                />


            <TextInput
                placeholder="Skrev din email her"
                value={email}
                onChangeText={email => setEmail(email)}
                style={styles.inputField}
                placeholderTextColor='#FFF'
                textAlign='center'
                borderColor="#FFF"
                color="#FFF"
            />
            <TextInput
                placeholder="Skrev dit ønskede kodeord her"
                value={password}
                onChangeText={pw => setPassword(pw)}
                secureTextEntry
                style={styles.inputField}
                placeholderTextColor='#FFF'
                textAlign='center'
                borderColor="#FFF"
                color="#FFF"
            />

            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {renderButton()}



        </View>
    );
};
