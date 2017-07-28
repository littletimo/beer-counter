import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {last} from 'ramda';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  addDrink: ['drink'],
  addLastDrink: null,
  drinkRequest: ['query'],
  drinkSuccess: ['payload'],
  drinkFailure: null,
});

export const DrinkTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const drinks = [
  {
    id: 0,
    name: 'Vodka Soda',
    calories: 70,
    proof: 40,
    time: '2017-07-28T00:07:12.662Z',
  },
];

export const INITIAL_STATE = Immutable({
  query: null,
  fetching: null,
  error: null,
  drinks: drinks,
});

/* ------------- Reducers ------------- */

export const add = (state, {drink}) => {
  let {drinks} = state;
  drinks = Immutable.asMutable(drinks);
  drink.id = drinks.length;
  drink.time = new Date().toJSON();
  drinks.push(drink);
  return state.merge({fetching: false, error: null, drinks});
};

export const addLast = state => {
  let {drinks} = state;
  drinks = Immutable.asMutable(drinks);
  const drink = Immutable.asMutable(last(drinks));
  drink.id = drinks.length;
  drink.time = new Date().toJSON();
  drinks.push(drink);
  return state.merge({fetching: false, error: null, drinks});
};

// request the data from an api
export const request = (state, {query}) =>
  state.merge({fetching: true, query, payload: null});

// successful api lookup
export const success = (state, action) => {
  const {payload} = action;
  const {drinks} = state;
  drinks.push(payload);
  return state.merge({fetching: false, error: null, drinks});
};

// Something went wrong somewhere.
export const failure = state =>
  state.merge({fetching: false, error: true, payload: null});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_DRINK]: add,
  [Types.ADD_LAST_DRINK]: addLast,
  [Types.DRINK_REQUEST]: request,
  [Types.DRINK_SUCCESS]: success,
  [Types.DRINK_FAILURE]: failure,
});
