import { useState } from 'react'
import './App.css'
import Login from './pages/login';
import UserProfile from './pages/UserProfile';

function App() {

  const [token, setToken] = useState<string | null>(null);
  return (
    <>
      {!token ? (

        <Login setToken={setToken} />
      ) : (
        <UserProfile token={token}/>
      )
    }
    </>
  )
}

export default App
