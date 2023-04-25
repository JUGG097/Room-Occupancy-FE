import React, { useState } from "react";
import StyledHomePage from "../styles/HomePage.styled";
import { AiOutlineGithub } from "react-icons/ai";
import Switch from "@mui/material/Switch";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { InputSlider } from "../components/InputSlider";
import { sliderMarks, valueRange } from "../utils/Helper";

const HomePage = () => {
	const [checked, setChecked] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const [prediction, setPrediction] = React.useState("");
	const [explanation, setExplanation] = React.useState([]);
	const [formData, setFormData] = useState({
		Temp: 26,
		Light: 95,
		Sound: 1.3,
		PIR: checked ? 1 : 0,
		Day_Period: 1,
		S5_CO2: 620,
		S5_C02_Slope: 0.5,
	});

	const handleSliderChange = (valueUpdate: number, stateProperty: string) => {
		setPrediction("");
		setExplanation([]);
		setFormData({ ...formData, [stateProperty]: valueUpdate });
	};

	const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPrediction("");
		setExplanation([]);
		setChecked(event.target.checked);
		setFormData({ ...formData, PIR: event.target.checked ? 1 : 0 });
	};

	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPrediction("");
		setExplanation([]);
		setFormData({ ...formData, Day_Period: Number(event.target.value) });
	};

	const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		setLoading(true);
		setPrediction("");
		setExplanation([]);
		axios
			.post(
				"https://occupancy-api.juggyprojects.com/prediction",
				formData
			)
			.then((resp) => {
				setPrediction(resp.data.prediction);
				setExplanation(resp.data.explanation);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
			});
	};

	const valueTempText = (value: number) => {
		return `${value}°C`;
	};

	const valueLightText = (value: number) => {
		return `${value} Lux`;
	};

	const valueSoundText = (value: number) => {
		return `${value} Volt`;
	};

	const valueCO2Text = (value: number) => {
		return `${value} ppm`;
	};

	return (
		<StyledHomePage>
			<header className="text-center">
				<h2>Room Occupancy Prediction</h2>

				<p className="mt-3">
					A user interface that comsumes an API endpoint running a
					machine learning model capable of predicting the number of
					persons (limited for use in a small space where maximum
					occupancy is just 3 persons at a time) in a room based on
					indoor atmospheric parameters.
				</p>
			</header>
			<section className="form-section mt-3">
				<div className="flex justify-between text-center flex-col flex-wrap sm:flex-row">
					<div className="w-full mt-3 sm:w-5/12">
						<h3>Temperature (°C)</h3>
						<InputSlider
							inputName="Temp"
							value={formData.Temp}
							marks={sliderMarks.Temp}
							range={valueRange.Temp}
							step={0.1}
							valueFormat={valueTempText}
							updateState={handleSliderChange}
						/>
					</div>

					<div className="w-full mt-3 sm:w-5/12">
						<h3>Light (lux)</h3>
						<InputSlider
							inputName="Light"
							value={formData.Light}
							marks={sliderMarks.Light}
							range={valueRange.Light}
							step={0.25}
							valueFormat={valueLightText}
							updateState={handleSliderChange}
						/>
					</div>

					<div className="w-full mt-3 sm:w-5/12">
						<h3>Sound (volt)</h3>
						<InputSlider
							inputName="Sound"
							value={formData.Sound}
							marks={sliderMarks.Sound}
							range={valueRange.Sound}
							step={0.01}
							valueFormat={valueSoundText}
							updateState={handleSliderChange}
						/>
					</div>

					<div className="w-full mt-3 sm:w-5/12">
						<h3>CO2 (ppm)</h3>
						<InputSlider
							inputName="S5_CO2"
							value={formData.S5_CO2}
							marks={sliderMarks.S5_CO2}
							range={valueRange.S5_CO2}
							valueFormat={valueCO2Text}
							updateState={handleSliderChange}
						/>
					</div>

					<div className="w-full mt-3 sm:w-5/12">
						<h3>PIR (motion detected)</h3>
						<Switch
							checked={checked}
							onChange={handleSwitchChange}
							inputProps={{ "aria-label": "controlled" }}
						/>
					</div>

					<div className="w-full mt-3 sm:w-5/12">
						<h3>Day Period</h3>
						<RadioGroup
							aria-labelledby="demo-controlled-radio-buttons-group"
							name="controlled-radio-buttons-group"
							value={formData.Day_Period}
							onChange={handleRadioChange}
						>
							<FormControlLabel
								value={0}
								control={
									<Radio
										sx={{
											color: "#7B61FF",
											"&.Mui-checked": {
												color: "#7B61FF",
											},
										}}
									/>
								}
								label="Morning"
							/>
							<FormControlLabel
								value={1}
								control={
									<Radio
										sx={{
											color: "#7B61FF",
											"&.Mui-checked": {
												color: "#7B61FF",
											},
										}}
									/>
								}
								label="Afternoon"
							/>
							<FormControlLabel
								value={2}
								control={
									<Radio
										sx={{
											color: "#7B61FF",
											"&.Mui-checked": {
												color: "#7B61FF",
											},
										}}
									/>
								}
								label="Evening"
							/>
						</RadioGroup>
					</div>

					<div className="w-full mt-3 sm:w-5/12">
						<h3>CO2 Reading Slope</h3>
						<input
							type="number"
							name="S5_CO2_Slope"
							id=""
							value={formData.S5_C02_Slope}
							onChange={(e) => {
								setPrediction("");
								setExplanation([]);
								setFormData({
									...formData,
									S5_C02_Slope: Number(e.target.value),
								});
							}}
						/>
					</div>
				</div>

				<div className="mt-5 flex justify-center">
					<button onClick={handleButtonClick}>
						{loading ? (
							<>
								<img src="img/loading.svg" alt="" />
								Running Model
							</>
						) : (
							"Generate Prediction"
						)}
					</button>
				</div>
			</section>

			<div className="prediction-output mt-3 text-center">
				<p>
					{prediction !== "" &&
						`Model predicts ${prediction} room occupant(s)`}
				</p>
				{explanation.length !== 0 && (
					<h5 className="mt-2">Features Impact on Prediction:</h5>
				)}
				{explanation.length !== 0 &&
					explanation.map((items, index) => {
						return (
							<div className="m-2">
								<span key={index}>{`${String(
									items[0]
								)} : ${Number(items[1]).toFixed(3)}`}</span>
							</div>
						);
					})}
			</div>

			<footer className="flex justify-center mt-5">
				<a
					href="https://github.com/JUGG097/Room-Occupancy-Flask-API"
					target="_blank"
					rel="noreferrer"
				>
					<AiOutlineGithub />
				</a>
			</footer>
		</StyledHomePage>
	);
};

export default HomePage;
