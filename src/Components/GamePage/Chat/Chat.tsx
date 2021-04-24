import React, { useEffect, useState } from "react";
import openSocket from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000/'
const socket = openSocket(ENDPOINT);

export default function Chat({ setMessage, sendMessage, message  }){     

    return (
        <div>
            <h1>Chat test</h1>

            <form onSubmit={sendMessage} className="form">
                <input
                    className="input"
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={({ target: { value } }) => setMessage(value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />
                <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
            </form>
        </div>

    )
}