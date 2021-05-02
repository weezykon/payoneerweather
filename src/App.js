import React, { useState, useEffect } from 'react'
import './App.css';
import Loading from './components/Loading'
import Weather from './components/Weather'

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setPreloader } from './actions';

function App() {
  const { preload } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setPreloader(false));
    }, 3000)
  }, [])

  return (
    <>
      {!preload ? (
        <Weather />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;