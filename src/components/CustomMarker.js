import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';


class CustomMarker extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <Text style={[styles.amount]}>{this.props.lot}</Text>
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#006a31',
    padding: 2,
    borderRadius: 3,
    borderColor: '#003700',
    borderWidth: 0.5,
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#006a31',
    alignSelf: 'center',
    marginTop: -9,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#003700',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});

module.exports = CustomMarker;