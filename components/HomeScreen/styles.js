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
        position: 'absolute',
        width: "100%",
        height: "100%",
        flex: 1,
    },
    buttonsContainer:{
        position: 'absolute',
        width: '100%',
    }
    });
export default styles

