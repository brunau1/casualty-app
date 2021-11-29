import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Incidents() {
	const [incidents, setIncidents] = useState([]);
	const userId = localStorage.getItem('userId');
	const userName = localStorage.getItem('userProfileName');
	const history = useHistory();

	useEffect(() => {
		setIncidents([]);
		api
			.get('incidents', {
				headers: {
					authorization: userId,
				},
			})
			.then((response) => {
				setIncidents(response.data.incidents);
			});
	}, [userId]);

	async function handleDeleteIncident(id) {
		try {
			await api.delete(`incidents/${id}`, {
				headers: {
					authorization: userId,
				},
			});
			setIncidents(incidents.filter((incident) => incident._id !== id));
			alert('Incidente deletado com sucesso!');
		} catch (err) {
			alert('Erro ao deletar o caso, tente novamente');
		}
	}

	function handleLogout() {
		localStorage.clear();
		history.push('/');
	}

	return (
		<div className="profile-container">
			<header>
				<img src={logoImg} alt="Be the hero" />
				<span>Bem vindo(a), {userName}</span>

				<Link className="button" to="/incident/new">
					Cadastrar novo caso
				</Link>
				<button onClick={handleLogout} type="button">
					<FiPower size={18} color="#e02041" />
				</button>
			</header>

			<h1>Casos cadastrados</h1>
			<ul>
				{incidents.map((incident) => (
					<li key={incident._id}>
						<div className="info">
							<strong>CASO:</strong>
							<p>{incident.name}</p>
							<strong>DESCRIÇÃO:</strong>
							<p>{incident.description}</p>
							<strong>DATA:</strong>
							<p>{new Date(incident.createdAt).toLocaleDateString()}</p>
						</div>
						<button
							type="button"
							onClick={() => handleDeleteIncident(incident._id)}
						>
							<FiTrash2 size={20} color="#a8a8b3" />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
