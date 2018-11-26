import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Item, Button } from 'native-base';
import { connect } from 'react-redux';


import { 
  thunk_make_room,
} from '../../ducks/host';

class HostComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomcode: '',
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.roomcode !== "") {
      this.props.navigation.navigate('Facilitator');
    }
  }
  submitRoomCode() {
    this.props.make_room(this.state.roomcode);
  }
  
  render() {
    return (
      <View style={styles.container}>
          <Text>Host a meeting</Text>
          {this.props.error_message === '' ? null : <Text style={{color:'red'}}>{this.props.error_message}</Text>}

          <Item rounded>
            <Input 
              placeholder='What will your meeting code be?' 
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

export { HostComponent };

const mapStateToProps = (state, ownProps) => {
  const { host } = state;
  const { error_message, roomcode } = host;
  return {
      ...ownProps,
      error_message,
      roomcode,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      make_room: (roomcode) => {
          dispatch(thunk_make_room(roomcode))
      },
  }
}

export const Host = connect(mapStateToProps, mapDispatchToProps)(HostComponent);