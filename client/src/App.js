// import './App.css';
// import Layout from './pages/Layout';
// import CreateAccount from './pages/CreateAccount';
// import Login from './pages/Login';
// import Watchlist from './pages/WatchList';
// import { Routes, Route, BrowserRouter, Switch } from 'react-router-dom';

// import Movie from './pages/Movie';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useQuery, gql, useMutation } from '@apollo/client';
// import { GET_WATCHLIST } from './utils/queries';
// import { UPDATE_WATCHLIST } from './utils/mutations';

// // import { ifError } from 'assert';
// function App() {
// 	const [loggedIn, setLoggedIn] = useState(false);
// 	const { data: movies } = useQuery(GET_MOVIES);
// 	const { data: watchlist } = useQuery(GET_WATCHLIST);
// 	const [mutateFunction, { data: updatedWatchlist }] =
// 		useMutation(UPDATE_WATCHLIST);
// 	const [movie, setMovie] = useState(null);

// 	function login() {
// 		setLoggedIn(true);
// 	}
// 	function logout() {
// 		setLoggedIn(false);
// 	}

// 	function removeFromWatchlist(id) {
// 		setWatchlist(watchlist.filter((entry) => entry._id !== id));
// 	}
// 	function addToWatchlist(id) {
// 		const foundMovie = movies.find((movie) => movie._id === id);
// 		if (foundMovie) {
// 			setWatchlist([...watchlist, foundMovie]);
// 			mutateFunction({ variables: { movieId: foundMovie._id } });
// 		}
// 	}

// 	useEffect(() => {
// 		async function checkLoggedIn() {
// 			try {
// 				const axios = await axios.get('/api/user/ping');
// 				login();
// 			} catch (error) {}
// 		}
// 		checkLoggedIn();
// 	}, []);

import './App.css';
import Layout from './pages/Layout';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import Watchlist from './pages/WatchList';
import { Routes, Route, BrowserRouter, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Movie from './pages/Movie';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { GlobalState } from './utils/GlobalState';

// import { ifError } from 'assert';
function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [watchlist, setWatchlist] = useState([]);
	const [movie, setMovie] = useState(null);
	const [movies, setMovies] = useState([]);

	function login() {
		setLoggedIn(true);
	}
	function logout() {
		setLoggedIn(false);
	}

	function removeFromWatchlist(id) {
		setWatchlist(watchlist.filter((entry) => entry._id !== id));
	}
	function addToWatchlist(id) {
		const foundMovie = movies.find((movie) => movie._id === id);
		if (foundMovie) {
			setWatchlist([...watchlist, foundMovie]);
		}
	}

	useEffect(() => {
		async function checkLoggedIn() {
			try {
				const response = await axios.get('/api/user/ping');
				login();
			} catch (error) {}
		}
		checkLoggedIn();
	}, []);

	useEffect(() => {
		if (!loggedIn) return;
		async function fetchWatchlist() {
			const response = await axios.get('/api/user/watchlist');
			setWatchlist(response.data);
		}
		fetchWatchlist();
	}, [loggedIn]);

	useEffect(() => {
		const getMovies = async () => {
			const response = await fetch('/api/movie');
			console.log(response);
			const data = await response.json();
			setMovies(data);
		};
		getMovies();
	}, []);

	return (
		<>
			<BrowserRouter>
				<div className="App">
					<Routes>
						<Route
							path="/createaccount"
							element={<CreateAccount onLogin={login} />}
						/>
						<Route path="/login" element={<Login onLogin={login} />} />
						<Route
							path="/"
							element={
								<Layout
									setMovie={(movie) => {
										setMovie(movie);
									}}
									movies={movies}
									onAdd={addToWatchlist}
								/>
							}
						/>
						<Route path="/movie" element={<Movie movie={movie} />} />
						<Route
							path="/watchlist"
							element={
								<Watchlist
									watchlist={watchlist}
									onRemove={removeFromWatchlist}
								/>
							}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</>
	);
}

export default App;
