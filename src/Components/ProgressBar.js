import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

// A simple component to display progress
const ProgressBar = ({name, goal, value, measure}) => {
  const score = (value / goal) * 140;
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{name}</Text>
      <Text style={styles.sectionDescription}>
        {value} / {goal} {measure}
      </Text>
      <View style={styles.container}>
        <View
          style={{
            width: `${
              (value / goal) * 100 > 100 ? 100 : (value / goal) * 100 > 100
            }%`,
            backgroundColor:
              score < 15
                ? `rgb(176, 0, 0)`
                : score < 75
                ? `rgb(176, ${Math.floor(score * 2.34)}, 0)`
                : score > 75
                ? `rgb(${Math.floor(176 - (score - 75) * 5.02)}, 176, 0)`
                : score === 140
                ? 'rgb(255, 220, 43)'
                : 'rgb(214, 214, 214)',
            ...styles.filler,
          }}
        />
      </View>
    </View>
  );
};

export default ProgressBar;

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

    borderRadius: 20,
    textAlign: 'right',
  },
});
