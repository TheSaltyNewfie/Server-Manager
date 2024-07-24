import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import LoginPage from "./pages/login";

function App() {
	return (
		<Routes>
			<Route element={<IndexPage />} path="/" />
			<Route element={<LoginPage />} path="/login" />
		</Routes>
	);
}

export default App;
