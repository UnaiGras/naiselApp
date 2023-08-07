import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { NOT_PROFILE_INFO } from './notProfileQuerys';

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

    const renderPlan = ({ item }) => {
      return (
        <View style={styles.planCard}>
          <Image source={{ uri: item.photo }} style={styles.planPhoto} />
          <Text style={styles.planName}>{item.planName}</Text>
          <Text style={styles.planPrice}>{item.price}</Text>
          <Text style={styles.planDescription}>{item.description}</Text>
        </View>
      );
    };

    return (
      <View style={styles.container}>
    { profile &&
    <>
        <View style={styles.userInfo}>
          <Image source={{ uri: profile.profilePhoto }} style={styles.profilePhoto} />
          <Text style={styles.username}>{profile.username}</Text>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.email}>{profile.email}</Text>
        </View>
        <View style={styles.plansContainer}>
          <Text style={styles.plansTitle}>Mis planes</Text>
          <FlatList
            data={profile.plans}
            renderItem={renderPlan}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatlistContentContainer}
            showsVerticalScrollIndicator={false}
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
    paddingHorizontal: 16
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 24,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  name: {
    fontSize: 16,
    marginBottom: 12,
    color: 'white',
  },
  email: {
    fontSize: 14,
    marginBottom: 24,
    color: 'white',
  },
  plansContainer: {
    flex: 1,
    paddingTop: 16,
  },
  plansTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  flatlistContentContainer: {
    paddingBottom: 16,
  },
  planCard: {
    backgroundColor: '#151515',
    borderRadius: 12,
    padding: 6,
    marginBottom: 16,
  },
  planPhoto: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    borderRadius: 8,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  planPrice: {
    fontSize: 16,
    marginBottom: 8,
    color: 'white',
  },
  planDescription: {
    fontSize: 14,
    color: 'white',
  },
});


