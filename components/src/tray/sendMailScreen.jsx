import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { useMutation } from '@apollo/client';
import { SEND_MAIL } from './trayQuerys'; // Asegúrate de ajustar la ruta
import { Ionicons } from '@expo/vector-icons';


const SendMailScreen = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [sendMail, { loading, error }] = useMutation(SEND_MAIL);

  const handleSend = async () => {
    try {
      const response = await sendMail({
        variables: { subject, message }
      });
      // Manejar la respuesta según tus necesidades
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Asunto"
        placeholderTextColor="#6c6c6c"
        onChangeText={setSubject}
        value={subject}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Mensaje"
        placeholderTextColor="#6c6c6c"
        onChangeText={setMessage}
        value={message}
        multiline
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Ionicons name="send" size={24} color="white" />
        <Text style={styles.sendText}>Enviar</Text>
      </TouchableOpacity>
      {loading && <Text>Cargando...</Text>}
      {error && <Text>Error: {error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1C1C1E',
  },
  input: {
    marginBottom: 16,
    padding: 15,
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    color: 'white'
  },
  textArea: {
    flex: 1,
    padding: 15,
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    color: 'white'
  },
  sendButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#a565f2',
    borderRadius: 8,
    marginVertical: 16
  },
  sendText: {
    marginLeft: 8,
    color: 'white',
    fontWeight: 'bold'
  }
});

export default SendMailScreen;
