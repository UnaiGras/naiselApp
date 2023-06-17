import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { REQUEST_PLAN } from './planQuerys';

const PlanScreen = ({ navigation, route}) => {

    const [plan, setPlan] = useState(null)

    const planId = route.params.data

    useQuery(REQUEST_PLAN, {
        variables: {
            planId: planId
        },
        onCompleted: data => {
            setPlan(data.specificPlanById)
        }
    })

    const handleAuthorProfilePress = () => {
        if (plan){
            navigation.navigate("NotProfileScreen", {userId: plan.author.id})
        }
    };

    const handleGetPlanPress = () => {
      
    };

    return (
      <View style={styles.container}>
        { plan &&
        <>
            <Image source={{ uri: plan.photo }} style={styles.photo} />
                <TouchableOpacity style={styles.authorContainer} onPress={handleAuthorProfilePress}>
                  <Image source={{ uri: plan.author.profilePhoto }} style={styles.authorPhoto} />
                  <Text style={styles.authorName}>{plan.author.username}</Text>
                </TouchableOpacity>
            <Text style={styles.name}>{plan.planName}</Text>
            <Text style={styles.description}>{plan.description}</Text>
            <View style={{ alignItems: "center", marginVertical: 30}}>
                <Text style={styles.price}>{plan.price}</Text>
                <TouchableOpacity style={styles.getPlanButton} onPress={handleGetPlanPress}>
                  <Text style={styles.getPlanButtonText}>Obtener plan</Text>
                </TouchableOpacity>
            </View>
        </>
        }
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  photo: {
    width: '100%',
    height: 300,
    marginBottom: 12,
    borderRadius: 8,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: "#151515",
    borderRadius: 8,
    paddingVertical: 10,
    justifyContent: "center"
  },
  authorPhoto: {
    width: 32,
    height: 32,
    borderRadius: 32,
    marginRight: 8,
  },
  authorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 26,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
  },
  getPlanButton: {
    backgroundColor: '#a565f2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: "90%"
  },
  getPlanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default PlanScreen;
