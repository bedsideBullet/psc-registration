import React, { useState } from "react";
import {
	Container,
	Box,
	Typography,
	Grid,
	TextField,
	Button,
	FormGroup,
	FormControlLabel,
	Checkbox,
} from "@mui/material";
import StateSelect from "./components/StateSelect"; // Import your StateSelect component
import PhoneInput from "./components/PhoneInput"; // Import your PhoneInput component
import YearSelect from "./components/Yearselect"; // Import your YearSelect component
import MakeSelect from "./components/MakeSelect"; // Import your MakeSelect component

const RegistrationForm = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [vehicleModel, setVehicleModel] = useState("");
	const [otherNotes, setOtherNotes] = useState("");
	const [formError, setFormError] = useState(false);

	const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setFirstName(e.target.value);
	const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setLastName(e.target.value);
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		setEmailError(emailRegex.test(value) ? "" : "Invalid email address");
	};
	const handleVehicleModelChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setVehicleModel(e.target.value);
	const handleOtherNotesChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setOtherNotes(e.target.value);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!firstName || !lastName || emailError || !email) {
			setFormError(true);
			return;
		}

		const formData = {
			firstName,
			lastName,
			email,
			vehicleModel,
			otherNotes,
		};

		try {
			const response = await fetch("http://localhost:3001/registrations", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				alert("Registration successful!");
				// Reset the form after successful submission
				setFirstName("");
				setLastName("");
				setEmail("");
				setVehicleModel("");
				setOtherNotes("");
				setFormError(false);
			} else {
				alert("Failed to register. Please try again.");
			}
		} catch (error) {
			console.error("Error submitting the form:", error);
			alert("An error occurred. Please try again.");
		}
	};

	return (
		<>
			<Container
				component="header"
				maxWidth={false}
				sx={{
					position: "fixed",
					top: 0,
					width: "100%",
					bgcolor: "black",
					zIndex: 1100,
					maxHeight: 100,
					left: 0,
				}}
			>
				<Box
					component="img"
					src="src/assets/PSC_logo.png"
					alt="PSC Logo"
					sx={{
						height: 75,
					}}
				/>
			</Container>

			<Container component="main" maxWidth="sm">
				<Box
					sx={{
						marginTop: 15,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography component="h1" variant="h3">
						Contest Registration
					</Typography>
					<Typography component="p" variant="h6">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. At nihil
						ullam perspiciatis numquam amet nisi ipsa alias, eius facilis,
						eveniet nam pariatur optio non sapiente recusandae. Pariatur,
						incidunt nihil? Quam?
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
									value={firstName}
									onChange={handleFirstNameChange}
									error={formError && !firstName}
									helperText={
										formError && !firstName ? "First name is required" : ""
									}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="family-name"
									value={lastName}
									onChange={handleLastNameChange}
									error={formError && !lastName}
									helperText={
										formError && !lastName ? "Last name is required" : ""
									}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField fullWidth id="city" label="City" type="string" />
							</Grid>
							<Grid item xs={12} sm={6}>
								<StateSelect />
							</Grid>

							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									value={email}
									onChange={handleEmailChange}
									error={!!emailError}
									helperText={emailError}
								/>
							</Grid>
							<Grid item xs={12} sm={8}>
								<PhoneInput />
							</Grid>
							<Grid item xs={12} sm={4}>
								<YearSelect />
							</Grid>
							<Grid item xs={12} sm={6}>
								<MakeSelect />
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									id="vehicleModel"
									label="Vehicle Model"
									name="vehicleModel"
									value={vehicleModel}
									onChange={handleVehicleModelChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									id="VehicleNotes"
									label="Vehicle Notes (motor swap etc...)"
									name="otherNotes"
									multiline
									rows={2}
									value={otherNotes}
									onChange={handleOtherNotesChange}
								/>
							</Grid>
						</Grid>
						<FormGroup>
							<FormControlLabel
								control={<Checkbox color="primary" required />}
								label="By checking this box, you confirm that you are 18 years or older."
							/>
						</FormGroup>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="error"
							sx={{ mt: 3, mb: 2 }}
						>
							Register
						</Button>
					</Box>
				</Box>
			</Container>
		</>
	);
};

export default RegistrationForm;
