import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  Image,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import MultiSelect from "react-native-multiple-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "./styles";
import CardCadastro from "../../components/CardCadastro";
import Footer from "../../components/Footer";

const RestaurantForm = ({ navigation }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceLevel, setPriceLevel] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [chefName, setChefName] = useState("");
  const [description, setDescription] = useState("");
  const [openingDays, setOpeningDays] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [rating, setRating] = useState("");
  const [foundationDate, setFoundationDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [menuPDF, setMenuPdf] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [restaurants, setRestaurants] = useState([]);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [leftArrowAnim] = useState(new Animated.Value(0));
  const [rightArrowAnim] = useState(new Animated.Value(0));

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const selectPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      setPhotoUrl(uri);
    }
  };

  const validateLocation = (location) => {
    const locationRegex = /^[^,]+,\s*\d+\s*-\s*[^,]+,\s*[^-]+\s*-\s*[^-]+$/;
    return locationRegex.test(location);
  };

  const handleSubmit = async () => {
    let validationErrors = {};

    if (!name) validationErrors.name = "Nome é obrigatório";
    if (!location) validationErrors.location = "Localização é obrigatória";
    if (!validateLocation(location))
      validationErrors.location =
        "Localização deve estar no formato: Logradouro, número - cidade, estado - país";
    if (!priceLevel) validationErrors.priceLevel = "Nível de preço é obrigatório";
    if (!cuisineType) validationErrors.cuisineTypeId = "Tipo de cozinha é obrigatório";
    if (!chefName) validationErrors.chefName = "Nome do(a) chef é obrigatório";
    if (!description) validationErrors.description = "Descrição é obrigatória";
    if (!openingDays.length) validationErrors.openingDays = "Dias de funcionamento são obrigatórios";
    if (!paymentMethods.length) validationErrors.paymentMethods = "Métodos de pagamento são obrigatórios";
    if (!rating) validationErrors.rating = "Avaliação é obrigatória";
    if (!foundationDate) validationErrors.foundationDate = "Dia de fundação é obrigatório";
    if (!menuPDF) validationErrors.menuPDF = "Menu PDF é obrigatório";
    if (!photoUrl) validationErrors.photoUrl = "Foto é obrigatória";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      clearErrorsAfterTimeout();
      return;
    }

    const formData = {
      name,
      location,
      priceLevel,
      cuisineType,
      chefName,
      description,
      openingDays,
      paymentMethods,
      rating,
      foundationDate,
      menuPDF,
      photoUrl,
    };

    try {
      if (editingRestaurant) {
        await axios.put(`${apiUrl}/restaurants/${editingRestaurant}`, formData);
        setMessage("Restaurant updated successfully");
      } else {
        await axios.post(`${apiUrl}/restaurants`, formData);
        setMessage("Restaurant added successfully");
      }
      setName("");
      setLocation("");
      setPriceLevel("");
      setCuisineType("");
      setChefName("");
      setDescription("");
      setOpeningDays([]);
      setPaymentMethods([]);
      setRating("");
      setFoundationDate(new Date());
      setPhotoUrl("");
      setMenuPdf("");
      setEditingRestaurant(null);
      getRestaurants();
    } catch (error) {
      console.error("Error adding/updating restaurant:", error);
    }

    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  const handleEdit = (restaurantId) => {
    const restaurant = restaurants.find((r) => r.restaurantid === restaurantId);
    setName(restaurant.name);
    setLocation(restaurant.location);
    setPriceLevel(restaurant.pricelevel);
    setCuisineType(restaurant.cuisinetype);
    setChefName(restaurant.chefname);
    setDescription(restaurant.descricao);
    setOpeningDays(restaurant.openingdays ? restaurant.openingdays : []);
    setPaymentMethods(restaurant.paymentmethods ? restaurant.paymentmethods : []);
    setRating(restaurant.rating);
    setFoundationDate(new Date(restaurant.foundationdate));
    setPhotoUrl(restaurant.photos);
    setMenuPdf(restaurant.menulink);
    setEditingRestaurant(restaurantId);
  };

  const handleDelete = async (restaurantId) => {
    try {
      await axios.delete(`${apiUrl}/restaurants/${restaurantId}`);
      setMessage("Restaurant deleted successfully");
      getRestaurants();
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }

    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  const clearErrorsAfterTimeout = () => {
    setTimeout(() => {
      setErrors({});
    }, 4000);
  };

  const getRestaurants = async () => {
    try {
      const response = await axios.get(`${apiUrl}/restaurants`);
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error getting restaurants:", error);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  const abrirDetalhes = (restaurantId) => {
    navigation.navigate("RestaurantDetails", { restaurantId });
  };

  const applyFilters = () => {
    let filteredRestaurants = restaurants;

    if (searchQuery) {
      filteredRestaurants = filteredRestaurants.filter((restaurante) =>
        restaurante.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredRestaurants;
  };

  const filteredRestaurants = applyFilters();

  const itemsPerPage = 20;
  const numberOfPages = Math.ceil(filteredRestaurants.length / itemsPerPage);
  const paginatedRestaurants = filteredRestaurants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
      Animated.sequence([
        Animated.timing(rightArrowAnim, {
          toValue: 15,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(rightArrowAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      Animated.sequence([
        Animated.timing(leftArrowAnim, {
          toValue: -15,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(leftArrowAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.linha}></View>
      <ImageBackground
        source={require("../../../assets/fundocadastro1.png")}
        style={styles.image_bg}
      >
        <View style={styles.forms}>
          <Text style={styles.title}>Cadastro de Restaurantes</Text>
          {message ? <Text style={styles.message}>{message}</Text> : null}
          <Text style={styles.subtitle}>
            Preencha os campos abaixo para cadastrar um restaurante
          </Text>
          <Text style={styles.subtitle}>
            Caso você não seja um membro da Elite Chefs, por favor, entre em
            contato conosco pela nossa página de contatos.
          </Text>
          <Text style={styles.subtitle}>Todos os campos são obrigatórios!</Text>

          <View style={styles.fundoinputs}>
            <TextInput
              placeholder="Digite o nome"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            <TextInput
              placeholder="Digite a localização."
              value={location}
              onChangeText={setLocation}
              style={styles.input}
            />
            {errors.location && (
              <Text style={styles.errorText}>{errors.location}</Text>
            )}

            <TextInput
              placeholder="Nome do(a) chef"
              value={chefName}
              onChangeText={setChefName}
              style={styles.input}
            />
            {errors.chefName && (
              <Text style={styles.errorText}>{errors.chefName}</Text>
            )}
            <TextInput
              placeholder="Descrição"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
            />
            {errors.description && (
              <Text style={styles.errorText}>{errors.description}</Text>
            )}

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                placeholder="Dia de fundação"
                value={foundationDate.toLocaleDateString()}
                style={styles.input}
                editable={false}
              />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={foundationDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(Platform.OS === "ios");
                  if (selectedDate) {
                    setFoundationDate(selectedDate);
                  }
                }}
              />
            )}
            {errors.foundationDate && (
              <Text style={styles.errorText}>{errors.foundationDate}</Text>
            )}

            <TextInput
              placeholder="Menu PDF"
              value={menuPDF}
              onChangeText={setMenuPdf}
              style={styles.input}
            />
            {errors.menuPDF && (
              <Text style={styles.errorText}>{errors.menuPDF}</Text>
            )}

            <RNPickerSelect
              placeholder={{ label: "Nível de preço", value: null }}
              value={priceLevel}
              onValueChange={setPriceLevel}
              items={[
                { label: "$", value: 1 },
                { label: "$$", value: 2 },
                { label: "$$$", value: 3 },
                { label: "$$$$", value: 4 },
              ]}
              style={pickerSelectStyles}
            />
            {errors.priceLevel && (
              <Text style={styles.errorText}>{errors.priceLevel}</Text>
            )}

            <RNPickerSelect
              placeholder={{ label: "Tipo de cozinha", value: null }}
              value={cuisineType}
              onValueChange={setCuisineType}
              items={[
                { label: "Brasileira 💛", value: "Brasileira" },
                { label: "Francesa 💙", value: "Francesa" },
                { label: "Italiana 💚", value: "Italiana" },
                { label: "Japonesa ❤", value: "Japonesa" },
              ]}
              style={pickerSelectStyles}
            />
            {errors.cuisineTypeId && (
              <Text style={styles.errorText}>{errors.cuisineTypeId}</Text>
            )}
            <RNPickerSelect
              placeholder={{ label: "Avaliação", value: null }}
              value={rating}
              onValueChange={setRating}
              items={[
                { label: "⭐", value: 1 },
                { label: "⭐⭐", value: 2 },
                { label: "⭐⭐⭐", value: 3 },
              ]}
              style={pickerSelectStyles}
            />
            {errors.rating && (
              <Text style={styles.errorText}>{errors.rating}</Text>
            )}
            <MultiSelect
              items={[
                { id: "Segunda-feira", name: "Segunda-feira" },
                { id: "Terça-feira", name: "Terça-feira" },
                { id: "Quarta-feira", name: "Quarta-feira" },
                { id: "Quinta-feira", name: "Quinta-feira" },
                { id: "Sexta-feira", name: "Sexta-feira" },
                { id: "Sábado", name: "Sábado" },
                { id: "Domingo", name: "Domingo" },
              ]}
              uniqueKey="id"
              onSelectedItemsChange={(selectedItems) =>
                setOpeningDays(Array.isArray(selectedItems) ? selectedItems : [])
              }
              selectedItems={Array.isArray(openingDays) ? openingDays : []}
              selectText="Selecione os dias de funcionamento"
              searchInputPlaceholderText="Buscar dias..."
              tagRemoveIconColor="#666"
              tagBorderColor="#666"
              tagTextColor="#000"
              selectedItemTextColor="#666"
              selectedItemIconColor="#666"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{ color: "#666" }}
              submitButtonColor="#666"
              submitButtonText="Selecionar"
              styleDropdownMenuSubsection={{
                backgroundColor: "rgba(206, 181, 145, 0.8)",
                borderWidth: 1,
                borderColor: "rgba(206, 181, 145, 0.8)",
                borderRadius: 4,
                marginBottom: 10,
                height: 40,
                paddingHorizontal: 10,
                marginTop: 29,
              }}
              styleInputGroup={{
                backgroundColor: "rgba(206, 181, 145, 0.8)",
                borderRadius: 4,
                height: 60,
              }}
              styleItemsContainer={{
                backgroundColor: "rgba(206, 181, 145, 0.8)",
                maxHeight: 200,
              }}
              styleListContainer={{
                backgroundColor: "rgba(206, 181, 145, 0.8)",
              }}
              styleSelectorContainer={{
                backgroundColor: "rgba(206, 181, 145, 0.8)",
              }}
              styleDropdownMenu={{
                backgroundColor: "rgba(206, 181, 145, 0.8)",
              }}
              styleTextDropdownSelected={{
                color: "#000",
              }}
              styleTextDropdown={{
                color: "#000",
              }}
              styleDropdownMenuTextInput={{
                backgroundColor: "rgba(206, 181, 145, 0.8)",
                borderRadius: 4,
                height: 50,
                paddingHorizontal: 10,
              }}
            />
            {errors.openingDays && (
              <Text style={styles.errorText}>{errors.openingDays}</Text>
            )}

            <MultiSelect
              items={[
                { id: "Dinheiro", name: "Dinheiro" },
                { id: "Cartão de Crédito", name: "Cartão de Crédito" },
                { id: "Cartão de Débito", name: "Cartão de Débito" },
                { id: "PIX", name: "PIX" },
              ]}
              uniqueKey="id"
              onSelectedItemsChange={(selectedItems) =>
                setPaymentMethods(
                  Array.isArray(selectedItems) ? selectedItems : []
                )
              }
              selectedItems={
                Array.isArray(paymentMethods) ? paymentMethods : []
              }
              selectText="Selecione os métodos de pagamento"
              searchInputPlaceholderText="Buscar métodos..."
              tagRemoveIconColor="#666"
              tagBorderColor="#666"
              tagTextColor="#000"
              selectedItemTextColor="#666"
              selectedItemIconColor="#666"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{ color: "#666" }}
              submitButtonColor="#666"
              submitButtonText="Selecionar"
              styleDropdownMenuSubsection={{
                backgroundColor: "rgba(206, 181, 145, 0.8)",
                borderWidth: 1,
                borderColor: "rgba(206, 181, 145, 0.8)",
                borderRadius: 4,
                marginBottom: 10,
                height: 40,
                paddingHorizontal: 10,
                marginTop: 30,
              }}
              styleInputGroup={{
                backgroundColor: "rgba(206, 181, 145, 0.8)",
                borderRadius: 4,
                height: 40,
              }}
              styleItemsContainer={{
                backgroundColor: "rgba(206, 181, 145, 0.8)",
                maxHeight: 200,
              }}
              styleListContainer={{
                backgroundColor: "rgba(206, 181, 145, 0.8)",
              }}
              styleSelectorContainer={{
                backgroundColor: "rgba(206, 181, 145, 0.8)",
              }}
              styleDropdownMenu={{
                backgroundColor: "rgba(206, 181, 145, 0.8)",
              }}
              styleTextDropdownSelected={{
                color: "#000",
              }}
              styleTextDropdown={{
                color: "#000",
              }}
              styleDropdownMenuTextInput={{
                backgroundColor: "rgba(206, 181, 145, 0.8)",
                borderRadius: 4,
                height: 40,
                paddingHorizontal: 10,
              }}
            />
            {errors.paymentMethods && (
              <Text style={styles.errorText}>{errors.paymentMethods}</Text>
            )}
            <TouchableOpacity
              onPress={selectPhoto}
              style={styles.buttonlikebackground}
            >
              <Text style={styles.textbutton}>Selecione uma foto 📸</Text>
            </TouchableOpacity>
            {photoUrl && (
              <Image
                source={{ uri: photoUrl }}
                style={{ width: 100, height: 100, marginVertical: 10 }}
              />
            )}
            {errors.photoUrl && (
              <Text style={styles.errorText}>{errors.photoUrl}</Text>
            )}
          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.textbutton}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.linha}></View>

      <TextInput
        placeholder="Pesquisar restaurantes por nome"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.input}
      />
      <View>
        {paginatedRestaurants.map((restaurant) => (
          <CardCadastro
            key={restaurant.id}
            restaurante={restaurant}
            abrirDetalhes={abrirDetalhes}
            editarRestaurante={handleEdit}
            excluirRestaurante={handleDelete}
          />
        ))}
      </View>

      <View style={styles.paginationContainer}>
        <TouchableOpacity onPress={handlePreviousPage}>
          <Animated.Text
            style={[styles.arrow, { transform: [{ translateX: leftArrowAnim }] }]}
          >
            ◀
          </Animated.Text>
        </TouchableOpacity>
        <Text style={styles.pageNumber}>
          {currentPage} / {numberOfPages}
        </Text>
        <TouchableOpacity onPress={handleNextPage}>
          <Animated.Text
            style={[styles.arrow, { transform: [{ translateX: rightArrowAnim }] }]}
          >
            ▶
          </Animated.Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </ScrollView>
  );
};

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    color: "#000",
    paddingRight: 30,
    marginBottom: 10,
    backgroundColor: "rgba(206, 181, 145, 0.8)",
    borderRadius: 4,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    color: "#000",
    paddingRight: 30,
    marginBottom: 10,
    backgroundColor: "rgba(206, 181, 145, 0.8)",
    borderRadius: 4,
  },
  placeholder: {
    color: "#000",
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
};

export default RestaurantForm;
