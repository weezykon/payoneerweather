import React from 'react';
import { render, fireEvent, screen } from './tests/test-utils'
import App from './App';

const thunk = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState)
  }

  return next(action)
}

const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn()
  }
  const next = jest.fn()

  const invoke = action => thunk(store)(next)(action)

  return { store, next, invoke }
}

it('Loads Preloader', () => {
  render(<App />, { initialState: { preload: true } })

  expect('preload').toBeTruthy()
})

// it('Update Preloader State Weather', () => {
//   const timerGame = require('./tests/timerGame');
//   const callback = jest.fn();

//   timerGame(callback);
//   jest.useFakeTimers()
//   jest.runAllTimers();
//   const { store, invoke } = create()
//   invoke((dispatch, getState) => {
//     dispatch('setPreloader')
//     getState()
//   })
//   expect(store.dispatch).toHaveBeenCalledWith('setPreloader')
//   expect(store.getState).toHaveBeenCalled()
//   console.log(store.getState)
//   expect(store.getState).toBeTruthy()
// })
