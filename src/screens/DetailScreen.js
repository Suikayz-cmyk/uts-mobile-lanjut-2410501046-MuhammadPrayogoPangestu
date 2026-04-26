import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';

import { useEffect, useState } from 'react';
import { getMealDetail } from '../services/mealApi';
import useFavoriteStore from '../store/favoriteStore';

export default function DetailScreen({ route}) {

  const [meal, setMeal] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { idMeal } = route.params;
  const ingredients = meal
  ? Array.from({ length: 20 }, (_, index) =>
      meal[`strIngredient${index + 1}`]
    ).filter(
      (item) => item && item.trim() !== ''
    )
  : [];

  const loadDetail = async () => {
    try {
      setError('');

      const data = await getMealDetail(idMeal);
      setMeal(data);

    } catch (err) {
      console.log(err);
      setError('Gagal memuat detail');
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = useFavoriteStore(
    (state) => state.addFavorite
  );

  const removeFavorite = useFavoriteStore(
    (state) => state.removeFavorite
  );

  const favorites = useFavoriteStore(
    (state) => state.favorites
  );

  const isFavorite = useFavoriteStore(
    (state) => state.isFavorite
  );

  const favoriteStatus = favorites.some(
    (item) => item.idMeal === meal?.idMeal
  );

  const handleFavoriteToggle = () => {
    if (favoriteStatus) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal);
    }
  };

  useEffect(() => {
    loadDetail();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }  

  return (
  <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{ uri: meal.strMealThumb }}
          style={styles.image}
        />

        <Text style={styles.title}>{meal.strMeal}</Text>

       <TouchableOpacity
          style={[
            styles.button,
            favoriteStatus && styles.removeButton
          ]}
          onPress={handleFavoriteToggle}
        >
          <Text style={styles.buttonText}>
            {favoriteStatus
              ? 'Hapus Favorit'
              : 'Tambah Favorit'}
          </Text>
        </TouchableOpacity>

        <View style={styles.metaRow}>
          <Text style={styles.meta}>
            Category: {meal.strCategory}
          </Text>

          <Text style={styles.meta}>
            Area: {meal.strArea}
          </Text>
        </View>
        
        <Text style={styles.section}>Ingredients:</Text>
        {ingredients.map((item, index) => (
          <Text key={index} style={styles.ingredientItem}>
           {item}
          </Text>
        ))}

        <Text style={styles.section}>
          Instructions
        </Text>

        <Text style={styles.instructions}>
          {meal.strInstructions}
        </Text>
      </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },

  image: {
    width: '100%',
    height: 240,
    borderRadius: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 14,
    marginBottom: 12,
  },

  section: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 18,
    marginBottom: 10,
  },

  button: {
    marginBottom: 18,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#2bb62d',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  removeButton: {
    backgroundColor: '#f32a2a'
  },

  ingredientItem: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },

  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  meta: {
    fontSize: 15,
    color: '#555',
  },

  instructions: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
  }

});