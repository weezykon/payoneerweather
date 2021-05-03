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
