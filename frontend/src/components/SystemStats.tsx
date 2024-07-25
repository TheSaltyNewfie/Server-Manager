import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Progress } from "@nextui-org/progress";
import { Button } from "@nextui-org/button";
import CustomModal from "@/components/modal";
import { ModalBody } from "@nextui-org/modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { siteConfig } from "@/config/site";
import { Divider } from "@nextui-org/divider"

export function SystemStats() {
    interface SystemInfo {
        hostname: string
        totalMemory: number
        usedMemory: number
        cpu: string
        cpuUsage: number
        kernel: string
        totalDiskSpace: number
        usedDiskSpace: number
    }

    const [systemInfo, setSystemInfo] = useState<SystemInfo>({})
    const [lowRam, setLowRam] = useState(false)
    const [lowDiskSpace, setLowDiskSpace] = useState(false)
    const [confirmShutdown, setConfirmShutdown] = useState(false)
    const [confirmRestart, setConfirmRestart] = useState(false)
    const [highCpuUsage, setHighCpuUsage] = useState(false)

    const getSystemInfo = async () => {
        try {
            const response = await axios.get(`${siteConfig.api_endpoint}/system`)
            console.log(response.data)
            setSystemInfo(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const checkIfRamIsLow = () => {
        if (systemInfo.usedMemory / systemInfo.totalMemory > 0.8) {
            setLowRam(true)
        }
        else {
            setLowRam(false)
        }
    }

    const checkIfDiskSpaceIsLow = () => {
        if (systemInfo.usedDiskSpace / systemInfo.totalDiskSpace > 0.8) {
            setLowDiskSpace(true)
        }
        else {
            setLowDiskSpace(false)
        }

    }

    const checkIfCpuUsageIsHigh = () => {
        if (systemInfo.cpuUsage > 80) {
            setHighCpuUsage(true)
        }
        else {
            setHighCpuUsage(false)
        }
    }

    const sendShutdownRequest = async () => {
        try {
            await axios.post(`${siteConfig.api_endpoint}/shutdown`,
                {
                    cmd: "shutdown now",
                    token: localStorage.getItem("token")
                }
            )
            setConfirmShutdown(false)
        } catch (error) {
            console.error(error)
        }
    }

    const sendRestartRequest = async () => {
        try {
            await axios.post(`${siteConfig.api_endpoint}/reboot`,
                {
                    cmd: "restart",
                    token: localStorage.getItem("token")
                }
            )
            setConfirmRestart(false)
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            getSystemInfo()
            checkIfRamIsLow()
            checkIfDiskSpaceIsLow()
            checkIfCpuUsageIsHigh()
        }, 1500)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <>
            <CustomModal isOpen={confirmShutdown} onClose={() => setConfirmShutdown(false)}>
                <ModalBody>
                    <p>Are you sure you want to shutdown the system?</p>
                    <Button color="danger" onClick={() => setConfirmShutdown(false)}>No</Button>
                    <Button color="success" onClick={sendShutdownRequest}>Yes</Button>
                </ModalBody>
            </CustomModal>

            <CustomModal isOpen={confirmRestart} onClose={() => setConfirmRestart(false)}>
                <ModalBody>
                    <p>Are you sure you want to restart the system?</p>
                    <Button color="danger" onClick={() => setConfirmRestart(false)}>No</Button>
                    <Button color="success" onClick={sendRestartRequest}>Yes</Button>
                </ModalBody>
            </CustomModal>

            <Card>
                <CardHeader>System Stats</CardHeader>
                <Divider />
                <CardBody className="gap-4">
                    <p>Hostname: {systemInfo.hostname}</p>
                    <p>Kernel: {systemInfo.kernel}</p>
                    <Divider />
                    <Progress
                        value={systemInfo.cpuUsage}
                        maxValue={100}
                        showValueLabel={true}
                        color={highCpuUsage ? "danger" : "success"}
                        label={`CPU: ${systemInfo.cpu}`}
                        formatOptions={{ style: "percent", maximumFractionDigits: 2 }}
                    />
                    <Progress
                        value={systemInfo.usedMemory}
                        maxValue={systemInfo.totalMemory}
                        showValueLabel={true}
                        color={lowRam ? "danger" : "success"}
                        label={`RAM Usage: ${(systemInfo.totalMemory / 1024).toFixed(2)} GB Total`}
                        formatOptions={{ style: "percent", maximumFractionDigits: 2 }}
                    />
                    <Progress
                        value={systemInfo.usedDiskSpace}
                        maxValue={systemInfo.totalDiskSpace}
                        showValueLabel={true}
                        color={lowDiskSpace ? "danger" : "success"}
                        label={`Disk Usage: ${(systemInfo.totalDiskSpace / 1024).toFixed(2)} GB Total`}
                        formatOptions={{ style: "percent", maximumFractionDigits: 2 }}
                    />
                </CardBody>
                <Divider />
                <CardFooter className="gap-2">
                    <Button color="primary" onClick={() => setConfirmShutdown(true)}>Shutdown</Button>
                    <Button color="primary" onClick={() => setConfirmRestart(true)}>Restart</Button>
                </CardFooter>
            </Card>
        </>
    )
}