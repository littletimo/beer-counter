import React, {Component} from 'react';
import {ScrollView, Text, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import DrinkActions from '../Redux/DrinkRedux';
import RoundedButton from '../Components/RoundedButton';

// Styles
import styles from './Styles/AddScreenStyle';

class AddScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <Text>AddScreen</Text>
          <RoundedButton
            onPress={() => {
              this.props.addDrink({name: 'hi'});
              this.props.navigation.goBack();
            }}
          >
            Add Drink
          </RoundedButton>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    addDrink: drink => dispatch(DrinkActions.addDrink(drink)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddScreen);
