import React, {useState, useEffect} from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import firebase from 'firebase/compat/app';
import registerForPushNotification from '../../modules/registerForPushNotification';

import styles from './styles'
import { setAutoServerRegistrationEnabledAsync } from 'expo-notifications';


export default ChildLogin = ({navigation}) => {
    const [kode, setKode] = useState();
    const [errorM, setErrorM] = useState();
    const [token, setToken] = useState();
    const [targetParent, setTargetParent] = useState();

    const userRef = firebase.database().ref("user")

    useEffect(() => { //useEffect der lader barn logge ind, så snart det er tjekket om token er oprettet.
        if(token) {
            console.log("CHILDLOGIN USEEFFECT TOKEN ")
            console.log(token)
            console.log("token slut")
            console.log(targetParent)
            console.log("TARGET PARENT SLUT")
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
        return <Button title={"Login"} onPress={handleSubmit}/>
    }

    return (
        <View>
            <Text>Login</Text>
            <TextInput
                placeholder="kode"
                value={kode}
                onChangeText={kode => setKode(kode)}
                style={styles.inputField}
            />
            {errorM && (
                <Text style={styles.error}>Error: {errorM}</Text>
            )}
            {renderButton()}
        </View>
    )
}