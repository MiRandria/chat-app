import CreateChannel from '@/components/auth/channel/CreateChannel';
import MySideNav from '@/components/Sidebar';
import React, { useEffect } from 'react';


const EditChannelPage: React.FC = () => {
  return (
    <div>
      <MySideNav/>
      <CreateChannel onSubmit={function (data: { name: string; type: 'Private' | 'Public'; }): void {
        throw new Error('Function not implemented.');
      } } />
    </div>
  );
};

export default EditChannelPage;