import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, Image, ImageBackground } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../../components/Footer'; // Certifique-se de importar o Footer corretamente
import styles from './style';
import { BackgroundImage } from '@rneui/themed/dist/config';

const RestaurantDetails = ({ route, navigation }) => {


  
  const { restaurantId } = route.params;
  const [restaurant, setRestaurant] = useState(null);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.113:3003';

  useEffect(() => {
    getUser();
    getRestaurantDetails();
    getReviews();
  }, []);

  const getUser = async () => {
    const token = await AsyncStorage.getItem('userToken');
    console.log('Token foi pego', token);
    if (token) {
      setUser({ token });
    } else {
      navigation.navigate('Login');
    }
  };

  const getRestaurantDetails = async () => {
    try {
      const response = await axios.get(`${apiUrl}/restaurants/${restaurantId}`);
      setRestaurant(response.data);
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
    }
  };

  const getReviews = async () => {
    try {
      const response = await axios.get(`${apiUrl}/reviews/${restaurantId}`);
      setReviews(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const submitReview = async () => {
    if (!user) {
      return Alert.alert('Please log in to submit a review');
    }

    const reviewData = {
      restaurantId,
      rating: rating,
      reviewText: comment,
    };

    try {
      console.log('Enviando token', user.token);
      await axios.post(`${apiUrl}/review`, reviewData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setRating('');
      setComment('');
      getReviews(); // Refresh the reviews list
    } catch (error) {
      console.error('Error submitting review:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Login');
  };

  if (!restaurant) {
    return <Text>Loading...</Text>;
  }

  return (


    <ScrollView contentContainerStyle={styles.container}>
       <ImageBackground
        source={require("../../../assets/fundodetalhe2.jpg")}
        style={styles.image_bg}

      >
      <View  style={styles.linha}></View>
      <Image
        style={styles.image}
        source={{ uri: restaurant.photos }}
      />

      <Text style={styles.title}>{restaurant.name}</Text>
      <View  style={styles.linha}></View>
      <Text style={styles.subtitle}>Descrição</Text>

      <Text style={styles.description}>{restaurant.description}</Text>
      <Text style={styles.subtitle}>Informações</Text>
      <Text style={styles.details}> Nível de preços: {'$'.repeat(restaurant.pricelevel)}</Text>
      <Text style={styles.details}>Avaliação: {'⭐'.repeat(restaurant.rating)}</Text>
      <Text style={styles.details}> {restaurant.chefname}</Text>
      <Text style={styles.subtitle}>Localização:</Text>
      <Text style={styles.details}> {restaurant.location}</Text>
      <View  style={styles.linha}></View>
      </ImageBackground>
      <View style={styles.reviewForm}>
        <Text style={styles.reviewTitle}>Adicionar um Comentário</Text>
        <TextInput
          placeholder="Avaliação (1-5)"
          value={rating}
          onChangeText={setRating}
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor={'#FFFFFF'}
        />
        <TextInput
          placeholder="Comentário"
          value={comment}
          onChangeText={setComment}
          style={styles.input}
          placeholderTextColor={'#FFFFFF'}
          multiline
        />
        <Button title="Enviar Comentário" onPress={submitReview} />
      </View>

      <View style={styles.reviewsContainer}>
        {reviews.map((review) => (
          <View key={review.reviewid} style={styles.reviewCard}>
            <Text style={styles.reviewRating}>{'⭐'.repeat(review.rating)}</Text>
            <Text style={styles.reviewComment}>{review.reviewtext}</Text>
            <Text style={styles.reviewUser}>Escrito por: {review.username}</Text>
          </View>
        ))}
      </View >
      
      <View style={styles.footer}>
        <Footer onLogout={logout} />
      </View>
    </ScrollView>
  );
};

export default RestaurantDetails;