import { useState } from 'react';

import { IconFile } from '@tabler/icons-react';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';

import { Documents } from '@/components/Documents.tsx';

import { BridgeViewerDefectsOverlay } from './BridgeViewerDefectsOverlay.tsx';
import { BridgeViewerSettingsSidebar } from './BridgeViewerSettingsSidebar.tsx';

export const BridgeViewerOverlay = () => {
  const [documentsSidebarVisible, setDocumentsSidebarVisible] = useState(false);

  return (
    <>
      <BridgeViewerDefectsOverlay />
      <Button onClick={() => setDocumentsSidebarVisible(true)} icon={<IconFile />}>
        Documents
      </Button>
      <BridgeViewerSettingsSidebar />

      <Sidebar
        visible={documentsSidebarVisible}
        position="right"
        onHide={() => setDocumentsSidebarVisible(false)}
      >
        <Documents />
      </Sidebar>
    </>
  );
};
