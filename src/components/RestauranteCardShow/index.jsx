import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

function RestauranteCardShow({ restaurante, abrirDetalhes, toggleFavorite, isFavorited }) {
  const descricao = restaurante.descricao || '';
  let descricaoCurta = descricao.substring(0, 350);
  const ultimoEspaco = descricaoCurta.lastIndexOf(' ');

  if (ultimoEspaco > 0) {
    descricaoCurta = descricaoCurta.substring(0, ultimoEspaco);
  }

  if (descricao.length > 350) {
    descricaoCurta += '...';
  }

  return (
    <TouchableOpacity style={styles.card} onPress={() => abrirDetalhes(restaurante.restaurantid)}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>{restaurante.name || 'N/A'}</Text>
        <View style={styles.separator} />
        <Text style={styles.description}>{descricaoCurta}</Text>
      </View>
      <Image 
        style={styles.image}
        source={{ uri: restaurante.photos || 'https://via.placeholder.com/150' }}
        alt="Imagem do Restaurante"
      />
      <View style={styles.content}>
        <Text style={styles.name}>{restaurante.name || 'N/A'} - {restaurante.chefname || 'N/A'}</Text>
        <Text style={styles.location}>{restaurante.location || 'N/A'}</Text>
        <View style={styles.iconsContainer}>
          <View style={styles.iconGroup}>
            {Array.from({ length: restaurante.pricelevel }, (_, index) => (
              <MaterialIcons key={index} name="attach-money" size={24} color="#daa520" />
            ))}
          </View>
          <View style={styles.iconGroup}>
            {Array.from({ length: restaurante.rating }, (_, index) => (
              <FontAwesome key={index} name="star" size={24} color="#daa520" />
            ))}
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.typeContainer}>
          <Text style={styles.type}>{restaurante.cuisinetype || 'N/A'}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(restaurante.restaurantid)}>
          <FontAwesome 
            name={isFavorited ? "heart" : "heart-o"} 
            size={24} 
            color="#daa520" 
            style={styles.favoriteIcon}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    maxWidth: '95%',
    borderRadius: 16,
    marginTop: 20,
    backgroundColor: '#cd7f32', // bronze
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    position: 'relative',
   marginLeft: 14,
  },
  descriptionContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 0,
    zIndex: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#daa520', // lbronze
    marginBottom: 10,
  },
  separator: {
    backgroundColor: '#daa520', // lbronze
    height: 4,
    width: '95%',
    marginBottom: 10,
    borderRadius: 8,
    marginTop: 13,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  description: {
    color: '#fff',
    textAlign: 'justify',
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 20,
    zIndex: 20,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#daa520', // lbronze
    marginBottom: 10,
  },
  location: {
    color: '#fff',
    fontSize: 14,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
  },
  iconGroup: {
    flexDirection: 'row',
  },
  typeContainer: {
    marginTop: 20,
  },
  type: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#daa520', // lbronze
  },
  favoriteIcon: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});

export default RestauranteCardShow;