import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Progress } from "@nextui-org/progress";
import { Button } from "@nextui-org/button";
import CustomModal from "@/components/modal";
import { Modal, ModalBody } from "@nextui-org/modal";
import { useEffect, useState } from "react";
import axios from "axios";

export function SystemStats() {
    interface SystemInfo {
        hostname: string
        totalMemory: number
        usedMemory: number
        cpu: string
        kernel: string
        totalDiskSpace: number
        usedDiskSpace: number
    }

    const [systemInfo, setSystemInfo] = useState<SystemInfo>({})
    const [lowRam, setLowRam] = useState(false)
    const [lowDiskSpace, setLowDiskSpace] = useState(false)
    const [confirmShutdown, setConfirmShutdown] = useState(false)
    const [confirmRestart, setConfirmRestart] = useState(false)

    const getSystemInfo = async () => {
        try {
            const response = await axios.get("http://192.168.4.123:8000/system")
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

    useEffect(() => {
        getSystemInfo()
        checkIfRamIsLow()
        checkIfDiskSpaceIsLow()
    }, [])

    return (
        <>
            <CustomModal isOpen={confirmShutdown} onClose={() => setConfirmShutdown(false)}>
                <ModalBody>
                    <p>Are you sure you want to shutdown the system?</p>
                    <Button color="danger" onClick={() => setConfirmShutdown(false)}>No</Button>
                    <Button color="success" onClick={() => setConfirmShutdown(false)}>Yes</Button>
                </ModalBody>
            </CustomModal>

            <CustomModal isOpen={confirmRestart} onClose={() => setConfirmRestart(false)}>
                <ModalBody>
                    <p>Are you sure you want to restart the system?</p>
                    <Button color="danger" onClick={() => setConfirmRestart(false)}>No</Button>
                    <Button color="success" onClick={() => setConfirmRestart(false)}>Yes</Button>
                </ModalBody>
            </CustomModal>

            <Card>
                <CardBody className="gap-4">
                    <p>Hostname: {systemInfo.hostname}</p>
                    <p>CPU: {systemInfo.cpu}</p>
                    <Progress
                        value={systemInfo.usedMemory}
                        maxValue={systemInfo.totalMemory}
                        showValueLabel={true}
                        color={lowRam ? "danger" : "success"}
                        label={`RAM Usage: ${(systemInfo.totalMemory / 1024).toFixed(2)} GB Total`}
                        formatOptions={{ style: "percent", maximumFractionDigits: 2 }}
                    />
                    <p>Kernel: {systemInfo.kernel}</p>
                    <Progress
                        value={systemInfo.usedDiskSpace}
                        maxValue={systemInfo.totalDiskSpace}
                        showValueLabel={true}
                        color={lowDiskSpace ? "danger" : "success"}
                        label={`Disk Usage: ${(systemInfo.totalDiskSpace / 1024).toFixed(2)} GB Total`}
                        formatOptions={{ style: "percent", maximumFractionDigits: 2 }}
                    />
                </CardBody>
                <CardFooter className="gap-2">
                    <Button color="primary" onClick={() => setConfirmShutdown(true)}>Shutdown</Button>
                    <Button color="primary">Restart</Button>
                </CardFooter>
            </Card>
        </>
    )
}