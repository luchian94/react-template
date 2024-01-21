import { memo, useState } from 'react';
import { ILoadedModel } from 'react-babylonjs';

import { Mesh } from '@babylonjs/core';
import { Message } from 'primereact/message';
import { Sidebar } from 'primereact/sidebar';

import { ModelViewer } from '@/components/3D/ModelViewer.tsx';
import { useModelViewerActions } from '@/stores/model-viewer.store.tsx';

import { DefectsObj, DefectWithModel } from '../models/defect.model.ts';
import { bridgeStoreActions, useBridge } from '../stores/bridge.store.ts';
import { useDefectActions } from '../stores/defects.store.tsx';
import { BridgeDefectDetails } from './BridgeDefectDetails.tsx';
import { BridgeElementListOverlay } from './BridgeElementListOverlay.tsx';
import { BridgeViewerOverlay } from './BridgeViewerOverlay.tsx';
import { ModelDefects } from './ModelDefects.tsx';

export const BridgeViewer = memo(() => {
  const bridge = useBridge();

  const [loadedModel, setLoadedModel] = useState<ILoadedModel>();
  const [defectSidebarOpen, setDefectSidebarOpen] = useState(false);

  const { setViewingModel } = useModelViewerActions();
  const { setDefects, setSelectedDefect } = useDefectActions();
  const { setBridgeElement } = bridgeStoreActions;

  const onModelLoaded = (model: ILoadedModel) => {
    setViewingModel(model);
    setLoadedModel(model);
  };

  const onMeshClick = (mesh: Mesh) => {
    setBridgeElement(mesh.name);
  };

  const onDefectsLoaded = (defects: DefectsObj) => {
    setDefects(defects);
  };

  const onDefectClick = (defect: DefectWithModel) => {
    setDefectSidebarOpen(true);
    setSelectedDefect(defect);
  };

  const onDefectSidebarHide = () => {
    setDefectSidebarOpen(false);
    setSelectedDefect(null);
  };

  if (!bridge || !bridge.meshUrl) {
    return (
      <Message
        className="w-full"
        severity="warn"
        title="Attention"
        text="Could not get 3D Model file of the bridge."
      />
    );
  }

  return (
    <>
      <div className="h-4/5 relative overflow-hidden">
        <ModelViewer
          rootUrl="/3d-models/moliano/"
          fileName={bridge.meshUrl}
          modelName={bridge.name}
          canvasId={`bridge-${bridge.name}`}
          highlightMeshes={true}
          topOverlay={<BridgeElementListOverlay />}
          bottomOverlay={<BridgeViewerOverlay />}
          sceneChildren={
            loadedModel && (
              <ModelDefects
                defects={bridge.defects}
                highlightDefects
                onDefectsLoaded={onDefectsLoaded}
                onDefectClick={onDefectClick}
              />
            )
          }
          onModelLoaded={onModelLoaded}
          onMeshClick={onMeshClick}
        />
      </div>

      <Sidebar visible={defectSidebarOpen} position="right" onHide={onDefectSidebarHide}>
        <BridgeDefectDetails />
      </Sidebar>
    </>
  );
});

BridgeViewer.displayName = 'BridgeViewer';
