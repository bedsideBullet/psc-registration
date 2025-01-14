import React, { useState } from "react";
import { TextField, FormHelperText, FormControl } from "@mui/material";

const PhoneInput: React.FC = () => {
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [error, setError] = useState<boolean>(false);

	const validatePhoneNumber = (number: string) => {
		const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/; // Matches (123) 456-7890 format
		return phoneRegex.test(number);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target.value;
		// Format input as (123) 456-7890
		const cleaned = input.replace(/\D/g, ""); // Remove non-numeric characters
		const formatted = cleaned
			.replace(/^(\d{3})(\d{3})(\d{4}).*/, "($1) $2-$3")
			.slice(0, 14); // Limit to 14 characters (formatted length)

		setPhoneNumber(formatted);

		if (formatted.length === 14 && validatePhoneNumber(formatted)) {
			setError(false); // Clear error if valid
		}
	};

	// const handleValidation = () => {
	// 	if (!validatePhoneNumber(phoneNumber)) {
	// 		setError(true);
	// 	} else {
	// 		setError(false);
	// 		alert(`Phone number submitted: ${phoneNumber}`);
	// 	}
	// };

	return (
		<FormControl fullWidth error={error}>
			<TextField
				label="Phone Number"
				value={phoneNumber}
				onChange={handleChange}
				placeholder="(123) 456-7890"
				required
			/>
			{error && <FormHelperText>Invalid phone number format.</FormHelperText>}
		</FormControl>
	);
};

export default PhoneInput;
