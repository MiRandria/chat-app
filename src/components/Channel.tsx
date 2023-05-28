import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';

const schema = yup.object().shape({
  name: yup.string().required('Le nom du canal est requis.'),
  type: yup.string().required('Le type de canal est requis.'),
});

type ChannelFormProps = {
  onSubmit: (data: ChannelFormData) => void;
};

type ChannelFormData = {
  name: string;
  type: 'Private' | 'Public';
};

const ChannelForm: React.FC<ChannelFormProps> = () => {
  const { handleSubmit, register, formState: { errors } } = useForm<ChannelFormData>({
    resolver: yupResolver(schema),
  });

  interface User {
    name: string;
  }
  const [users, setUsers] = useState<User[]>([]);
  const getUsers = async () => {
    const headers = {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbGluLm1hc2tAdGVzdC5jb20iLCJpYXQiOjE2ODUwODQ2NzB9.q2XthQoKxkD7j-y20HzAVKD5WaH0P9jcIUBl5XFajFk',
      'Content-Type': 'application/json',
    } 
     const response = await axios.get('http://localhost:8080/users',{headers});
      setUsers(response.data.users);
  };
  useEffect(() => {
    getUsers();
  }, []);

const route = useRouter();
  const onSubmit = async (data: ChannelFormData) => {
    try {
      const response = await axios.post('http://localhost:8080/channel', data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    route.push('/message');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
      <h1>Create channel</h1>
        <label>Channel name:</label>
        <input type="text" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <h1>Liste des utilisateurs</h1>
        <ul>
          {users.map(user => (
            <p key={user.name}>Nom : {user.name}</p>
        ))}
      </ul>
    </div>

      <div>
        <label>Channel type:</label>
        <select {...register('type')}>
          <option value="Private">Private</option>
          <option value="Public">Public</option>
        </select>
        {errors.type && <p>{errors.type.message}</p>}
      </div>

      <button type="submit">Start chat</button>
    </form>
  );
};

export default ChannelForm;
