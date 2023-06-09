import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Router, { useRouter } from 'next/router';
import * as yup from 'yup';
import axios from 'axios';
import { BASE_URL } from '../utils/base';
import { useCookies } from 'react-cookie';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const route = useRouter();
  const [cookies, setCookie] = useCookies(['token']);
  const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  });
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await axios.post(BASE_URL+'/users/login', data);
      const token = response.data.user.token; 
      const options = {
        path: '/'
      }; 
      setCookie("token", token, options); 
      
      route.push('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitSignup = () => {
    route.push('/signUp');
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input type="text" {...register('email')} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" {...register('password')} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button type="submit">Sign In</button>
      </form>
      <button onClick={onSubmitSignup}>Sign Up</button>
    </div>
  );
};

