// @flow

import React, { Component } from "react";
import { ScrollView, View, Text, AppState, TabBarIOS } from "react-native";
import { connect } from "react-redux";
import moment from "moment";
import DrinkActions from "../Redux/DrinkRedux";
import RoundedButton from "../Components/RoundedButton";
import BacScreen from "./BacScreen";

// Styles
import styles from "./Styles/HomeScreenStyle";

class HomeScreen extends Component {
  // static navigationOptions = {
  //   title: 'Welcome',
  // };

  state = {
    appState: AppState.currentState,
    tab: 1,
  };

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  // componentDidUpdate() {
  //   console.log('update')
  // }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
    }
    this.setState({ appState: nextAppState });
  };

  handleClick() {
    this.props.navigation.navigate("Add");
  }

  renderMain() {
    return (
      <ScrollView style={styles.container} ref={c => (this._scrollView = c)}>
        <View style={styles.section}>
          {this.props.drinks
            ? this.props.drinks.map(drink => {
                return (
                  <View key={drink.id}>
                    <View style={styles.drink}>
                      <Text style={styles.text}>{`${drink.person || ""}: ${
                        drink.name
                      }${drink.alcoholic ? "(a)" : ""}`}</Text>
                      <Text style={styles.icon}>
                        <Text
                          onPress={() => {
                            this.props.repeatDrink(drink);
                            // this._scrollView.scrollToEnd()
                          }}
                        >
                          🔁&nbsp;&nbsp;&nbsp;&nbsp;
                        </Text>
                        <Text onPress={() => this.props.removeDrink(drink)}>
                          ✖️
                        </Text>
                      </Text>
                    </View>

                    <Text style={styles.time}>
                      {`${moment(drink.time).format("HH:mm")} (${moment(
                        drink.time,
                      ).fromNow()})`}
                    </Text>
                  </View>
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
    );
  }

  renderBAC() {
    return <BacScreen />;
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <TabBarIOS>
          <TabBarIOS.Item
            title="List"
            onPress={() =>
              this.setState({
                tab: 1,
              })
            }
            selected={this.state.tab === 1}
          >
            {this.renderMain()}
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="BAC"
            onPress={() =>
              this.setState({
                tab: 2,
              })
            }
            selected={this.state.tab === 2}
          >
            {this.renderBAC()}
          </TabBarIOS.Item>
        </TabBarIOS>
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
    addLastDrink: () => dispatch(DrinkActions.addLastDrink()),
    removeDrink: drink => dispatch(DrinkActions.removeDrink(drink)),
    repeatDrink: drink => dispatch(DrinkActions.repeatDrink(drink)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
