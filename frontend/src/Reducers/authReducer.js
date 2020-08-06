const authState = {
	email: '',
	password: '',
	authToken: '',
};

const authReducer = (state = authState, action) => {
	switch (action.type) {
		case 'GET_FORM':
			return {
				...state,
				[action.payload.name]: action.payload.val,
			};
		case 'AUTH_TOKEN':
			return {
				...state,
				authToken: action.payload,
			};
		default:
			return state;
	}
};

export default authReducer;
