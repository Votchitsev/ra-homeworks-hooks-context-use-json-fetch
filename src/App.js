import './App.css';
import { useState, useEffect } from 'react';

function useJsonFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          setError(response.status)
          return response.json()
        }

        return response.json()
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
  }, [])

  return [
    data ? data.status : '',
    error,
    loading,
  ]
  
}


function Data() {

  const [ data, error, loading ] = useJsonFetch('http://localhost:7070/data');

  return (
    <div className='data'>{ `${data} ${error} ${loading}` }</div>
  )
}

function Error() {
  const [ data, error, loading ] = useJsonFetch('http://localhost:7070/error');

  return (
    <div className='error'>{ `${data} ${error} ${loading}` }</div>
  )
}

function Loading() {
  const [ loading, data, error ] = useJsonFetch('http://localhost:7070/loading');

  return (
    <div className='loading'>{ `${data} ${error} ${loading}` }</div>
  )
}

function App() {
  return (
    <div className="App">
      <Data />
      <Error />
      <Loading />
    </div>
  );
}

export default App;
