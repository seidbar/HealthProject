import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

// A simple component to display progress
const ProgressBar = ({name, goal, value, measure}) => {
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
      fontSize: 18,
      fontWeight: '400',
    },
    container: {
      height: 30,
      width: '100%',
      backgroundColor: '#e0e0de',
      borderRadius: 20,
      marginTop: 10,
    },

    filler: {
      height: '100%',
      width: `${(value / goal) * 100}%`,
      backgroundColor: 'rgb(71, 173, 71)',
      borderRadius: 20,
      textAlign: 'right',
    },
  });

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{name}</Text>
      <Text style={styles.sectionDescription}>
        {value} / {goal} {measure}
      </Text>
      <View style={styles.container}>
        <View style={styles.filler}></View>
      </View>
    </View>
  );
};

export default ProgressBar;
