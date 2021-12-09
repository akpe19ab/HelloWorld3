import React, {useState} from 'react';
import {
    SafeAreaView, StyleSheet, View, Text, TouchableOpacity
} from "react-native";

import DeviceInfo, {getDeviceId} from "react-native-device-info";


const App = () => {
    const [deviceId, setdeviceId] = useState('Click below to get unique Id');

    const getDeviceId = () => {
     var uniqueId = DeviceInfo.getUniqueId();
     setdeviceId(uniqueId);
    }



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.container}>
                    React Native Get Unique ID of Device
                </Text>
                <Text style={styles.textStyle}>
                    {deviceId}

                </Text>
                /* Denne linje bør være "styles.buttonStyle" men det kan den ikke finde?*/
                <TouchableOpacity
                    onPress={getDeviceId}
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                        Show me the unique ID of device
                    </Text>
                <TouchableOpacity/>
            </View>
        <SafeAreaView/>
            );
};

 const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
    },
    buttonStyle: {
        padding: 10,
        backgroundColor: 'blue',
    },
    buttonTextStyle: {
        color:'#fff',
        textAlign: 'center',
        fontSize: 20
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 10,
        padding: 20,
        color: '#f00'}
        }
    });

    export default App;



