import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./login.module.css";


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://api.homologation.cliqdrive.com.br/auth/login/', {
        email: email,
        password: password
      }, {
        headers: {
          'Accept': 'application/json;version=v1_web',
          'Content-Type': 'application/json'

        }
      });

      localStorage.setItem("token", response.data.tokens.access);

      setError(null);
      navigate("/profile")
    } catch (err) {
      setError('Login inválido, verifique se o usuário e senha estão corretos!');
    }
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    }
  }, [navigate]);

  return (
    <div className={styles.content}>
      <div className={styles.loginContainer}>
        <img src="/B2Bit_Logo.png" alt="" className={styles.loginContainerImage} />
        <form onSubmit={handleSubmit} className={styles.loginContainerForm}>
          <label>E-mail</label>
          <input type="email" placeholder="@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Password</label>
          <input type="password" placeholder="**************" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Sign in</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  )
}

export default Login