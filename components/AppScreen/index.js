import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, Button, ScrollView, View, ImageBackground} from "react-native";

//Importerer komponenter
import ToDoList from '../ToDoList';

export default AppScreen = () => {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator
            initialRouteName="ToDoList"
        >
            <Tab.Screen name="ToDoList" component={ToDoList}/>
        </Tab.Navigator>
    )
}