import { useState } from 'react';

import { IconComponents, IconInfoCircle } from '@tabler/icons-react';
import { BridgeElementDetails } from 'features/bridges/components/BridgeElementDetails.tsx';
import { Card } from 'primereact/card';
import { Sidebar } from 'primereact/sidebar';

import { useBridgeElements } from '../stores/bridge.store';

export const BridgeElementsTable = () => {
  const [bridgeElementDetailsVisible, setBridgeElementDetailsVisible] = useState(false);
  const bridgeElements = useBridgeElements();

  return (
    <>
      <div className="text-2xl mb-2 text-gray-700 flex items-center">
        <IconComponents className="mr-2" />
        Elements
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 max-h-[200px] overflow-auto">
        {bridgeElements.map((bridgeElement) => (
          <Card key={bridgeElement.id}>
            <div className="flex justify-between">
              <span>{bridgeElement.name}</span>
              <IconInfoCircle
                className="cursor-pointer text-primary"
                size={30}
                onClick={() => setBridgeElementDetailsVisible(true)}
              />
            </div>
          </Card>
        ))}
      </div>

      <Sidebar
        visible={bridgeElementDetailsVisible}
        position="right"
        onHide={() => setBridgeElementDetailsVisible(false)}
      >
        <BridgeElementDetails />
      </Sidebar>
    </>
  );
};
