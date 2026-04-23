import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { useEffect, useState } from 'react';
import { getCategories } from '../services/mealApi';

export default function HomeScreen({ navigation }) {

 const [categories, setCategories] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState('');

 useEffect(() => {
    async function loadData() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError('Gagal memuat data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading categories...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setLoading(true);
            loadData();
          }}
        >
          <Text>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
       {categories.map((item) => (
        <Text key={item.idCategory}>{item.strCategory}</Text>
      ))}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Browse')}>
        <Text>Browse</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Detail')}>
        <Text>Detail</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});