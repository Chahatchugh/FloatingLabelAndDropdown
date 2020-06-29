/**
 * npm i --save react-native-floatinglabel-and-dropdown
 * @author Chahat Chugh
 */

import React from 'react';
import {View, Text} from 'react-native';
import App, {FloatingLabel, Dropdown} from './App';

const Example = () => {
  return (
    <View style={{flex: 1}}>
      <App.FloatingLabel name={'name'} />
      <FloatingLabel name={'your'} />
      <Dropdown
        items={[{ value: 'yyy', label: 'aa'}, {value: 'yyy', label: 'aa'}]}
        onValueChange={(item)=> console.log('exmpl', item)}
        // style={{inputAndroidContainer: {backgroundColor: 'red'}}}
        // useNativeAndroidPickerStyle
      />
    </View>
  );
};

export default Example;
