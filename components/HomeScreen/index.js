import {Button, ScrollView, View} from "react-native";
import HomeContent from "../HomeContent";
import TimeStamper from "../TimeStamper";
import {StatusBar} from "expo-status-bar";
import SignUpForm from "../SignUpForm";
import LoginForm from "../LoginForm";
import React from "react";

function HomeScreen({navigation}) {
    return (
        <View>
            <ScrollView>
                <HomeContent
                         name={"Børnenes huskeliste"}
                         tagline={"Opret en konto"}
                         image={require("../../assets/images/child2.jpeg")}
                         tagUnderline={"nu"}/>
                <Button title="Jeg er en forældre" onPress={() => navigation.navigate('ToDoList')}></Button>
                <Button title="Jeg er et barn" onPress={() => navigation.navigate('ToDoList')}></Button>
                <Button title="Login" onPress={() => navigation.navigate('ToDoList')}></Button>
                <Button title="Gå til din huskeliste" onPress={() => navigation.navigate('ToDoList')}></Button>
                <TimeStamper/>
                <StatusBar style="auto" />
                <SignUpForm parent={true}/>
                <LoginForm/>
            </ScrollView>
        </View>
    );
}

export default HomeScreen;