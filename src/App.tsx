import React from "react";
import HomePage from "./pages/HomePage";
import { GlobalStyle } from "./styles/GlobalStyles";

function App() {
	return (
		<>
			<GlobalStyle />
			<div className="container flex justify-center sm:px-6 md:px-10 lg:px-15 xl:px-32">
				<HomePage />
			</div>
		</>
	);
}

export default App;
