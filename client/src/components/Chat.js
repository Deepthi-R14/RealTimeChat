import React ,{ useState,useEffect } from "react";
import {useLocation } from "react-router";
import queryString from 'query-string';
import io from 'socket.io-client';

import Messages from './Messages';
import InfoBar from './InfoBar';
import TextContainer from './TextContainer';
import Input from './Input';
import './Chat.css';


const ENDPOINT = 'http://192.168.29.79:8080';

const Chat = () =>{
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const socket = io(ENDPOINT, {
        transports: ['websocket']
     });

    var location = useLocation();
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
         socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
          });
    
        setRoom(room);
        setName(name);
        console.log(socket);

        socket.emit('join', { name, room }, (error) => {
          if(error) {
            alert(error);
          }
        });
      }, [ENDPOINT, location.search]);
      
      useEffect(() => {
        socket.on('message', message => {
          setMessages(messages => [...messages, message]);
        });
        
        socket.on("roomData", ({ users }) => {
          setUsers(users);
        });
    }, []);
    
      const sendMessage = (event) => {
        event.preventDefault();
        
        if(message) {
          socket.emit('sendMessage', {message}, () => setMessage(''));
        }
      }
    console.log(messages,message);
      return (
        <div className="outerContainer">
          <div className="container">
              <InfoBar room={room} />
              <Messages messages={messages} name={name} />
              <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
          </div>
          <TextContainer users={users}/>
        </div>
      );
    }
    
    export default Chat;