import { View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import { useEffect, useState } from 'react';
import { getCategories } from '../services/mealApi';

export default function HomeScreen({ navigation }) {

 const [categories, setCategories] = useState([]);

 useEffect(() => {
    async function loadData() {
      const data = await getCategories();
      setCategories(data);
    }

    loadData();
  }, []);

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