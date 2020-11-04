import React, {useState} from 'react';
import {Path} from 'react-native-svg';
import {AreaChart, Grid} from 'react-native-svg-charts';
import * as shape from 'd3-shape';

const Chart = ({name, graphData, max}) => {
  const [data, setData] = useState(graphData);
  const Line = ({line}) => (
    <Path key={'line'} d={line} stroke={'rgb(134, 65, 244)'} fill={'none'} />
  );
  console.log(max);

  return data ? (
    <AreaChart
      style={{height: 200}}
      data={data}
      contentInset={{top: 30, bottom: 30}}
      curve={shape.curveNatural}
      max={max}
      min={0}
      svg={{fill: 'rgba(134, 65, 244, 0.2)'}}>
      <Grid />
      <Line />
    </AreaChart>
  ) : null;
};

export default Chart;
