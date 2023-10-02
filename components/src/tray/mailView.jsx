import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const MessageScreen = ({ route }) => {
  const { message } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
      <TouchableOpacity style={styles.senderCard}>
        <Image 
          source={{ uri: message.from.profilePhoto }} 
          style={styles.senderImage}
        />
        <Text style={styles.senderName}>{message.from.username}</Text>
      </TouchableOpacity>
      <Text style={styles.subject}>{message.subject}</Text>
      <Text style={styles.date}>enviado: {message.sentAt}</Text>
      <Text style={styles.message}>{message.message}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    padding: 16,
  },
  senderCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A2A2E', // Un poco más oscuro que el resto del componente
    padding: 10,
    borderRadius: 10,
    marginVertical: 16,
    shadowColor: "#a565f2",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 4, // Esta propiedad es para Android
  },
  senderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  senderName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subject: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    color: 'gray',
    fontSize: 14,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "gray"
  },
  message: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default MessageScreen;
