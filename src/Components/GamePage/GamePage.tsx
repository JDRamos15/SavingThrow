import React, { useEffect, useState } from "react";
import openSocket from 'socket.io-client';
import Chat from './Chat/Chat'

const ENDPOINT = 'http://localhost:5000/'
const socket = openSocket(ENDPOINT);

export default function GamePage(props: { history: string[]; }){
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [join, setJoin] = useState<boolean>(false);
    const [location, setLocation] = useState(window.location);


    useEffect(() => {
        socket.emit('join', { name: 'bobBobberson', room: 'xyzk' });

        return () => {
            console.log('here')
            // socket.emit('leave', { name: 'bobBobberson', room: 'xyzk' });

            // socket.off();
        };

    }, [location]);

    useEffect(() => {
        socket.on('message', message => {
        setMessages([...messages, message]);
        });
    }, [messages]);

    const sendMessage = (event: any) => {
        event.preventDefault();
    
        if(message) {
            socket.emit('message', message, () => setMessage(''));
        }
    } 

    // function joinRoom(data)  {
    //     socket.emit('join', { name: data.name, room: data.room });

    // } 

    function leaveRoom(){
        socket.emit('leave', { name: 'bobBobberson', room: 'xyzk' });
        props.history.push('/profile');
        //     socket.emit('leave', { name: data.name, room: data.room  });

    //     socket.off();
    }




    

    return (
        <div>
            <h1>Chat test</h1>
            <div>
                {messages.map((item)=>(
                    <div>{item}</div>
                ))}
            </div>

            <Chat message={message} setMessage={setMessage} sendMessage={sendMessage} leaveRoom={leaveRoom}/>
        </div>

    )
}