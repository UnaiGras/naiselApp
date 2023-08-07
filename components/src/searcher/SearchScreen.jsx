import React, { useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet, Image } from "react-native";
import { TRENDING_PLANS } from "./searchQuerys";
import { useQuery } from "@apollo/client";
import { TouchableOpacity } from "react-native-gesture-handler";

export const SearchScreen = ({navigation}) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [list, setList] = useState({})

    const {data} = useQuery(TRENDING_PLANS, {
      onError: err => {
        console.log(err)
      },
      onCompleted: onf => {
        const reversed = onf.requestTrendingPlans.slice().reverse()

        setList(reversed)
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
          
                {item.planTokensLenghtResponse === 250 &&
                  <ShortResponseTag/>
                }
              
                {item.planTokensLenghtResponse === 500 &&
                  <MediumResponseTag/>
                }

                {item.planTokensLenghtResponse === 750 &&
                  <LargeResponseTag/>
                }
                
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
    { list &&
        <FlatList
          data={list}
          renderItem={renderGridItem}
          keyExtractor={(item) => item._id}
        />
        }
      </View>
    );
};

const ShortResponseTag = () => {
  return(
    <View style={styles.shortResponse}>
      <Text>Respuestas Cortas</Text>
    </View>
  )
}

const MediumResponseTag = () => {
  return(
    <View style={styles.mediumResponse}>
      <Text>Respuestas Medianas</Text>
    </View>
  )
}

const LargeResponseTag = () => {
  return(
    <View style={styles.largeResponse}>
      <Text>Respuestas Grandes</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  shortResponse: {
    backgroundColor: "blue",
    padding: 5,
    borderWidth: 0.5,
    borderColor: "blue",
    opacity: 0.6,
    alignSelf: "flex-start",
    borderRadius: 10
  },
  mediumResponse: {
    backgroundColor: "red",
    padding: 5,
    borderWidth: 0.5,
    borderColor: "red",
    opacity: 0.6,
    alignSelf: "flex-start",
    borderRadius: 10,
    color: 'white',
  },
  largeResponse: {
    backgroundColor: "#a565f2",
    padding: 5,
    borderWidth: 0.5,
    borderColor: "#a565f2",
    opacity: 0.6,
    alignSelf: "flex-start",
    borderRadius: 10,
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: "#101010",
  },
  searchBar: {
    height: 40,
    margin: 10,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    color: 'white',
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
    padding: 5,
    margin: 16,
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
    color: 'white',
  },
  price: {
    fontSize: 16,
    marginBottom: 8,
    color: 'white',
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
    color: 'white',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,

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
    color: 'white',
  },
  
});
