import { BackgroundImage } from '@rneui/themed/dist/config';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#31394C",
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
        color: '#FFFFFF',
        textAlign: 'center',
        width: '70%',
        marginLeft: "15%",
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    description: {
        textAlign: 'center',
        marginLeft: "15%",
        fontSize: 16,
        marginBottom: 10,
        width: '70%',
        color: '#FFFFFF',
    },
    details: {
        fontSize: 14,
        marginBottom: 10,
        marginLeft: 10,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    reviewForm: {
        marginTop: 20,
        padding: 20,
    },
    reviewTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#FFFFFF',
        paddingBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        color: '#FFFFFF',  // Texto dentro do input em branco
    },
    reviewsContainer: {
        marginTop: 20,
        padding: 20,
    },
    reviewCard: {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    reviewRating: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    reviewComment: {
        fontSize: 14,
        color: '#FFFFFF',
    },
    reviewUser: {
        fontSize: 12,
        fontStyle: 'italic',
        marginTop: 5,
        color: '#FFFFFF',
    },
    footer: {
        width: '111%',
        marginLeft: -20,
        marginBottom: -20
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        borderRadius: 8,
        margin: 20,
        alignSelf: 'center',
        width: '70%',
    },
    linha:{
        width: '70%',
        height: 7,
        backgroundColor: '#ceb591',
        marginLeft: "15%",
        marginTop: 25,
        borderRadius: 10,
        marginBottom: 10,
    },
    image_bg:{
        paddingBottom: 28
    }
});

export default styles;
