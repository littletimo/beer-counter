// @flow

import React, { Component } from 'react'
import { ScrollView, View, Text, AppState } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import DrinkActions from '../Redux/DrinkRedux'
import RoundedButton from '../Components/RoundedButton'

// Styles
import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {
  // static navigationOptions = {
  //   title: 'Welcome',
  // };

  state = {
    appState: AppState.currentState,
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  // componentDidUpdate() {
  //   console.log('update')
  // }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!')
    }
    this.setState({ appState: nextAppState })
  }

  handleClick() {
    this.props.navigation.navigate('Add')
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container} ref={c => (this._scrollView = c)}>
          <View style={styles.section}>
            {this.props.drinks
              ? this.props.drinks.map(drink => {
                  return (
                    <View key={drink.id}>
                      <View style={styles.drink}>
                        <Text style={styles.text}>
                          {drink.name}
                        </Text>
                        <Text style={styles.icon}>
                          <Text
                            onPress={() => {
                              this.props.repeatDrink(drink)
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
                        {`${moment(drink.time).format('HH:mm')} (${moment(
                          drink.time,
                        ).fromNow()})`}
                      </Text>
                    </View>
                  )
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
    )
  }
}

const getTodaysDrinks = drinks =>
  drinks.filter(drink => moment(drink.time) > moment().subtract('12', 'h'))

const mapStateToProps = state => {
  return { drinks: getTodaysDrinks(state.drink.drinks) }
}

const mapDispatchToProps = dispatch => {
  return {
    addLastDrink: () => dispatch(DrinkActions.addLastDrink()),
    removeDrink: drink => dispatch(DrinkActions.removeDrink(drink)),
    repeatDrink: drink => dispatch(DrinkActions.repeatDrink(drink)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
