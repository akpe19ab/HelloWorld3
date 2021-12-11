import {Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Keyboard} from "react-native";
import React, {useState, useEffect} from "react";
import styles from './styles'
import Task from './Task'
import firebase from 'firebase/compat/app'
import AsyncStorage from '@react-native-async-storage/async-storage';


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
const getValue = async() => {
    const value = await getData()
    return value
}

function ToDoList(props) {
    const [task, setTask] = useState()
    const [taskItems, setTaskItems] = useState([])
    
    let wow = JSON.stringify(getData())
    const [specificUserId, setSpecificUserId] = useState(wow)
    useEffect(() => {
        fetchUser();
        },[]
    )
    useEffect(() => {
        console.log('render'+ specificUserId)
    }, ["render" + specificUserId])
const fetchUser = async() => {
    let userId = await getData()
    await setSpecificUserId(userId)
    console.log(userId)
}
    const handleAddTask = () => {
        const specificUserRef = firebase.database().ref(`user/${specificUserId.replace(/['"]+/g, '')}`)
        console.log(specificUserRef)
        specificUserRef.child('liste').push({
            'liste': task
        }
    )
        Keyboard.dismiss();
        setTaskItems([...taskItems, task])
        setTask(null)
        getData().then(console.log)

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
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.writeTaskWrapper}>
                <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text=> setTask(text)}></TextInput>
                <TouchableOpacity onPress={() => handleAddTask()}>
<View style={styles.addWrapper}>
<Text style={styles.addText}>+</Text>
</View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

export default ToDoList