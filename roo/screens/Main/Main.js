import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Content, Button, Text } from 'native-base';

export class Main extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button block>
          <Text>Host</Text>
        </Button>

        <Button block 
                onPress={() => this.props.navigation.navigate('Details')}>
          <Text>Join</Text>
        </Button>

      </View>
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