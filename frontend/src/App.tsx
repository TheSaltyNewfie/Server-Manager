import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import LoginPage from "@/pages/login";
import SharePage from "@/pages/Share";
import TerminalPage from "@/pages/Terminal";
import { useEffect } from "react";
import axios from "axios";
import { siteConfig } from "@/config/site";

function App() {
	return (
		<Routes>
			<Route element={<IndexPage />} path="/" />
			<Route element={<LoginPage />} path="/login" />
			<Route element={<SharePage />} path="/shares" />
			<Route element={<TerminalPage />} path="/terminal" />
		</Routes>
	);
}

export default App;
