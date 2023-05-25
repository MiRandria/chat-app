import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import axios from 'axios';

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
        <label>Members name:</label>
        <input type="text" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
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
