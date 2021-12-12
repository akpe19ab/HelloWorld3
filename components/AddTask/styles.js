import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container:{
        width: '100%',
        padding: 10,
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
        textTransform: 'uppercase',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    error: {
        color: 'red',
    },
});
export default styles

