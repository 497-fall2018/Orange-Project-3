import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Item, Button } from 'native-base';
import { connect } from 'react-redux';
import _ from 'lodash';
import Swipeout from 'react-native-swipeout';

import {
    delete_entry,
  } from '../../ducks/queue';
  

class QueueComponent extends React.Component {
    ListView() {
        return _.map(this.props.entries, (item, index) => {
            if (item) {
                var swipeoutBtns = [
                    {
                    text: 'Delete',
                    backgroundColor: 'red',
                    onPress: ()=> this.props.delete_entry(this.props.socket, item['id'])
                    }
                ]
                if (this.props.label === 'Facilitator'){
                    return (
                    <Swipeout 
                        key={index}
                        right={swipeoutBtns}
                        backgroundColor='rgba(52, 52, 52, 0)'
                    >
                        <View>
                            <Text>
                                {item['member']}
                            </Text>
                        </View>
                    </Swipeout>
                    )
                } else {
                    return (
                    <View key={index}>
                            <Text>
                                {item['member']}
                            </Text>
                    </View>

                    )
                }

           }
        })
    }
    
    render() {
        
      return (
        <View style={styles.container}>
            {this.ListView()}
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
  
  export { QueueComponent };

  const mapStateToProps = (state, ownProps) => {
    const { queue } = state;
    const { entries } = queue;
    return {
        ...ownProps,
        entries,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      delete_entry: (socket, target) => {
        dispatch(delete_entry(socket, target))
      }
    }
  }
  
  export const Queue = connect(mapStateToProps, mapDispatchToProps)(QueueComponent);
  