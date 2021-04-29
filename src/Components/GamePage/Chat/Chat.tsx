import React, { useEffect, useState } from "react";
import "./Chat.css";



export default function Chat({ setMessage, sendMessage, message, leaveRoom  }: { setMessage: any, sendMessage: any, message: any, leaveRoom: any  }){     

    return (
        <div>
            <h1>Chat test</h1>


            <form className="form">
                <input
                    className="input"
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={({ target: { value } }) => setMessage(value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />
                <button className="btn_2" onClick={e => sendMessage(e)}>Send</button>
                <button className="btn_1" onClick={e => leaveRoom() } >Leave Chat</button>
            </form>
        </div>

    )
}