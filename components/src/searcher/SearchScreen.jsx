import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet, Image } from "react-native";
import { TRENDING_PLANS } from "./searchQuerys";
import { useQuery, useLazyQuery } from "@apollo/client";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";


const ITEMS = [
  {
    name: "Juegos", 
    icon: "game-controller",
    color: "gray"
  },{
    name: "Valor",
    icon: "book",
    color: "gray"
  },{
    name: "Musica",
    icon: "musical-notes",
    color: "gray"
  },{
    name: "Noticias",
    icon: "newspaper",
    color: "gray"
  }, {
    name: "Entretenimiento",
    icon: "tv",
    color: "gray"
  }]

export const SearchScreen = ({navigation}) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [list, setList] = useState({})
    const [trend, setTrend] = useState("")

    const [requestData,{data}] = useLazyQuery(TRENDING_PLANS, {
      onError: err => {
        console.log(err)
      },
      onCompleted: onf => {
        const reversed = onf.requestTrendingPlans.slice().reverse()

        setList(reversed)
      }
    })

    useEffect(() => {
      if (trend) {
          requestData({
            variables:{
              trend: trend
            }
          })
      }
    }, [trend])

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

    const renderTrends = ({item}) => {
      return (
        <TouchableOpacity onPress={() => setTrend(item.name)} style={[styles.card, {borderColor: item.color}]}>
            <Ionicons name={item.icon} size={24} color={item.color} />
            <Text style={styles.cardText}>{item.name}</Text>
        </TouchableOpacity>
      )
    }

    return (
      <View style={styles.container}>
            <TextInput
              style={styles.searchBar}
              placeholder="Buscar planes"
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />
        {!data &&
        <View style={styles.listBox}>
          <FlatList
          data={ITEMS}
          renderItem={renderTrends}
          keyExtractor={(item) => item._id}
          numColumns={2}
          />
        </View>
        }
      {data &&
        <View>
        { list &&
            <FlatList
              data={list}
              renderItem={renderGridItem}
              keyExtractor={(item) => item._id}
            />
        }
        </View>
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
  
  container: {
    flex: 1,
    backgroundColor: "#111111",
  },
  searchBar: {
    height: 40,
    margin: 10,
    padding: 10,
    borderColor: "#4d4d4d",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#2c2c2e",
    color: 'white',
  },
  cardContainer: {
    backgroundColor: '#191919',
    borderRadius: 12,
    padding: 10,
    margin: 12,
    shadowColor: "gray",
    shadowOffset: {
      width: 4,
      height: 7,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 8,
  },
  photo: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'white',
  },
  price: {
    fontSize: 16,
    marginBottom: 4,
    color: '#9fa6b0',
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    color: '#9fa6b0',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorPhoto: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: 'white',
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  shortResponse: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginVertical: 4,
  },
  mediumResponse: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginVertical: 4,
  },
  largeResponse: {
    backgroundColor: "#34C759",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginVertical: 4,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.3,
    borderRadius:10,
    padding: 20,
    margin: 10,
    justifyContent: "space-around",
    width: 180
  },
  cardText: {
      marginLeft: 10,
      fontSize: 24,
      fontWeight: "bold",
      color: "white"
  },
  listBox: {

  }
});


