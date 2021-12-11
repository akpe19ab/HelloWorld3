import React, {useState} from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import firebase from 'firebase/compat/app';

import styles from './styles'


export default ChildLogin = () => {
    const [kode, setKode] = useState();
    const [errorM, setErrorM] = useState();

    const userRef = firebase.database().ref("user")

    const handleSubmit = async () => {
        try {
            const test3 = await userRef.get()
            test3.forEach(function(childNodes){
                if(kode==childNodes.val().key){
                    console.log("NANI")
                    console.log(childNodes)
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