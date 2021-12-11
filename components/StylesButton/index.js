import  React, { useEffect } from 'react'
import {View, Text, Pressable} from 'react-native'
import styles from './styles'
import {useNavigation} from '@react-navigation/native';



const StylesButton = (props) =>{
    //Bruger hooks
    const nav = useNavigation()
    const {type, content, navigateTo} = props
    
    const backgroundColor = type ==='primary' ? 'black' : 'white';
    const textColor = type === 'primary' ? 'white':'black';

    return (
        <View style={styles.container}>
            <Pressable
                style={[styles.button, {backgroundColor: backgroundColor}]} 
                onPress={() => {
                    nav.navigate(navigateTo)
                }}
            >
                <Text style={[styles.text, {color: textColor}]}>  {content}</Text>
            </Pressable>
        </View>
    );
};

export default StylesButton;