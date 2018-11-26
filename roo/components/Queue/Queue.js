import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Item, Button } from 'native-base';
import _ from 'lodash';



class Queue extends React.Component {
    ListView() {
        return _.map(this.props.payload, (item, index) => {
            return <View>
                <Text>
                    {item['member']}
                </Text>
            </View>
        })
    }
    
    render() {
        console.log(this.props.payload)
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
  
  export { Queue };
  