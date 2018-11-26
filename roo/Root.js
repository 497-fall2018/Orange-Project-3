import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import {AppContainer} from './config/navigation';

import {Main} from './screens/Main';

class Root extends React.Component {

  render() {
    return (
      <AppContainer/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Root;