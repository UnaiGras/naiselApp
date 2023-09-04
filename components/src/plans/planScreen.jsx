import {  useQuery, useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  Alert, 
  TouchableOpacity, 
  Linking 
} from "react-native";
import { REQUEST_PLAN, CREATE_CHECKOUT_SESSION } from './planQuerys';
import AnimatedLottieView from "lottie-react-native";



const PlanScreen = ({ navigation, route}) => {

    const [plan, setPlan] = useState(null)
    const [loadingAnimation, setLoadingAnimation] = useState(false)

    const planId = route.params.data

    useQuery(REQUEST_PLAN, {
        variables: {
            planId: planId
        },
        onCompleted: data => {
            setPlan(data.specificPlanById)
        }
    })

    const [createCheckoutSession, {data, error}] = useLazyQuery(CREATE_CHECKOUT_SESSION);

    const handleAuthorProfilePress = () => {
        if (plan){
            navigation.navigate("NotProfileScreen", {userId: plan.author.id})
        }
    };


    const handleGetPlanPress = () => {
      console.log("has entrado en handle")
      console.log(plan.id)
      createCheckoutSession({
          variables: {
              planId: plan.id
          }
      });
    };

    useEffect(() => {
      if (data && data.createCheckoutSession) {
          const handleOpenURL = async () => {
              const supported = await Linking.canOpenURL(data.createCheckoutSession);
              if (supported) {
                  Linking.openURL(data.createCheckoutSession);
              } else {
                  console.error("Don't know how to open this URL:", data.createCheckoutSession);
              }
          };
  
          handleOpenURL();
      }
      if (error) {
        console.log(error)
      }
  }, [data, error]);

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
                <Text style={styles.price}>{plan.price} €</Text>
                <TouchableOpacity style={styles.getPlanButton} onPress={handleGetPlanPress}>
                  <Text style={styles.getPlanButtonText}>Obtener plan</Text>
                </TouchableOpacity>
            </View>
            { loadingAnimation === true &&
                <View style={{
                  position: "absolute", 
                  padding: 10, 
                  backgroundColor: "#191919", 
                  bottom: "50%", 
                  alignSelf: "center", 
                  borderRadius: 20, 
                  alignItems: "center"
              }}>
                  <AnimatedLottieView
                      source={require("../../../assets/96085-green-check.json")}
                      autoPlay={loadingAnimation}
                      loop={false}
                      style={{
                          height: 100,
                          width: 100
                      }}
                  />
                  <Text style={{fontWeight: "800", fontStyle: "italic"}}>Compra realizada con exito.</Text>
              </View>
            }
            
        </>
        }
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
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
    color: "white"
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: "white"
  },
  price: {
    fontSize: 26,
    marginBottom: 8,
    color: "white"
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    color: "white"
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
  },
  cardInput: {
    borderRadius: 20,
    height: 50,
    backgroundColor: '#191919',
    width: "80%",
    marginHorizontal: 10,
    fontSize: 45,
    paddingHorizontal: 20
  },
  text: {
      fontSize: 18,
      fontStyle: 'italic',
      fontWeight: '700'
  }
});

export default PlanScreen;
