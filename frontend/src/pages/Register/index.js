import React, {useState} from 'react';
import { FiArrowLeft} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import './style.css'
import api from '../../services/api';
import logoImg from '../../assets/logo.svg'

export default function Register() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  
  const history = useHistory();

  async function handleRegister(event) {
    event.preventDefault();
    const data = {
      nome,
      email,
      whatsapp,
      cidade,
      uf
    }
    try {
      const resp = await api.post('ongs', data);
      alert(`Seu ID de acesso é: ${resp.data.id}`) ;
      history.push('/')
    } catch (error) {
      alert(`Erro no cadastro tente novamente.`)  
    }
    
  }

  return (
   <div className="register-container">
     <div className="content">
       <section>
        <img src={logoImg} alt="Be the Heror"/>
        <h1>Cadastro</h1>
        <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de usa ONG</p>
        <Link className="back-link" to="/">
          <FiArrowLeft size={16} color="#E02041"/>
          Não tenho cadastro
        </Link>
       </section>
       <form onSubmit={handleRegister}>
        <input placeholder="Nome da ONG" value={nome} onChange={e=> setNome(e.target.value)}/>
        <input value={email} onChange={e=> setEmail(e.target.value)} type="email" placeholder="E-mail"/>
        <input value={whatsapp} onChange={e=> setWhatsapp(e.target.value)} placeholder="Whatsapp"/>
        <div className="input-group">
          <input value={cidade} onChange={e=> setCidade(e.target.value)} placeholder="Cidade"/>
          <input value={uf} onChange={e=> setUf(e.target.value)} placeholder="UF" style={{width:80}}/>
        </div>
        <button className="button" type="submit">Cadastrar</button>
       </form>
     </div>
   </div>
  );
}