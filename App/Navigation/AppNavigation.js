import {StackNavigator} from 'react-navigation';
import AddScreen from '../Containers/AddScreen';
import HomeScreen from '../Containers/HomeScreen';
// import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    Home: {screen: HomeScreen},
    Add: {screen: AddScreen},
    // LaunchScreen: { screen: LaunchScreen }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: styles.header,
    },
  },
);

export default PrimaryNav;
