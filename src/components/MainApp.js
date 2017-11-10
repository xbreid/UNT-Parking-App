import React from 'react';
import { Button, ScrollView, StatusBar, View, Image,
  TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SafeAreaView, StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import Dimensions from 'Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SampleText from './SampleText';
import { MapView } from 'expo';
import ImageZoom from 'react-native-image-pan-zoom';
import Icon from 'react-native-vector-icons/FontAwesome';
import Lot25 from '../images/Lot25Vec-IOS.psd';
import Lot123 from '../images/Lot123Vec-IOS.psd';
import CustomMarker from './CustomMarker';


// lot 25 coords
const lot25 = {
  latitude: 33.2091237,
  longitude: -97.1502889,
};

// lot 1, 2, 3 coords
const lot123 = {
  latitude: 33.2115122,
  longitude: -97.1494314,
};

// Time summary screen/class component
class SelectTime extends React.Component {
  constructor() {
    super();

    this.state = {
      hour: 0,
      minutes: 0
    };

    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
  }

  handleHourChange(isIncrement) {
    if (isIncrement) {
      if (this.state.hour !== 7)
        this.setState({ hour: this.state.hour + 1});
    } else {
      if (this.state.hour !== 0)
        this.setState({ hour: this.state.hour - 1});
    }
  }

  handleMinuteChange(isIncrement) {
    if (isIncrement) {
      if (this.state.minutes !== 45)
        this.setState({ minutes: this.state.minutes + 15});
    } else {
      if (this.state.minutes !== 0)
        this.setState({ minutes: this.state.minutes - 15});
    }
  }

  render() {

    const styles = {
      timeHeader: {
        marginTop: 80,
        marginBottom: 30,
        fontSize: 23,
        fontWeight: 'bold'
      },
      container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      timeBox: {
        marginTop: 10,
        marginBottom: 10,
        width: 125,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 2
      },
      timeBoxNumber: {
        fontSize: 30
      },
      timeBoxDesc: {
        fontSize: 12
      },
      buttonContainer: {
        paddingVertical: 15,
        paddingHorizontal: 60,
        backgroundColor: '#003700',
        borderRadius: 2,
        marginBottom: 10
      },
      buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700',
        paddingHorizontal: 30,
        fontSize: 14
      }
    };

    return(
      <View style={styles.container}>
        <Text style={styles.timeHeader}>{this.state.hour} Hour {this.state.minutes} Minutes</Text>
        <View style={{ flex: 1, flexDirection: 'row'}}>
          <View style={{margin: 20, alignItems: 'center'}}>
            <TouchableOpacity onPress={() => this.handleHourChange(true)}>
              <Icon name="chevron-circle-up" size={40} color='#006a31' />
            </TouchableOpacity>
            <View style={styles.timeBox}>
              <Text style={styles.timeBoxNumber}> {this.state.hour} </Text>
              <Text style={styles.timeBoxDesc}> hour(s) </Text>
            </View>
            <TouchableOpacity onPress={() => this.handleHourChange(false)}>
              <Icon name="chevron-circle-down" size={40} color='#006a31' />
            </TouchableOpacity>
          </View>
          <View style={{margin: 20, alignItems: 'center'}}>
            <TouchableOpacity onPress={() => this.handleMinuteChange(true)}>
              <Icon name="chevron-circle-up" size={40} color='#006a31' />
            </TouchableOpacity>
            <View style={styles.timeBox}>
              <Text style={styles.timeBoxNumber}> {this.state.minutes} </Text>
              <Text style={styles.timeBoxDesc}> minutes(s) </Text>
            </View>
            <TouchableOpacity onPress={() => this.handleMinuteChange(false)}>
              <Icon name="chevron-circle-down" size={40} color='#006a31' />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 'auto', paddingVertical: 20}}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => { this.props.nav.navigate('ConfirmTime') }}
          >
            <Text style={styles.buttonText}> SUBMIT </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


// Image panner screen/component
class ImagePanner extends React.Component {
  render() {
    return(
      <ImageZoom cropWidth={Dimensions.get('window').width}
                 cropHeight={Dimensions.get('window').height}
                 onClick={() => this.props.nav.navigate('SelectTime')}
                 imageWidth={Dimensions.get('window').width}
                 imageHeight={this.props.maxHeight ? Dimensions.get('window').height : 300}>
        <Image style={{width: Dimensions.get('window').width, height: this.props.maxHeight ? Dimensions.get('window').height : 300}}
               source={this.props.img}/>
      </ImageZoom>
    );
  }
}

// Example nav screen used on settings screen
const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView>
    <StatusBar
      barStyle="light-content"
    />
    <SafeAreaView forceInset={{ horizontal: 'always' }}>
      <SampleText>{banner}</SampleText>
      <Button onPress={() => navigation.goBack(null)} title="Go back" />
    </SafeAreaView>
  </ScrollView>
);

// map used on main screen
const MyMap = ({ navigation, banner }) => (
  <MapView
    style={{ flex: 1 }}
    initialRegion={{
      latitude: 33.2091237,
      longitude: -97.1502889,
      latitudeDelta: 0.0080,
      longitudeDelta: 0.0080,
    }}
  >
    <MapView.Marker
      coordinate={lot25}
      onPress={() => navigation.navigate('ParkingLot25')}
    >
      <CustomMarker lot={'Lot 25'}/>
    </MapView.Marker>
    <MapView.Marker
      coordinate={lot123}
      onPress={() => navigation.navigate('ParkingLot123')}
    >
      <CustomMarker lot={'Lot 1, 2, 3'}/>
    </MapView.Marker>
  </MapView>
);

// Home screen that uses MyMap component above
const MyHomeScreen = ({ navigation }) => (
  <MyMap banner="Home Screen" navigation={navigation}/>
);

// parking lot 25 screen with image panner component
const ParkingLot25Screen = ({ navigation }) => (
  <ScrollView maximumZoomScale={5} scrollEnabled={true} minimumZoomScale={1} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <ImagePanner img={Lot25} maxHeight={true}  nav={navigation}/>
  </ScrollView>
);

// parking lot 1, 2, 3 screen with image panner component
const ParkingLot123Screen = ({ navigation }) => (
  //<ScrollView maximumZoomScale={5} scrollEnabled={true} minimumZoomScale={1} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
    <ImagePanner img={Lot123} maxHeight={false} nav={navigation}/>
  //</ScrollView>
);

// select time screen with select time class component
const SelectTimeScreen = ({ navigation, timeSelectOpen }) => (
  <SelectTime nav={navigation}/>
);

// setting screen example with mynav
const MySettingsScreen = ({ navigation }) => (
  <MyNavScreen banner="Settings Screen" navigation={navigation} />
);

const TimeConfirmationScreen = ({navigation }) => (
  <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
    <Ionicons name="ios-checkmark-circle" size={150} color='#006a31' />
    <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 20}}>Your Time Summary has been confirmed!</Text>
  </View>
);

const headerBack = (navigation) => (
  <TouchableOpacity style={{marginRight: 15}} onPress={() => navigation.goBack(null)}>
    <Ionicons name="ios-arrow-back" style={{paddingHorizontal: 15}} color="#f3f3f3" size={26}/>
  </TouchableOpacity>
);

// stack navigator
const MainTab = StackNavigator({
  Home: {
    screen: MyHomeScreen,
    path: '/',
    navigationOptions: ({ navigation }) => ({
      title: `Select parking lot`,
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle
    }),
  },
  ParkingLot25: {
    screen: ParkingLot25Screen,
    path: '/parking-lot25',
    navigationOptions: ({ navigation }) => ({
      title: `Select parking spot`,
      headerLeft: (headerBack(navigation)),
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle
    }),
  },
  ParkingLot123: {
    screen: ParkingLot123Screen,
    path: '/parking-lot123',
    navigationOptions: ({ navigation }) => ({
      title: `Select parking spot`,
      headerLeft: (headerBack(navigation)),
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle
    }),
  },
  SelectTime: {
    screen: SelectTimeScreen,
    path: '/select-time',
    navigationOptions: ({ navigation }) => ({
      title: `Time Summary`,
      headerLeft: (headerBack(navigation)),
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle
    }),
  },
  ConfirmTime: {
    screen: TimeConfirmationScreen,
    path: '/confirm-time',
    navigationOptions: ({ navigation }) => ({
      title: `Confirmed`,
      headerLeft: (
        <TouchableOpacity style={{marginRight: 15}} onPress={() => navigation
          .dispatch(NavigationActions.reset(
        {
          index: 0,
          actions: [
          NavigationActions.navigate({ routeName: 'Home'})
          ]
        }))}>
          <Text style={{paddingHorizontal: 15, fontWeight: 'bold', color: '#f3f3f3'}}>Close</Text>
        </TouchableOpacity>
      ),
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle
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

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#006a31'
  },
  headerTitle: {
    color: 'white'
  },
});

export default MainApp;