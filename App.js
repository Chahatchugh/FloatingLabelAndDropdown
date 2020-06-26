/**
 * npm i --save react-native-floatinglabel-and-dropdown
 * @author Chahat Chugh
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import FloatingLabel from './src/FloatingLabel';

const App = () => {
  return (
    <>
      <SafeAreaView>
        <FloatingLabel/>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },git
});

export default App;
