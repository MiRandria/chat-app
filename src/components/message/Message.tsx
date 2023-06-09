import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/base';

type MessageProps = {
  text: string;
};

const Message: React.FC<MessageProps> = ({ text }) => {
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = async () => {
    try {
      const headers = {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbGluLm1hc2tAdGVzdC5jb20iLCJpYXQiOjE2ODUwODQ2NzB9.q2XthQoKxkD7j-y20HzAVKD5WaH0P9jcIUBl5XFajFk',
        'Content-Type': 'application/json',
      } 
      // Envoyer le message via une requête POST
      await axios.post(BASE_URL+'/message', { text: newMessage }, {headers});
      console.log('Message envoyé avec succès !');
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'envoi du message :', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  return (
    <div>
      <div>{text}</div>
      <input type="text" value={newMessage} onChange={handleInputChange} />
      <button onClick={sendMessage}>Envoyer le message</button>
    </div>
  );
};

export default Message;
