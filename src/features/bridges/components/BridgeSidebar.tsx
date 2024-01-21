import { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import {
  IconBuildingBridge2,
  IconDatabase,
  IconInfoCircle,
  IconReport,
  IconRuler3,
  IconUmbrella,
  IconWallOff,
} from '@tabler/icons-react';
import { useBridgeBaseInfo } from 'features/bridges/stores/bridge.store.ts';

const SidebarTitle: FC<{ title: string; isFirst?: boolean }> = ({ title, isFirst }) => {
  return (
    <div className={`mb-3 text-gray-600 font-bold uppercase ${isFirst ? '' : 'mt-8'}`}>{title}</div>
  );
};

export const BridgeSidebar = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const { bridgeName } = useBridgeBaseInfo();

  const isMobile = width <= 768;

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  return !isMobile ? (
    <div>
      <div className="text-primary text-xl font-bold mb-8">{bridgeName}</div>

      <SidebarTitle title="Information" />
      <ul className="ml-5 text-gray-700 flex flex-col gap-3">
        <li>
          <NavLink
            to="general-data"
            className={({ isActive, isPending }) =>
              isPending ? 'text-opacity-50' : isActive ? 'text-primary font-bold' : ''
            }
          >
            <div className="flex items-center">
              <IconInfoCircle className="me-3" />
              General data
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="master-data"
            className={({ isActive, isPending }) =>
              isPending ? 'text-opacity-50' : isActive ? 'text-primary font-bold' : ''
            }
          >
            <div className="flex items-center">
              <IconDatabase className="me-3" />
              Master data
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="environmental-data"
            className={({ isActive, isPending }) =>
              isPending ? 'text-opacity-50' : isActive ? 'text-primary font-bold' : ''
            }
          >
            <div className="flex items-center">
              <IconUmbrella className="me-3" />
              Environmental data
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="technical-drawings"
            className={({ isActive, isPending }) =>
              isPending ? 'text-opacity-50' : isActive ? 'text-primary font-bold' : ''
            }
          >
            <div className="flex items-center">
              <IconRuler3 className="me-3" />
              Technical drawings
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="inspections-reports"
            className={({ isActive, isPending }) =>
              isPending ? 'text-opacity-50' : isActive ? 'text-primary font-bold' : ''
            }
          >
            <div className="flex items-center">
              <IconReport className="me-3" />
              Inspections reports
            </div>
          </NavLink>
        </li>
      </ul>

      <SidebarTitle title="Visualization" />
      <ul className="ml-5 text-gray-700 flex flex-col gap-3">
        <li>
          <NavLink
            to="visualization"
            className={({ isActive, isPending }) =>
              isPending ? 'text-opacity-50' : isActive ? 'text-primary font-bold' : ''
            }
          >
            <div className="flex items-center">
              <IconBuildingBridge2 className="me-3" />
              3D Model
            </div>
          </NavLink>
        </li>
      </ul>

      <SidebarTitle title="Analysis" />
      <ul className="ml-5 text-gray-700 flex flex-col gap-3">
        <li>
          <NavLink
            to="defect-summary"
            className={({ isActive, isPending }) =>
              isPending ? 'text-opacity-50' : isActive ? 'text-primary font-bold' : ''
            }
          >
            <div className="flex items-center">
              <IconWallOff className="me-3" />
              Defect summary
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  ) : (
    <div>
      <button className="pi pi-bars bg-white text-primary p-3 border-2 border-gray-200 rounded-lg"></button>
    </div>
  );
};
