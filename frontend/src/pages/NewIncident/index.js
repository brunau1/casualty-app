import React, { useState, useRef, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMapEvents,
} from 'react-leaflet';

import api from '../../services/api';
import FileService from '../../services/file.service';

import './styles.css';

export default function NewIncident() {
	const [state, setState] = useState({});
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const userId = localStorage.getItem('userId');
	const history = useHistory();

	const [position, setPosition] = useState({
		lat: 51.505,
		lng: -0.09,
	});

	function DraggableMarker() {
		const map = useMapEvents({
			click() {
				map.locate();
			},
			locationfound(e) {
				setPosition(e.latlng);
				map.flyTo(e.latlng, map.getZoom());
			},
		});

		const markerRef = useRef(null);
		const eventHandlers = useMemo(
			() => ({
				dragend() {
					const marker = markerRef.current;
					if (marker != null) {
						setPosition(marker.getLatLng());
					}
				},
			}),
			[]
		);

		return (
			<Marker
				draggable={true}
				eventHandlers={eventHandlers}
				position={position}
				ref={markerRef}
			>
				<Popup minWidth={90}>
					<span>
						<strong>Você está aqui</strong>
					</span>
				</Popup>
			</Marker>
		);
	}

	function selectFiles(event) {
		setState({
			selectedFiles: event.target.files,
		});
	}
	function uploadFiles(incidentId) {
		const selectedFiles = state.selectedFiles;
		for (const file of selectedFiles)
			FileService.upload(file, incidentId).then((response) => {
				console.log(response.data);
			});
	}
	async function handleNewIncident(e) {
		e.preventDefault();
		const data = {
			name,
			description,
			coordinates: position,
		};
		console.log(data);
		try {
			await api
				.post('incidents', data, {
					headers: {
						authorization: userId,
					},
				})
				.then((response) => {
					alert('Incidente cadastrado com sucesso!');
					uploadFiles(response.data.incident._id);
				});
			history.push('/incidents');
		} catch (err) {
			alert('Erro ao cadastrar caso, tente novamente');
		}
	}

	return (
		<div className="new-incident-container">
			<div className="content">
				<div>
					<section className="info-section">
						<h1>Cadastrar novo caso</h1>
					</section>
					<section className="map-section">
						<MapContainer center={position} zoom={13} scrollWheelZoom={true}>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							<DraggableMarker />
						</MapContainer>
					</section>
					<section className="map-info-section">
						<p>Selecione no mapa acima a localização do acidente.</p>
						<Link to="/incidents" className="back-link">
							<FiArrowLeft size={16} color="#e02041" />
							Voltar para home
						</Link>
					</section>
				</div>
				<div>
					<section className="info-section">
						<p>
							Descreva o caso detalhadamente para que outras pessoas sejam
							informadas
						</p>
					</section>
					<section className="form-section">
						<form onSubmit={handleNewIncident}>
							<input
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Título do incidente"
							/>
							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder="Descrição"
							/>
							<input
								type="file"
								id="file"
								multiple
								name="file"
								onChange={selectFiles}
							/>
							<button className="button" type="submit">
								Cadastrar
							</button>
						</form>
					</section>
				</div>
			</div>
		</div>
	);
}
