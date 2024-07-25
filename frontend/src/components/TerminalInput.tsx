import React, { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { io, Socket } from 'socket.io-client'
import { siteConfig } from '@/config/site'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import 'xterm/css/xterm.css'

export default function TerminalInput() {
    const terminalRef = useRef<HTMLDivElement>(null)
    const terminal = new Terminal()
    const fitAddon = new FitAddon()
    const socket = io(`${siteConfig.xterm_endpoint}`)

    useEffect(() => {
        terminal.loadAddon(fitAddon)
        terminal.open(terminalRef.current as HTMLDivElement)
        fitAddon.fit()
        terminal.focus()

        socket.on('connect', () => {
            console.log('Connected to server')
        })

        socket.on('data', (data: any) => {
            terminal.write(data)
        })

        terminal.onData((data) => {
            socket.emit('data', data)
        })

        return () => {
            socket.disconnect()
        }
    })

    return (
        <Card>
            <CardHeader className="text-xl">Terminal</CardHeader>
            <Divider />
            <CardBody>
                <div ref={terminalRef} style={{ height: '100%', width: '100%' }}></div>
            </CardBody>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}