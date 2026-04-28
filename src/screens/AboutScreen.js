import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../assets/Foto.jpg')}
        style={styles.avatar}
      />

      <Text style={styles.name}>
        Muhammad Prayogo Pangestu
      </Text>

      <Text style={styles.info}>
        2410501046
      </Text>

      <Text style={styles.info}>
        Kelas B - D3 Sistem Informasi
      </Text>

      <Text style={styles.section}>
        Tema yang Dipilih
      </Text>

      <Text style={styles.info}>
        Tema A: ResepKita - Katalog Resep Kuliner
      </Text>

      <Text style={styles.section}>
        API Credit
      </Text>

      <Text style={styles.info}>
        Data resep menggunakan
        TheMealDB API
      </Text>

      <Text style={styles.link}>
        https://www.themealdb.com/
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#FFFDF7',
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 16,
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  info: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },

  section: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },

  link: {
    color: 'blue',
    marginTop: 8,
  },
});