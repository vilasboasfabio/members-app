import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: '#f56565'
    },
    scrollView : {
        flex: 1,
        backgroundColor: '#31394C',
    },
    fundoinputs: {
        backgroundColor:'rgba(206, 181, 145, 0.8)',
        padding: 16,
        borderRadius: 10,
        marginLeft: 4,
        elevation: 5,
        width: '100%',
        maxWidth: 400,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#e2e8f0',
        marginBottom: 24,
        textAlign: 'center',
    },
    message: {
        marginBottom: 16,
        textAlign: 'center',
        color: '#f56565', 
    },
    subtitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#F5E5AC',
        marginBottom: 26,
        textAlign: 'justify',
    },
    button: {
        backgroundColor: 'rgb(120, 89, 77)',
        padding: 12,
        borderRadius: 20,
        elevation: 5,
        width: '100%',
        maxWidth: 400,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 6
    },
    textbutton: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#000', 
        width: '100%',
        paddingVertical: 8, 
        paddingHorizontal: 12, 
        color: '#000',
        fontSize: 16,
        marginBottom: 10,
    },
    inputPlaceholder: {
        color: '#000', // Cor do placeholder
      },
    buttonlikebackground: {
        backgroundColor: 'rgb(120, 89, 77)',
        padding: 12,
        borderRadius: 20,
        elevation: 5,
        width: '100%',
        maxWidth: 400,
        textAlign: 'center',
        marginTop: 20,
    },
    image_bg:{
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        width: '110%',
        marginLeft: -35,
        marginTop: -35,
        padding: 10,

    },
    forms:{
        marginTop: 25,
        width: '90%',
        marginLeft: 34,
        marginRight: 'auto',
    },
    linha:{
        width: '100%',
        height: 7,
        backgroundColor: '#ceb591',
        borderRadius: 10,
        marginBottom: 20,
    },
});

export default styles;