import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import api from './services/api';

export default function App() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    api.get('techs').then((res) => setTechs(res.data));
  }, []);

  async function handleAddTech() {
    const response = await api.post('techs', {
      title: `Nova tecnologia ${Date.now()}`,
      owner: 'Lucão',
    });

    const tech = response.data;
    setTechs([...techs, tech]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={techs}
          keyExtractor={(tech) => tech.id}
          renderItem={({ item: tech }) => (
            <Text style={styles.title}>{tech.title}</Text>
          )}
        />

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={handleAddTech}
        >
          <Text style={styles.buttonText}>Adicionar Tecnologia</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },
  title: {
    fontSize: 20,
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
