// import { serverUrl } from '../commonVariable';

export const signIn = (data) => {
	return async (dispatch) => {
		console.log('calll');
	};
};

export const SignInSubmitHandlar = (data) => {
	return async (dispatch) => {
		console.log('action', data);
		const serverUrl = '';
		// serverUrl = await serverUrl.serverUrl();
		// console.log(serverUrl);

		console.log(process.env.REACT_APP_API_URL);

		const result = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
			method: 'post',
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
		});

		const resultData = result.json();

		resultData
			.then((data) => {
				console.log(data);
				if (data.code == 200) {
					dispatch({ type: 'AUTH_TOKEN', payload: data.authToken });
				}
			})
			.catch((err) => {
				console.log('error...', err);
			});
	};
};
