import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import UsersScene from './UsersScene';
import CompaniesScene from './CompaniesScene';
import UserScene from './UserScene';
import CompanyScene from './CompanyScene';

const HomeScene = createBottomTabNavigator(
  {
    Users: { screen: UsersScene },
    Companies: { screen: CompaniesScene }
  },
  {
    initialRouteName: 'Users',
    headerMode: 'screen'
  }
);

export default createStackNavigator(
  {
    HomeScene,
    UserScene,
    CompanyScene
  },
  {
    initialRouteName: 'HomeScene',
    defaultNavigationOptions: {}
  }
);
