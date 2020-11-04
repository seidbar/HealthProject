import React from 'react';
import * as shape from 'd3-shape';
import {
  StackedAreaChart,
  Grid,
  YAxis,
  XAxis,
  LineChart,
} from 'react-native-svg-charts';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  RefreshControl,
} from 'react-native';

const OverviewGraph = ({colors, keys, data}) => {
  const svgs = [];

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          height: 300,
          margin: 3,
        }}>
        <YAxis
          style={{marginBottom: 30, marginTop: -22}}
          data={StackedAreaChart.extractDataPoints(data, keys)}
          contentInset={{top: 0, bottom: 10}}
          min={0}
          max={1100}
          svg={{
            fontSize: 8,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 0.1,
            alignmentBaseline: 'baseline',
            baselineShift: '3',
          }}
        />
        <View style={{flex: 1, marginLeft: 10}}>
          <StackedAreaChart
            style={{flex: 1}}
            data={data}
            keys={keys}
            colors={colors}
            curve={shape.curveNatural}
            showGrid={false}
            svgs={svgs}
            gridMax={1000}>
            <Grid />
          </StackedAreaChart>
          <XAxis
            style={{
              height: 30,
              marginVertical: 10,
            }}
            data={data}
            formatLabel={(value, index) => value + 1}
            contentInset={{left: 10, right: 10}}
            svg={{fontSize: 10, fill: 'black'}}
          />
        </View>
      </View>
    </View>
  );
};

export default OverviewGraph;
