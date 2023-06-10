import EditChannel from '@/components/channel/EditChannel';
import MySideNav from '@/components/Sidebar';
import React, { useEffect } from 'react';


const EditChannelPage: React.FC = () => {
  return (
    <div>
      <MySideNav/>
      <EditChannel onSubmit={function (data: { name: string; type: 'Private' | 'Public'; }): void {
        throw new Error('Function not implemented.');
      } }/>
    </div>
  );
};

export default EditChannelPage;