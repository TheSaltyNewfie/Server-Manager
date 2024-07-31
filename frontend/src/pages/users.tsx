import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { siteConfig } from '../config/site'
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/table'
import DefaultLayout from '@/layouts/default'
import { Button } from '@nextui-org/button'
import CustomModal from '@/components/modal'
import { ModalBody } from '@nextui-org/modal'
import { Input } from '@nextui-org/input'

export default function UsersPage() {
    let columns = [
        { key: 'Username', label: 'Username' },
        { key: 'Role', label: 'Role' },
        { key: 'Actions', label: 'Actions' }
    ]

    let navigate = useNavigate()

    const [users, setUsers] = useState([])
    const [editModal, setEditModal] = useState(false)
    const [createModal, setCreateModal] = useState(false)

    const [username, setUsername] = useState("")
    const [role, setRole] = useState(0)
    const [password, setPassword] = useState("")
    const [id, setId] = useState(0)

    const getUsers = async () => {
        const res = await axios.get(`${siteConfig.api_endpoint}/users`)

        console.log(res.data)
        setUsers(res.data)
    }

    const handleEditClick = (user: any) => {
        setUsername(user.username)
        setRole(user.role)
        setId(user.id)

        setEditModal(true)
    }

    const handleEditPost = async () => {
        console.log({
            Name: username,
            Role: role,
            Password: password,
            ID: id
        })

        await axios.put(`${siteConfig.api_endpoint}/users`, {
            Name: username,
            Role: role,
            Password: password,
            ID: id
        })
    }

    const handleCreateClick = () => {
        setCreateModal(true)

        setUsername("")
        setRole(1)
        setPassword("")
    }

    const handleCreatePost = async () => {
        await axios.post(`${siteConfig.api_endpoint}/users`, {
            Name: username,
            Role: role,
            Password: password
        })
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

        getUsers()
    }, [])

    return (
        <DefaultLayout>

            <CustomModal isOpen={createModal} onClose={() => setCreateModal(false)}>
                <ModalBody>
                    <h1>Create User</h1>
                    <Input
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        placeholder="Role"
                        type="number"
                        value={role.toString()}
                        onChange={(e) => setRole(parseInt(e.target.value))}
                    />
                    <Input
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button color="success" onClick={async () => await handleCreatePost()}>Create</Button>
                </ModalBody>
            </CustomModal>

            <CustomModal isOpen={editModal} onClose={() => setEditModal(false)}>
                <ModalBody>
                    <h1>Edit User</h1>
                    <Input
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        placeholder="Role"
                        type="number"
                        value={role.toString()}
                        onChange={(e) => setRole(parseInt(e.target.value))}
                    />
                    <Input
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button color="success" onClick={async () => await handleEditPost()}>Save</Button>
                </ModalBody>
            </CustomModal>

            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Users</h1>
                    <Button color="success" onClick={handleCreateClick}>Add User</Button>
                </div>

                <div className="w-full">
                    <Table aria-label="user panel">
                        <TableHeader columns={columns}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody>
                            {users.map((user: any, index: any) => (
                                <TableRow key={index}>
                                    <TableCell>{user.Name}</TableCell>
                                    <TableCell>{user.Role}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Button onClick={() => handleEditClick({ username: user.Name, role: user.Role, id: user.ID })} color="primary">Edit</Button>
                                        <Button color="danger">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </DefaultLayout >
    )
}