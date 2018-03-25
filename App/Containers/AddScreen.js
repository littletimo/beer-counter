// @flow

import React, { Component } from "react";
import {
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  DatePickerIOS,
  Text,
  Switch,
} from "react-native";
import { connect } from "react-redux";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import DrinkActions from "../Redux/DrinkRedux";
import RoundedButton from "../Components/RoundedButton";

// Styles
import styles from "./Styles/AddScreenStyle";

class AddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      drink: null,
      alcoholic: false,
      date: new Date(),
    };
  }
  render() {
    const inputStyle = {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      marginRight: 20,
      marginLeft: 20,
    };
    const labelStyle = {
      marginRight: 20,
      marginLeft: 20,
      marginBottom: 5,
    };
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <Text style={{ ...labelStyle, marginTop: 40 }}>Person</Text>
          <TextInput
            style={inputStyle}
            onChangeText={text => this.setState({ name: text })}
            value={this.state.text}
            autoFocus
          />
          <Text style={{ ...labelStyle, marginTop: 5 }}>Beverage</Text>
          <TextInput
            style={inputStyle}
            onChangeText={text => this.setState({ drink: text })}
            value={this.state.text}
          />
          <Text style={{ ...labelStyle, marginTop: 5 }}>Alcoholic</Text>
          <Switch
            style={{ marginLeft: 20 }}
            value={this.state.alcoholic}
            onValueChange={() =>
              this.setState({ alcoholic: !this.state.alcoholic })
            }
          />
          <DatePickerIOS
            date={this.state.date}
            onDateChange={date => this.setState({ date })}
          />
          <RoundedButton
            onPress={() => {
              this.props.addDrink({
                person: this.state.name,
                name: this.state.drink,
                alcoholic: this.state.alcoholic,
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
