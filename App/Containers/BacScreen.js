// @flow

import React, { Component } from "react";
import { View, Picker, Text } from "react-native";
import { connect } from "react-redux";
import moment from "moment";

// Styles
// import styles from "./Styles/AddScreenStyle";

class BACScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { person: null };
  }

  calculateBAC(person, drinks) {
    if (!person || !drinks) return;
    // BAC = [Alcohol consumed in grams / (Body weight in grams x r)] x 100.
    // In this formula, “r” is the gender constant: r = 0.55 for females and 0.68 for males.
    // BAC as a percentage – (elapsed time in hours x 0. 015)
    // 14 g of alcohol in standard
    let bac = 0;
    drinks.forEach(drink => {
      const oneDrink = 14 / (75000 * 0.68) * 100;
      bac += oneDrink;
      bac -= moment().diff(drink.time, "hours") * 0.015;
    });
    return Math.max(bac, 0).toFixed(4);
  }

  render() {
    // accumlate drinks
    const people = {};
    this.props.drinks
      .filter(drink => drink.person != null && drink.alcoholic)
      .forEach(drink => {
        if (!people[drink.person]) {
          people[drink.person] = [drink];
        } else {
          people[drink.person].push(drink);
        }
      });
    const textStyle = { marginBottom: 10, marginLeft: 20 };
    return (
      <View>
        <Picker
          selectedValue={this.state.person}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ person: itemValue })
          }
        >
          {Object.keys(people).map(person => {
            return <Picker.Item key={person} label={person} value={person} />;
          })}
        </Picker>
        <Text style={textStyle}>Drink Count</Text>
        {Object.keys(people).map(person => (
          <Text key={person} style={textStyle}>{`${person}: ${
            people[person].length
          }`}</Text>
        ))}
        <Text style={textStyle}>Selected BAC</Text>
        <Text style={textStyle}>
          {this.calculateBAC(this.state.person, people[this.state.person])}
        </Text>
      </View>
    );
  }
}

const getTodaysDrinks = drinks =>
  drinks.filter(drink => moment(drink.time) > moment().subtract("12", "h"));

const mapStateToProps = state => {
  return { drinks: getTodaysDrinks(state.drink.drinks) };
};

const mapDispatchToProps = dispatch => {
  return {
    // addDrink: drink => dispatch(DrinkActions.addDrink(drink)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BACScreen);
