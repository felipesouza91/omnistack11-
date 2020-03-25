import React, {useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api'
import './style.css';

import logoImg from '../../assets/logo.svg'

export default function Newincident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const ongId =localStorage.getItem('ongId');
  const history = useHistory();
  async function handleSubmit(event) {
    event.preventDefault();
    const data = { title, description, value };
    try {
      await api.post('/incidents', data, {
        headers: {
          Authorization: ongId
        }
      });
      alert('Incidadente cadastro')
    } catch (error) {
      alert('Erro ao cadastrar incident')
    }
   
  }

  return (
    <div className="new-insident-container">
    <div className="content">
      <section>
       <img src={logoImg} alt="Be the Heror"/>
       <h1>Cadastro novo caso</h1>
       <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso.</p>
       <Link className="back-link" to="/profile">
         <FiArrowLeft size={16} color="#E02041"/>
         Voltar para home
       </Link>
      </section>
      <form onSubmit={handleSubmit} >
       <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titulo do caso"/>
       <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição"/>
       <input value={value} onChange={e => setValue(e.target.value)} placeholder="Valor em reais"/>
       <button className="button" type="submit">Cadastrar</button>
      </form>
    </div>
  </div>
  );
}