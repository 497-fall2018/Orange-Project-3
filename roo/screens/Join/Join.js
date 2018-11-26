import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Item, Button } from 'native-base';
import APIConfig from '../../config/api';
import axios from 'axios';

export class Join extends React.Component {
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
    const url = APIConfig.apiRoot + '/checkroom'
    axios.post(url, {roomcode:this.state.roomcode})
    .then((response) => {
      // move them to other screen.
      this.props.navigation.navigate('Attendee', {
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
    console.log(this.state);
    return (
      <View style={styles.container}>
          <Text>Join a meeting</Text>
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