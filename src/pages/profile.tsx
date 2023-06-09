import React, { useEffect } from 'react';
import UpdateProfile from '@/components/profile/Profile';
import MySideNav from '@/components/Sidebar';

const ProfilePage: React.FC = () => {
  return (
    <div>
      <MySideNav/>
      <UpdateProfile/>
    </div>
  );
};

export default ProfilePage;