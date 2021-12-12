import {Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Keyboard} from "react-native";
import React, {useState, useEffect} from "react";
import styles from './styles'
import Task from './Task'
import firebase from 'firebase/compat/app'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserInterfaceIdiom } from "expo-constants";
import {useNavigation} from "@react-navigation/native"

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

function ToDoList(props) {
    const navigation = useNavigation()
    const [task, setTask] = useState()
    const [taskItems, setTaskItems] = useState([])
    const [loading, setLoading]= useState(true)
    const [specificUserRef, setSpecificUserRef] = useState()

    const [specificUserId, setSpecificUserId] = useState()
    useEffect(() => {//Funktion der henter den nuværende bruger
        fetchUser();
        },[]
    )
    useEffect(async () => { //Funktion der skal hente ToDoList itemsne
        if (typeof specificUserRef !== "undefined") {
            //Inde i denne funktion er vi sikre på, at specificUserId er hentet
            //Herfra kan vi således hente de relevante pligter
            console.log("UE2 " + specificUserId)
            console.log("UE2 " + specificUserRef)

            const test = await specificUserRef.get()
            let liste
            test.forEach(childNodes => {
                childNodes.forEach(childChildNodes => {
                    console.log(childChildNodes.val()["pligt"])
                    setTaskItems(prevTaskItems => [...prevTaskItems, childChildNodes.val()["pligt"]])
                })
            })
        }

    }, [specificUserRef])

    const fetchUser = async () => {
        setLoading(true)
        console.log("loader")
        let userId = await getData() //Fanger userId, gemt i LoginForm
        setSpecificUserId(userId) //Egentlig overflødig, beholdes for nu
        setLoading(false)
        setSpecificUserRef(firebase.database().ref(`user/${userId.replace(/['"]+/g, '')}`)) //Sætter en global userRef til den bruger der er logget ind
  
    }

    const handleAddTask = () => {
        console.log(specificUserRef)
        specificUserRef.child('liste').push({
            'pligt': task
        }
    )
        Keyboard.dismiss();
        setTaskItems([...taskItems, task])
        setTask(null)

    }

    const completeTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy);

    }
    return (
        <View style={styles.container}>
            <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>Today's tasks</Text>

                <View style={styles.items}>
                    {
                        taskItems.map((item, index) => {
                          return (
                              <TouchableOpacity key={index} onPress={()=> completeTask(index)}>

                                  <Task text={item} />
                              </TouchableOpacity>

                          )
                        })
                    }

                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("AddTask")}>
                <View style={styles.addWrapper}>
                    <Text style={styles.addText}>+</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default ToDoList