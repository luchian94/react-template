import { useEffect, useState } from 'react';

import { IconEyeFilled, IconEyeOff } from '@tabler/icons-react';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { useViewingModelMeshes } from '@/stores/model-viewer.store.tsx';

import { useBridgeElements } from '../stores/bridge.store';

export const BridgeElementListOverlay = () => {
  const bridgeElements = useBridgeElements();
  const viewingModelMeshes = useViewingModelMeshes();
  const [elementsStatus, setElementsStatus] = useState<Record<string, boolean>>({});

  const toggleElementVisibility = (elementName: string) => {
    const mesh = viewingModelMeshes?.find((m) => m.id === elementName);
    if (mesh) {
      mesh.setEnabled(!mesh.isEnabled());
      setElementsStatus((prev) => ({
        ...prev,
        [elementName]: !prev[elementName],
      }));
    }
  };

  useEffect(() => {
    setElementsStatus(bridgeElements.reduce((acc, curr) => ({ ...acc, [curr.id]: true }), {}));
  }, [bridgeElements]);

  return (
    <div className="max-w-[300px]">
      <Accordion>
        <AccordionTab header="Elements">
          <div className="flex flex-col gap-2">
            {bridgeElements.map((element) => {
              const isElementVisible = elementsStatus[element.id];
              return (
                <div
                  key={element.id}
                  className={`flex items-center cursor-pointer ${
                    !isElementVisible ? 'opacity-50' : ''
                  }`}
                  onClick={() => toggleElementVisibility(element.id)}
                >
                  {isElementVisible ? (
                    <IconEyeFilled className="text-primary" />
                  ) : (
                    <IconEyeOff className="text-primary" />
                  )}
                  <span className="ml-2">{element.name}</span>
                </div>
              );
            })}
          </div>
        </AccordionTab>
      </Accordion>
    </div>
  );
};
