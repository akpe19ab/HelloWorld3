import {Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Keyboard, FlatList, ScrollView } from "react-native";
import React, {useState, useEffect} from "react";
import styles from './styles'
import Task from './Task'
import firebase from 'firebase/compat/app'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserInterfaceIdiom } from "expo-constants";
import {useNavigation} from "@react-navigation/native"

function ToDoList({route, navigation}) {
    const nav = useNavigation()
    const [task, setTask] = useState()
    const [taskItems, setTaskItems] = useState([])
    const [taskItemsFull, setTaskItemsFull] = useState([])
    const [loading, setLoading]= useState(true)
    const [specificUserRef, setSpecificUserRef] = useState()
    const [value, setValue] = useState(0);
    const [childKey, setChildKey] = useState()

    useEffect(async () => {//Funktion der henter den nuværende brugers opgaver og børnekode
        console.log(route.params.parent)
        const uid = route.params.uid
        await firebase.database().ref(`user/${uid}/key`).on("value", (snapshot) => {
            setChildKey(snapshot.val())
        })

        await firebase.database().ref(`user/${uid}/liste`).on("value", (snapshot => {
            setTaskItemsFull(snapshot.val())
        }))
        },[]
    )

    const goToTask = (index) => {

     
        /*Her søger vi direkte i vores array af biler og finder bil objektet som matcher idet vi har tilsendt*/
       let  ItemName = taskItemsFull[index]
       
        navigation.navigate("TaskDetails", {ItemName: ItemName, specificUserId: route.params.uid, parent: route.params.parent})
    };

    let taskArray
    let taskKeys
    if (taskItemsFull) {
        taskArray = Object.values(taskItemsFull)
        taskKeys = Object.keys(taskItemsFull)
    }
    console.log("TASK KEYS")
    console.log(taskKeys)
    console.log("TASK KEYS SLUT")

    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.tasksWrapper}>

                <View style={styles.items}>
                    {childKey && route.params.parent && (<Text style={styles.item2}>Dit barns kodeord er: {childKey}</Text>)}
                    <FlatList
                        data={taskArray}
                        keyExtractor={(item, index) => taskKeys[index]}
                        renderItem={({ item, index }) => {
                            return(
                                <TouchableOpacity onPress={() => goToTask(taskKeys[index])}>
                                    <Text style={styles.item}>
                                        {item.titel} til {item.tidspunkt.substring(1, 11)} kl. {item.tidspunkt.substring(12, 17)}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>
            {route.params.parent && (
                <TouchableOpacity onPress={() => navigation.navigate("AddTask", {uid: route.params.uid})}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>Tryk her for at tilføje en ny opgave</Text>
                    </View>
                </TouchableOpacity>
            )}
                </ScrollView>
        </View>
    );
}

export default ToDoList