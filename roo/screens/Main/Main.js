import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Content, Button, Text } from 'native-base';

export class Main extends React.Component {
  render() {
    return (
      <View styles={styles.container}>
        <Button block
          onPress={() => this.props.navigation.navigate('Host')}>
          <Text>Host</Text>
        </Button>

        <Button block 
          onPress={() => this.props.navigation.navigate('Join')}>
          <Text>Join</Text>
        </Button>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});