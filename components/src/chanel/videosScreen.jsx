import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_VIDEOS_BY_PLAN } from './channelQuerys';

export const VideosScreen = ({ route, navigation }) => {

  const planId = route.params.planId
  
  const [videos, setVideos] = useState([])
  const { loading, error, data } = useQuery(GET_VIDEOS_BY_PLAN, {
    variables: { planId },
    onError: err => {
      console.log(err)
    },
    onCompleted: response => {
      setVideos(response.getContentVideosByPlan)
      console.log("this is the response", response)
    }
  });

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const handleVideoPress = (video) => {
    // Suponiendo que tienes un componente VideoDetail donde se reproduce el video.
    navigation.navigate('VideoDetail', { video });
  };

  
  return (
<View style={styles.container}>
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.videoCard} onPress={() => handleVideoPress(item)}>
          <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </TouchableOpacity>
      )}
    />
</View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',  // Color de fondo oscuro
    padding: 10,
  },
  videoCard: {
    marginVertical: 8,
    padding: 12,
    backgroundColor: '#242424',  // Color de fondo más claro para cada tarjeta
    borderRadius: 12,  // Bordes redondeados para las tarjetas
    alignItems: 'center',
  },
  thumbnail: {
    width: "100%",
    height: 200,
    borderRadius: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f5f5f5',
    alignSelf: "flex-start"  // Color de texto claro para el título
  },
  description: {
    fontSize: 14,
    color: '#b5b5b5',  // Color de texto más claro para la descripción
  },
});



