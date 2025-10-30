import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { get, post } from '../api';

interface Quest {
  _id: string;
  title: string;
  description: string;
  xp: number;
}

const GameWorldScreen = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [userXp, setUserXp] = useState(0);

  useEffect(() => {
    get('/quests')
      .then(response => response.json())
      .then(data => setQuests(data))
      .catch(error => console.error(error));

    get('/user')
        .then(response => response.json())
        .then(data => setUserXp(data.xp))
        .catch(error => console.error(error));
  }, []);

  const completeQuest = (questId: string) => {
    post('/quests/complete', { questId })
      .then(response => response.json())
      .then(data => {
        setUserXp(data.xp);
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bug Hunter's Guild</Text>
      <Text style={styles.xp}>Your XP: {userXp}</Text>
      <FlatList
        data={quests}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.questContainer}>
            <Text style={styles.questTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>XP: {item.xp}</Text>
            <Button title="Complete" onPress={() => completeQuest(item._id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  xp: {
    fontSize: 18,
    marginBottom: 20,
  },
  questContainer: {
    marginBottom: 20,
  },
  questTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameWorldScreen;
