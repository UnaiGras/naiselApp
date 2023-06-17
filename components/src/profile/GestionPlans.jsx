import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { REQUEST_MY_PLANS } from './gestionQuerys';
import { useQuery } from '@apollo/client';


const Card = ({ item }) => {
  return (
    <TouchableOpacity>
      <View style={styles.cardContainer}>
        <Image source={{ uri: item.photo }} style={styles.photo} />
        <Text style={styles.planName}>{item.planName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>{item.price}€</Text>
      </View>
    </TouchableOpacity>
  );
};

export const Plans = ({navigation}) => {

  const {data} = useQuery(REQUEST_MY_PLANS)

  const handleGoCreate = () => {
    navigation.navigate("CreatePlanForm")
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleGoCreate} >
          <Text>Crear Plan</Text>
      </TouchableOpacity>
    { data &&
    <>
        <View style={{backgroundColor: "#191919", paddingVertical: 6, borderWidth: 1, borderColor: "gray", width: "104%", alignSelf: "center"}}>
          <Text style={{fontSize: 22, fontWeight: "bold", marginLeft: 20}}>Planes De {data.requestMyPlans.username}</Text>
        </View>  
        <View style={styles.capsuledList}>
          <FlatList
            data={data.requestMyPlans.plans}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Card item={item} />}
          />
      </View>
      </>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },
  card: {
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10
  },
  description: {
    fontSize: 16,
    color: '#888888',
    marginBottom: 10
  },
  context: {
    fontSize: 16,
    color: '#888888',
  },
  price: {
    fontSize: 22,
    color: '#000000',
  },
  duration: {
    fontSize: 16,
    color: '#000000',
  },
  type: {
    fontSize: 16,
    color: '#000000',
  },
  photo: {
    width: "100%",
    height:170,
    borderRadius: 5,
    marginTop: 10,
  },
  button: {
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 15,
    marginVertical: 50,
    width: "80%",
    borderRadius: 10,
    backgroundColor: "#a565f2",
    marginTop: 50
  },
  capsuledList: {
    width: "90%",
    alignSelf: "center"
  },
  cardContainer: {
    width: "100%",
    backgroundColor: "#191919",
    marginVertical: 20,
    padding: 15,
    borderRadius: 10
  }
});

