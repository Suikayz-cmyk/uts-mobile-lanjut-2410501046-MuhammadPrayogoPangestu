import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image
} from 'react-native';

import { useState } from 'react';
import { searchMeals } from '../services/mealApi';

export default function SearchScreen() {

const [keyword, setKeyword] = useState('');
const [results, setResults] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

const handleSearch = async () => {
  const cleanKeyword = keyword.trim();

  if (!cleanKeyword) {
    setError('Masukkan nama makanan');
    return;
  }

  if (cleanKeyword.length < 2) {
    setError('Minimal 2 karakter');
    return;
  }

  try {
    setLoading(true);
    setError('');

    const data = await searchMeals(cleanKeyword);
    setResults(data);

  } catch (err) {
    setError('Gagal mencari data');
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cari Resep</Text>

      <TextInput
        style={styles.input}
        placeholder="Contoh: chicken"
        value={keyword}
        onChangeText={(text) => {
          setKeyword(text);
          setError('');
        }}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSearch}
      >
        <Text>Cari</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loading && <ActivityIndicator size="large" />}

      <FlatList
        data={results}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.strMealThumb }}
              style={styles.image}
            />
            <Text>{item.strMeal}</Text>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
 container: {
    flex: 1,
    padding: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  button: {
    padding: 12,
    backgroundColor: '#47bbe9',
    alignItems: 'center',
    borderRadius: 8,
  },

  error: {
    color: 'red',
    marginTop: 10,
  },

  card: {
    marginTop: 16,
  },

  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
});