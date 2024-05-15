import { FormEvent, useState } from "react";
import  axios  from "axios";
import { useNavigate } from "react-router-dom";

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
        <div>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Senha</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit"> Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}

export default Login