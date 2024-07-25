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
    const terminalInstanceRef = useRef<Terminal | null>(null)

    useEffect(() => {
        if (terminalRef.current) {
            const term = new Terminal()
            const fitAddon = new FitAddon()
            term.loadAddon(fitAddon)
            term.open(terminalRef.current)
            fitAddon.fit()
            terminalInstanceRef.current = term

            const socket = new WebSocket(siteConfig.xterm_endpoint)

            socket.onopen = () => {
                console.log('Connected to server')
            }

            socket.onmessage = (event) => {
                term.write(event.data)
            }

            term.onData((data) => {
                socket.send(data)
            })

            return () => {
                socket.close()
                term.dispose()
            }
        }

    }, [])

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