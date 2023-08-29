import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { STATS_INFO } from './gestionQuerys';

// ... (código anterior)

function UserInfo() {
  // ... (código anterior)

  const { loading, error, data } = useQuery(STATS_INFO);

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const { name, email, money, profilePhoto, plans } = data.statsInfo;


  return (
    <View style={styles.container}>
      <Image source={{ uri: profilePhoto }} style={styles.profilePhoto} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.money}>${money}</Text>
      <Text style={styles.plans}>Planes: {plans.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75, // Esto hace que la imagen sea redonda
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  money: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  plans: {
    fontSize: 20,
  },
});

export default UserInfo;
