import React, { useEffect, useState, useRef } from "react";
import openSocket, {io, Socket} from 'socket.io-client';
import Chat from './Chat/Chat'
import Container from '@material-ui/core/Container';
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import "./GamePage.css";



const ENDPOINT = 'http://localhost:5000/'
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export default function GamePage(props: { history: string[]; }){
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [join, setJoin] = useState<boolean>(false);
    const [location, setLocation] = useState(window.location);
    const fieldRef = React.useRef<HTMLInputElement>(null);
    let msgRef = messages;


    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('join', { name: 'bobBobberson', room: 'xyzk' });


        return () => {
            console.log('here')
            // socket.emit('leave', { name: 'bobBobberson', room: 'xyzk' });

            // socket.off();
        };

    }, [location.search, ENDPOINT]);

    useEffect(() => {
       
        socket.on('message', message => {
            // setMessages(messages => [...messages, message]);
            receiveMsg(message);
        });
        if (messages && fieldRef.current) {
            fieldRef.current.scrollIntoView({
                behavior: "smooth",
              });
        }  
    }, []);


    const sendMessage = (event: any) => {
        event.preventDefault();
    
        if(message) {
            socket.emit('message',{ name:'bobBobberson', room: 'xyzk',message: message}, () => setMessage(''));
        }
    } 
    

    // function joinRoom()  {
    //     // socket.emit('join', { name: data.name, room: data.room });
    //     socket.emit('join', { name: 'bobBobberson', room: 'xyzk' });
        
    // } 

    function receiveMsg(msg: string){
        msgRef = msgRef.concat(msg)
        setMessages(msgRef)
    }

    function leaveRoom(){
        socket.emit('leave', { name: 'bobBobberson', room: 'xyzk' });
        props.history.push('/profile');
        //     socket.emit('leave', { name: data.name, room: data.room  });

    //     socket.off();
    }
  

    return (
        <div>
            <h1 className="title">Chat test</h1>
            <div className="Chat">
                <div className="fields" ref={fieldRef}>
                        {messages.map((item)=>(
                                <div>{item}</div>
                            ))}

                </div>

                <Chat message={message} setMessage={setMessage} sendMessage={sendMessage} leaveRoom={leaveRoom}/>
            </div>
                

        </div>

    )
}