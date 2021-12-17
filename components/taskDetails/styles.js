import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 15,
        width: '80%',

    },
    error: {
        color: 'white',
    },
    container:{
   flex: 1, justifyContent: 'flex-start'


    },
    image:{

        position: 'absolute',
        width: "100%",
        height: "100%",
        resizeMode: 'cover'

    },
    button: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        width: '80%',
        position: 'relative',


    },
    text: {
        fontSize: 12,
        fontWeight: '500',
        color: "#FFF"
    },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold',color: "#FFF", fontSize: 14},
    value: { flex: 1 , color: "#FFF", fontSize: 14},
});
export default styles
