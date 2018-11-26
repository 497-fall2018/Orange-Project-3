import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Item, Button } from 'native-base';
import { connect } from 'react-redux';

import { 
  thunk_join_room,
} from '../../ducks/join';

class JoinComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomcode: '',
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.roomcode !== "") {
      this.props.navigation.navigate('Attendee');
    }
  }
  
  submitRoomCode() {
    this.props.join_room(this.state.roomcode);
  }
  
  render() {
    return (
      <View style={styles.container}>
          <Text>Join a meeting</Text>
          {this.props.error_message === '' ? null : <Text style={{color:'red'}}>{this.props.error_message}</Text>}

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

export { JoinComponent };

const mapStateToProps = (state, ownProps) => {
  const { join } = state;
  const { error_message, roomcode } = join;
  return {
      ...ownProps,
      error_message,
      roomcode,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      join_room: (roomcode) => {
          dispatch(thunk_join_room(roomcode))
      },
  }
}

export const Join = connect(mapStateToProps, mapDispatchToProps)(JoinComponent);