import React, {Component} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import DrinkActions from '../Redux/DrinkRedux';
import RoundedButton from '../Components/RoundedButton';

// Styles
import styles from './Styles/HomeScreenStyle';

class HomeScreen extends Component {
  // static navigationOptions = {
  //   title: 'Welcome',
  // };
  handleClick() {
    this.props.navigation.navigate('Add');
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            {this.props.drinks
              ? this.props.drinks.map(drink => {
                  return (
                    <Text key={drink.id}>
                      {`${drink.name} - ${moment(drink.time).fromNow()}`}
                    </Text>
                  );
                })
              : null}
            <RoundedButton onPress={this.props.addLastDrink}>
              Add Last
            </RoundedButton>
            <RoundedButton onPress={this.handleClick.bind(this)}>
              Add
            </RoundedButton>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {drinks: state.drink.drinks};
};

const mapDispatchToProps = dispatch => {
  return {
    addLastDrink: () => dispatch(DrinkActions.addLastDrink()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
