import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Button,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import { getLocationDetails } from '../store/where';
import RecPlacesCard from '../components/RecPlacesCard';
import { ObjectLiteralElement } from 'typescript';
import layout from '../constants/Layout';

interface LocationsScreenProps {
  navigation: any;
  where: any;
  description?: any;
}

class LocationsScreen extends Component<LocationsScreenProps> {
  static navigationOptions = {
    title: `Places to Recycle Near Me`,
    headerStyle: {
      backgroundColor: '#518e30',
    },
    headerTintColor: 'white',
  };

  public render() {
    const { where, navigation } = this.props;
    const { heartContainer, heartLogo, homeButton1, homeButton2, mapButton, buttonContainer, mainContainer, listContainer } = styles;
    return (
      <View style={{ backgroundColor: 'white' }}>
        {where.length >= 1 ? (
          <View style={ mainContainer }>
            <View style={ buttonContainer }>
              <TouchableOpacity clear onPress={() => navigation.navigate('HomeScreen')}>
                <Text style={homeButton2}>Search Again!</Text>
              </TouchableOpacity>
              <TouchableOpacity clear onPress={() => navigation.navigate('MapScreen')}>
                <Text style={mapButton}>View Map</Text>
              </TouchableOpacity>
            </View>
            <View style={ listContainer}>
              <RecPlacesCard />
            </View>
          </View>
        ) : (
          <View style={heartContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
              <Text style={homeButton1}>Find something to Recycle!</Text>
            </TouchableOpacity>
            <Image
              style={heartLogo}
              source={require('../images/recycle_heart_logo.png')}
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ where, materials }) => {
  console.log(
    'THIS IS FROM THE LOCATIONS SCREEN',
    where,
    materials.materialDetails.description
  );
  const description = materials.materialDetails.description || '';
  return {
    where,
    description,
  };
};

/* const mapDispatchToProps = dispatch => ({
  getLocationDetails: (api_key, location) => dispatch(getLocationDetails(api_key, location)),
}); */
const mapDispatchToProps = { getLocationDetails };

const styles = StyleSheet.create({
  heartContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    bottom: 0
  },
  heartLogo: {
    width: 175,
    height: 156,
    margin: 10,
    padding: 10,
  },
  homeButton1: {
    backgroundColor: '#30518e',
    borderColor: 'white',
    borderRadius: 2,
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
    marginBottom: 45,
    height: 140,
    width: layout.window.width,
  },
  homeButton2: {
    backgroundColor: '#30518e',
    borderColor: 'white',
    borderRadius: 2,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
    height: 44,
    width: 130,
  },
  mapButton: {
    backgroundColor: '#30518e',
    borderColor: 'white',
    borderRadius: 2,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
    height: 44,
    width: 130,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  listContainer: {
    marginTop: 24
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(LocationsScreen));
