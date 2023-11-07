import React ,{ useState,useEffect } from "react";
import {useLocation } from "react-router";
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';


const ENDPOINT = 'http://192.168.29.79:8080/';




const Chat = () =>{
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
   
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
        
      },[]);
        return(
            <h1>Chat</h1>
        )
    }
    

export default Chat;