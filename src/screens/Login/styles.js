import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#31394C',
    },
    input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '80%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: '#4a5568',
    fontSize: 16,
    marginTop: 30,
    alignSelf: 'center'
    },
    error: {
      color: 'red',
      marginVertical: 10,
    },
    title:{
        color: '#fff',
        textAlign: 'center',
        fontSize: 40,
        fontFamily: 'Lora_400Regular'
    },
    img: {
        width: 130,
        height: 130,
    },
    imgView:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'ArimaMadurai_100Thin'
      
    },
    textView:{
        textAlign: 'center',
        marginBottom: 30
    },
    button:{
       alignSelf: 'center',
       backgroundColor: '#ceb591',
       padding: 12,
       borderRadius: 10,
       elevation: 5,
       width: '60%',
       maxWidth: 400,
       textAlign: 'center',
       marginTop: 30
    },
    textInput: {
        textAlign: 'center',
        fontSize: 15
    },
    cardInput:{
        backgroundColor: '#fff',
        height: 200,
        width: 350,
        borderRadius: 8,
        alignSelf: 'center'
    },
    registerText:{
        color: '#ceb591',
        fontFamily: 'ArimaMadurai_100Thin',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 15
    }
  });

    export default styles;