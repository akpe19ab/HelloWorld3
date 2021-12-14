import  React, { useEffect } from 'react'
import {View, Text, Pressable} from 'react-native'
import styles from './styles'
import {useNavigation} from '@react-navigation/native';



const StylesButton = (props) =>{
    //Bruger hooks
    const nav = useNavigation()
    const {type, content, navigateTo} = props
    
    const backgroundColor = type ==='primary' ? '#FFF' : '#485634';
    const textColor = type === 'primary' ? '#003b4f':'black';

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