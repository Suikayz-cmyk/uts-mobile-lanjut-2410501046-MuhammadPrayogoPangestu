import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useEffect, useState } from 'react';

import { getMealsByCategory } from '../services/mealApi';

export default function BrowseScreen({ route, navigation }) {
  const [meals, setMeals] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { category } = route.params;

  const loadMeals = async () => {
    try {
      setLoading(true);
      const data = await getMealsByCategory(category);
      setMeals(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeals();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadMeals();
    setRefreshing(false);
  };

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
    <View style={styles.container}>
      <Text>Browse Screen</Text>

      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate('Detail', {
                idMeal: item.idMeal,
              })
            }
          >
            <Text>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 12,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});