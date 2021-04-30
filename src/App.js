import React, { useState, useEffect } from 'react'
import './App.css';
import Loading from './components/Loading'
import Weather from './components/Weather'


function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000)
  }, [])

  return (
    <>
      {loading === false ? (
        <Weather />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;