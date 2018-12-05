import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Item, Button } from 'native-base';
import { connect } from 'react-redux';
import io from "socket.io-client/dist/socket.io";
import APIConfig from '../../config/api';
import TimerCountdown from 'react-native-timer-countdown';

import {
  join_room,
  all_entries,
  got_new_entry,
} from '../../ducks/queue';

import {
  Queue
} from '../../components';

let socket;

class FacilitatorComponent extends React.Component {
  constructor(props) {
    super(props);
    socket = io.connect(APIConfig.apiRoot, {transports: ['websocket']});
    this.props.join_room(socket, this.props.roomcode, this.props.username);
    socket.on('all_entries', (res)=>{
      this.props.all_entries(res);
    });
    socket.on('got_new',(res)=>{
      this.props.got_new_entry(res);
    });
  }

  render() {
    return (
      <View style={styles.container}>
          <Text>Room: {this.props.roomcode}</Text>
          <Text>Welcome, {this.props.username}</Text>
          {this.props.error_message === '' ? null : <Text style={{color:'red'}}>{this.props.error_message}</Text>}
          <Queue label={"Facilitator"} socket={socket}/>
          <TimerCountdown
              initialSecondsRemaining={1000*120}
              onTick={secondsRemaining => console.log('tick', secondsRemaining)}
              onTimeElapsed={() => console.log('complete')}
              allowFontScaling={true}
              style={{ fontSize: 20 }}
          />
          <Button
            onPress={() => this.setState({dummy: 1})}>
            <Text>
              Reset
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
    all_entries: (entries) => {
      dispatch(all_entries(entries))
    },
    got_new_entry: (new_entry) => {
      dispatch(got_new_entry(new_entry))
    },
  }
}

export const Facilitator = connect(mapStateToProps, mapDispatchToProps)(FacilitatorComponent);
