import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { MY_INFO } from './gestionQuerys';
import AppBar from '../home/AppBar';

export const ProfileScreen = ({ navigation }) => {

    const [profInfo, setProfileInfo] = useState(null)

    useQuery(MY_INFO, {
        onCompleted: data => {
            console.log(data)
            setProfileInfo(data.myProfileInfo)
        }
    })

    const handleTrainVoice = () => {
      navigation.navigate("VoiceTrainingScreen")
    };
    
    const handleManagePlansPress = () => {
        navigation.navigate("Plans")
    }

    const handleContactsPress = () => {
      // Lógica para mostrar los contactos
    };

    const handleBecome = () => {
      navigation.navigate("BecomeMakerForm")
    }

    const handleCreateChannelPress = () => {
      navigation.navigate("CreateChannelScreen")
    }

    const handleEditProfilePress = () => {
      navigation.navigate("EditProfile", {
        data: profInfo,
        photo: profInfo.profilePhoto
      })
    };

    const handleInviteFriendsPress = () => {
      // Lógica para invitar amigos
    };

    return (
      <View style={styles.container}>
    { profInfo &&
    <>
        <Image source={{ uri: profInfo.profilePhoto }} style={styles.profilePhoto} />
        <Text style={styles.name}>{profInfo.name}</Text>
        <Text style={styles.email}>{profInfo.email}</Text>
        <Text style={styles.username}>{profInfo.username}</Text>
        {profInfo.planMaker === true &&
        <>
            <TouchableOpacity style={styles.PremiumButton} onPress={handleManagePlansPress}>
              <Text style={styles.buttonText}>Gestionar planes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.PremiumButton} onPress={handleTrainVoice}>
            <Text style={styles.buttonText}>Entrenar Voz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.PremiumButton} onPress={handleCreateChannelPress}>
            <Text style={styles.buttonText}>Crear un Canal</Text>
        </TouchableOpacity>
          </>
        }
        <TouchableOpacity style={styles.button} onPress={handleContactsPress}>
          <Text style={styles.buttonText}>Contactos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleEditProfilePress}>
          <Text style={styles.buttonText}>Editar perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleInviteFriendsPress}>
          <Text style={styles.buttonText}>Invitar amigos</Text>
        </TouchableOpacity>
        {profInfo.planMaker === false &&
        <TouchableOpacity 
        style={styles.button} 
        onPress={handleBecome}
        >
          <Text style={styles.buttonText}>Convertirse en Creador</Text>
        </TouchableOpacity>
        }
    </>
        }
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#101010',
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: "white"
  },
  email: {
    fontSize: 16,
    marginBottom: 8,
    color: "white"
  },
  username: {
    fontSize: 16,
    marginBottom: 24,
    color: "white"
  },
  button: {
    backgroundColor: '#191919',
    padding: 16,
    borderRadius: 8,
    marginVertical: 12,
    width: "90%",
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  PremiumButton: {
    backgroundColor: '#a565f2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: "90%",
    alignItems: 'center',
  }
});


