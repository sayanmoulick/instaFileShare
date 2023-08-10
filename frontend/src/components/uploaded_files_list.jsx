import React, { Component } from 'react';
// import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { saveAs } from 'file-saver';
import Navigation from './navigation';

class UploadedFilesList extends Component {
	state = {
		files: []
	};

	componentDidMount() {
		console.log('>')
		axios.post('http://localhost:4000/api/file/child')
			.then(response => {
				this.setState({
							files: response.data.data
						});
				})
			.catch(function(error) {
				console.log(error);
				});
	}

	downloadHandler = async (fileUrl) => {
		try {
			const file = fileUrl.split('/').pop();
			const response = await axios.get(fileUrl, {
			responseType: 'blob'
		});
		saveAs(response.data, file);
		} catch (error) {
			console.log(error)
		}
		
	};

	render() {
		return (
			<div className="container mt-5">
				<div className="row">
					<div className="col-md-3">
						<Navigation />
					</div>
					<div className="col-md-9">
						<table className="table table-bordered">
							<thead>
								<tr>
									<th>File Name</th>
									<th>File Type</th>
									{/* <th>Uploaded By</th>
									<th>Updload Date</th>
									<th>Expire Date</th> */}
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{this.state.files.length === 0 ? (
									<tr className="bg-info text-center text-white">
										<td colSpan="6">You have not Uploaded any files</td>
									</tr>
								) : (
									<React.Fragment>
											{this.state.files.map((file) => (
											
											<tr key={file._id}>
												<td>
													<Link to={file.value}>
														{file.value.split('/').pop()}
													</Link>
												</td>
												<td>
													{file.value.substring(
														file.value.lastIndexOf('.') + 1
													)}
												</td>
												{/* <td>{file.user.username}</td>
												<td>{file.upload_date.substring(0, 10)}</td>
												<td>{file.expire_date.substring(0, 10)}</td> */}
												<th>
													<button
														className="btn btn-outline-primary btn-sm"
														onClick={() => this.downloadHandler(file.value)}
													>
														Download
													</button>
												</th>
											</tr>
										))}
									</React.Fragment>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

export default UploadedFilesList;
