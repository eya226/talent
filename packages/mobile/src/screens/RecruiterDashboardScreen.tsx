import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { get } from '../api';

interface Badge {
  id: string;
  name: string;
  icon: string;
}

interface Student {
  _id: string;
  email: string;
  xp: number;
  badges: Badge[];
}

const RecruiterDashboardScreen = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    get('/users')
      .then(response => response.json())
      .then(data => {
          // Add mock badges for now
          const studentsWithBadges = data.map(student => ({
              ...student,
              badges: [
                { id: '1', name: 'Bug Squasher', icon: '🐛' },
                { id: '2', name: 'Code Samurai', icon: '⚔️' },
              ]
          }));
          setStudents(studentsWithBadges);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recruiter Dashboard</Text>
      <FlatList
        data={students}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.studentContainer}>
            <Text style={styles.studentName}>{item.email}</Text>
            <Text>XP: {item.xp}</Text>
            <Text style={styles.badgesTitle}>Badges:</Text>
            <FlatList
              data={item.badges}
              keyExtractor={badge => badge.id}
              renderItem={({ item: badge }) => (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeIcon}>{badge.icon}</Text>
                  <Text>{badge.name}</Text>
                </View>
              )}
            />
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
  studentContainer: {
    marginBottom: 20,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  badgesTitle: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  badgeIcon: {
    fontSize: 20,
    marginRight: 5,
  },
});

export default RecruiterDashboardScreen;
