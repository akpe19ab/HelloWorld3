import {Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Keyboard, FlatList } from "react-native";
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
    const [specificUserId, setSpecificUserId] = useState()

    useEffect(async () => {//Funktion der henter den nuværende brugers opgaver
        console.log(route.params.parent)
        const uid = route.params.uid
        await firebase.database().ref(`user/${uid}/liste`).on("value", (snapshot => {
            setTaskItemsFull(snapshot.val())
        }))

        /*
        userTaskList.forEach(childNodes => {
            childNodes.forEach(childChildNodes => {
                console.log("flipflop "+childChildNodes.val()["titel"])

                setTaskItemsFull(prevTaskItemsFull => [...prevTaskItemsFull, childChildNodes.val()])
            })
         
        
        
        
        })*/
        },[]
    )
/*
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
                    console.log(childChildNodes.val()["titel"])
                    setTaskItems(prevTaskItems => [...prevTaskItems, childChildNodes.val()["titel"]])
                    setTaskItemsFull(prevTaskItemsFull => [...prevTaskItemsFull, childChildNodes.val()])
                })
            })
        }

    },[specificUserRef])
*/

/*
    const fetchUser = async () => {
        setLoading(true)
        console.log("loader")
        let userId = await getData() //Fanger userId, gemt i LoginForm
        console.log("prutta" + userId)
        setSpecificUserId(userId) //Egentlig overflødig, beholdes for nu
        setLoading(false)
        setSpecificUserRef(firebase.database().ref(`user/${userId.replace(/['"]+/g, '')}`)) //Sætter en global userRef til den bruger der er logget ind
  
    }
*/
    const goToTask = (index) => {

     
        /*Her søger vi direkte i vores array af biler og finder bil objektet som matcher idet vi har tilsendt*/
       let  ItemName = taskItemsFull[index]
       
        navigation.navigate("TaskDetails", {ItemName: ItemName, specificUserId: route.params.uid})
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
            <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>Today's tasks</Text>
                <View style={styles.items}>
                    <FlatList
                        data={taskArray}
                        keyExtractor={(item, index) => taskKeys[index]}
                        renderItem={({ item, index }) => {
                            return(
                                <TouchableOpacity onPress={() => goToTask(taskKeys[index])}>
                                    <Text style={styles.item}>
                                        {item.titel} til {item.tidspunkt.substring(1, 11)} kl. {item.tidspunkt.substring(12, 20)}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
                {/*}
                <View style={styles.items}> // STYLINGEN SKAL NAPPES HERFRA
                    {
                        taskArray.map((item, index) => {
                          return (
                              <TouchableOpacity key={index} onPress={()=> goToTask(index)}>

                                  <Task text={item["titel"]} />
                              </TouchableOpacity>

                          )
                        })
                    }

                </View>*/}
            </View>
            {route.params.parent && (
                <TouchableOpacity onPress={() => navigation.navigate("AddTask", {uid: route.params.uid})}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}

export default ToDoList