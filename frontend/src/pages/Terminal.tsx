import TerminalAudits from '@/components/TerminalAudits';
import TerminalInput from '@/components/TerminalInput';
import DefaultLayout from '@/layouts/default';
import axios from 'axios';
import { useEffect } from 'react';
import { siteConfig } from '@/config/site';


export default function TerminalPage() {
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
                <TerminalInput />
                <TerminalAudits />
            </section>
        </DefaultLayout>
    )
}