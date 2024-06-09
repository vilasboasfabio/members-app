import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RestauranteCardShow from '../../components/RestauranteCardShow';
import Footer from '../../components/Footer';
import RNPickerSelect from 'react-native-picker-select';
import { Lora_400Regular } from "@expo-google-fonts/lora";
import { useFonts } from "expo-font";

const PaginaSobre = ({ navigation }) => {
  const [restaurantes, setRestaurantes] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState(null);
  const [ratingFilter, setRatingFilter] = useState(null);
  const [cuisineFilter, setCuisineFilter] = useState(null);
  const [filtersVisible, setFiltersVisible] = useState(false);

  const [fontsLoaded] = useFonts({ Lora_400Regular });

  const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.113:3003';

  useEffect(() => {
    const getUser = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setUser({ token });
      } else {
        navigation.navigate('Login');
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const fetchRestaurantes = async () => {
      try {
        const response = await fetch(`${apiUrl}/restaurants`);
        const data = await response.json();
        setRestaurantes(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurantes();
  }, []);

  useEffect(() => {
    const fetchFavoritos = async () => {
      if (user && user.token) {
        try {
          const response = await fetch(`${apiUrl}/favorites`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const data = await response.json();
          setFavoritos(data.map(fav => fav.restaurantid));
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      }
    };

    fetchFavoritos();
  }, [user]);

  const toggleFavorite = async (restaurantId) => {
    const method = favoritos.includes(restaurantId) ? 'DELETE' : 'POST';
    const url = `${apiUrl}/favorites`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ restaurantId }),
    };

    try {
      await fetch(url, options);
      if (method === 'DELETE') {
        setFavoritos(favoritos.filter(id => id !== restaurantId));
      } else {
        setFavoritos([...favoritos, restaurantId]);
      }
    } catch (error) {
      console.error(`Error ${method === 'DELETE' ? 'removing' : 'adding'} favorite:`, error);
    }
  };

  const applyFilters = () => {
    let filteredRestaurants = restaurantes;

    if (searchQuery) {
      filteredRestaurants = filteredRestaurants.filter(restaurante =>
        restaurante.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (priceFilter) {
      filteredRestaurants = filteredRestaurants.filter(
        restaurante => restaurante.pricelevel === priceFilter
      );
    }

    if (ratingFilter) {
      filteredRestaurants = filteredRestaurants.filter(
        restaurante => restaurante.rating === ratingFilter
      );
    }

    if (cuisineFilter) {
      filteredRestaurants = filteredRestaurants.filter(
        restaurante => restaurante.cuisineType === cuisineFilter
      );
    }

    return filteredRestaurants;
  };

  const filteredRestaurants = applyFilters();

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Carregando fontes...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/fundocadastro1.png")}
          style={styles.image_bg2}
        >
          <View style={styles.linha}></View>
          <Text style={styles.title}>GUIA DE RESTAURANTES</Text>
        </ImageBackground>
        <View style={styles.linha2}></View>

        <TouchableOpacity
          style={styles.filterToggleButton}
          onPress={() => setFiltersVisible(!filtersVisible)}
        >
          <Text style={styles.filterToggleButtonText}>
            {filtersVisible ? 'Esconder Filtros' : 'Mostrar Filtros'}
          </Text>
        </TouchableOpacity>

        {filtersVisible && (
          <View style={styles.filterContainer}>
            <TextInput
              placeholder="Pesquisar por nome"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.input}
            />
            <RNPickerSelect
              placeholder={{ label: "Faixa de preço", value: null }}
              value={priceFilter}
              onValueChange={setPriceFilter}
              items={[
                { label: '$', value: 1 },
                { label: '$$', value: 2 },
                { label: '$$$', value: 3 },
                { label: '$$$$', value: 4 },
              ]}
              style={pickerSelectStyles}
            />
            <RNPickerSelect
              placeholder={{ label: "Quantidade de estrelas", value: null }}
              value={ratingFilter}
              onValueChange={setRatingFilter}
              items={[
                { label: '⭐', value: 1 },
                { label: '⭐⭐', value: 2 },
                { label: '⭐⭐⭐', value: 3 },
              ]}
              style={pickerSelectStyles}
            />
            <RNPickerSelect
              placeholder={{ label: "Tipo de culinária", value: null }}
              value={cuisineFilter}
              onValueChange={setCuisineFilter}
              items={[
                { label: 'Francesa', value: 'Francesa' },
                { label: 'Italiana', value: 'Italiana' },
                { label: 'Japonesa', value: 'Japonesa' },
                { label: 'Brasileira', value: 'Brasileira' },
                // Adicione mais tipos conforme necessário
              ]}
              style={pickerSelectStyles}
            />
            
          </View>
        )}

        {filteredRestaurants.map(restaurante => (
          <RestauranteCardShow
            key={restaurante.restaurantid}
            restaurante={restaurante}
            abrirDetalhes={(id) => navigation.navigate('RestaurantDetails', { restaurantId: id })}
            toggleFavorite={toggleFavorite}
            isFavorited={favoritos.includes(restaurante.restaurantid)}
          />
        ))}
        <Footer />
      </View>
    </ScrollView>
  );
};

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
    backgroundColor: '#F5E5AC',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
    backgroundColor: '#F5E5AC',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#31394C',

  },
  filterContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#1F2937',
    borderRadius: 10,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#F5E5AC',
  },
  image_bg2: {
    width: "100%",
    height: 300,
    marginTop: -5
  },
  title: {
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 90,
    fontSize: 30,
    fontFamily: 'Lora_400Regular'
  },
  linha: {
    width: '100%',
    height: 7,
    backgroundColor: '#ceb591',
    marginTop: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  linha2: {
    width: '100%',
    height: 7,
    backgroundColor: '#ceb591',
    borderRadius: 10,
    marginBottom: 10,
  },
  filterToggleButton: {
    backgroundColor: '#1F2937',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  filterToggleButtonText: {
    color: '#F5E5AC',
    fontSize: 16,
  }
});

export default PaginaSobre;
