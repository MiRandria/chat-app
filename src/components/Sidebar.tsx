import React from 'react';
import SideNav, { Toggle, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Router, { useRouter } from 'next/router';

function MySideNav() {
  const route = useRouter();
  const handleSelect = (selected: string) => {
    console.log(selected);
  };
  const onSubmitProfile = () => {
    route.push('/profile');
  };
  const onSubmitChannel = () => {
    route.push('/channel');
  };
  const onSubmitChat = () => {
    route.push('/message');
  };
  return (
    <SideNav onSelect={handleSelect}>
      <Toggle />
      <SideNav.Nav defaultSelected="profile">
        <NavItem eventKey="profile">
          <NavIcon>
            <i className="fa fa-fw fa-home" style={{ fontSize: '1.5em' }}></i>
          </NavIcon>
          <NavText onClick={onSubmitProfile}>Profile</NavText>
        </NavItem>
      </SideNav.Nav>
      <SideNav.Nav defaultSelected="channel">
        <NavItem eventKey="channel">
          <NavIcon>
            <i className="fa fa-fw fa-home" style={{ fontSize: '1.5em' }}></i>
          </NavIcon>
          <NavText onClick={onSubmitChannel}>Channel</NavText>
        </NavItem>
      </SideNav.Nav>
      <SideNav.Nav defaultSelected="chat">
        <NavItem eventKey="chat">
          <NavIcon>
            <i className="fa fa-fw fa-home" style={{ fontSize: '1.5em' }}></i>
          </NavIcon>
          <NavText onClick={onSubmitChat}>Chat</NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
}

export default MySideNav;
