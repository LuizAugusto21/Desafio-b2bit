import { FormEvent, useState } from "react";
import  axios  from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css"
// type token = {
//     setToken: (token: string) => void;
//   }


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
    
          localStorage.setItem("token",response.data.tokens.access);

          setError(null);
          navigate("/profile")
        } catch (err) {
          setError('Erro ao fazer login, verifique se o usuário e senha estão corretos!');
        }
      };

    return (
      <div className="content">
        <div className="login-container">
            <img src="/B2Bit_Logo.png" alt="" className="login-container-image"/>
            <form onSubmit={handleSubmit} className="login-container-form">
                <label>E-mail</label>
                <input type="email" placeholder="@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Password</label>
                <input type="password" placeholder="**************" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit"> Sign in</button>
            </form>
            {error && <p>{error}</p>}
        </div>
      </div>
    )
}

export default Login