import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

// A simple component to display progress
const ProgressBar = ({name, goal, value}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{name}</Text>
      <Text style={styles.sectionDescription}>
        {value} / {goal}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#555',
  },
});

export default ProgressBar;
