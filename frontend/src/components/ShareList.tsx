import { siteConfig } from "@/config/site";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card"
import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "@nextui-org/button"
import { Divider } from "@nextui-org/divider";

export default function ShareList() {
    const [shares, setShares] = useState([])

    const getShares = async () => {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${siteConfig.api_endpoint}/share/list`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data)
        setShares(response.data)
        console.log(shares)
    }

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text)
        alert("Copied to clipboard")
    }

    useEffect(() => {
        getShares()
    }, [])


    return (
        <Card>
            <CardHeader className="text-xl">Share List</CardHeader>
            <Divider />
            <CardBody className="gap-2">
                {
                    shares.map((key: any, index: any) => (
                        <Card key={index}>
                            <CardHeader className="text-xl">
                                <p>{key.ShareName}</p>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <p>{key.ShareDesc}</p>
                            </CardBody>
                            <CardFooter>
                                <Button color="primary" onClick={async () => await copyToClipboard(siteConfig.ftp_endpoint)}>Copy</Button>
                            </CardFooter>
                        </Card>
                    ))
                }
            </CardBody>
        </Card>
    );
}