import axios from "axios";
import DefaultLayout from "@/layouts/default";
import { useEffect, useState } from "react";

export default function IndexPage() {

	interface SystemInfo {
		hostname: string
		memory: number
		cpu: string
		kernel: string
		TotalDiskSpace: number
		UsedDiskSpace: number
	}

	const [systemInfo, setSystemInfo] = useState<SystemInfo>({})

	const getSystemInfo = async () => {
		try {
			const response = await axios.get("http://localhost:8000/system")
			console.log(response.data)
			setSystemInfo(response.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		if (localStorage.getItem("token") === null) {
			window.location.href = "/login"
		}

		getSystemInfo()
	}, [])

	return (
		<DefaultLayout>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<p>{systemInfo.hostname}</p>
				<p>{systemInfo.cpu}</p>
				<p>{systemInfo.memory / 1024} GB</p>
				<p>{systemInfo.kernel}</p>
				<p>{systemInfo.TotalDiskSpace / 1024} GB</p>
				<p>{systemInfo.UsedDiskSpace / 1024} GB</p>
			</section>
		</DefaultLayout>
	);
}
