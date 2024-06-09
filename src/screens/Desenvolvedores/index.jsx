import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
} from "react-native";

const { width: viewportWidth } = Dimensions.get("window");

const Desenvolvedores = () => {
  const cardData = [
    {
      name: "Ana Cavalcante Reis",
      url: require("../../../assets/ana.jpeg"),
      descricao:
        "Sou Ana Clara, natural de Valinhos-SP, e atualmente conto com 17 anos de idade...",
    },
    {
      name: "Andrey Botero",
      url: require("../../../assets/andrey.jpeg"),
      descricao:
        "Sou Andrey, natural de Valinhos-SP, e atualmente conto com 17 anos de idade...",
    },
    {
      name: "Camila Bersan",
      url: require("../../../assets/camila.jpeg"),
      descricao:
        "Sou Camila, natural de Valinhos-SP, e atualmente conto com 17 anos de idade...",
    },
    {
      name: "Fábio Vilas Boas Simões Junior",
      url: require("../../../assets/fabio.jpeg"),
      descricao:
        "Sou Fábio, natural de Sorocaba-SP, e atualmente conto com 17 anos de idade...",
    },
    {
      name: "Manuela Liberato",
      url: require("../../../assets/manu.jpeg"),
      descricao:
        "Sou Manuela, natural de Campinas-SP, e atualmente conto com 17 anos de idade...",
    },
    {
      name: "Nicoly Val",
      url: require("../../../assets/nicoly.jpeg"),
      descricao:
        "Sou Nicoly, natural de Campinas-SP, e atualmente conto com 16 anos de idade...",
    },
  ];

  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const newIndex = prevIndex === cardData.length - 1 ? 0 : prevIndex + 1;
        scrollRef.current.scrollTo({
          x: newIndex * viewportWidth,
          animated: true,
        });
        return newIndex;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollRef = useRef();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.url} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.separator} />
      <Text style={styles.description}>{item.descricao}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Sobre Nós</Text>
          <Text style={styles.headerSubtitle}>
            Se você é daqueles que consideram a experiência de saborear uma
            refeição como uma verdadeira celebração para os sentidos, então o
            Elite Chefs é o seu guia essencial...
          </Text>
        </View>
        <Text style={styles.sectionTitle}>Conheça nossos diretores:</Text>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {cardData.map((item, index) => (
            <View style={{ width: viewportWidth }} key={index}>
              {renderItem({ item })}
            </View>
          ))}
        </Animated.ScrollView>
        <View style={styles.paginationContainer}>
          {cardData.map((_, i) => {
            const opacity = scrollX.interpolate({
              inputRange: [
                (i - 1) * viewportWidth,
                i * viewportWidth,
                (i + 1) * viewportWidth,
              ],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={[styles.paginationDot, { opacity }]}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#31394C",
  },
  scrollViewContent: {
    paddingVertical: 20,
  },
  headerTextContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#E5E7EB",
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#E5E7EB",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E5E7EB",
    textAlign: "center",
    marginVertical: 20,
  },
  card: {
    backgroundColor: "#1F2937",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E5E7EB",
    marginBottom: 10,
  },
  separator: {
    width: "80%",
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: "#E5E7EB",
    textAlign: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: "#BB86FC",
  },
});

export default Desenvolvedores;
