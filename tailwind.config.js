/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
// const colors = require("tailwindcss/colors");

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["Poppins", ...fontFamily.sans],
			},
			colors: {
				transparent: "transparent",
				primary: {
					100: "#7209B7",
					50: "#7209B750",
				},
				black: {
					100: "#353535",
					75: "#676767",
					50: "#9b9b9b",
					25: "#cdcdcd",
				},
				white: {
					100: "#fff",
					98: "#fafafa",
					97: "#f7f7f8",
				},
			},
			fontSize: (theme) => ({
				button: "15px",
				display: "32px",
				body: "18px",
			}),
			fontWeight: (theme) => ({
				normal: 400,
				medium: 500,
				semibold: 600,
				bold: 700,
			}),
		},
	},

	variants: {
		extend: {},
	},
	plugins: [require("autoprefixer")],
};
