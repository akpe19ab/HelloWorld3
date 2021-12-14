import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    titles:{
        marginTop: '30%',
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: '500',
    },
    tagUnderline: {
      textDecorationLine: 'underline'
    },
    subtitle: {
        fontSize: 16,
        color: '#5c5e62',
    },
    image:{
        resizeMode: 'cover',
        width: "100%",
        height: "100%",

    },
    buttonsContainer:{
        position: 'absolute',
        width: '100%',
        bottom: 300
    },
    space: {
        width: 20, // or whatever size you need
        height: 20,
    },
    });
export default styles

