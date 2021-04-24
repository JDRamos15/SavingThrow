import React, { useEffect, useState } from "react";
import openSocket from 'socket.io-client';
import Chat from './Chat/Chat'

const ENDPOINT = 'http://localhost:5000/'
const socket = openSocket(ENDPOINT);

export default function GamePage(props: { history: string[]; }){
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [submitting, setSubmitting] = useState<boolean>(false);
    useEffect(() => {
        socket.emit('join', { name: 'bobBobberson', room: 'xyzk' });


        return () => {
            console.log('here')
            socket.emit('leave', { name: 'bobBobberson', room: 'xyzk' });

            socket.off();
        };
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
    
        if(message) {
          socket.emit('sendMessage', message, () => setMessage(''));
        }
      }
     

    return (
        <div>
            <h1>Chat test</h1>

            <Chat message={message} setMessage={setMessage} sendMessage={sendMessage}/>
        </div>

    )
}