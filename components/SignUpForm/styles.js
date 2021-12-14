import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container:{

            flex: 1,
            display: 'flex',
            justifyContent: 'center'


    },
    button: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,


    },
    text: {
        fontSize: 12,
        fontWeight: '500',
        color: "#003b4f"
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
        color: "#FFF"
    },
    error: {
        color: 'red',
    },
    image:{

position: 'absolute',
        width: "100%",
        height: "100%",
resizeMode: 'cover'

    },  buttonsContainer:{
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

