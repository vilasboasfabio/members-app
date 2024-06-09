import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RestauranteCardShow from '../../components/RestauranteCardShow';
import Footer from '../../components/Footer';

const FavoritesPage = ({ navigation }) => {
  const [favoritos, setFavoritos] = useState([]);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.113:3003';

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchFavoritos();
    }
  }, [user]);

  const getUser = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      setUser({ token });
    } else {
      navigation.navigate('Login');
    }
  };

  const fetchFavoritos = async () => {
    try {
      const response = await axios.get(`${apiUrl}/favorites`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setFavoritos(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const toggleFavorite = async (restaurantId) => {
    try {
      await axios.delete(`${apiUrl}/favorites`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        data: { restaurantId },
      });
      fetchFavoritos();
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const filteredFavorites = favoritos.filter(restaurante =>
    restaurante.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Seus Restaurantes Favoritos</Text>
      <TextInput
        placeholder="Pesquisar por nome"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.input}
      />
      {filteredFavorites.length > 0 ? (
        filteredFavorites.map(restaurante => (
          <RestauranteCardShow
            key={restaurante.restaurantid}
            restaurante={restaurante}
            abrirDetalhes={(id) => navigation.navigate('RestaurantDetails', { restaurantId: id })}
            toggleFavorite={toggleFavorite}
            isFavorited={true}
          />
        ))
      ) : (
        <Text style={styles.noFavoritesText}>Nenhum restaurante na seção de favoritos</Text>
      )}
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#31394C',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E5E7EB',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'rgba(206, 181, 145, 0.8)',
    width: "90%",
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  noFavoritesText: {
    color: '#E5E7EB',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FavoritesPage;
