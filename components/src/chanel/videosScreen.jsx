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
    }
  });

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const handleVideoPress = (video) => {
    // Suponiendo que tienes un componente VideoDetail donde se reproduce el video.
    navigation.navigate('VideoDetail', { video });
  };

  
  useEffect(() => {
    if (data) {
      console.log(data)
      setVideos(data.getContentVideosByPlan)
    }
  }, [data])

  
  return (
<View style={styles.container}>
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.videoCard} onPress={() => handleVideoPress(item)}>
          <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.descrition}</Text>
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
    flexDirection: 'row',
    marginVertical: 8,
    padding: 12,
    backgroundColor: '#242424',  // Color de fondo más claro para cada tarjeta
    borderRadius: 12,  // Bordes redondeados para las tarjetas
    alignItems: 'center',
  },
  thumbnail: {
    width: 150,
    height: 150,
    borderRadius: 8,  // Bordes redondeados para la miniatura
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f5f5f5',  // Color de texto claro para el título
  },
  description: {
    fontSize: 14,
    color: '#b5b5b5',  // Color de texto más claro para la descripción
  },
});



