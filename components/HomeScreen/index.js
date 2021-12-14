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
                source={require('../../assets/images/good.jpg')}
                style={styles.image}
                resizeMode="cover"
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
                    content={"Opret dig som forældre"}
                    navigateTo={"SignUpForm"}
                    />
                    <View style={styles.space} />
                    <StylesButton
                        type="primary"
                        content={"Opret dig som barn"}
                        navigateTo={"ChildLogin"}
                    />
                    <View style={styles.space} />
                    <StylesButton
                        type="primary"
                        content="Login for forældre"
                        navigateTo={"LoginForm"}
                    />



                </ScrollView>
            </View>
        </View>
    );
}

export default HomeScreen;