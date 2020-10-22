import React from 'react';
import {View, Text} from 'react-native';

const Options = () => {
  const logging = () => {
    console.log('ayyyyy');
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Options Screen</Text>
    </View>
  );
};

export default Options;
