import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  addDrink: ['drink'],
  drinkRequest: ['query'],
  drinkSuccess: ['payload'],
  drinkFailure: null,
});

export const DrinkTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const drinks = [
  {
    name: 'Vodka Soda',
    calories: 70,
    proof: 40,
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
  [Types.DRINK_REQUEST]: request,
  [Types.DRINK_SUCCESS]: success,
  [Types.DRINK_FAILURE]: failure,
});
