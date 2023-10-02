import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import { NOT_PROFILE_INFO } from './notProfileQuerys';
import { Ionicons } from '@expo/vector-icons';

export const NotProfileScreen = ({ navigation, route }) => {

    const userId = route.params.userId

    const [profile, setProfile] = useState(null)

    useQuery(NOT_PROFILE_INFO, {
        variables: {
            userId: userId
        },
        onCompleted: info => {
            setProfile(info.userProfileInfo)
        }
    })


    return (
      <View style={styles.container}>
        {profile &&
        <>
        <ScrollView>
            <View style={styles.userCard}>
              <Image source={{ uri: profile.profilePhoto }} style={styles.profilePhoto} />
              <Text style={styles.username}>{profile.username}</Text>
              <View style={styles.channelCard}>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                  <Text style={styles.channelTitle}>
                    <Ionicons name="megaphone" size={24} color="#a565f2" /> {profile.channel.name}
                  </Text>
                  <View style={styles.memberbox}>
                  <Text style={styles.membersCount}>
                    <Ionicons name="people" size={24} color="#a565f2" /> {profile.channel.membersCount}
                  </Text>
                  </View>
                </View>
                <Text style={styles.channelDescription} numberOfLines={1}>{profile.channel.description}</Text>
            </View>
            </View>
    

        <View style={styles.plansContainer}>
          <FlatList
            data={profile.plans}
            renderItem={({ item }) => (
              <View style={styles.planCard}>
                <Image source={{ uri: item.photo }} style={styles.planPhoto} />
                <Text style={styles.planName}>{item.planName}</Text>
                <Text style={styles.planType}>Type: {item.type}</Text>
                <Text style={styles.planDuration}>Duration: {item.duration}</Text>
                <Text style={styles.planDescription}>{item.description}</Text>
                <Text style={styles.planPrice}>${item.price}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        </ScrollView>
        </>
        }
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#1a1a1a',
      paddingHorizontal: 16,
  },
  userCard: {
      backgroundColor: '#212121',
      borderRadius: 20,
      padding: 20,
      marginVertical: 20,
      shadowColor: 'gray',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
  },
  profilePhoto: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 12,
      alignSelf: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
  },
  username: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: 20
  },
  channelCard: {
      backgroundColor: '#191919', // un tono similar para una sensación integrada
      borderRadius: 15,
      padding: 15,
      marginTop: 10,
  },
  channelTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      color: '#b5b5b5',
      fontSize: 18
  },
  channelDescription: {
      color: '#999',
      fontSize: 16,
      marginTop: 10
  },
  membersCount: {
      color: '#999',
      fontSize: 16,
      flexDirection: 'row',
      alignItems: 'center',
  },
  memberbox: {
    marginLeft: 5,
    backgroundColor: "#2a2a2a",
    paddingVertical:5,
    paddingHorizontal: 15,
    borderRadius: 20
  },
  plansContainer: {
      marginTop: 20
  },
  planCard: {
      backgroundColor: '#212121',
      borderRadius: 15,
      padding: 15,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
  },
  planPhoto: {
      width: '100%',
      height: 150,
      borderRadius: 10,
      marginBottom: 15
  },
  planName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 10
  },
  planType: {
      fontSize: 18,
      color: '#b5b5b5',
      marginBottom: 10
  },
  planDuration: {
      fontSize: 16,
      color: '#b5b5b5',
      marginBottom: 10
  },
  planDescription: {
      fontSize: 16,
      color: '#999',
      marginBottom: 15
  },
  planPrice: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white'
  }
});





