import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface Channel {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
}

interface Message {
  id: number;
  content: string;
  sender: User;
  createdAt: string;
}

interface ChatForm {
  message: string;
}

const ChatPage: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { register, handleSubmit, reset } = useForm<ChatForm>();

  useEffect(() => {
    // Récupérer la liste des channel
    axios.get('http://localhost:8080/channels').then((response) => {
      setChannels(response.data);
    });
  }, []);

  useEffect(() => {
    // Récupérer la liste des user
    axios.get('http://localhost:8080/user').then((response) => {
      setUsers(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedChannel) {
      // Récupérer les messages du channel sélectionné
      axios.get(`http://localhost:8080/messages/channel/:channelId`).then((response) => {
        setMessages(response.data);
      });
    }
  }, [selectedChannel]);

  const handleChannelSelect = (channel: Channel) => {
    setSelectedChannel(channel);
  };

  const handleSendMessage = handleSubmit(({ message }) => {
    if (selectedChannel) {
      const newMessage: Message = {
        id: Math.random(),
        content: message,
        sender: { id: 1, name: 'Utilisateur' }, // Remplacer par les données de l'utilisateur connecté
        createdAt: new Date().toISOString(),
      };

      // Envoi du message au serveur
      axios
        .post(`http://localhost:8080/messages`, newMessage)
        .then((response) => {
          setMessages((prevMessages) => [...prevMessages, response.data]);
          reset();
        });
    }
  });

  return (
    <div>
      <div>
        <h2>Liste des channel</h2>
        <ul>
          {channels.map((channel) => (
            <li key={channel.id} onClick={() => handleChannelSelect(channel)}>
              {channel.name}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Liste des utilisateurs</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>

      {selectedChannel ? (
        <div>
          <h2>Messages - {selectedChannel.name}</h2>
          <ul>
            {messages.map((message) => (
              <li key={message.id}>
                <strong>{message.sender.name}</strong> - {message.content} ({message.createdAt})
              </li>
            ))}
          </ul>

          <form onSubmit={handleSendMessage}>
            <input type="text" {...register('message')} />
            <button type="submit">Envoyer</button>
          </form>
        </div>
      ) : (
        <div>Sélectionnez un channel pour afficher les messages.</div>
      )}
    </div>
  );
};

export default ChatPage;
