import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import axios from "axios";
import { siteConfig } from "@/config/site";

export default function ShareCreate() {
    const [shareName, setShareName] = useState("")
    const [shareDesc, setShareDesc] = useState("")

    const createShare = async (e: any) => {
        e.preventDefault()

        const token = localStorage.getItem("token")
        await axios.post(`${siteConfig.api_endpoint}/share/create`, {
            shareName: shareName,
            shareDesc: shareDesc,
            Token: token
        })
    }

    return (
        <Card>
            <CardHeader className="text-xl">Create Share</CardHeader>
            <Divider />
            <CardBody>
                <form onSubmit={createShare}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="shareName">
                            Share Name
                        </label>
                        <Input
                            id="shareName"
                            type="text"
                            placeholder="Share Name"
                            value={shareName}
                            onChange={(e) => setShareName(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-bold mb-2" htmlFor="shareDesc">
                            Share Description
                        </label>
                        <Textarea
                            id="shareDesc"
                            placeholder="Share Description"
                            value={shareDesc}
                            onChange={(e) => setShareDesc(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Button
                            type="submit"
                            color="primary"
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}