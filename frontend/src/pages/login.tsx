import DefaultLayout from "@/layouts/default"
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal"
import { Button, ButtonGroup } from "@nextui-org/button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function LoginPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showModal, setShowModal] = useState(false)
    const naviagate = useNavigate()

    const login = async (e: any) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8000/auth", {
                name: username,
                password: password
            })
            console.log(response.data)
            localStorage.setItem("token", response.data.token)
            naviagate("/")
        } catch (error) {
            console.error(error)
            setShowModal(true)
        }
    }

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <ModalContent>
                        <ModalHeader>Incorrect Info</ModalHeader>
                        <ModalBody>
                            <p>Username or Password was incorrect</p>
                        </ModalBody>
                        <ModalFooter>
                            <ButtonGroup>
                                <Button color="danger" onClick={() => setShowModal(false)}>Close</Button>
                            </ButtonGroup>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <Card>
                    <CardHeader>
                        <h4>Login</h4>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={login} className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Username"
                                className="input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button className="btn" color="primary" type="submit">Login</Button>
                        </form>
                    </CardBody>
                    <CardFooter>
                        <p>Logins are monitored</p>
                    </CardFooter>
                </Card>
            </section>
        </DefaultLayout>
    )
}