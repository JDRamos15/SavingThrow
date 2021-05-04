import React, { useEffect, useState, useRef } from "react";
import openSocket, {io, Socket} from 'socket.io-client';
import Chat from './Chat/Chat'
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import "./GamePage.css";
import {getToken, logout, getUsername} from "../../Services/authentication";
import { useHistory, useParams } from "react-router";




const ENDPOINT = 'http://localhost:5000/'
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
let verifyRoom: boolean;



interface ParamTypes {
    room: string,
    code: string,
    // cname: string
  }

export default function GamePage(props: { history: string[];}){
    let history = useHistory();
    let {room, code} = useParams<ParamTypes>();
    // let location = useLocation();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const [join, setJoin] = useState<boolean>(false);
    // const [location, setLocation] = useState(window.location);
    const userName = getUsername();
    const fieldRef = React.useRef<HTMLInputElement>(null);
    let msgRef = messages;
    const token = getToken();
    // const state: any = history.location.state

    useEffect(() => {
        console.log(code)
        verifyRoom = false;
        checkRoom();
  
            // closeRoom();

        return () => {
            console.log('here')
            // socket.emit('leave', { name: 'bobBobberson', room: 'xyzk' });

            // socket.off();
        };

    }, [ENDPOINT]);

    useEffect(() => {
       if(verifyRoom){
            socket.on('close',function() {
                window.location.href='/profile'+userName
            });

            socket.on('message', message => {
                // setMessages(messages => [...messages, message]);
                receiveMsg(message);
            });
         
            if (messages && fieldRef.current) {
                fieldRef.current.scrollIntoView({
                    behavior: "smooth",
                });
            }  
        }
    }, []);


    const sendMessage = (event: any) => {
        event.preventDefault();
    
        if(message) {
            socket.emit('message',{ name: userName, room: Number(room), message: message}, () => setMessage(''));
        }
    } 
    

    function receiveMsg(msg: string){
        msgRef = msgRef.concat(msg)
        setMessages(msgRef)
    }

    async function checkRoom(){
        const response = await fetch('/api/check-room', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-Access-Token" : `${token}`
            },
            body: JSON.stringify({
                room: Number(room),
                code: code
            })
          });
        const data = await response.json();
        if( data['status'] == "Success"){
            verifyRoom = true;
            socket = io(ENDPOINT);
            socket.emit('join', { name: userName, room: Number(room)});
            socket.on('message', message => {
                receiveMsg(message);
            });

        }
        if(data['error'] == "Room does not exist"){
            window.location.href='/profile'+userName
        }



    }



    async function leaveRoom(){
        const response = await fetch('/api/leave-room', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-Access-Token" : `${token}`
            },
            body: JSON.stringify({
                room: Number(room),
                code: code
            })
          });
        const data = await response.json();
        console.log(data)
        if(data['error']){
            socket.emit('close', {name: userName, room: data.room})
            window.location.href='/profile'+userName
        }else{
            socket.emit('leave', { name: userName, room: Number(room), message: data['message']});
            if(data['status'] === "Host is leaving" || data['status'] === "Room is empty"){
                socket.emit('close', {name: userName, room: data.room})
                const deleteResponse = await fetch('/api/delete-room', {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "x-Access-Token" : `${token}`
            
                    },
                    body: JSON.stringify({
                        room: Number(room),
                    })
                });
                const deleteData = await deleteResponse.json();
                console.log(deleteData)
            }
        }
        window.location.href='/profile'+userName

        //     socket.emit('leave', { name: data.name, room: data.room  });

    //     socket.off();
    }
  

    return (
        <div>
            <h1 className="title">Chat test</h1>
            <div className="Chat">
                {room}
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