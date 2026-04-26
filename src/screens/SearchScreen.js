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

export default function SearchScreen({ navigation }) {

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

  if (cleanKeyword.length < 3) {
    setError('Minimal 3 karakter');
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
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSearch}
      >
       <Text style={styles.buttonText}>
          Cari
        </Text>
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loading && <ActivityIndicator size="large" />}

      <FlatList
        data={results}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('Home', {
              screen: 'Detail',
              params: {
                idMeal: item.idMeal
              }
            })
          }
        >
          <Image
            source={{ uri: item.strMealThumb }}
            style={styles.image}
          />

          <View style={styles.info}>
            <Text
              style={styles.mealTitle}
              numberOfLines={2}
            >
              {item.strMeal}
            </Text>

            <Text style={styles.subtitle}>
              Tap for detail
            </Text>
          </View>
        </TouchableOpacity>
      )}
      showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          !loading && keyword !== '' ? (
            <Text style={styles.empty}>
              Tidak ditemukan
            </Text>
          ) : null
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
 container: {
    flex: 1,
    padding: 16,
    backgroundColor:'#fff',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    height: 48,
    paddingHorizontal: 14
  },

  button: {
    padding: 12,
    backgroundColor: '#47bbe9',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 8,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },

  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },

  mealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },

  subtitle: {
    marginTop: 6,
    color: '#666',
    fontSize: 13,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
  empty: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
  },
});