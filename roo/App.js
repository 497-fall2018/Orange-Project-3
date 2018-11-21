import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//import {Main} from "./screens/Main"
import {AppContainer} from './config/navigation';

export default class App extends React.Component {
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
