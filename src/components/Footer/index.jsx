import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import styles from './style';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.line}></View>

      <View style={styles.textall} >
        <Text style={styles.title}>Endereço</Text>
        <Text style={styles.text}>ENDEREÇO: R. ARTUR FERNANDES QUERIDO, 55 - VILA SANTO ANTONIO, VALINHOS - SP, 13270-530. SENAI VALINHOS CE:564</Text>
      </View>

      <View style={styles.textall}>
        <Text style={styles.title}>Nosso trabalho</Text>
        <Text style={styles.text}>NÓS SOMOS A ELITE CODERS, UMA EQUIPE DO SENAI-SP FORMADA POR UM GRUPO DE ESTUDANTES MOTIVADOS E DEDICADOS A APRENDER E DESENVOLVER SUAS HABILIDADES EM SUAS ÁREAS DE INTERESSE. CADA MEMBRO DA EQUIPE TRAZ CONSIGO SUA PRÓPRIA PERSPECTIVA ÚNICA E CONJUNTO DE HABILIDADES, TORNANDO NOSSA EQUIPE DIVERSA E CRIATIVA. TRABALHAMOS JUNTOS EM PROJETOS DESAFIADORES, BUSCANDO SEMPRE SUPERAR NOSSOS LIMITES E APRENDER COM NOSSOS ERROS.</Text>
      </View>

      <View style={styles.line}></View>

      <View style={styles.center} >
        <Image source={require('../../../assets/logonova.png')} style={styles.logo} />
        <Text style={styles.text}>© Todos os direitos reservados</Text>
        <Text style={styles.text}>EliteChefs ™  2024</Text>
      </View>
      
    </View>
  );
}

export default Footer;