import React, { useState } from "react";
import {
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	SelectChangeEvent,
} from "@mui/material";

const YearSelect: React.FC = () => {
	const [selectedYear, setSelectedYear] = useState<number | string>("");
	const years = Array.from(
		{ length: 2025 - 1951 + 1 },
		(_, index) => 1951 + index
	);

	const handleChange = (event: SelectChangeEvent<number | string>) => {
		setSelectedYear(event.target.value);
	};

	return (
		<FormControl fullWidth>
			<InputLabel id="vehicle-year">Vehicle Year</InputLabel>
			<Select
				labelId="vehicle-year"
				id="vehicle-year"
				value={selectedYear}
				label="Vehicle Year"
				onChange={handleChange}
				required
			>
				{years.map((year) => (
					<MenuItem key={year} value={year}>
						{year}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default YearSelect;
