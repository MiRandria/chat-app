import ChannelForm from '@/components/Channel';
import React, { useEffect } from 'react';


const ChannelPage: React.FC = () => {
  return (
    <div>
      <ChannelForm onSubmit={function (data: { name: string; type: 'Private' | 'Public'; }): void {
              throw new Error('Function not implemented.');
          } } />
    </div>
  );
};

export default ChannelPage;