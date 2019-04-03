
// 현재는 이동되는 화면이 모두 한 파일에 들어있음. 
// 향후에는 각각의 화면을 별도 파일로 분리하고, stackNavigator도 별도 파일로 분리하는 방법 확인 필요함

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class HomeScreen extends React.Component {

  static navigationOptions = {    // static 객체를 선언
    title: 'Home',
  };

  // 각 화면에 설정된 navigationOptions 가 우선순위가 높음
 /*  static navigationOptions = {    // static 객체를 선언
    title: 'Home',
    headerStyle : {
      backgroundColor : '#7C7CFF',
    },
    headerTintColor : '#fff',
    headerTitleStyle : {
      fontWeight : 'bold',
    },
  };
 */
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
            });
          }}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {

  /* static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'A nested Details Screen'),
    };
  }; */

  static navigationOptions = ({navigation, navigationOptions}) => {
    console.log(navigationOptions);

    return{
      title : navigation.getParam('otherParam','A Nested Details Screen'),
      headerStyle : {
        backgroundColor : navigationOptions.headerTintColor,
      },
      headerTintColor : navigationOptions.headerStyle.backgroundColor,
    }
  }

  render() {
    /* 2. Get the param, provide a fallback value if not available */
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            this.props.navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })}
        />
        <Button
          title="Update the title"
          onPress={() =>
            this.props.navigation.setParams({ otherParam: "Updated!" })}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

// RootStack 하위에 있는 화면은 모두 defaultNavigationOptions의 영향을 받음. 
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f2223a',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);


const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

