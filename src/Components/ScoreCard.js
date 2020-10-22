import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
const ScoreCard = ({score}) => {
  return (
    <>
      <View style={styles.scoreComponent}>
        <Text style={styles.scoreTitle}>Your Score Today</Text>
        <View style={styles.progressScore}>
          <Text style={styles.scoreNum}>{score}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scoreComponent: {
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    margin: 20,
  },
  progressScore: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 20,
    backgroundColor: '#ded',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNum: {
    fontSize: 55,
    fontWeight: '500',
  },
});

export default ScoreCard;
