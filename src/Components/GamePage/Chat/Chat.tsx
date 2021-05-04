import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Chat.css";



export default function Chat({ setMessage, sendMessage, message, leaveRoom  }: { setMessage: any, sendMessage: any, message: any, leaveRoom: any  }){     

    return (
        <div>
            <form className="chat-form">
                <input
                    className="input"
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={({ target: { value } }) => setMessage(value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />
                <button className="btn_2" onClick={e => sendMessage(e)}>Send</button>
                <Button className="btn_1" variant="contained" onClick={async() => {await leaveRoom()}}>Leave Chat</Button>
            </form>
        </div>

    )
}