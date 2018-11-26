import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Content, Button, Text } from 'native-base';

export class Host extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomcode: '',
      error_message: '',
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  
  submitRoomCode() {
    const url = APIConfig.apiRoot + '/makeroom'
    axios.post(url, {roomcode:this.state.roomcode})
    .then((response) => {
      // move them to other screen.
      this.props.navigation.navigate('', {
        roomcode: this.state.roomcode
      })
    })
    .catch((err) => {
      // show error message
      this.setState({
        ...this.state,
        error_message: "Invalid roomcode. Check again with the facilitator"
      })
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
          <Text>Host a meeting</Text>
          {this.state.error_message === '' ? null : <Text style={{color:'red'}}>{this.state.error_message}</Text>}

          <Item rounded>
            <Input 
              placeholder='Put in your meeting code here' 
              value={this.state.roomcode}
              onChangeText={(e) => {this.setState({...this.state, roomcode: e})}}
              />
          </Item>
          <Button block 
            onPress={() => this.submitRoomCode()}>
            <Text>Submit</Text>
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