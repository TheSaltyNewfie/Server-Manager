import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import LoginPage from "./pages/login";
import SharePage from "./pages/Share";

function App() {
	return (
		<Routes>
			<Route element={<IndexPage />} path="/" />
			<Route element={<LoginPage />} path="/login" />
			<Route element={<SharePage />} path="/shares" />
		</Routes>
	);
}

export default App;
