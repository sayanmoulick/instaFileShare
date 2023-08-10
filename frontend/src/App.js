import React from 'react';
import { Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Navbar from './components/navbar';
import UploadedFilesList from './components/uploaded_files_list';
import PrivateRoute from './commons/privateRoute';

class App extends React.Component {
	state = {};
	componentDidMount() {
		try {
			const token = localStorage.getItem('token');
			const user = jwtDecode(token);
			this.setState({ user });
		} catch (ex) {}
	}
	render() {
		return (
			<div className="App">
				<Navbar user={this.state.user} />
				<Switch>
					<Route path="/uploaded_files" component={UploadedFilesList} />
				</Switch>
			</div>
		);
	}
}

export default App;
