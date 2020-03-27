import React from 'react';
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import { Feather } from '@expo/vector-icons'
import styles from './style';
import logoImg from '../../assets/logo.png';

export default function Detail() {
  const navigate = useNavigation();
  const route = useRoute();
  const incident = route.params.incident;
  const message = ` Ola APAD, estou entrando em contato pois gostaria de ajuda no caso ${incident.title}`
            + ` com o valor de ${Intl.NumberFormat('pt-BR', { style:'currency',currency: 'BRL'}).format(incident.value)}`;

  function navigateBack() {
    navigate.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: `,
      recipients: ['felipedb91@hotmail.com'],
      body: message
    })
  }

  function sendWhasApp() {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E82041"></Feather>
        </TouchableOpacity>
      </View>
      <View style={styles.incident}>
        <Text style={[styles.incidentPropertie, {marginTop: 0}]}>Ong: </Text>
        <Text style={styles.incidentValue}>{incident.nome} de {incident.cidade}/{incident.uf}</Text>
              
        <Text style={styles.incidentPropertie}>Caso: </Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>
              
        <Text style={styles.incidentPropertie}>VALOR: </Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat('pt-BR', { style:'currency',currency: 'BRL'}).format(incident.value)}
        </Text>
      </View>
      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse casso.</Text>
        <Text style={styles.heroDescription}>Entre em contato</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhasApp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}