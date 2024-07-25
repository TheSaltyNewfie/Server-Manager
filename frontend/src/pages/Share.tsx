import axios from "axios";
import DefaultLayout from "@/layouts/default";
import { useEffect, useState } from "react";
import ShareList from "@/components/ShareList";
import ShareCreate from "@/components/ShareCreate";

export default function SharePage() {

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            window.location.href = "/login"
        }
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