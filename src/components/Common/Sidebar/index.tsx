import { NavLink } from 'react-router-dom';
import ROUTER_NAME from 'src/lib/constants/router';
import { ReactComponent as HomeIcon } from 'src/assets/icons/home.svg';
import { ReactComponent as ConnectIcon } from 'src/assets/icons/connect.svg';
import { ReactComponent as ListIcon } from 'src/assets/icons/list.svg';
import { ReactComponent as ChatIcon } from 'src/assets/icons/chat.svg';
import { ReactComponent as TodoIcon } from 'src/assets/icons/check-box.svg';
import { ReactComponent as DocIcon } from 'src/assets/icons/file.svg';

import { SidebarWrapper } from './style';
const Sidebar = () => {
  return (
    <SidebarWrapper>
      <NavLink to={ROUTER_NAME.dashboard.path} className="sidebar-menu" >
        <HomeIcon />
      </NavLink>
      <NavLink to={ROUTER_NAME.unit.path} className="sidebar-menu">
        <ConnectIcon />
      </NavLink>
      <NavLink to={ROUTER_NAME.task.path} className="sidebar-menu">
        <ListIcon />
      </NavLink>
      <NavLink to={ROUTER_NAME.chat.path} className="sidebar-menu">
        <ChatIcon />
      </NavLink>
      <NavLink to={ROUTER_NAME.todo.path} className="sidebar-menu">
        <TodoIcon />
      </NavLink>
      <NavLink to={ROUTER_NAME.dashboard.path} className="sidebar-menu">
        <DocIcon />
      </NavLink>
    </SidebarWrapper>
  );
};

export default Sidebar;
