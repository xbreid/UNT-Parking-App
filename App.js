import React from 'react';
import { ScreenOrientation } from 'expo';

ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT_UP);

import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  StatusBar
} from 'react-native';
import { SafeAreaView, StackNavigator } from 'react-navigation';

import MainApp from './src/components/MainApp';

const Routes = {
  MainApp: {
    name: 'Stack in Tabs',
    description: 'testing stack in tabs after login page',
    screen: MainApp,
  },
};

const LogInScreen = ({ navigation }) => (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar
        barStyle="light-content"
      />
      <View style={styles.logoContainer}>
        <Image
          style={styles.image}
          source={require('./src/images/unt-stacked-mcconnell.png')}
        />
        <Text style={styles.imageText}>Prototype Mobile Parking App</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formInner}>
          <TextInput
            placeholder="email"
            placeholderTextColor='rgba(255, 255, 255, 0.7)'
            returnKeyType="next"
            style={styles.formInput}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={() => this.passwordInput.focus()}
          />
          <TextInput
            placeholder="password"
            placeholderTextColor='rgba(255, 255, 255, 0.7)'
            returnKeyType="go"
            secureTextEntry
            style={styles.formInput}
            ref={(input) => this.passwordInput = input}
          />
          {Object.keys(Routes).map((routeName: string) => (
            <TouchableOpacity
              key={routeName}
              style={styles.buttonContainer}
              onPress={() => {
                const { path, params, screen } = Routes[routeName];
                const { router } = screen;
                const action = path && router.getActionForPathAndParams(path, params);
                navigation.navigate(routeName, {}, action);
              }}
            >
              <Text style={styles.buttonText}>
                LOGIN
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </KeyboardAvoidingView>
);

const AppNavigator = StackNavigator(
  {
    ...Routes,
    Index: {
      screen: LogInScreen,
    },
  },
  {
    initialRouteName: 'Index',
    headerMode: 'none',

    /*
   * Use modal on iOS because the card mode comes from the right,
   * which conflicts with the drawer example gesture
   */
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
  }
);

export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  imageText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  container: {
    flex: 1,
    backgroundColor: '#006a31'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  formInner: {
    padding: 20
  },
  formInput: {
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 10
  },
  buttonContainer: {
    paddingVertical: 15,
    backgroundColor: '#003700'
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  formContainer: {

  }
});
