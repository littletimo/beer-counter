// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { last } from 'ramda'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addDrink: ['drink'],
  addLastDrink: null,
  removeDrink: ['drink'],
  repeatDrink: ['drink'],
  drinkRequest: ['query'],
  drinkSuccess: ['payload'],
  drinkFailure: null,
})

export const DrinkTypes = Types
export default Creators

/* ------------- Initial State ------------- */

const drinks = [
  {
    id: 0,
    name: 'Vodka Soda',
    calories: 70,
    proof: 40,
    time: '2017-07-28T00:07:12.662Z',
  },
]

export const INITIAL_STATE = Immutable({
  query: null,
  fetching: null,
  error: null,
  drinks: drinks,
  maxId: 0,
})

/* ------------- Reducers ------------- */

export const add = (state, { drink }) => {
  let { drinks, maxId } = state
  drinks = Immutable.asMutable(drinks)
  drink.id = maxId + 1
  if (!drink.time) drink.time = new Date().toJSON()
  drinks.push(drink)
  drinks = drinks.sort((a, b) => (a.time < b.time ? -1 : 1))
  return state.merge({ fetching: false, error: null, drinks, maxId: maxId + 1 })
}

export const addLast = state => {
  let { drinks, maxId } = state
  if (!drinks || !drinks.length) return state
  drinks = Immutable.asMutable(drinks)
  const drink = Object.assign({}, last(drinks))
  drink.id = maxId + 1
  drink.time = new Date().toJSON()
  drinks.push(drink)
  return state.merge({ fetching: false, error: null, drinks, maxId: maxId + 1 })
}

export const remove = (state, { drink }) => {
  let { drinks } = state
  drinks = drinks.filter(d => d.id !== drink.id)
  return state.merge({ fetching: false, error: null, drinks })
}

export const repeat = (state, { drink }) => {
  let { drinks, maxId } = state
  drinks = Immutable.asMutable(drinks)
  const newDrink = Object.assign({}, drink)
  newDrink.id = maxId + 1
  newDrink.time = new Date().toJSON()
  drinks.push(newDrink)
  drinks = drinks.sort((a, b) => (a.time < b.time ? -1 : 1))
  return state.merge({ fetching: false, error: null, drinks, maxId: maxId + 1 })
}

// request the data from an api
export const request = (state, { query }) =>
  state.merge({ fetching: true, query, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  const { drinks } = state
  drinks.push(payload)
  return state.merge({ fetching: false, error: null, drinks })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_DRINK]: add,
  [Types.ADD_LAST_DRINK]: addLast,
  [Types.REMOVE_DRINK]: remove,
  [Types.REPEAT_DRINK]: repeat,
  [Types.DRINK_REQUEST]: request,
  [Types.DRINK_SUCCESS]: success,
  [Types.DRINK_FAILURE]: failure,
})
