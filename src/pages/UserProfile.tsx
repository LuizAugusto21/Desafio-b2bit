import axios from 'axios';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

type token = {
  token: string
}

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

// type User = {
//   "name": string,
//   "email": string
// }


const UserProfile: React.FC<token> = ({ token }) => {

  const [profile, setProfile] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    fetchUser()
  }, [token])

  if (error) return <p>{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      {/* <pre>{JSON.stringify(UserProfile.name, null, 2)}</pre> */}
      <h1>{profile.name}</h1>
    </div>
  );
};

export default UserProfile;