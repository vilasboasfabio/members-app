import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import styles from './styles';

const UserRegistrationForm = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [bio, setBio] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const handleSubmit = async () => {
    let validationErrors = {};

    if (!name) validationErrors.name = 'Nome é obrigatório';
    if (!email) validationErrors.email = 'Email é obrigatório';
    if (!password) validationErrors.password = 'Senha é obrigatória';
    if (!type) validationErrors.type = 'Tipo é obrigatório';
    if (!bio) validationErrors.bio = 'Bio é obrigatória';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      clearErrorsAfterTimeout();
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/usuarios`, {
        name,
        email,
        password,
        type,
        bio,
      });
      setMessage('User registered successfully');
      setName('');
      setEmail('');
      setPassword('');
      setType('');
      setBio('');
      setErrors({});
      navigation.navigate('Login'); // Redirect to login after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
      setMessage('Error registering user');
    }

    setTimeout(() => {
      setMessage('');
    }, 4000);
  };

  const clearErrorsAfterTimeout = () => {
    setTimeout(() => {
      setErrors({});
    }, 4000);
  };

  const getUsuarios = async () => {
    try {
      const response = await axios.get(`${apiUrl}/usuarios`);
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error getting users:', error);
    }
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastre-se e faça parte do nosso time!</Text>
        {message && <Text style={styles.title}>{message}</Text>}
        <Text style={styles.subtitle}>Para acessar a Spadium's, por favor, faça seu cadastro com as suas respectivas credenciais para validarmos a sua entrada.</Text>
        <View style={styles.fundoinputs}>
          <View style={styles.inputGroup}>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholder="Nome de usuário"
              required
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              required
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              required
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>
          <View style={styles.inputGroup}>
            <RNPickerSelect
              placeholder={{ label: "Selecione o tipo de usuário", value: null }}
              value={type}
              onValueChange={(value) => setType(value)}
              items={[
                { label: "Admin", value: "Admin" },
                { label: "User", value: "User" },
              ]}
              style={pickerSelectStyles}
            />
            {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              value={bio}
              onChangeText={setBio}
              style={styles.input}
              placeholder="Bio"
              multiline
              required
            />
            {errors.bio && <Text style={styles.errorText}>{errors.bio}</Text>}
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.textbutton}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
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
  },
};

export default UserRegistrationForm;
