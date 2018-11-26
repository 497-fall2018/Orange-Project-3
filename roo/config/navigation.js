import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

import {
  Facilitator,
  Host,
  Join,
  Main,
} from "../screens"

const HomeStack = createStackNavigator({
    Home: {
      screen: Main
    },
    Host: {
      screen: Host 
    },
    Join: {
      screen: Join
    },
});
const FacilitatorStack = createStackNavigator({
    Host: {
      screen: Facilitator 
    },
});
const AttendeeStack = createStackNavigator({
    Join: {
      screen: Join
    },
});
const AppNavigator = createSwitchNavigator(
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  {
    Home: HomeStack,
    Facilitator: FacilitatorStack,
    Attendee: AttendeeStack,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const AppContainer = createAppContainer(AppNavigator);

export {AppContainer};
  