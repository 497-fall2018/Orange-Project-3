import { createStackNavigator, createAppContainer } from "react-navigation";

import {Main} from "../screens/Main"

const AppNavigator = createStackNavigator({
    Home: {
      screen: Main
    }
  });

const AppContainer = createAppContainer(AppNavigator);

export {AppContainer};
  