import React, {useState, useEffect} from 'react';
import { View, Text, Button, TextInput, ImageBackground, Pressable} from 'react-native';
import firebase from 'firebase/compat/app';
import registerForPushNotification from '../../modules/registerForPushNotification';

import styles from './styles'
import { setAutoServerRegistrationEnabledAsync } from 'expo-notifications';


export default ChildLogin = ({navigation}) => {
    const [kode, setKode] = useState('404073');
    const [errorM, setErrorM] = useState();
    const [token, setToken] = useState();
    const [targetParent, setTargetParent] = useState();

    const userRef = firebase.database().ref("user")

    useEffect(() => { //useEffect der lader barn logge ind, så snart det er tjekket om token er oprettet.
        if(token) {
            navigation.navigate("AppScreen", {
                screen: "ToDoList",
                params: {uid: targetParent["uid"], parent: false}
            })
        }  
    }, [token])

    const handleSubmit = async () => {
        try {
            const test3 = await userRef.get()
            test3.forEach(function(childNodes) {
                if(kode==childNodes.val().key){
                    console.log("childlogin fundet")
                    let user = childNodes.val()
                    setTargetParent(user)
                    userRef.child(`${user["uid"]}/token`).once("value").then(function(snapshot) {
                        console.log(snapshot.exists())
                        if (snapshot.exists()) {
                            setToken(true)
                        } else {
                            registerForPushNotification().then(token => userRef.child(`${user["uid"]}/token`).set(
                                {token: token}
                                ))
                            setToken(true)
                        }
                    })


                }

            });

        } catch(e) {
            setErrorM(e)
        }
        
    }

    const renderButton = () => {
        return <Pressable onPress={() => handleSubmit()}  style={[styles.button, {backgroundColor: "#FFF"}]} ><Text style={styles.text}> Login </Text></Pressable>;
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/good.jpg')}
                style={styles.image}
                resizeMode="cover"
            />


            <TextInput
                placeholder="Indsæt koden, som du fik fra dine forældre"
                value={kode}
                onChangeText={kode => setKode(kode)}
                style={styles.inputField}
                placeholderTextColor='#FFF'
                textAlign='center'
                borderColor="#FFF"
                color="#FFF"
            />
            {errorM && (
                <Text style={styles.error}>Error: {errorM}</Text>
            )}

            {renderButton()}
        </View>
    )
}