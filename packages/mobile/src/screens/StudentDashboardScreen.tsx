import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { get } from '../api';

interface Badge {
  id: string;
  name: string;
  icon: string;
}

interface Job {
  _id: string;
  title: string;
  company: string;
}

const StudentDashboardScreen = () => {
  const [userXp, setUserXp] = useState(0);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const route = useRoute();
  const { userId } = route.params as { userId: string };

  useEffect(() => {
    // Fetch user data
    get(`/user`)
        .then(response => response.json())
        .then(data => {
            setUserXp(data.xp);
            // We'll keep badges as mock data for now
            setBadges([
                { id: '1', name: 'Bug Squasher', icon: '🐛' },
                { id: '2', name: 'Code Samurai', icon: '⚔️' },
            ]);
        })
        .catch(error => console.error(error));

    // Fetch jobs
    get('/jobs')
        .then(response => response.json())
        .then(data => setJobs(data))
        .catch(error => console.error(error));
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Dashboard</Text>
      <Text style={styles.xp}>Your XP: {userXp}</Text>
      <Text style={styles.sectionTitle}>Your Badges</Text>
      <FlatList
        data={badges}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeIcon}>{item.icon}</Text>
            <Text style={styles.badgeName}>{item.name}</Text>
          </View>
        )}
      />
      <Text style={styles.sectionTitle}>Job Board</Text>
      <FlatList
        data={jobs}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.jobContainer}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text>{item.company}</Text>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  badgeIcon: {
    fontSize: 30,
    marginRight: 10,
  },
  badgeName: {
    fontSize: 18,
  },
  jobContainer: {
    marginBottom: 20,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StudentDashboardScreen;
