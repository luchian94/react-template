import { useState } from 'react';

import { IconSettings } from '@tabler/icons-react';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Sidebar } from 'primereact/sidebar';

export const BridgeViewerSettingsSidebar = () => {
  const [settingsSidebarVisible, setSettingsSidebarVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setSettingsSidebarVisible(true)}>
        <IconSettings />
      </Button>
      <Sidebar
        visible={settingsSidebarVisible}
        position="right"
        onHide={() => setSettingsSidebarVisible(false)}
      >
        <h2 className="text-xl">Settings</h2>
        <Divider />
        <div className="text-lg text-center text-cyan-800 font-bold">Coming soon...</div>
        {/*<Checkbox inputId="showCameras" name="showCameras" checked={true} />
      <label htmlFor="showCameras" className="ml-2">
        Show cameras
      </label>*/}
      </Sidebar>
    </>
  );
};
