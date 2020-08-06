import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Card,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
} from 'reactstrap';
import { SignInSubmitHandlar } from '../Actions/authAction';

import '../Assets/css/signin.css';

function SignIn(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [inputs, setInputs] = useState({});
	const dispatch = useDispatch();

	const stateData = useSelector((state) => {
		return state.auth;
	});

	const onInputChangeHandlar = async (event) => {
		event.persist();

		setInputs((inputs) => ({
			...inputs,
			[event.target.name]: event.target.value,
		}));
	};

	const onSubmitHandlar = async () => {
		await dispatch(SignInSubmitHandlar(inputs));
	};

	useEffect(() => {
		if (stateData.authToken) {
			localStorage.setItem('authToken', stateData.authToken);
			props.history.push('/dashboard');
		}
	}, [stateData.authToken]);
	return (
		<div>
			<Card className="main-card">
				<CardBody>
					<CardTitle>Sign In</CardTitle>
					<CardSubtitle>Enter a valid information</CardSubtitle>
					<CardText>
						<Form>
							<FormGroup>
								<Label for="exampleEmail">Email</Label>
								<Input
									type="email"
									name="email"
									id="exampleEmail"
									placeholder="Enter email address"
									onChange={(e) => onInputChangeHandlar(e)}
								/>
							</FormGroup>
							<FormGroup>
								<Label for="examplePassword">Password</Label>
								<Input
									type="password"
									name="password"
									id="examplePassword"
									placeholder="Enter a password"
									onChange={(e) => onInputChangeHandlar(e)}
								/>
							</FormGroup>
						</Form>
					</CardText>
					<Button
						color="primary"
						className="btn-signin"
						onClick={() => onSubmitHandlar()}
					>
						Sign in
					</Button>
					<Button color="danger">Clear</Button>
				</CardBody>
			</Card>
		</div>
	);
}

export default SignIn;
