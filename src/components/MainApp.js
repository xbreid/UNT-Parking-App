/**
 * @flow
 */

import React from 'react';
import { Button, ScrollView, StatusBar, View, Image, TouchableHighlight,
  TouchableOpacity, Modal, Text } from 'react-native';
import { SafeAreaView, StackNavigator, TabNavigator } from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';
import SampleText from './SampleText';
import { MapView } from 'expo';

import ImageZoom from 'react-native-image-pan-zoom';
import ParkingLot from '../images/smart-parking.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import LocPin from '../images/green-location-pin.png';

class ModalExample extends React.Component {

  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
          <View style={{
            shadowColor: 'black',
            marginLeft: 50,
            marginRight: 50,
            marginTop: 100,
            marginBottom: 100,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowRadius: 5,
            shadowOpacity: 1.0
          }}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight onPress={() => {
                this.setModalVisible(!this.state.modalVisible)
              }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>

            </View>
          </View>
        </Modal>

        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

const cords = {
  latitude: 33.2543416,
  longitude: -97.15247219999998,
};

const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView>
    <StatusBar
      barStyle="dark-content"
    />
    <SafeAreaView forceInset={{ horizontal: 'always' }}>
      <SampleText>{banner}</SampleText>
      <Button
        onPress={() => navigation.navigate('Profile', { name: 'Jordan' })}
        title="Open profile screen"
      />
      <Button
        onPress={() => navigation.navigate('NotifSettings')}
        title="Open notifications screen"
      />
      <Button
        onPress={() => navigation.navigate('SettingsTab')}
        title="Go to settings tab"
      />
      <Button onPress={() => navigation.goBack(null)} title="Go back" />
    </SafeAreaView>
  </ScrollView>
);

const MyMap = ({ navigation, banner }) => (
  <MapView
    style={{ flex: 1 }}
    initialRegion={{
      latitude: 33.2543416,
      longitude: -97.15247219999998,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >
    <MapView.Marker
      coordinate={cords}
      //title='test marker'
      //description='testing'
      //onPress={() => navigation.navigate('Profile', { name: 'Jordan' })}
      onPress={() => navigation.navigate('ParkingLot')}
    />
  </MapView>
);


const MyHomeScreen = ({ navigation }) => (
 // <MyNavScreen banner="Home Screen" navigation={navigation} />
  <MyMap banner="Home Screen" navigation={navigation}/>
);

const ParkingLotScreen = ({ navigation }) => (
  //<MyNavScreen
  // banner={`${navigation.state.params.name}s Profile`}
  // navigation={navigation}
  ///>

  <ScrollView maximumZoomScale={5} scrollEnabled={true} minimumZoomScale={1} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
    <TouchableHighlight onPress={() => navigation.navigate('SelectTime')}>
      <Image
        //style={{height: 100, width: 100}}
        style={{flex: 1, resizeMode: 'cover'}}
        source={ParkingLot}
      />
    </TouchableHighlight>
  </ScrollView>
);

const buttonContainer = {
  paddingVertical: 5,
  backgroundColor: '#003700',
  borderRadius: 2
};

const buttonText = {
  textAlign: 'center',
  color: '#FFFFFF',
  fontWeight: '700',
  paddingHorizontal: 30
};

const SelectTimeScreen = ({ navigation, timeSelectOpen }) => (
  //<MyNavScreen banner="Time Summary Screen" navigation={navigation} />
  //<ModalExample/>
  <View style={{
    shadowColor: 'black',
    backgroundColor: 'white',
    marginLeft: 50,
    marginRight: 50,
    marginTop: 100,
    marginBottom: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
    width: 0,
      height: 3
  },
  shadowRadius: 5,
    shadowOpacity: 1.0
  }}>
    <Text style={{marginTop: 30}}>1 Hour 30 Minutes</Text>
    <View style={{ flex: 1, flexDirection: 'row'}}>
      <View style={{margin: 20, alignItems: 'center'}}>
        <Icon name="chevron-circle-up" size={20} color='#006a31' />
        <View style={{marginTop: 10, marginBottom: 10, width: 55, height: 50, justifyContent: 'center', alignItems: 'center', borderColor: 'grey', borderWidth: 1, borderRadius: 2}}>
          <Text> 1 </Text>
          <Text style={{ fontSize: 8 }}> hour(s) </Text>
        </View>
        <Icon name="chevron-circle-down" size={20} color='#006a31' />
      </View>
      <View style={{margin: 20, alignItems: 'center'}}>
        <Icon name="chevron-circle-up" size={20} color='#006a31' />
        <View style={{marginTop: 10, marginBottom: 10, width: 55, height: 50, justifyContent: 'center', alignItems: 'center', borderColor: 'grey', borderWidth: 1, borderRadius: 2}}>
          <Text> 30 </Text>
          <Text style={{ fontSize: 8 }}> minutes(s) </Text>
        </View>
        <Icon name="chevron-circle-down" size={20} color='#006a31' />
      </View>
    </View>
    <View style={{ marginTop: 'auto', paddingVertical: 20}}>
      <TouchableOpacity
        style={buttonContainer}
        onPress={() => { navigation.goBack(null) }}
      >
        <Text style={buttonText}>
          SUBMIT
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const MyNotificationsSettingsScreen = ({ navigation }) => (
  <MyNavScreen banner="Notifications Screen" navigation={navigation} />
);

const MySettingsScreen = ({ navigation }) => (
  <MyNavScreen banner="Settings Screen" navigation={navigation} />
);

const MainTab = StackNavigator({
  Home: {
    screen: MyHomeScreen,
    path: '/',
    navigationOptions: {
      title: 'Select Location',
    },
  },
  ParkingLot: {
    screen: ParkingLotScreen,
    path: '/parking-lot',
    navigationOptions: ({ navigation }) => ({
      title: `Select a Spot`,
    }),
  },
  SelectTime: {
    screen: SelectTimeScreen,
    path: '/select-time',
    navigationOptions: ({ navigation }) => ({
      title: `Time Summary`,
    }),
  },
});

const SettingsTab = StackNavigator({
  Settings: {
    screen: MySettingsScreen,
    path: '/',
    navigationOptions: () => ({
      title: 'Settings',
    }),
  },
  NotifSettings: {
    screen: MyNotificationsSettingsScreen,
    navigationOptions: {
      title: 'Notifications',
    },
  },
});

const MainApp = TabNavigator(
  {
    MainTab: {
      screen: MainTab,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-home' : 'ios-home-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    SettingsTab: {
      screen: SettingsTab,
      path: '/settings',
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);

export default MainApp;