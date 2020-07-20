import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Book extends React.PureComponent {
  state = {};
  render() {
    return (
      <View Style={styles.container}>
        <Text>test</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
