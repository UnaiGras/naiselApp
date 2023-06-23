import React, { useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet, Image } from "react-native";
import { TRENDING_PLANS } from "./searchQuerys";
import { useQuery } from "@apollo/client";
import { TouchableOpacity } from "react-native-gesture-handler";

export const SearchScreen = ({navigation}) => {

    const [searchQuery, setSearchQuery] = useState("");

    const {data} = useQuery(TRENDING_PLANS, {
      onError: err => {
        console.log(err)
      },
      onCompleted: onf => {
        console.log(onf)
      }
    })

    // Función para filtrar los planes según la consulta de búsqueda
    //const filteredPlans = plans.filter((plan) =>
    //  plan.name.toLowerCase().includes(searchQuery.toLowerCase())
    //);

    const renderGridItem = ({ item }) => {
      //const isPopular = item.clients.length >= 0;

      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PlanScreen", {data: item.id})
          }}
        >
          <View style={styles.cardContainer}>
            <Image source={{ uri: item.photo }} style={styles.photo} />
            <Text style={styles.name}>{item.planName}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.authorContainer}>
              <Image source={{ uri: item.author.profilePhoto }} style={styles.authorPhoto} />
              <Text style={styles.authorName}>{item.author.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar planes"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
    { data &&
        <FlatList
          data={data.requestTrendingPlans}
          renderItem={renderGridItem}
          keyExtractor={(item) => item._id}
        />
        }
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchBar: {
    height: 40,
    margin: 10,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  gridItem: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
  },
  popularItem: {
    borderWidth: 2,
    borderColor: "purple",
    alignSelf: "center",
  },
  cardContainer: {
    backgroundColor: '#151515',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  photo: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorPhoto: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  authorName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  
});
