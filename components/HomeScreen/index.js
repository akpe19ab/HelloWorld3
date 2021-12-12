import { Text, Button, ScrollView, View, ImageBackground} from "react-native";
import React from "react";

//Importerer styles
import styles from './styles'

//Importerer nødvendige komponenter
import StylesButton from "../StylesButton";

function HomeScreen() {
    return (
        <View>
                <ImageBackground
                source={require('../../assets/images/child2.jpeg')}
                style={styles.image}
            />

            <View style={styles.titles}>
                <Text style={styles.title}>{"Børnenes Huskeliste"}</Text>
                <Text style={styles.subtitle}>{"Opret en konto"}
                    <Text style={styles.tagUnderline}> {"nu"} </Text>
                </Text>
            </View>
            
            <View style={styles.buttonsContainer}>
                <ScrollView>
                    <StylesButton
                    type="primary"
                    content={"Tilmeld dig som forældre!"}
                    navigateTo={"SignUpForm"}
                    />

                    <StylesButton
                        type="primary"
                        content={"Login som barn"}
                        navigateTo={"ChildLogin"}
                    />
                    <StylesButton
                        type="primary"
                        content="Login som forælder"
                        navigateTo="LoginForm"
                    />
                    <StylesButton
                        type="primary"
                        content="Huskelisten (temporary)"
                        navigateTo={"ToDoList"}
                    />
                </ScrollView>
            </View>
        </View>
    );
}

export default HomeScreen;