import { useRef } from 'react';

import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';

import { useAuthSignOut, useAuthUsername } from '@/auth/auth.store';
import { IMAGES } from '@/constants/images';

export const Header = () => {
  const signOut = useAuthSignOut();
  const username = useAuthUsername();
  const menu = useRef(null as Menu | null);
  const items = [
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        signOut();
      },
    },
  ];
  return (
    <header className="flex items-center justify-between px-10 py-3">
      <div className="flex items-center">
        <img src={IMAGES.logo} alt="" className="max-h-[45px] mr-12"></img>
      </div>
      <div className="flex items-center">
        <Menu model={items} popup ref={menu} id="popup_menu_right" popupAlignment="right" />
        <button
          onClick={(e) => menu.current?.toggle(e)}
          className={'w-full flex items-center cursor-pointer'}
        >
          <span className="whitespace-nowrap">{username}</span>
          <Avatar
            className="ml-2 h-[45px] max-w-[45px] min-w-[45px] bg-gray-300 text-white"
            icon="pi pi-user"
            shape="circle"
          />
        </button>
      </div>
    </header>
  );
};
