import {Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Keyboard} from "react-native";
import React, {useState} from "react";
import styles from './styles'
import Task from './Task'


function ToDoList() {
    const [task, setTask] = useState()
const [taskItems, setTaskItems] = useState([])
    const handleAddTask = () => {
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