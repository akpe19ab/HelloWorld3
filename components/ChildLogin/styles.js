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

        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'



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
        color: "#003b4f"
    }
});
export default styles

