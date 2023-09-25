import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { GET_PLAN_CONTENT } from '../chat/chatQuerys';
import { useQuery } from '@apollo/client';
import { ImagesScreen } from './ImagesScreen';  // Asegúrate de que la ruta sea correcta

const PlanContentDisplay = ({ navigation, route }) => {
  console.log("Render PlanContentDisplay")
  const { planId } = route.params;

  const [selectedComponent, setSelectedComponent] = useState("null");


  const { data } = useQuery(GET_PLAN_CONTENT, { variables: { planId } });
  const plan = data?.getPlanContentById;

  return (
    <ScrollView style={{ backgroundColor: "#101010" }}>
      <View style={styles.container}>
        <Image source={{ uri: plan?.photo }} style={styles.planImage} />
        <Text style={styles.planName}>{plan?.planName}</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.planCard, styles.button]} onPress={() => setSelectedComponent('images')}>
            <Text style={styles.planTitle}>Imágenes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.planCard, styles.button]} onPress={() => navigation.navigate("VideosScreen", {planId: planId})}>
            <Text style={styles.planTitle}>Videos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          {selectedComponent === 'images' && <ImagesScreen planId={planId} />}
        </View>
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
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    margin: 5,
  },
  contentContainer: {
    marginTop: 20,
    width: '100%',
  },
});


export default PlanContentDisplay;