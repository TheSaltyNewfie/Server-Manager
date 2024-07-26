import axios from "axios";
import DefaultLayout from "@/layouts/default";
import { useEffect, useState } from "react";
import ShareList from "@/components/ShareList";
import ShareCreate from "@/components/ShareCreate";
import { siteConfig } from "@/config/site";

export default function SharePage() {

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            window.location.href = "/login"
        }

        const checkToken = async () => {
            await axios.post(`${siteConfig.api_endpoint}/auth/check`, {
                Token: localStorage.getItem("token")
            }).catch(() => {
                localStorage.removeItem("token")
                window.location.href = "/login"
            })
        }

        checkToken()
    }, [])

    return (
        <DefaultLayout>
            <section className="flex flex-col flex-wrap justify-center gap-4 py-8 md:py-10">
                <ShareCreate />
                <ShareList />
            </section>
        </DefaultLayout>
    );
}