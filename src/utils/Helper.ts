export const valueRange = {
	Temp: {
		minValue: 20,
		maxValue: 40,
	},
	Light: {
		minValue: 0,
		maxValue: 200,
	},
	Sound: {
		minValue: 0.01,
		maxValue: 4,
	},
	S5_CO2: {
		minValue: 340,
		maxValue: 1300,
	},
};

export const sliderMarks = {
	Temp: [
		{
			value: 20,
			label: "20°C",
		},
        {
			value: 40,
			label: "40°C",
		},
	],
	Light: [
		{
			value: 0,
			label: "0Lux",
		},
        {
			value: 200,
			label: "200Lux",
		},
	],
	Sound: [
		{
			value: 0.01,
			label: "0.01Volt",
		},
        {
			value: 4,
			label: "4Volt",
		},
	],
	S5_CO2: [
		{
			value: 340,
			label: "340ppm",
		},
        {
			value: 1300,
			label: "1300ppm",
		},
	],
};
