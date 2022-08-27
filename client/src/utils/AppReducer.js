import { useReducer } from 'react';

import {
	GET_MOVIES,
	GET_WATCHLIST,
	ADD_TO_WATCHLIST,
	REMOVE_FROM_WATCHLIST,
} from './actions';

export const reducer = (state, action) => {
	switch (action.type) {
		case ADD_TO_WATCHLIST:
			return {
				...state,
				movies: [...state.movies, action.movie],
			};
		default:
			return state ? state : '';
	}
};

export function useMovieReducer(initialState) {
	return useReducer(reducer, initialState);
}
