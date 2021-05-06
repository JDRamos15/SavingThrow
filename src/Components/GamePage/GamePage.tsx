import React, { useEffect, useState, useRef } from "react";
import openSocket, {io, Socket} from 'socket.io-client';
import Chat from './Chat/Chat'
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import "./GamePage.css";
import {getToken, logout, getUsername} from "../../Services/authentication";
import { useHistory, useParams } from "react-router";
import SquareButton from "./SquareButton/SquareButton"
import { Button, Grid } from "@material-ui/core";




const ENDPOINT = 'https://saving-throw.herokuapp.com/'
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
let verifyRoom: boolean;


interface ParamTypes {
    room: string,
    code: string
  }

export default function GamePage(props: { history: string[];}){
    let history = useHistory();
    let {room, code} = useParams<ParamTypes>();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const [join, setJoin] = useState<boolean>(false);
    const userName = getUsername();
    const fieldRef = React.useRef<HTMLInputElement>(null);
    let msgRef = messages;
    const token = getToken();

    useEffect(() => {
        verifyRoom = false;
        checkRoom();
<<<<<<< HEAD
  

        return () => {
        };
=======
>>>>>>> 0ba4bf422bfb94a9baa5e0ed3940120b20373c9d

    }, [ENDPOINT]);

    useEffect(() => {
       if(verifyRoom){
            socket.on('close',function() {
                window.location.href='/profile/'+userName
            });

            socket.on('message', message => {
                receiveMsg(message);
                if(message === "Close Room."){
                    leaveRoom();
                }
            });
         
            if (messages && fieldRef.current) {
                fieldRef.current.scrollIntoView({
                    behavior: "smooth",
                });
            }  
        }
    },[]);


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
                "x-Access-Token" : `${token}`,
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
                if(message === "Close Room."){
                    leaveRoom();
                }
            });

        }
        if(data['error'] == "Room does not exist"){
            window.location.href='/profile/'+userName
        }
        if(data['status'] == "Token is invalid!"){
            logout();
            window.location.href='/'
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
<<<<<<< HEAD
=======
        if(data['status'] == "Token is invalid!"){
            logout();
            window.location.href='/'
        }
>>>>>>> 0ba4bf422bfb94a9baa5e0ed3940120b20373c9d
        if(data['error']){
            socket.emit('close', {name: userName, room: data.room})
            window.location.href='/profile/'+userName
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
            }
        }
  
        window.location.href='/profile/'+userName

        //     socket.emit('leave', { name: data.name, room: data.room  });

    }
    function getRandomInt(max: number) {
        // if max is 3, function will return 0, 1 or 2
        return Math.floor(Math.random() * max);
    }

    function rollDice(dice: number){
        let diceVal = getRandomInt(dice)+1
        socket.emit('message',{ name: userName, room: Number(room), message: "Rolled d"+ dice+ ": " + diceVal}, () => setMessage(''));
    }
  

    return (
        <div>
            <h1 className="title">Campaign</h1>
            <h3 className="room">Room: {room}</h3>

        <div className="container"> 
                <div className="box"> 

                    <div className="box-row"> 
                        <SquareButton
                            border="default"
                            color="#fdffc4"
                            height = "15vh"
                            onClick={() => {rollDice(20)}}
                            radius = "10%"
                            width = "30vw"
                            children = "d20"
                        />  
                    </div>

                    <div className="box-row"> 
                        <SquareButton
                            border="default"
                            color="#fdffc4"
                            height = "10vh"
                            onClick={() => {rollDice(4)}}
                            radius = "10%"
                            width = "10vw"
                            children = "d4"
                        />
                        <SquareButton
                            border="default"
                            color="#fdffc4"
                            height = "10vh"
                            onClick={() => {rollDice(6)}}
                            radius = "10%"
                            width = "10vw"
                            children = "d6"
                        />
                            <SquareButton
                            border="default"
                            color="#fdffc4"
                            height = "10vh"
                            onClick={() => {rollDice(8)}}
                            radius = "10%"
                            width = "10vw"
                            children = "d8"
                        />
                 
                    </div>
                    <div className="box-row"> 
                        <SquareButton
                            border="default"
                            color="#fdffc4"
                            height = "10vh"
                            onClick={() => {rollDice(10)}}
                            radius = "10%"
                            width = "10vw"
                            children = "d10"
                        />
                        <SquareButton
                            border="default"
                            color="#fdffc4"
                            height = "10vh"
                            onClick={() => {rollDice(12)}}
                            radius = "10%"
                            width = "10vw"
                            children = "d12"
                        />
                        <SquareButton
                            border="default"
                            color="#fdffc4"
                            height = "10vh"
                            onClick={() => {rollDice(100)}}
                            radius = "10%"
                            width = "10vw"
                            children = "d100"
                        />
                    </div>
                      

                            
                </div>
            </div>
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