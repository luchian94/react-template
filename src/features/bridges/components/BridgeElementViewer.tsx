import { useEffect, useState } from 'react';
import { ILoadedModel } from 'react-babylonjs';

import { Sidebar } from 'primereact/sidebar';

import { ModelViewer } from '@/components/3D/ModelViewer.tsx';
import { useModelViewerActions } from '@/stores/model-viewer.store.tsx';

import { useBridgeElementQuery } from '../api/getBridgeElement.ts';
import { DefectsObj, DefectWithModel } from '../models/defect.model.ts';
import { useSelectedBridgeElement } from '../stores/bridge.store.ts';
import { useDefectActions } from '../stores/defects.store.tsx';
import { BridgeDefectDetails } from './BridgeDefectDetails.tsx';
import { BridgeViewerOverlay } from './BridgeViewerOverlay.tsx';
import { ModelDefects } from './ModelDefects.tsx';

export const BridgeElementViewer = () => {
  const [loadedModel, setLoadedModel] = useState<ILoadedModel>();
  const [defectSidebarOpen, setDefectSidebarOpen] = useState(false);

  const { setViewingModel } = useModelViewerActions();
  const { setDefects, setSelectedDefect } = useDefectActions();
  const selectedBridgeElement = useSelectedBridgeElement();

  const { data: elementData } = useBridgeElementQuery(selectedBridgeElement);

  useEffect(() => {}, [selectedBridgeElement]);

  const onDefectsLoaded = (defects: DefectsObj) => {
    setDefects(defects);
  };

  const onModelLoaded = (model: ILoadedModel) => {
    setViewingModel(model);
    setLoadedModel(model);
  };

  const onDefectClick = (defect: DefectWithModel) => {
    setDefectSidebarOpen(true);
    setSelectedDefect(defect);
  };

  const onDefectSidebarHide = () => {
    setDefectSidebarOpen(false);
    setSelectedDefect(null);
  };

  return (
    <>
      <ModelViewer
        rootUrl="/3d-models/moliano/"
        fileName={elementData.meshUrl}
        modelName={elementData.name}
        canvasId={`bridge-element-${elementData.name}`}
        sceneChildren={
          loadedModel && (
            <ModelDefects
              highlightDefects
              defects={elementData.defects}
              onDefectsLoaded={onDefectsLoaded}
              onDefectClick={onDefectClick}
            />
          )
        }
        bottomOverlay={<BridgeViewerOverlay />}
        onModelLoaded={onModelLoaded}
      ></ModelViewer>

      <Sidebar visible={defectSidebarOpen} position="right" onHide={onDefectSidebarHide}>
        <BridgeDefectDetails />
      </Sidebar>
    </>
  );
};

BridgeElementViewer.displayName = 'BridgeElementViewer';
