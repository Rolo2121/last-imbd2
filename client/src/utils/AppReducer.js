import { useReducer } from 'react';

import { ADD_TO_WATCHLIST } from './actions';

export const reducer = (state, action) => {
	switch (action.type) {
		case ADD_TO_WATCHLIST:
			return {
				...state,
				movies: action.movies,
			};
		default:
			return state ? state : '';
	}
};

export function useMovieReduce(initialState) {
	return useReducer(reducer, initialState);
}
