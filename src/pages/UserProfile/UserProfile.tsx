import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import { Container } from './styles';

type User = {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  avatar: string | null;
  type: string;
  created: string;
  modified: string;
  role: string;
}




const UserProfile: React.FC = () => {

  const [profile, setProfile] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchUser = async () => {
    try {
      const response = await axios.get('https://api.homologation.cliqdrive.com.br/auth/profile/', {
        headers: {
          'Accept': 'application/json;version=v1_web',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`

        }
      });

      setProfile(response.data)
      console.log(response.data);
    } catch (err) {
      setError('Erro ao obter dados, tente novamente mais tarde');
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
    fetchUser()
  },);



  const handleLogout = () =>{
    localStorage.clear();
    navigate("/")
  }

  if (error) return <p>{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h1>{profile.name}</h1>
      <button type= "button"onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserProfile;