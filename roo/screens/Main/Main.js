import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Content, Button, Text } from 'native-base';

export class Main extends React.Component {
  render() {
    return (
      <View style={styles.container}>

          <Text style={styles.title}>
            Roo
          </Text>

          <Text style={styles.description}>
            Meetings made simple.
          </Text>

          <Button block
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Host')}>
            <Text>Host</Text>
          </Button>

          <Button block
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Join')}>
            <Text>Join</Text>
          </Button>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 100,
  },

  button: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 20,
    marginLeft: 20,
  },

  title: {
    marginTop: 10,
    //marginBottom: 10,
    fontSize: 120
    //fontFamily: "Roboto"
  },

  description: {
    marginTop: 5,
    marginBottom: 40,
    //fontFamily: "Roboto",
    fontStyle: 'italic'
  },
});
