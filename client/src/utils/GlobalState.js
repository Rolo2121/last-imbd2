import React, { createContext, useReducer, useEffect, useContext } from 'react';
import {reducer} from './AppReducer';
const initialState = {
	watchlist: [],
	currentUser: null,
};

export const GlobalContext = createContext(initialState);

export const useValue = () => {
	return useContext(GlobalContext)
}

export const GlobalProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const addMovieToWatchlist = (movie) => {
		dispatch({ type: 'ADD_MOVIE_TO_WATCHLIST', payload: movie });
	};
	const setUser = () => {
		dispatch({type: 'SET_USER', payload: null})
	}
	return (
		<GlobalContext.Provider value={{ watchlist: state.watchlist, currentUser: state.currentUser, setUser: setUser }}>
			{props.children}
		</GlobalContext.Provider>
	);
};
