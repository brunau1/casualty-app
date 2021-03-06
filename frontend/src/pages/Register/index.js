import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Register() {
	const history = useHistory();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [city, setCity] = useState('');
	const [uf, setUf] = useState('');

	async function handleRegister(e) {
		e.preventDefault();
		const data = { name, email, location: { city, uf } };
		try {
			const response = await api.post('auth/signup', data);
			console.log(response);
			localStorage.setItem('userId', response.data.user._id);
			alert(`Seu ID de acesso: ${response.data.user.username}`);
			history.push('/');
		} catch (err) {
			alert('Erro ao cadastrar usuário');
		}
	}
	return (
		<div className="register-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Casualty" />
					<h1>Cadastro</h1>
					<p>
						Faça seu cadastro, entre na plataforma e nos ajude a tornar a vida
						das pessoas mais segura.
					</p>
					<Link to="/" className="back-link">
						<FiArrowLeft size={16} color="#e02041" />
						Voltar para o logon
					</Link>
				</section>
				<form onSubmit={handleRegister}>
					<input
						placeholder="Seu nome completo"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="email"
						placeholder="E-mail"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<div className="input-group">
						<input
							placeholder="Cidade"
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
						<input
							placeholder="UF"
							style={{ width: 80 }}
							value={uf}
							onChange={(e) => setUf(e.target.value)}
							maxLength={2}
						/>
					</div>
					<button className="button" type="submit">
						Cadastrar
					</button>
				</form>
			</div>
		</div>
	);
}
