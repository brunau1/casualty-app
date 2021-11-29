import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
	const [username, setUsername] = useState('');
	const history = useHistory();
	async function handleLogin(e) {
		e.preventDefault();
		try {
			const response = await api.post('auth/login', { username });
			localStorage.setItem('userId', response.data.user._id);
			localStorage.setItem('userProfileName', response.data.user.name);
			history.push('/incidents');
		} catch (err) {
			alert('Falha no login, tente novamente');
		}
	}
	return (
		<div className="logon-container">
			<section className="form">
				<img src={logoImg} alt="Be the hero" />
				<form onSubmit={handleLogin}>
					<h1>Faça seu logon</h1>
					<input
						placeholder="Sua ID"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<button className="button" type="submit">
						Entrar
					</button>
					<Link to="/register" className="back-link">
						<FiLogIn size={16} color="#e02041" />
						Não tenho cadastro
					</Link>
				</form>
			</section>
			<img src={heroesImg} alt="heroes" />
		</div>
	);
}
