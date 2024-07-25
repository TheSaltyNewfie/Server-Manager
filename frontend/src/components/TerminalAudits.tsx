import { Card, CardHeader, CardBody } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { siteConfig } from '@/config/site'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function TerminalAudits() {
    const [audits, setAudits] = useState([])

    const getAudits = async () => {
        try {
            const res = await axios.get(`${siteConfig.api_endpoint}/audit`)
            console.log(res.data)
            setAudits(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAudits()
    }, [])

    return (
        <Card>
            <CardHeader className="text-xl">Command Logs</CardHeader>
            <Divider />
            <CardBody>
                <div className="flex flex-col space-y-2">

                    {audits.map((audit, index) => (
                        <Card>
                            <CardBody>
                                <span>{audit.Action}</span>
                                <span>{audit.UserID}</span>
                                <span>{audit.CreatedAt}</span>
                            </CardBody>
                        </Card>
                    ))}


                </div>
            </CardBody>
        </Card>
    )
}