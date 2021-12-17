import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, Button, ScrollView, View, ImageBackground} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"



//Importerer komponenter
import ToDoList from '../ToDoList';
import AddTask from '../AddTask';
import TaskDetails from '../TaskDetails';



export default AppScreen = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator
            initialRouteName="ToDoList">
            <Stack.Screen name="TaskDetails" component={TaskDetails} options={{
                title: "Gå tilbage",
                headerStyle: {
                    backgroundColor: '#003b4f',
                },
                headerTintColor: '#FFF',
                headerTitleAlign: 'center'


            }}/>
            <Stack.Screen name="ToDoList" component={ToDoList} options={{ headerShown: false }}/>
            <Stack.Screen name="AddTask" component={AddTask} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}