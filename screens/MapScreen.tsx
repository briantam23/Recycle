import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import Map from './Map';
import { connect } from 'react-redux';


export default class MapScreen extends Component {
  static navigationOptions = {
    title: 'List of Recycling Locations',
    headerStyle: {
      backgroundColor: '#518e30',
      marginBottom: 0,
    },
    headerTintColor: "white",
  };

  render() {
    return (
      <Map markers={markers} />
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

/* const mapStateToProps = ({ where }) => {
  let region = {};
  return {
    where: region
  }
}

connect(mapStateToProps)(Map); */
