import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';

import api from './services/api';

export default function App() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    api.get('techs').then((res) => setTechs(res.data));
  }, []);

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
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
  },
});
