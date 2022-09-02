import './App.css';
import Layout from './pages/Layout';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import { Routes, Route, BrowserRouter} from 'react-router-dom';

import React from 'react';

import Movie from './pages/Movie';
import {useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';


import { GET_MOVIES } from './utils/queries';

// import { ifError } from 'assert';
function App() {
	const [setLoggedIn] = useState(false);
	const { data: movies } = useQuery(GET_MOVIES);


	const [ setMovie] = useState(null);


	function login() {
		setLoggedIn(true);
	}
	
	




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
						
								/>
							}
						/>
						<Route path="/movie/:id" element={<Movie  />} />

					</Routes>
				</div>
			</BrowserRouter>
		</>
	);
}

export default App;
