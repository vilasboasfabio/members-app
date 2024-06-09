import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';
import axios from 'axios';
import styles from './styles';
import Footer from '../../components/Footer';

const ContatoForm = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [menssagem, setMenssagem] = useState('');
  const [errors, setErrors] = useState({});
  const [contatos, setContatos] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const handleSubmit = async () => {
    let validationErrors = {};

    if (!nome) validationErrors.nome = 'Nome é obrigatório';
    if (!email) validationErrors.email = 'E-mail é obrigatório';
    if (!telefone) validationErrors.telefone = "Telefone é obrigatório";
    if (!menssagem) validationErrors.menssagem = 'Mensagem é obrigatório';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      clearErrorsAfterTimeout();
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/contatos`, {
        nome,
        email,
        telefone,
        menssagem,
      });
      setSuccessMessage('Sua mensagem foi enviada com sucesso');
      setNome('');
      setEmail('');
      setTelefone('');
      setMenssagem('');
      setErrors({});
      clearSuccessMessageAfterTimeout();
    } catch (error) {
      console.error('erro:', error);
      setSuccessMessage('Sua mensagem foi enviada com sucesso!');
      clearSuccessMessageAfterTimeout();
    }
  };

  const clearErrorsAfterTimeout = () => {
    setTimeout(() => {
      setErrors({});
    }, 4000);
  };

  const clearSuccessMessageAfterTimeout = () => {
    setTimeout(() => {
      setSuccessMessage('');
    }, 10000);
  };

  const handleTelefoneChange = (text) => {
    const formattedText = text.replace(/[^\d]/g, '');
    setTelefone(formattedText);
  };

  useEffect(() => {
    getContatos();
  }, []);

  const getContatos = async () => {
    try {
      const response = await axios.get(`${apiUrl}/contatos`);
      setContatos(response.data);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Contato</Text>
        <Text style={styles.subtitle}>Que tal darmos o primeiro passo juntos? Solicite o contato conosco e responderemos através do e-mail ou número fornecido.</Text>
        {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
        <View style={styles.fundoinputs}>
          <View style={styles.inputGroup}>
            <TextInput
              value={nome}
              onChangeText={setNome}
              style={styles.input}
              placeholder="Nome"
              required
            />
            {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder="E-mail"
              keyboardType="email-address"
              required
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              value={menssagem}
              onChangeText={setMenssagem}
              style={styles.input}
              placeholder="Mensagem"
              multiline
              required
            />
            {errors.menssagem && <Text style={styles.errorText}>{errors.menssagem}</Text>}
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              value={telefone}
              onChangeText={handleTelefoneChange}
              style={styles.input}
              placeholder="Telefone"
              keyboardType="phone-pad"
              required
            />
            {errors.telefone && <Text style={styles.errorText}>{errors.telefone}</Text>}
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.textbutton}>Enviar</Text>
          </TouchableOpacity>
        </View>

      </View>
      <Footer />
    </ScrollView>
  );
};

export default ContatoForm;
