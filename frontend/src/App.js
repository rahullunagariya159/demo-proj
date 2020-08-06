import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import SignIn from './Components/SignIn';
import Dashboard from './Components/Dashboard';

function App() {
	return (
		<div>
			<BrowserRouter>
				<Route exact path="/" component={SignIn} />
				<Route path="/" component={Dashboard} />
			</BrowserRouter>
		</div>
	);
}

export default App;
