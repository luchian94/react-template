import { useRef } from 'react';

import { IconEggCracked, IconEyeFilled, IconEyeOff } from '@tabler/icons-react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { OverlayPanel } from 'primereact/overlaypanel';

import { useDefectActions, useDefects, useDefectsArr } from '../stores/defects.store.tsx';

export const BridgeViewerDefectsOverlay = () => {
  const overlayPanel = useRef<OverlayPanel | null>(null);

  const defects = useDefectsArr();
  const defectsObj = useDefects();
  const { toggleDefect, setDefectVisibility, setFilterText, resetFilters } = useDefectActions();

  const onToggleDefect = (defectKey: string) => {
    const def = defectsObj[defectKey];
    if (def.model && def.model.rootMesh) {
      toggleDefect(defectKey);
      def.model.rootMesh.setEnabled(def.visible);
    }
  };

  const handleShowHideDefects = (shouldShow: boolean) => {
    Object.keys(defectsObj).forEach((defectKey) => {
      const def = defectsObj[defectKey];
      if (def.model && def.model.rootMesh) {
        setDefectVisibility(defectKey, shouldShow);
        def.model.rootMesh.setEnabled(def.visible);
      }
    });
  };

  const reset = () => {
    resetFilters();
  };

  return (
    <>
      <Button
        className="flex items-center cursor-pointer"
        icon={<IconEggCracked />}
        disabled={defects.length === 0}
        onClick={(event) => overlayPanel.current?.toggle(event)}
      >
        Defects
      </Button>
      <OverlayPanel ref={overlayPanel} className="min-w-[500px]" onHide={reset}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl">Defects</h2>

          <div className="flex justify-end gap-2">
            <Button label="Show all" onClick={() => handleShowHideDefects(true)} />
            <Button label="Hide all" onClick={() => handleShowHideDefects(false)} />
          </div>
        </div>
        <Divider />

        <span className="p-input-icon-left w-full mb-6">
          <i className="pi pi-search" />
          <InputText onChange={(event) => setFilterText(event.target.value)} placeholder="Search" />
        </span>

        {defects.length === 0 && <Message className="w-full" severity="info" text="No defects" />}

        <div className="flex flex-col gap-2">
          {defects.map((defect) => (
            <Card
              key={defect.id}
              className={`cursor-pointer ${!defect.visible ? 'opacity-50 bg-gray-300' : ''}`}
              onClick={() => onToggleDefect(defect.id)}
            >
              <div className="flex items-center">
                <span className="mr-2 text-primary">
                  {defect.visible ? <IconEyeFilled /> : <IconEyeOff />}
                </span>
                <span>{defect.name}</span>
              </div>
            </Card>
          ))}
        </div>
      </OverlayPanel>
    </>
  );
};
