import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Item, Button, H1, H2, H3, Card } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';
import io from "socket.io-client";
import APIConfig from '../../config/api';

import {
  join_room,
  all_entries,
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
    socket = io.connect(APIConfig.apiRoot, {transports: ['websocket']});
    this.props.join_room(socket, this.props.roomcode, this.props.username);
    socket.on('all_entries',(res)=>{
      this.props.all_entries(res);
    })
    socket.on('got_new',(res)=>{
      this.props.got_new_entry(res);
    });
  }

  sendNewEntry() {
    this.props.send_entry(socket, this.props.roomcode, this.props.username);
  }

  render() {
    return (
      <Grid>

        <Row size={1}>
          <View style={styles.upperLeft}>
              <Card>

                    <View>
                      <H1 textAlign="left"
                          color="white">Room:</H1>
                      <Text textAlign="center"> {this.props.roomcode} </Text>
                    </View>

                    <View>
                      <H1 textAlign="left"
                          color="white">Name:</H1>
                      <Text textAlign="center"> {this.props.username}</Text>
                    </View>

              </Card>
            </View>
        </Row>



        <Row size={5}>
            <View style={styles.container}>
                <Queue label={'Attendee'}/>
            </View>
        </Row>

        <Row size={1}>
          <View style={styles.lowerLeft}>
                <Button
                  onPress={() => this.sendNewEntry()}>
                  <Text>
                    Stand in line
                  </Text>
                </Button>
          </View>
        </Row>

      </Grid>

      // <View style={styles.container}>
      //     <Text>Room: {this.props.roomcode}</Text>
      //     <Text>Welcome, {this.props.username}</Text>
      //     {this.props.error_message === '' ? null : <Text style={{color:'red'}}>{this.props.error_message}</Text>}
      //     <Queue label={'Attendee'}/>
      //     <Button
      //       onPress={() => this.sendNewEntry()}>
      //       <Text>
      //         Stand in line
      //       </Text>
      //     </Button>
      // </View>

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

  upperLeft: {
    flex: 1,
    backgroundColor: '#97D9FC',
    justifyContent: 'center',
    margin: 1
  },

  lowerLeft: {
    flex: 1,
    backgroundColor: '#97D9FC',
    alignItems: 'center',
    justifyContent: 'center',
  },


  // headerText: {
  //   textAlign: "left"
  // },
  //
  // infoText: {
  //   textAlign: "center"
  // },

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
    all_entries: (entries) => {
      dispatch(all_entries(entries))
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
