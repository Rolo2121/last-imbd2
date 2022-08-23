import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import './CreateAccount.js';
import Nav from './Nav';
import Comments from './Comments';
import {
	PageHeader,
	Breadcrumb,
	Layout,
	Menu,
	Col,
	Row,
	TimePicker,
	Form,
	Input,
	Button,
	Space,
	Card,
	Image,
	Tag,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { getMe, deleteMovie } from '../utils/API';
import Auth from '../utils/auth';
import { removeMovieId } from '../utils/localStorage';

const SavedMovies = () => {
	const [userData, setUserData] = useState({});

	const userDataLength = Object.keys(userData).length;

	useEffect(() => {
		const getUserData = async () => {
			try {
				const token = Auth.loggedIn() ? Auth.getToken() : null;

				if (!token) {
					return false;
				}

				const response = await getMe(token);

				if (!response.ok) {
					throw new Error('something went wrong!');
				}

				const user = await response.json();
				setUserData(user);
			} catch (err) {
				console.error(err);
			}
		};

		getUserData();
	}, [userDataLength]);

	const handleDeleteMovie = async (movieId) => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			const response = await deleteMovie(movieId, token);

			if (!response.ok) {
				throw new Error('something went wrong!');
			}

			const updatedUser = await response.json();
			setUserData(updatedUser);

			removeMovieId(movieId);
		} catch (err) {
			console.error(err);
		}
	};

	if (!userDataLength) {
		return <h2>LOADING...</h2>;
	}

	return (
		<>
			<Jumbotron fluid className="text-light bg-dark">
				<Container>
					<h1>Viewing saved movies!</h1>
				</Container>
			</Jumbotron>
			<Container>
				<h2>
					{userData.savedMovies.length
						? `Viewing ${userData.savedMovies.length} saved ${
								userData.savedMovies.length === 1 ? 'movie' : 'movies'
						  }:`
						: 'You have no saved movies!'}
				</h2>
				<CardColumns>
					{userData.savedMovies.map((movie) => {
						return (
							<Card key={movie.movieId} border="dark">
								{movie.image ? (
									<Card.Img
										src={movie.image}
										alt={`The cover for ${movie.title}`}
										variant="top"
									/>
								) : null}
								<Card.Body>
									<Card.Title>{movie.title}</Card.Title>

									<Card.Text>{movie.description}</Card.Text>
									<Button
										className="btn-block btn-danger"
										onClick={() => handleDeleteMovie(movie.movieId)}>
										Delete Movie!
									</Button>
								</Card.Body>
							</Card>
						);
					})}
				</CardColumns>
			</Container>
		</>
	);
};

export default WatchList;
