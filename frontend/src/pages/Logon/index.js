import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './style.css';

import api from '../../services/api';

import heroImage from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg'

export default function Logong() {
  const [id, setId ] = useState('');
  const history = useHistory();
  async function handleRegister(event) {
    event.preventDefault();
    try {
      const response = await api.post('/session', {id});
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongNome', response.data.nome);
      history.push('/profile')
    } catch (error) {
      alert('Erro ao fazer login');
    }
  }
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Heroes"/>
        <form onSubmit={handleRegister}>
          <h1>Faça seu logon</h1>
          <input placeholder="Sua Id" value={id} onChange={e=> setId(e.target.value)}/>
          <button className="button" type="submit">Entrar</button>
          
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroImage} alt="Heroes"/>
    </div>
  );
}