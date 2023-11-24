import React, { useState } from "react";
import axios from "axios";

const User = () => {
	const [newUser, setNewUser] = useState({
		name: "",
		birthdate: "",
		photo: "",
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("photo", newUser.photo);
		formData.append("birthdate", newUser.birthdate);
		formData.append("name", newUser.name);
		console.log("formData: ", formData);
		axios
			.post("http://localhost:5000/users/add/", formData)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleChange = (e) => {
		setNewUser({ ...newUser, [e.target.name]: e.target.value });
	};

	const handlePhoto = (e) => {
		setNewUser({ ...newUser, photo: e.target.files[0] });
	};

	return (
		<>
			<div>
				<form onSubmit={handleSubmit} encType="multipart/form-data">
					<input
						type="file"
						accept=".png, .jpg, .jpeg"
						name="photo"
						onChange={handlePhoto}
					/>

					<input
						type="text"
						placeholder="name"
						name="name"
						value={newUser.name}
						onChange={handleChange}
					/>

					<input
						type="date"
						name="birthdate"
						value={newUser.date}
						onChange={handleChange}
					/>

					<input type="submit" />
					<div>
						<img
							src="http://localhost:5000/public/457e6a1c-12a1-48b1-ae02-acaec09bed2f-1700833218310.png"
							alt="er"
						/>
					</div>
				</form>
			</div>
			<div></div>
		</>
	);
};

export default User;
