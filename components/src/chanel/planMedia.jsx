import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { GET_PLAN_CONTENT } from '../chat/chatQuerys';
import { useQuery } from '@apollo/client';

const PlanContentDisplay = ({ route }) => {
  const { planId } = route.params;
  const {data} = useQuery(GET_PLAN_CONTENT, {
    variables: {
        planId: planId
    }
  });

  const plan = data?.getPlanContentById;

  const [showImages, setShowImages] = useState(false);
  const [showVideos, setShowVideos] = useState(false);

  return (
    <ScrollView style={{backgroundColor: "#101010"}}>
    <View style={styles.container}>
      
      <Image source={{ uri: plan?.photo }} style={styles.planImage} />
      <Text style={styles.planName}>{plan?.planName}</Text>

      <TouchableOpacity style={styles.planCard} onPress={() => setShowImages(!showImages)}>
        <Text style={styles.planTitle}>Imágenes ({plan?.planImage.length})</Text>
        {showImages && (
          <ScrollView style={styles.planContent}>
            {plan?.planImage.map(img => (
              <Image key={img.id} source={{ uri: img.content }} style={styles.planContentImage} />
            ))}
          </ScrollView>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.planCard} onPress={() => setShowVideos(!showVideos)}>
        <Text style={styles.planTitle}>Videos ({plan?.planVideos.length})</Text>
        {showVideos && (
          <ScrollView style={styles.planContent}>
            {plan?.planVideos.map(video => (
              // Asumo que el video tiene un thumbnail. Si no es así, esto se puede ajustar.
              <Image key={video.id} source={{ uri: video.thumbnail }} style={styles.planContentImage} />
            ))}
          </ScrollView>
        )}
      </TouchableOpacity>
      
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
    padding: 16,
    alignItems: 'center',
  },
  planImage: {
    width: '100%',
    height: 400,
  },
  planName: {
    fontSize: 24,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontWeight: "bold",
    marginBottom: 20,
  },
  planCard: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  planContent: {
    padding: 15,
  },
  planTitle: {
    fontSize: 22,
    color: '#000',
    padding: 15
  },
  planContentImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  }
});

export default PlanContentDisplay;
