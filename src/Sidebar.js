import React from 'react';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebar__header">
        <Avatar src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
