import React from 'react';
import {ProgressCircle} from 'react-native-svg-charts';
import {Text} from 'react-native-svg';

const ScoreCard = ({score}) => {
  return (
    <ProgressCircle
      style={{height: 200}}
      progress={score / 140}
      strokeWidth={20}
      progressColor={
        score < 15
          ? `rgb(176, 0, 0)`
          : score < 75
          ? `rgb(176, ${Math.floor(score * 2.34)}, 0)`
          : score < 100
          ? `rgb(${Math.floor(176 - (score - 75) * 5.02)}, 176, 0)`
          : score < 120
          ? `rgb(0, 176, ${Math.floor((score - 100) * 8.8)})`
          : score < 140
          ? `rgb(0, ${Math.floor(176 - (score - 120) * 4.4)}, 176)`
          : score === 140
          ? 'rgb(207, 181, 59)'
          : 'rgb(214, 214, 214)'
      }></ProgressCircle>
  );
};

export default ScoreCard;
