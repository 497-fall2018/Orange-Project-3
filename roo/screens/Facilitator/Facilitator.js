import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Item, Button } from 'native-base';
import { connect } from 'react-redux';
import io from "socket.io-client";
import APIConfig from '../../config/api';

import {
  join_room,
  joined_room,
} from '../../ducks/queue';

import {
  Queue
} from '../../components';

let socket;

class FacilitatorComponent extends React.Component {
  constructor(props) {
    super(props);
    socket = io.connect(APIConfig.apiroot);
    this.props.join_room(socket, this.props.roomcode, this.props.username);
    socket.on('joined_room', (res)=>{
      this.props.joined_room(res);
    })
    // socket.on('new_entry',(res)=>{
    //   this.props.got_new_entry(res);
    // });
  }
  
  render() {
    return (
      <View style={styles.container}>
          <Text>Room: {this.props.roomcode}</Text>
          <Text>Welcome, {this.props.username}</Text>
          {this.props.error_message === '' ? null : <Text style={{color:'red'}}>{this.props.error_message}</Text>}
          <Queue payload={this.props.entries} />
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

export { FacilitatorComponent };

const mapStateToProps = (state, ownProps) => {
  const { host, queue } = state;
  const { error_message, roomcode, username } = host;
  const { entries } = queue;
  return {
      ...ownProps,
      error_message,
      roomcode,
      username,
      entries,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    join_room: (socket, room, username) => {
      dispatch(join_room(socket, room, username))
    },
    joined_room: (entries) => {
      dispatch(joined_room(entries))
    }
  }
}

export const Facilitator = connect(mapStateToProps, mapDispatchToProps)(FacilitatorComponent);