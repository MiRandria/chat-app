import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';

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
      const response = await fetch('http://localhost:8080/channel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
    route.push('/');
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

      <button type="submit">Create channel</button>
    </form>
  );
};

export default ChannelForm;
