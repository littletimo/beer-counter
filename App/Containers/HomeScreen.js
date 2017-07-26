import React, {Component} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {connect} from 'react-redux';
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
                    <Text key={drink.name}>
                      {drink.name}
                    </Text>
                  );
                })
              : null}
            <RoundedButton onPress={this.handleClick.bind(this)}>
              add
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
