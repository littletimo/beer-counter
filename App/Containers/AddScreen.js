// @flow

import React, {Component} from 'react';
import {
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  DatePickerIOS,
} from 'react-native';
import {connect} from 'react-redux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import DrinkActions from '../Redux/DrinkRedux';
import RoundedButton from '../Components/RoundedButton';

// Styles
import styles from './Styles/AddScreenStyle';

class AddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null,
      date: new Date(),
    };
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              marginTop: 40,
              marginRight: 20,
              marginLeft: 20,
            }}
            onChangeText={text => this.setState({text})}
            value={this.state.text}
            autoFocus
          />
          <DatePickerIOS
            date={this.state.date}
            onDateChange={date => this.setState({date})}
          />
          <RoundedButton
            onPress={() => {
              this.props.addDrink({
                name: this.state.text,
                time: this.state.date.toJSON(),
              });
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
