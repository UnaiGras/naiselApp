import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';

const VideoDetail = ({ route }) => {
  const { video } = route.params;
  const [isFullScreen, setFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setFullScreen(!isFullScreen);
  };

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
        style={isFullScreen ? styles.videoPlayerFull : styles.videoPlayerSmall}
      />
      <TouchableOpacity onPress={toggleFullScreen}>
        <Text style={{ color: 'white' }}>{isFullScreen ? "Minimizar" : "Ampliar"}</Text>
      </TouchableOpacity>
      <View style={styles.videoDetails}>
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.description}>{video.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
  videoPlayerSmall: {
    width: '100%',
    aspectRatio: 16/9,
    height: (16/9) * 130, // Un ancho de 200 como ejemplo. Ajusta según tus necesidades.
  },
  videoPlayerFull: {
    flex: 1,
    aspectRatio: 16/9,
  },
  videoDetails: {
    padding: 10,
    borderTopColor: '#303030',
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
