import  React from 'react'
import {View, Text, Pressable} from 'react-native'
import styles from './styles'

const StylesButton = (props) =>{

    const {type, text} = props
    const backgroundColor = type ==='primary' ? 'black' : 'white';
    const textColor = type === 'primary' ? 'white':'black';

    return (
        <View style={styles.container}>
            <Pressable
                style={[styles.button, {backgroundColor: backgroundColor}]} 
                onPress={() => {
                    console.log(`Du har nu oprettet dig som ${text}`)
                }}
            >
                <Text style={[styles.text, {color: textColor}]}> Opret dig som {text}</Text>
            </Pressable>
        </View>
    );
};

export default StylesButton;