import React , { useEffect, useState } from 'react'; 

import { FiPower , FiTrash2} from 'react-icons/fi'
import { Link , useHistory} from 'react-router-dom';
import logoImg from '../../assets/logo.svg'
import './style.css'
import api from '../../services/api';
export default function Profile() {

  const ongName = localStorage.getItem('ongNome');
  const ongId =localStorage.getItem('ongId');
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();
  useEffect(() => {
    api.get('/profile', {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
        setIncidents(response.data)
    })
  }, [ongId]);

  function handlerLogout() {
    localStorage.clear();
    history.push('/');
  } 

  async function handlerDeleteIncident(id) {
    try {
      await api.delete(`/incidents/${id}`,{
        headers: {
          Authorization: ongId
        }
      });
      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      alert('Erro ao delear o caso!')
    }
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero"/>  
        <span>Bem vinda, {ongName}</span>
        <Link to="/incident/new" className="button">Cadastrar novo caso</Link>
        <button onClick={handlerLogout}>
          <FiPower size={18} color="#e02041"/>
        </button>
      </header>

      <h1>Casoso Cadastrados</h1>

      <ul>
        {incidents.map(incident => (
           <li key={incident.id}>
            <strong>Casos:</strong>
            <p>{incident.title}</p>
            <strong>Descricao:</strong>
            <p>{incident.description}</p>
  
            <strong>Valor:</strong>
              <p>{Intl.NumberFormat('pt-BR', {style:'currency' ,currency: 'BRL'}).format(incident.value) }</p>
            <button type="button" onClick={() => handlerDeleteIncident(incident.id)}> 
              <FiTrash2 size={20} color="#A8A8B3"/>
            </button>
          </li>
        ))}
      </ul>
    </div>


  );
}
