import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { GET_PLAN_CONTENT } from '../chat/chatQuerys';
import { useQuery } from '@apollo/client';
import { ImagesScreen } from './ImagesScreen';
import { Ionicons } from '@expo/vector-icons';

const PlanContentDisplay = ({ navigation, route }) => {
  console.log("Render PlanContentDisplay")
  const { planId } = route.params;

  const [selectedComponent, setSelectedComponent] = useState("null");
  const [plan, setPlan] = useState({})

  const { data } = useQuery(GET_PLAN_CONTENT, { 
    variables: { planId },
    onCompleted: response => {
      console.log(response)
      setPlan(response.getPlanContentById)
    }
  });
  

  return (
    <ScrollView style={{ backgroundColor: "#101010" }}>
      <View style={styles.container}>
        <Image source={{ uri: plan?.photo }} style={styles.planImage} />
        <View style={styles.headerFloating}>
          <Text style={styles.planName}>{plan?.planName}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setSelectedComponent('images')}>
            <Ionicons name="image-outline" size={28} color="#a565f2" />
            <Text style={styles.buttonText}>Imágenes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => {
            navigation.navigate("VideosScreen", 
            {
              planId: planId
            })
            }}>
            <Ionicons name="videocam-outline" size={28} color="#a565f2" />
            <Text style={styles.buttonText}>Videos</Text>
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
  },
  planImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerFloating: {
    position: 'absolute',
    top: 10,
    left: 16,
    backgroundColor: 'rgba(25, 25, 25, 0.9)', // color adaptado para el tema oscuro
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  planName: {
    fontSize: 20,
    color: '#a565f2',
    fontWeight: "bold",
    fontFamily: 'System',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 15,
    backgroundColor: '#191919',
    padding: 10,
    shadowColor: "#a565f2", // sombra púrpura
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 1.5,
    elevation: 2,
  },
  buttonText: {
    marginLeft: 10,
    color: '#a565f2',
    fontSize: 18,
    fontFamily: 'System',
  },
  contentContainer: {
    marginTop: 20,
    width: '100%',
  },
});



export default PlanContentDisplay;