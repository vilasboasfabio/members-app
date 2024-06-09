import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: SCREEN_WIDTH * 0.9,
        height: SCREEN_HEIGHT / 1.7,
        backgroundColor: '#F5E5AC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 3,
            height: 6,
        },
        shadowOpacity: 0.7,
        shadowRadius: 5,
        elevation: 10,
    },
    cardText: {
        padding: 30,
    },
    image: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT / 2.5,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#31394C',
    },
    description: {
        fontSize: 16,
        color: '#31394C',
    },
    endMessage: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    endText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 20,
        marginTop: 20,
    },
    restartButton: {
        width: SCREEN_WIDTH - 50,
        height: 50,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },

    footer: {
        backgroundColor: "#04233f",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: "100%",
        marginTop: 650,
    },
    text: {
        color: "white",
        textAlign: "justify",
    },
    title: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    },
    line: {
        width: "100%",
        height: 1,
        backgroundColor: "white",
        marginVertical: 10,

    },
    logo: {
        width: 100,
        height: 100,
        justifyContent: "center",
    },
    textall: {
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
    },
    center: {
        alignItems: "center",
        justifyContent: "center",
    },
    footerView:{
        width: 100,
    },
    image_bg2:{
        width: 50,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: 50
    },
});
