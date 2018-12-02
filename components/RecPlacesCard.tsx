import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements';
import { Font } from 'expo';
import { OpenMapDirections } from 'react-native-navigation-directions';

export default class RecPlacesCard extends React.Component {
  constructor() {
    super()
    this.state = {
      fontsAreLoaded: false
    }
  }
  async componentWillMount() {
    await Font.loadAsync({ 'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf') })
    this.setState({ fontsAreLoaded: true })
  }
  _callShowDirections = (latitude, longitude) => {
    const startPoint = navigator.geolocation.getCurrentPosition(
      position => JSON.stringify(position),
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

//   return (
//     <View>
//       <FlatList
//         data={where}
//         keyExtractor={_keyExtractor}
//         renderItem={({ item }) => {
//           return (
//             <View>
//               <Text style={styles.item}>LocationID: {item.location_id}</Text>
//               <Text style={styles.item}>Description: {item.description}</Text>
//               <Text style={styles.item}>Curbside: {showCurbside}</Text>
//               <Text style={styles.item}>Distance: {item.distance}</Text>
//               <Text style={styles.item}>Latitude: {item.latitude}</Text>
//               <Text style={styles.item}>Longitude: {item.longitude}</Text>
//               <Text style={styles.item}>Municipal: {showMunicipal}</Text>
//               <View
//                 style={{
//                   borderBottomColor: 'black',
//                   borderBottomWidth: 1,
//                 }} />
//             </View>
//           )
//         }}
//       />
//     </View>
//   )
// };

    const endPoint = { latitude, longitude };

    const transportPlan = 'd';

    OpenMapDirections(startPoint, endPoint, transportPlan).then(res => {
      console.log(res)
    });
  }
  render() {
    const { where } = this.props;
    const { fontsAreLoaded } = this.state;
  
    let _keyExtractor = (item, index) => (item.location_id + index).toString() || index;
    let showCurbside = where.curbside && 'Yes' || 'No'
    let showMunicipal = where.municipal && 'Yes' || 'No'
    return (
      fontsAreLoaded ?
        <List>
          <FlatList
            data={where}
            keyExtractor={_keyExtractor}
            renderItem={({ item }) => {
              const { title, description, distance, latitude, longitude, avatar_url } = item;
              const { avatar, subtitle } = styles;
              return (
                <ListItem
                  onPress={() => { this._callShowDirections(latitude, longitude) }}
                  avatar={
                    <Avatar
                      rounded
                      source={ avatar_url && { uri: avatar_url }}
                      avatarStyle={ avatar }
                    />
                  }
                  title={ 
                    <View>
                      <Text style={ styles.title }>{ title }</Text>
                    </View> 
                  }
                  subtitle={
                    <View>
                      <Text style={ subtitle }>Description: { description }</Text>
                      <Text style={ subtitle }>Distance: { distance }</Text>
                      <Text style={ subtitle }>Curbside: { showCurbside }</Text>
                      <Text style={ subtitle }>Municipal: { showMunicipal }</Text>
                    </View>
                  }
                />
              )
            }}
          />
        </List>
        : null
    )
  };
};

const mapStateToProps = ({ where }) => {
  console.log('HERE IS WHERE', where)
  return {
    where,
  };
};

const styles = StyleSheet.create({
  title: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    height: 30,
    marginLeft: 80,
    fontWeight: 'bold'
  },
  subtitle: {
    marginLeft: 80
  },
  avatar: {
    height: 100,
    width: 100,
    marginLeft: 65
  }
});

//export default connect(mapStateToProps)(RecPlacesCard);
