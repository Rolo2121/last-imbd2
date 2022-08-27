import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './app.reducer';
const initialState = {
	watchlist: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);
	const addMovieToWatchlist = (movie) => {
		dispatch({ type: 'ADD_MOVIE_TO_WATCHLIST', payload: movie });
	};
	return (
		<GlobalContext.Provider value={{ watchlist: state.watchlist }}>
			{props.children}
		</GlobalContext.Provider>
	);
};
