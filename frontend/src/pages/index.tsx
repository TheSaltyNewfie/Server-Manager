import axios from "axios";
import DefaultLayout from "@/layouts/default";
import { useEffect, useState } from "react";
import { SystemStats } from "@/components/SystemStats";

export default function IndexPage() {

	useEffect(() => {
		if (localStorage.getItem("token") === null) {
			window.location.href = "/login"
		}
	}, [])

	return (
		<DefaultLayout>
			<section className="flex flex-col flex-wrap justify-center gap-4 py-8 md:py-10">
				<SystemStats />
			</section>
		</DefaultLayout>
	);
}
