import React from "react";
import Slider from "@mui/material/Slider";
import StyledInputSlider from "../styles/InputSlider.styled";


export const InputSlider: React.FC<{
    inputName: string;
	value: number;
	marks: { value: number; label: string }[];
	range: {minValue: number, maxValue: number};
	step?: number;
	valueFormat: (value: number) => string;
	updateState: (valueUpdate: number, stateProperty: string) => void;
}> = ({
    inputName,
	value,
	marks,
	range,
	step,
	valueFormat,
	updateState,
}) => {
	const handleChange = (event: Event, newValue: number | number[]) => {
		if (typeof newValue === "number") {
			updateState(newValue,inputName);
		}
	};
	return (
		<StyledInputSlider>
			<Slider
				value={value}
				valueLabelDisplay="on"
				marks={marks}
				min={range.minValue}
				max={range.maxValue}
				step={step}
				sx={{
					color: "#452CC9",
				}}
				valueLabelFormat={valueFormat}
                onChange={handleChange}
			/>
		</StyledInputSlider>
	);
};
