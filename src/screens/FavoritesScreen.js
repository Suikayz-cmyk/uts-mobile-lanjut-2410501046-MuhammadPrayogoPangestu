import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';

import useFavoriteStore from '../store/favoriteStore';
import { useEffect, useState } from 'react';

export default function FavoritesScreen({ navigation }) {
  const favorites = useFavoriteStore(
    (state) => state.favorites
  );

  const removeFavorite = useFavoriteStore(
    (state) => state.removeFavorite
  );

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Belum ada resep favorit</Text>
      </View>
    );
  }

  

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.idMeal}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card}
         onPress={() =>
              navigation.navigate('Home', {
                screen: 'Detail',
                params: {
                  idMeal: item.idMeal
                }
              })
            }>

          <Image
            source={{ uri: item.strMealThumb }}
            style={styles.image}
          />

          <Text style={styles.title}>
            {item.strMeal}
          </Text>

          <Text>{item.strCategory}</Text>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => removeFavorite(item.idMeal)}
          >
            <Text style={styles.deleteText}>
              Hapus Favorit
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },

  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },

  deleteButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ff6b6b',
    borderRadius: 8,
    alignItems: 'center',
  },

  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});