import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const VideoDetail = ({ route }) => {
  const { video } = route.params; // Asumimos que pasas el objeto del video completo a través de navigation

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: video.content }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        useNativeControls
        style={styles.videoPlayer}
      />
      <View style={styles.videoDetails}>
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.description}>{video.descrition}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
  videoPlayer: {
    flex: 1,
    width: '100%',
    aspectRatio: 16/9,
  },
  videoDetails: {
    padding: 10,
    borderTopColor: '#303030', // Una línea sutil para separar el video de los detalles
    borderTopWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f5f5f5',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#b5b5b5',
  },
});

export default VideoDetail;
