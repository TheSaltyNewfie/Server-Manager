import { siteConfig } from "@/config/site"
import DefaultLayout from "@/layouts/default"
import axios from "axios"
import { useEffect, useState } from "react"
import { Container } from "@/types"
import PodmanContainers from "@/components/Containers"

export default function PodmanPage() {
    const [containers, setContainers] = useState<Container[]>([{ Names: [], Status: "", Image: "" }])

    const fetchPodman = async () => {
        try {
            const response = await axios.get(`${siteConfig.api_endpoint}/containers`)
            setContainers(response.data)
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        fetchPodman()
    }, [])

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <h1 className="text-4xl font-bold">Podman</h1>
                <div className="w-full">
                    <PodmanContainers containers={containers} />
                </div>
            </section>
        </DefaultLayout >
    )
}