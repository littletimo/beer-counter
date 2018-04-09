// @flow

import React, { Component } from "react";
import {
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  DatePickerIOS,
  Text,
  Switch,
  View,
} from "react-native";
import { connect } from "react-redux";
import CheckBox from "react-native-easy-checkbox";
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
      people: [],
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
    const people = [];
    this.props.drinks.filter(drink => drink.person != null).forEach(drink => {
      if (!people.includes(drink.person)) people.push(drink.person);
    });
    // console.log(people, this.state.people);
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <Text style={{ ...labelStyle, marginTop: 40 }}>Person</Text>
          <TextInput
            style={{ ...inputStyle, marginBottom: 10 }}
            onChangeText={text => this.setState({ name: text })}
            value={this.state.text}
            autoFocus
          />
          <View
          // style={{
          //   ...labelStyle,
          //   flex: 1,
          //   flexDirection: "row",
          //   flexWrap: "wrap",
          //   justifyContent: "flex-start",
          //   alignItems: "flex-start",
          //   marginBottom: 10,
          // }}
          >
            {people.map(person => (
              <View key={person}>
                <CheckBox
                  checkIconStyle={labelStyle}
                  checkBoxTrueStyle={labelStyle}
                  checkBoxFalseStyle={labelStyle}
                  name={person}
                  checked={this.state.people.includes(person)}
                  onChange={value => {
                    const people = this.state.people;
                    const index = people.indexOf(person);
                    // console.log(people, people.splice(index, 1));
                    if (index < 0)
                      this.setState({
                        people: [...people, person],
                      });
                    else {
                      people.splice(index, 1);
                      this.setState({ people });
                    }
                  }}
                />
                <Text style={labelStyle}>{person}</Text>
              </View>
            ))}
          </View>
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
              if (this.state.name && this.state.name.length)
                this.props.addDrink({
                  person: this.state.name,
                  name: this.state.drink,
                  alcoholic: this.state.alcoholic,
                  time: this.state.date.toJSON(),
                });
              if (this.state.people.length) {
                this.state.people.forEach(person => {
                  this.props.addDrink({
                    person: person,
                    name: this.state.drink,
                    alcoholic: this.state.alcoholic,
                    time: this.state.date.toJSON(),
                  });
                });
              }
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

const getDrinks = drinks => drinks;

const mapStateToProps = state => {
  return { drinks: state.drink.drinks };
};

const mapDispatchToProps = dispatch => {
  return {
    addDrink: drink => dispatch(DrinkActions.addDrink(drink)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddScreen);
