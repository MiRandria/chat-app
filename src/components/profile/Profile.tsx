import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import axios from 'axios';
import { BASE_URL } from '../utils/base';
import { useCookies } from 'react-cookie';
import { yupResolver } from '@hookform/resolvers/yup';

interface User {
  name: string;
  password: string;
  bio: string;
}

interface UserFormValues {
  name: string;
  oldPassword: string | null;
  newPassword: string | null;
  confirmPassword: string | null;
  bio: string;
}

export default function UpdateProfile() {
  const route = useRouter();
  const [cookies] = useCookies(['token']);
  
  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    oldPassword: yup.string().nullable().required('Old password is required'),
    newPassword: yup
      .string()
      .nullable()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup
      .string()
      .nullable()
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required'),
    bio: yup.string().required('Bio is required'),
  });

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<UserFormValues>({
    resolver: yupResolver(schema),
  });

  

  const [user, setUser] = useState<User[]>([]);
  const getUser = async () => {
    const headers = {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbGluLm1hc2tAdGVzdC5jb20iLCJpYXQiOjE2ODUwODQ2NzB9.q2XthQoKxkD7j-y20HzAVKD5WaH0P9jcIUBl5XFajFk',
      'Content-Type': 'application/json',
    } 
     const response = await axios.get('http://localhost:8080/user',{headers});
      setUser(response.data.user);
  };
  useEffect(() => {
    getUser();
  }, []);

  const onSubmit = async (data: UserFormValues) => {
    try {
      const { name, oldPassword, newPassword, bio } = data;

      const updateData = {
        name,
        password: oldPassword,
        newPassword,
        bio,
      };

      const response = await axios.put(BASE_URL + '/user', updateData, {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      });

      const { updatedName, updatedBio } = response.data;
      console.log('Updated profile:', updatedName, updatedBio);

      // Perform additional actions or display a success message
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Update Profile</h1>
      <div>
        <h1>Users</h1>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input type="text" {...register('name')} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div>
          <label>Old Password</label>
          <input type="password" {...register('oldPassword')} />
          {errors.oldPassword && <span>{errors.oldPassword.message}</span>}
        </div>
        <div>
          <label>New Password</label>
          <input type="password" {...register('newPassword')} />
          {errors.newPassword && <span>{errors.newPassword.message}</span>}
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        </div>
        <div>
          <label>Bio</label>
          <textarea {...register('bio')} />
          {errors.bio && <span>{errors.bio.message}</span>}
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
