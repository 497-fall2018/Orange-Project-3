import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Item, Button } from 'native-base';
import { connect } from 'react-redux';
import io from "socket.io-client";
import APIConfig from '../../config/api';

import {
  join_room,
  joined_room,
  send_entry,
  got_new_entry,
} from '../../ducks/queue';

import {
  Queue
} from '../../components';

let socket;

class AttendeeComponent extends React.Component {
  constructor(props) {
    super(props);
    socket = io.connect(APIConfig.apiroot);
    this.props.join_room(socket, this.props.roomcode, this.props.username);
    socket.on('joined_room',(res)=>{
      this.props.joined_room(res);
    })
    socket.on('got_new',(res)=>{
      this.props.got_new_entry(res);
    });
  }

  sendNewEntry() {
    console.log('at send new entry');
    this.props.send_entry(socket, this.props.roomcode, this.props.username);
  }
  
  render() {
    return (
      <View style={styles.container}>
          <Text>Room: {this.props.roomcode}</Text>
          <Text>Welcome, {this.props.username}</Text>
          {this.props.error_message === '' ? null : <Text style={{color:'red'}}>{this.props.error_message}</Text>}
          <Queue payload={this.props.entries} />
          <Button
            onPress={() => this.sendNewEntry()}>
            <Text>
              Stand in line
            </Text>
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

export { AttendeeComponent };

const mapStateToProps = (state, ownProps) => {
  const { join, queue } = state;
  const { error_message, roomcode, username } = join;
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
    },
    send_entry: (socket, room, username) => {
      dispatch(send_entry(socket, room, username))
    },
    got_new_entry: (new_entry) => {
      dispatch(got_new_entry(new_entry))
    },
  }
}

export const Attendee = connect(mapStateToProps, mapDispatchToProps)(AttendeeComponent);