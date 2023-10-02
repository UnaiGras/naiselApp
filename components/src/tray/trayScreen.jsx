import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useQuery } from '@apollo/client'; // Importa useQuery de Apollo Client
import { Ionicons } from '@expo/vector-icons';
// Importa la consulta GraphQL
import { GET_USER_TRAY } from './trayQuerys'; // Asegúrate de ajustar la ruta correcta

export const Inbox = ({navigation, route}) => {
  // Utiliza useQuery para realizar la consulta GraphQL

  const {maker} = route.params
  console.log(maker, "this is maker")

  const [mails, setMails] = useState({})

  const { loading, error, data } = useQuery(GET_USER_TRAY);

  const handleMessagePress = (message) => {
    // Navega a la pantalla MessageScreen y pasa el mensaje como parámetro
    navigation.navigate('MessageScreen', { message });
  };

  const handlePressButton = () => {
    navigation.navigate("SendMailScreen")
  }

  useEffect(() => {
      if (data) {
        console.log(data)
        setMails(data.getUserTray.mails)
      }
  }, [data])

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bandeja de entrada</Text>
      <FlatList
        data={mails}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleMessagePress(item)}
          >
            <View style={styles.mailHeader}>
              <Image 
                source={{ uri: item.from.profilePhoto }} 
                style={styles.senderImage}
              />
              <Text style={styles.senderName}>{item.from.username}</Text>
              <Text style={styles.sentAt}>{item.sentAt}</Text>
            </View>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text numberOfLines={1} style={styles.messageSnippet}>{item.message}</Text>
          </TouchableOpacity>
        )}
      />
  { maker &&
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
      }
    </View>
  );
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#101010',
      padding: 15,
    },
    header: {
      fontSize: 24,
      fontWeight: '500',
      color: 'white',
      marginBottom: 15,
    },
    listItem: {
      padding: 10,
      borderWidth: 0.5,
      borderColor: '#3A3A3C',
      borderBottomWidth: 3,
      borderRightWidth: 3,
      borderRightColor: '#3A3A3C',
      borderBottomColor: '#3A3A3C',
      marginBottom: 5,
      borderRadius: 20
    },
    mailHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    senderImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    senderName: {
      flex: 1,
      color: 'white',
      fontWeight: '500',
    },
    sentAt: {
      color: 'gray',
      fontSize: 12,
    },
    subject: {
      marginTop: 5,
      color: 'white',
      fontWeight: 'bold',
    },
    messageSnippet: {
      color: 'gray',
      marginTop: 2,
      fontSize: 12,
    },
    fab: {
      position: 'absolute',
      width: "90%",
      height: 40,
      backgroundColor: '#a565f2',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: "center",
      bottom: 40,
      shadowColor: '#a565f2',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 4,
    }
  });



export default Inbox;
