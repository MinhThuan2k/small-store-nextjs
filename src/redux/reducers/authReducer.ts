/** @format */

import {
	ACTION_AUTH_LOGIN_SUCCESS,
	ACTION_AUTH_LOGOUT,
	AuthAction,
	AuthState,
} from "@/redux/types/auth";

const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
};

export const authReducer = (
	state: AuthState = initialState,
	action: AuthAction
): AuthState => {
	switch (action.type) {
		case ACTION_AUTH_LOGIN_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
			};
		case ACTION_AUTH_LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				user: null,
			};
		default:
			return state;
	}
};
