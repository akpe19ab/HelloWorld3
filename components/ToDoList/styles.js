import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: '#FFF',

  },
    taskWrapper: {
      paddingTop: 80,
        paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 24,
        fontWeight: 'bold'
    },
    item: {
    backgroundColor: '#003b4f',
    padding:15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center' ,
    justifyContent: 'space-between' ,
    marginBottom: 20,
    color: "#FFF"},

  sqaure: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15
  },
  itemLeft: {
flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  itemText: {
    maxWidth: '80%'
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
  items: {
    marginTop: 30
  },
  writeTaskWrapper:{
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250
  },
  addWrapper: {
    width: "100%",
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,


  }, addText: {
    color: "#003b4f"
  }

});
export default styles