import { siteConfig } from "@/config/site"
import DefaultLayout from "@/layouts/default"
import axios from "axios"
import { useEffect, useState } from "react"
import { Container } from "@/types"
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Button } from "@nextui-org/button"
import { useNavigate } from "react-router-dom"

export default function PodmanContainers(containers: any) {

    let columns = [
        { key: 'Names', label: 'Names' },
        { key: 'Status', label: 'Status' },
        { key: 'Image', label: 'Image' },
        { key: 'Actions', label: 'Actions' }
    ]

    let navigate = useNavigate()

    const shutdownPod = async (name: any) => {
        await axios.post(`${siteConfig.api_endpoint}/command`,
            {
                cmd: "podman container stop " + name,
                token: localStorage.getItem("token")
            }
        )
    }

    const startPod = async (name: any) => {
        await axios.post(`${siteConfig.api_endpoint}/command`,
            {
                cmd: "podman container start " + name,
                token: localStorage.getItem("token")
            }
        )
    }

    useEffect(() => {
        const checkAuth = async () => {
            const res = await axios.post(`${siteConfig.api_endpoint}/auth/check`, {
                token: localStorage.getItem("token")
            }).catch((err) => {
                navigate("/login")
            })

            if (res.data.Role != 0) {
                navigate("/login")
            }
        }

        checkAuth()

        console.log(containers)
    }, [])

    return (
        <div className="w-full">
            <Table aria-label="Example table with dynamic content">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody>
                    {containers.containers.map((container: any, index: any) => (
                        <TableRow key={index}>
                            <TableCell>{container.Names}</TableCell>
                            <TableCell>{container.Status}</TableCell>
                            <TableCell>{container.Image}</TableCell>
                            <TableCell className="flex gap-2">
                                <Button color="success" onClick={async () => await startPod(container.Names)}>Start</Button>
                                <Button color="danger" onClick={async () => await shutdownPod(container.Names)}>Stop</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}