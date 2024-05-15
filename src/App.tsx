import './App.css'
import Login from './pages/login';
import UserProfile from './pages/UserProfile';

function App() {

  // const [token, setToken] = useState<string | null>(null);
  return (
    <>
      {!localStorage.getItem('token') ? (

        <Login />
      ) : (
        <UserProfile/>
      )
    }
    </>
  )
}

export default App
